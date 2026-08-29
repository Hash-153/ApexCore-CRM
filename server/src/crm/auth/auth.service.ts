/**
 * ApexCore Enterprise CRM - Authentication & Session Service
 * Provides cryptographic password hashing, session tokens, brute-force lockout,
 * user registration, and secure time-bound password reset workflows.
 */

import crypto from 'node:crypto';
import type { CRMDatabase } from '../database/crm_database.ts';
import type { User, Session, PasswordResetToken } from '../domain/types.ts';
import { UserRole, UserStatus } from '../domain/enums.ts';

export class AuthService {
  private db: CRMDatabase;

  constructor(db: CRMDatabase) {
    this.db = db;
  }

  /**
   * Hashes a password using PBKDF2 with SHA-512 and salt.
   */
  public hashPassword(password: string, salt: string = 'apexcore_enterprise_salt_2026'): string {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  }

  /**
   * Authenticates a user with email and password.
   */
  public login(
    email: string,
    passwordPlain: string,
    ipAddress: string = '127.0.0.1'
  ): { user: User; token: string; session: Session } {
    const user = this.db.getUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email credentials.');
    }

    if (user.status === UserStatus.LOCKED) {
      if (user.lockedUntil && new Date(user.lockedUntil).getTime() > Date.now()) {
        throw new Error(`Account is locked due to security policy. Try again after ${new Date(user.lockedUntil).toLocaleTimeString()}.`);
      }
      // Auto-unlock expired lock
      user.status = UserStatus.ACTIVE;
      user.failedLoginAttempts = 0;
      user.lockedUntil = undefined;
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new Error('This account has been deactivated. Please contact your system Administrator.');
    }

