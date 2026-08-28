import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { UserPrincipal, HealthcareResource, AccessAction } from './rbac.ts';
import { config } from '../config/index.ts';

export interface HipaaAuditEvent {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: AccessAction;
  resource: HealthcareResource;
  patientId?: string;
  recordId?: string;
  ipAddress?: string;
  userAgent?: string;
  accessReason: string;
  status: 'SUCCESS' | 'DENIED' | 'FLAGGED';
  phiElementsAccessed: string[];
  signatureHash: string; // Cryptographic hash ensuring tamper-evident log integrity
}

export class HipaaAuditLogger {
  private static events: HipaaAuditEvent[] = [];
  private static lastHash: string = '0000000000000000000000000000000000000000000000000000000000000000';

  /**
   * Record a PHI access event in compliance with 45 CFR § 164.312(b)
   */
  public static log(params: {
    actor: UserPrincipal;
    action: AccessAction;
    resource: HealthcareResource;
    patientId?: string;
    recordId?: string;
    ipAddress?: string;
    userAgent?: string;
    accessReason: string;
    status: 'SUCCESS' | 'DENIED' | 'FLAGGED';
    phiElementsAccessed?: string[];
  }): HipaaAuditEvent {
    const id = `AUDIT-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    const timestamp = new Date().toISOString();
    const phiElements = params.phiElementsAccessed || ['DEMOGRAPHICS'];

    // Create tamper-evident chaining signature (Blockchain-like hash chain)
    const payload = `${this.lastHash}|${id}|${timestamp}|${params.actor.id}|${params.action}|${params.resource}|${params.patientId || ''}|${params.status}`;
    const signatureHash = crypto.createHash('sha256').update(payload).digest('hex');
    this.lastHash = signatureHash;

    const event: HipaaAuditEvent = {
      id,
      timestamp,
      actorId: params.actor.id,
      actorName: params.actor.name,
      actorRole: params.actor.role,
      action: params.action,
      resource: params.resource,
      patientId: params.patientId,
      recordId: params.recordId,
      ipAddress: params.ipAddress || '127.0.0.1',
      userAgent: params.userAgent || 'MediCore-Client/1.0',
      accessReason: params.accessReason,
      status: params.status,
      phiElementsAccessed: phiElements,
      signatureHash,
    };

    this.events.unshift(event);

    // Keep memory cache manageable
    if (this.events.length > 5000) {
      this.events.pop();
    }

    // Persist asynchronously if file logging is enabled
    if (config.hipaa.enableAuditLogging) {
      this.persistToFile(event);
    }

    return event;
  }

  private static persistToFile(event: HipaaAuditEvent): void {
    try {
      const logDir = path.dirname(config.hipaa.auditStoragePath);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      fs.appendFileSync(config.hipaa.auditStoragePath, JSON.stringify(event) + '\n', 'utf8');
    } catch (err) {
      // In high-reliability healthcare systems, audit failures must be surfaced
      console.error('[HIPAA AUDIT LOGGING ERROR] Failed to write audit event to disk:', err);
    }
  }

  /**
   * Query audit logs with multi-parameter filter
   */
  public static query(filters: {
    actorId?: string;
    patientId?: string;
    resource?: HealthcareResource;
    status?: 'SUCCESS' | 'DENIED' | 'FLAGGED';
    startDate?: string;
    endDate?: string;
    limit?: number;
  }): HipaaAuditEvent[] {
    let results = [...this.events];

    if (filters.actorId) {
      results = results.filter((e) => e.actorId === filters.actorId);
    }
    if (filters.patientId) {
      results = results.filter((e) => e.patientId === filters.patientId);
    }
    if (filters.resource) {
      results = results.filter((e) => e.resource === filters.resource);
    }
    if (filters.status) {
      results = results.filter((e) => e.status === filters.status);
    }
    if (filters.startDate) {
      const start = new Date(filters.startDate).getTime();
      results = results.filter((e) => new Date(e.timestamp).getTime() >= start);
    }
    if (filters.endDate) {
      const end = new Date(filters.endDate).getTime();
      results = results.filter((e) => new Date(e.timestamp).getTime() <= end);
    }

    return results.slice(0, filters.limit || 100);
  }

  /**
   * Verify integrity of the audit chain to detect tampering
   */
  public static verifyLogIntegrity(): { valid: boolean; inspectedCount: number; brokenIndex?: number } {
    if (this.events.length <= 1) {
      return { valid: true, inspectedCount: this.events.length };
    }

    // Inspect reverse order (from oldest to newest)
    const chronological = [...this.events].reverse();
    let prevHash = '0000000000000000000000000000000000000000000000000000000000000000';

    for (let i = 0; i < chronological.length; i++) {
      const evt = chronological[i];
      const payload = `${prevHash}|${evt.id}|${evt.timestamp}|${evt.actorId}|${evt.action}|${evt.resource}|${evt.patientId || ''}|${evt.status}`;
      const calculatedHash = crypto.createHash('sha256').update(payload).digest('hex');

      if (calculatedHash !== evt.signatureHash) {
        return { valid: false, inspectedCount: i + 1, brokenIndex: i };
      }
      prevHash = evt.signatureHash;
    }

    return { valid: true, inspectedCount: chronological.length };
  }
}
