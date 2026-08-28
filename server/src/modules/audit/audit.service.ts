/**
 * HIPAA Audit Log Service & Verification
 */

import { HipaaAuditLogger, type HipaaAuditEvent } from '../../security/hipaaAudit.ts';
import type { HealthcareResource } from '../../security/rbac.ts';

export class AuditService {
  public static queryAuditLogs(filters: {
    actorId?: string;
    patientId?: string;
    resource?: HealthcareResource;
    status?: 'SUCCESS' | 'DENIED' | 'FLAGGED';
    startDate?: string;
    endDate?: string;
    limit?: number;
  }): HipaaAuditEvent[] {
    return HipaaAuditLogger.query(filters);
  }

  public static verifyChainIntegrity() {
    return HipaaAuditLogger.verifyLogIntegrity();
  }
}
