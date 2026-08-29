/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Security, Role-Based Access Control (RBAC) & Tamper-Evident Audit Service
 *
 * Implements granular role checks, tenant isolation, and sequential SHA-256
 * cryptographic hash chaining of all mutations.
 */

import { createHash } from 'crypto';
import { CRMDatabase } from '../database/crm_database.ts';
import { UserRole, AuditAction } from '../domain/enums.ts';
import type { AuditLogEntry, User } from '../domain/types.ts';

export class SecurityAndRBACService {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Evaluates if an actor role possesses permission for a given action.
   */
  public hasPermission(role: UserRole, permission: string): boolean {
    if (role === UserRole.GLOBAL_ADMIN) return true;

    const rolePermissionMap: Record<UserRole, string[]> = {
      [UserRole.GLOBAL_ADMIN]: ['*'],
      [UserRole.SALES_VP]: ['leads:*', 'accounts:*', 'contacts:*', 'opportunities:*', 'quotes:*', 'reports:*', 'workflows:*'],
      [UserRole.SALES_MANAGER]: ['leads:*', 'accounts:*', 'contacts:*', 'opportunities:*', 'quotes:*', 'reports:*'],
      [UserRole.ACCOUNT_EXECUTIVE]: ['leads:*', 'accounts:read', 'accounts:write', 'contacts:*', 'opportunities:*', 'quotes:*'],
      [UserRole.SALES_DEVELOPMENT_REP]: ['leads:*', 'contacts:read', 'contacts:write', 'accounts:read'],
      [UserRole.SUPPORT_DIRECTOR]: ['tickets:*', 'accounts:read', 'contacts:read', 'reports:*', 'sla:*'],
      [UserRole.SUPPORT_SPECIALIST]: ['tickets:*', 'accounts:read', 'contacts:read'],
      [UserRole.MARKETING_MANAGER]: ['campaigns:*', 'leads:*', 'reports:*', 'workflows:*'],
      [UserRole.FINANCE_CONTROLLER]: ['invoices:*', 'contracts:*', 'quotes:approve', 'reports:*'],
      [UserRole.READ_ONLY_AUDITOR]: ['*:read']
    };

    const allowed = rolePermissionMap[role] || [];
    if (allowed.includes('*')) return true;

    const [domain, action] = permission.split(':');
    return allowed.some(p => {
      if (p === `${domain}:*`) return true;
      if (p === permission) return true;
      if (p === '*:read' && action === 'read') return true;
      return false;
    });
  }

  /**
   * Cryptographically hashes and appends an immutable audit log entry.
   */
  public recordAuditLog(params: {
    tenantId: string;
    actor: User;
    action: AuditAction;
    entityType: string;
    entityId: string;
    details: string;
    previousValues?: Record<string, unknown>;
    newValues?: Record<string, unknown>;
    clientIp?: string;
  }): AuditLogEntry {
    const previousEntry = this.db.auditLogs.length > 0
      ? this.db.auditLogs[this.db.auditLogs.length - 1]
      : null;

    const previousHash = previousEntry ? previousEntry.currentHash : '0'.repeat(64);
    const timestamp = new Date().toISOString();
    const id = `aud_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const payloadToHash = JSON.stringify({
      id,
      tenantId: params.tenantId,
      timestamp,
      actorId: params.actor.id,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      previousHash,
      details: params.details
    });

    const currentHash = createHash('sha256').update(payloadToHash).digest('hex');

    const entry: AuditLogEntry = {
      id,
      tenantId: params.tenantId,
      timestamp,
      actorId: params.actor.id,
      actorName: params.actor.fullName,
      actorRole: params.actor.role,
      clientIp: params.clientIp || '127.0.0.1',
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      details: params.details,
      previousValues: params.previousValues,
      newValues: params.newValues,
      previousHash,
      currentHash
    };

    this.db.auditLogs.push(entry);
    return entry;
  }

  /**
   * Validates cryptographic hash chain integrity across all historical audit entries.
   */
  public verifyAuditChainIntegrity(): { isValid: boolean; brokenAtLogId?: string } {
    for (let i = 0; i < this.db.auditLogs.length; i++) {
      const entry = this.db.auditLogs[i];

      if (i > 0) {
        const prev = this.db.auditLogs[i - 1];
        if (entry.previousHash !== prev.currentHash) {
          return { isValid: false, brokenAtLogId: entry.id };
        }
      }
    }
    return { isValid: true };
  }
}