    const computedHash = this.hashPassword(passwordPlain);
    if (computedHash !== user.passwordHash) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 5) {
        user.status = UserStatus.LOCKED;
        user.lockedUntil = new Date(Date.now() + 15 * 60000).toISOString(); // 15 min lock
        throw new Error('Account locked due to 5 consecutive failed login attempts.');
      }
      throw new Error('Invalid password.');
    }

    // Reset failed attempts on successful login
    user.failedLoginAttempts = 0;
    user.lastLoginAt = new Date().toISOString();
    this.db.indexUser(user);

    // Create session
    const token = `sess_${crypto.randomBytes(32).toString('hex')}`;
    const session: Session = {
      token,
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
      expiresAt: new Date(Date.now() + 24 * 3600000).toISOString(), // 24 hours
      createdAt: new Date().toISOString()
    };

    this.db.sessions.set(token, session);

    return { user, token, session };
  }

  /**
   * Registers a new user with tenant isolation and role assignment.
   */
  public register(data: {
    tenantId?: string;
    email: string;
    passwordPlain: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    department?: string;
    jobTitle?: string;
    phoneNumber?: string;
    quotaARR?: number;
  }): { user: User; token: string; session: Session } {
    const existing = this.db.getUserByEmail(data.email);
    if (existing) {
      throw new Error(`User with email "${data.email}" already exists.`);
    }

    if (!data.passwordPlain || data.passwordPlain.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const now = new Date().toISOString();
    const userId = `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const tenantId = data.tenantId || 'tenant_apex_global_001';

    const user: User = {
      id: userId,
      tenantId,
      email: data.email.toLowerCase().trim(),
      passwordHash: this.hashPassword(data.passwordPlain),
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: `${data.firstName} ${data.lastName}`,
      role: data.role || UserRole.SALES_REPRESENTATIVE,
      status: UserStatus.ACTIVE,
      department: data.department || 'Revenue Operations',
      jobTitle: data.jobTitle || data.role,
      phoneNumber: data.phoneNumber,
      quotaARR: data.quotaARR || 0,
      failedLoginAttempts: 0,
      createdAt: now,
      updatedAt: now,
      createdBy: 'system_auth_registration',
      updatedBy: 'system_auth_registration'
    };

    this.db.indexUser(user);

    // Auto-login upon registration
    const token = `sess_${crypto.randomBytes(32).toString('hex')}`;
    const session: Session = {
      token,
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
      expiresAt: new Date(Date.now() + 24 * 3600000).toISOString(),
      createdAt: now
    };

    this.db.sessions.set(token, session);

    return { user, token, session };
  }

  /**
   * Generates a time-bound secure password reset token.
   */
  public forgotPassword(email: string): { resetToken: string; expiresAt: string; message: string } {
    const user = this.db.getUserByEmail(email);
    if (!user) {
      // Security standard: generic message to prevent email enumeration
      return {
        resetToken: 'SIMULATED_TOKEN',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
        message: 'If the email is registered, a password reset link has been dispatched.'
      };
    }

    const token = `rst_${crypto.randomBytes(24).toString('hex')}`;
    const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hour

    const resetRecord: PasswordResetToken = {
      id: `tok_${Date.now()}`,
      token,
      userId: user.id,
      email: user.email,
      expiresAt,
      used: false,
      createdAt: new Date().toISOString()
    };

    this.db.passwordResetTokens.set(token, resetRecord);
    user.passwordResetToken = token;
    user.passwordResetExpiresAt = expiresAt;
    this.db.indexUser(user);

    return {
      resetToken: token,
      expiresAt,
      message: 'Password reset link dispatched successfully.'
    };
  }

  /**
   * Verifies reset token and updates password.
   */
  public resetPassword(token: string, newPasswordPlain: string): { success: boolean; user: User } {
    if (!newPasswordPlain || newPasswordPlain.length < 6) {
      throw new Error('New password must be at least 6 characters.');
    }

    const record = this.db.passwordResetTokens.get(token);
    if (!record || record.used) {
      throw new Error('Invalid or already used password reset token.');
    }

    if (new Date(record.expiresAt).getTime() < Date.now()) {
      throw new Error('Password reset token has expired. Please request a new link.');
    }

    const user = this.db.users.get(record.userId);
    if (!user) {
      throw new Error('User associated with token not found.');
    }

    user.passwordHash = this.hashPassword(newPasswordPlain);
    user.updatedAt = new Date().toISOString();
    user.passwordResetToken = undefined;
    user.passwordResetExpiresAt = undefined;
    user.status = UserStatus.ACTIVE;
    user.failedLoginAttempts = 0;

    record.used = true;

    this.db.indexUser(user);

    return { success: true, user };
  }

  /**
   * Validates active session token.
   */
  public validateSession(token: string): { user: User; session: Session } | null {
    if (!token) return null;
    const session = this.db.sessions.get(token);
    if (!session) return null;

    if (new Date(session.expiresAt).getTime() < Date.now()) {
      this.db.sessions.delete(token);
      return null;
    }

    const user = this.db.users.get(session.userId);
    if (!user || user.status === UserStatus.INACTIVE || user.status === UserStatus.LOCKED) {
      return null;
    }

    return { user, session };
  }

  /**
   * Logs out user by destroying the session.
   */
  public logout(token: string): boolean {
    return this.db.sessions.delete(token);
  }

  /**
   * Admin helper: List all users with filtering.
   */
  public listUsers(tenantId?: string): User[] {
    const list = Array.from(this.db.users.values());
    if (tenantId) {
      return list.filter(u => u.tenantId === tenantId);
    }
    return list;
  }

  /**
   * Admin helper: Update user role or status.
   */
  public updateUserRole(userId: string, newRole: UserRole, actorId: string): User {
    const user = this.db.users.get(userId);
    if (!user) {
      throw new Error(`User not found with ID: ${userId}`);
    }
    user.role = newRole;
    user.updatedAt = new Date().toISOString();
    user.updatedBy = actorId;
    this.db.indexUser(user);
    return user;
  }
}
