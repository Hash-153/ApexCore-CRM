/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Integration, CSV Bulk Data Ingestion & Webhook Service
 *
 * Implements tabular CSV data normalization, header mapping, duplicate resolution,
 * and cryptographic HMAC-SHA256 signature verification for webhook integrations.
 */

import { createHmac } from 'crypto';
import { CRMDatabase } from '../database/crm_database.ts';
import { LeadStatus, LeadRating, LeadSource, IndustryClassification } from '../domain/enums.ts';
import type { Lead } from '../domain/types.ts';

export interface CSVImportMapping {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  title: string;
  industry?: string;
  annualRevenue?: string;
}

export interface ImportSummary {
  totalRows: number;
  importedCount: number;
  skippedDuplicatesCount: number;
  errors: string[];
}

export class IntegrationAndImportService {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Imports array of raw CSV rows with dynamic column mappings.
   */
  public importLeads(
    rows: Record<string, string>[],
    mapping: CSVImportMapping,
    tenantId: string,
    ownerId: string
  ): ImportSummary {
    let importedCount = 0;
    let skippedDuplicatesCount = 0;
    const errors: string[] = [];

    const owner = this.db.users.get(ownerId);
    const ownerName = owner ? owner.fullName : 'System Import';

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const email = (row[mapping.email] || '').trim();
      const firstName = (row[mapping.firstName] || '').trim();
      const lastName = (row[mapping.lastName] || '').trim();
      const companyName = (row[mapping.companyName] || '').trim();

      if (!email || !firstName || !companyName) {
        errors.push(`Row ${i + 1}: Missing required fields (First Name, Email, or Company).`);
        continue;
      }

      // Deduplication check
      let isDuplicate = false;
      for (const existing of this.db.leads.values()) {
        if (existing.tenantId === tenantId && existing.email.toLowerCase() === email.toLowerCase()) {
          isDuplicate = true;
          break;
        }
      }

      if (isDuplicate) {
        skippedDuplicatesCount++;
        continue;
      }

      const revRaw = mapping.annualRevenue ? row[mapping.annualRevenue] : undefined;
      const annualRevenue = revRaw ? parseFloat(revRaw.replace(/[^0-9.-]+/g, '')) || 0 : 0;

      const leadId = `ld_imp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const now = new Date().toISOString();

      const lead: Lead = {
        id: leadId,
        tenantId,
        firstName,
        lastName,
        title: row[mapping.title] || 'Lead',
        companyName,
        email,
        phone: row[mapping.phone] || 'N/A',
        industry: IndustryClassification.TECHNOLOGY_SOFTWARE,
        annualRevenue,
        source: LeadSource.OTHER,
        status: LeadStatus.NEW,
        rating: LeadRating.WARM,
        score: 50,
        bant: {
          budgetScore: 10,
          authorityScore: 10,
          needScore: 10,
          timelineScore: 10,
          totalScore: 40,
          qualificationSummary: 'Imported via CSV batch upload.',
          isQualified: false
        },
        ownerId,
        ownerName,
        createdAt: now,
        updatedAt: now,
        createdBy: ownerId,
        updatedBy: ownerId
      };

      this.db.indexLead(lead);
      importedCount++;
    }

    return {
      totalRows: rows.length,
      importedCount,
      skippedDuplicatesCount,
      errors
    };
  }

  /**
   * Generates HMAC-SHA256 signature for outgoing webhook events.
   */
  public generateSignedWebhookPayload(
    event: string,
    data: Record<string, any>,
    secretKey: string
  ): { payload: string; signature: string } {
    const payload = JSON.stringify({
      event,
      timestamp: new Date().toISOString(),
      data
    });

    const signature = createHmac('sha256', secretKey).update(payload).digest('hex');

    return { payload, signature };
  }
}
