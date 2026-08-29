/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Security, RBAC & Cryptographic Audit Automated Tests
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { CRMDatabase } from '../../src/crm/database/crm_database.ts';
import { seedCRMDatabase } from '../../src/crm/database/seed_data.ts';
import { SecurityAndRBACService } from '../../src/crm/services/SecurityAndRBACService.ts';
import { UserRole, AuditAction } from '../../src/crm/domain/enums.ts';

describe('SecurityAndRBACService & Cryptographic Hash Chain', () => {
  let db: CRMDatabase;
  let securityService: SecurityAndRBACService;

  beforeEach(() => {
    db = CRMDatabase.getInstance();
    seedCRMDatabase(db);
    securityService = new SecurityAndRBACService(db);
  });

  it('should enforce granular role-based permissions', () => {
    const isVpAllowed = securityService.hasPermission(UserRole.SALES_VP, 'quotes:approve');
    assert.equal(isVpAllowed, true);

    const isSdrAllowedQuoteApprove = securityService.hasPermission(UserRole.SALES_DEVELOPMENT_REP, 'quotes:approve');
    assert.equal(isSdrAllowedQuoteApprove, false);

    const isAuditorAllowedRead = securityService.hasPermission(UserRole.READ_ONLY_AUDITOR, 'accounts:read');
    assert.equal(isAuditorAllowedRead, true);

    const isAuditorAllowedWrite = securityService.hasPermission(UserRole.READ_ONLY_AUDITOR, 'accounts:write');
    assert.equal(isAuditorAllowedWrite, false);
  });

  it('should log audit events and maintain valid SHA-256 hash chain', () => {
    const actor = db.users.get('usr_marcus_vance')!;

    securityService.recordAuditLog({
      tenantId: 'tenant_apex_global_001',
      actor,
      action: AuditAction.UPDATE,
      entityType: 'OPPORTUNITY',
      entityId: 'opp_horizon_ehr_expansion',
      details: 'Updated deal amount from $300,000 to $350,000 following CPQ discount adjustment.'
    });

    const check = securityService.verifyAuditChainIntegrity();
    assert.equal(check.isValid, true);
    assert.equal(check.brokenAtLogId, undefined);
  });
});
