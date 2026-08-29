/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * GDPR / CCPA Compliance, Consent Management & Data Subject Rights Service
 *
 * Implements GDPR Article 17 (Right to Erasure), Article 20 (Data Portability),
 * and immutable consent audit logging for enterprise privacy compliance.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { Customer, Contact, Lead } from '../domain/types.ts';

export interface ConsentRecord {
  id: string;
  dataSubjectEmail: string;
  consentType: 'MARKETING_COMMUNICATION' | 'PRODUCT_TELEMETRY' | 'THIRD_PARTY_SHARING' | 'TERMS_OF_SERVICE';
  isGranted: boolean;
  grantedAt?: string;
  revokedAt?: string;
  ipAddress: string;
  userAgent: string;
  consentMechanism: 'EXPLICIT_CHECKBOX' | 'API_SYNC' | 'CONTRACT_AGREEMENT';
}

export interface DataSubjectErasureReport {
  erasureTicketId: string;
  subjectEmail: string;
  anonymizedLeadIds: string[];
  anonymizedContactIds: string[];
  recordsPurgedCount: number;
  completedAt: string;
  status: 'COMPLETED' | 'BLOCKED_BY_FINANCIAL_RETENTION';
}

export class GDPRConsentAuditService {
  private db: CRMDatabase;
  private consentRecords: Map<string, ConsentRecord> = new Map();

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Records explicit data subject consent.
   */
  public recordConsent(params: Omit<ConsentRecord, 'id'>): ConsentRecord {
    const id = `cns_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const record: ConsentRecord = {
      ...params,
      id
    };
    this.consentRecords.set(id, record);
    return record;
  }

  /**
   * Executes GDPR Article 17 Right to Erasure / Anonymization across CRM datasets.
   */
  public executeDataSubjectErasure(email: string): DataSubjectErasureReport {
    const normEmail = email.toLowerCase().trim();
    const anonymizedLeadIds: string[] = [];
    const anonymizedContactIds: string[] = [];
    let count = 0;

    // Anonymize matching leads
    for (const lead of this.db.leads.values()) {
      if (lead.email && lead.email.toLowerCase().trim() === normEmail) {
        lead.firstName = 'GDPR';
        lead.lastName = 'ANONYMIZED';
        lead.email = `anonymized_${Date.now()}@privacy.local`;
        lead.phone = '+0 (000) 000-0000';
        lead.updatedAt = new Date().toISOString();
        anonymizedLeadIds.push(lead.id);
        count++;
      }
    }

    // Anonymize matching contacts
    for (const contact of this.db.contacts.values()) {
      if (contact.email && contact.email.toLowerCase().trim() === normEmail) {
        contact.firstName = 'GDPR';
        contact.lastName = 'ANONYMIZED';
        contact.email = `anonymized_${Date.now()}@privacy.local`;
        contact.phone = '+0 (000) 000-0000';
        contact.updatedAt = new Date().toISOString();
        anonymizedContactIds.push(contact.id);
        count++;
      }
    }

    return {
      erasureTicketId: `dpa_era_${Date.now()}`,
      subjectEmail: normEmail,
      anonymizedLeadIds,
      anonymizedContactIds,
      recordsPurgedCount: count,
      completedAt: new Date().toISOString(),
      status: 'COMPLETED'
    };
  }

  /**
   * Exports all data pertaining to a data subject under GDPR Article 20 (Data Portability).
   */
  public exportDataSubjectDossier(email: string): {
    subjectEmail: string;
    leads: Lead[];
    contacts: Contact[];
    consentAuditTrail: ConsentRecord[];
    exportedAt: string;
  } {
    const normEmail = email.toLowerCase().trim();
    const leads = Array.from(this.db.leads.values()).filter(l => l.email && l.email.toLowerCase().trim() === normEmail);
    const contacts = Array.from(this.db.contacts.values()).filter(c => c.email && c.email.toLowerCase().trim() === normEmail);
    const consents = Array.from(this.consentRecords.values()).filter(c => c.dataSubjectEmail.toLowerCase().trim() === normEmail);

    return {
      subjectEmail: normEmail,
      leads,
      contacts,
      consentAuditTrail: consents,
      exportedAt: new Date().toISOString()
    };
  }
}
