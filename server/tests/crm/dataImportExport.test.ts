/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Data Import, Export & Webhook Integration Automated Tests
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { CRMDatabase } from '../../src/crm/database/crm_database.ts';
import { seedCRMDatabase } from '../../src/crm/database/seed_data.ts';
import { IntegrationAndImportService } from '../../src/crm/services/IntegrationAndImportService.ts';

describe('IntegrationAndImportService', () => {
  let db: CRMDatabase;
  let importService: IntegrationAndImportService;

  beforeEach(() => {
    db = CRMDatabase.getInstance();
    seedCRMDatabase(db);
    importService = new IntegrationAndImportService(db);
  });

  it('should import bulk CSV tabular data and skip duplicate entries', () => {
    const rawCSVRows = [
      {
        'First Name': 'Arthur',
        'Last Name': 'Pendelton',
        Email: 'arthur.p@quantumlogistics.example.com',
        Phone: '+1 (555) 789-0123',
        Company: 'Quantum Logistics Global',
        Title: 'Chief Procurement Officer',
        'Annual Revenue': '75000000'
      },
      {
        'First Name': 'Duplicate',
        'Last Name': 'Lead',
        Email: 'j.mercer@vanguardlogistics.example.com', // Exists in seed data
        Phone: '+1 (555) 000-1111',
        Company: 'Vanguard Global Logistics Corp',
        Title: 'Director'
      }
    ];

    const result = importService.importLeads(
      rawCSVRows,
      {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        companyName: 'Company',
        title: 'Title',
        annualRevenue: 'Annual Revenue'
      },
      'tenant_apex_global_001',
      'usr_marcus_vance'
    );

    assert.equal(result.totalRows, 2);
    assert.equal(result.importedCount, 1);
    assert.equal(result.skippedDuplicatesCount, 1);
    assert.equal(result.errors.length, 0);
  });

  it('should generate HMAC-SHA256 signed webhook payloads for external integration sync', () => {
    const secret = 'apex_webhook_secret_key_123';
    const signed = importService.generateSignedWebhookPayload(
      'opportunity.closed_won',
      { dealId: 'opp_horizon_ehr_expansion', amount: 350000 },
      secret
    );

    assert.ok(signed.payload);
    assert.ok(signed.signature);
    assert.equal(signed.signature.length, 64); // SHA-256 hex string
  });
});
