import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { CRMDatabase } from '../../src/crm/database/crm_database.ts';
import { seedCRMDatabase } from '../../src/crm/database/seed_data.ts';
import { AuthService } from '../../src/crm/auth/auth.service.ts';
import { RBACService } from '../../src/crm/auth/rbac.service.ts';
import { UserRole, UserStatus } from '../../src/crm/domain/enums.ts';

describe('AuthService & 5-Role RBAC Security', () => {
  let db: CRMDatabase;
  let authService: AuthService;

  beforeEach(() => {
    db = CRMDatabase.getInstance();
    seedCRMDatabase(db);
    authService = new AuthService(db);
  });

  it('should authenticate user with valid credentials across all 5 roles', () => {
    // 1. Admin
    const adminLogin = authService.login('admin@apexcore.example.com', 'Password123!');
    assert.equal(adminLogin.user.role, UserRole.ADMIN);
    assert.ok(adminLogin.token.startsWith('sess_'));

    // 2. Sales Manager
    const mgrLogin = authService.login('manager@apexcore.example.com', 'Password123!');
    assert.equal(mgrLogin.user.role, UserRole.SALES_MANAGER);

    // 3. Sales Representative
    const repLogin = authService.login('rep@apexcore.example.com', 'Password123!');
    assert.equal(repLogin.user.role, UserRole.SALES_REPRESENTATIVE);

    // 4. Support Agent
    const supportLogin = authService.login('support@apexcore.example.com', 'Password123!');
    assert.equal(supportLogin.user.role, UserRole.SUPPORT_AGENT);

    // 5. Marketing Executive
    const mktgLogin = authService.login('marketing@apexcore.example.com', 'Password123!');
    assert.equal(mktgLogin.user.role, UserRole.MARKETING_EXECUTIVE);
  });

  it('should reject invalid password and enforce lockout policy after 5 attempts', () => {
    assert.throws(
      () => authService.login('rep@apexcore.example.com', 'WrongPassword!'),
      /Invalid password/
    );

    // Simulate 4 more failed attempts
    for (let i = 0; i < 3; i++) {
      try { authService.login('rep@apexcore.example.com', 'WrongPassword!'); } catch (e) {}
    }

    assert.throws(
      () => authService.login('rep@apexcore.example.com', 'WrongPassword!'),
      /Account locked/
    );

    const user = db.getUserByEmail('rep@apexcore.example.com')!;
    assert.equal(user.status, UserStatus.LOCKED);
  });

  it('should register a new user and assign appropriate enterprise role', () => {
    const regResult = authService.register({
      email: 'new.rep@apexcore.example.com',
      passwordPlain: 'SecretPassword99!',
      firstName: 'David',
      lastName: 'Miller',
      role: UserRole.SALES_REPRESENTATIVE,
      department: 'Commercial Sales',
      jobTitle: 'Account Executive'
    });

    assert.equal(regResult.user.email, 'new.rep@apexcore.example.com');
    assert.equal(regResult.user.displayName, 'David Miller');
    assert.equal(regResult.user.role, UserRole.SALES_REPRESENTATIVE);
    assert.ok(regResult.token.length > 0);
  });

  it('should handle time-bound forgot password and reset token confirmation', () => {
    const forgotRes = authService.forgotPassword('manager@apexcore.example.com');
    assert.ok(forgotRes.resetToken.startsWith('rst_'));

    const resetRes = authService.resetPassword(forgotRes.resetToken, 'NewSecurePassword888!');
    assert.equal(resetRes.success, true);

    // Verify login with new password
    const newLogin = authService.login('manager@apexcore.example.com', 'NewSecurePassword888!');
    assert.equal(newLogin.user.email, 'manager@apexcore.example.com');
  });

  it('should enforce role-based access control matrix across 5 roles', () => {
    // Admin has superuser access
    assert.equal(RBACService.hasPermission(UserRole.ADMIN, 'users:delete'), true);
    assert.equal(RBACService.hasPermission(UserRole.ADMIN, 'schemas:manage'), true);

    // Sales Rep has deal/lead access but not user management
    assert.equal(RBACService.hasPermission(UserRole.SALES_REPRESENTATIVE, 'deals:create'), true);
    assert.equal(RBACService.hasPermission(UserRole.SALES_REPRESENTATIVE, 'users:delete'), false);

    // Support Agent has ticket access but not marketing campaigns
    assert.equal(RBACService.hasPermission(UserRole.SUPPORT_AGENT, 'tickets:reply'), true);
    assert.equal(RBACService.hasPermission(UserRole.SUPPORT_AGENT, 'campaigns:create'), false);

    // Marketing Exec has campaign access but not quote approval
    assert.equal(RBACService.hasPermission(UserRole.MARKETING_EXECUTIVE, 'campaigns:create'), true);
    assert.equal(RBACService.hasPermission(UserRole.MARKETING_EXECUTIVE, 'quotes:approve'), false);
  });
});
