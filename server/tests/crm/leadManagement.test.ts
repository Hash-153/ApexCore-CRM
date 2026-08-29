/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Lead Management, BANT Engine & Conversion Unit Tests
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { CRMDatabase } from '../../src/crm/database/crm_database.ts';
import { seedCRMDatabase } from '../../src/crm/database/seed_data.ts';
import { LeadManagementService } from '../../src/crm/services/LeadManagementService.ts';
import { LeadRating, LeadStatus } from '../../src/crm/domain/enums.ts';

describe('LeadManagementService & BANT Engine', () => {
  let db: CRMDatabase;
  let leadService: LeadManagementService;

  beforeEach(() => {
    db = CRMDatabase.getInstance();
    seedCRMDatabase(db);
    leadService = new LeadManagementService(db);
  });

  it('should correctly evaluate BANT score threshold (>=70 is qualified)', () => {
    const qualifiedBANT = leadService.evaluateBANT({
      budgetScore: 20,
      authorityScore: 20,
      needScore: 20,
      timelineScore: 15
    });

    assert.equal(qualifiedBANT.totalScore, 75);
    assert.equal(qualifiedBANT.isQualified, true);

    const unqualifiedBANT = leadService.evaluateBANT({
      budgetScore: 10,
      authorityScore: 10,
      needScore: 10,
      timelineScore: 10
    });

    assert.equal(unqualifiedBANT.totalScore, 40);
    assert.equal(unqualifiedBANT.isQualified, false);
  });

  it('should calculate dynamic lead ratings (HOT, WARM, COLD)', () => {
    const hotBreakdown = leadService.calculateLeadScore({
      annualRevenue: 150000000,
      numberOfEmployees: 2500,
      source: 'INBOUND_WEBSITE' as any,
      bant: {
        budgetScore: 25,
        authorityScore: 25,
        needScore: 25,
        timelineScore: 20,
        totalScore: 95,
        qualificationSummary: 'Top priority enterprise lead',
        isQualified: true
      }
    });

    assert.equal(hotBreakdown.rating, LeadRating.HOT);
    assert.ok(hotBreakdown.overallScore >= 80);
  });

  it('should perform 1-Click atomic conversion of lead into Account, Contact and Deal', () => {
    const result = leadService.convertLead({
      leadId: 'ld_vanguard_logistics',
      actorId: 'usr_marcus_vance',
      createAccount: true,
      createOpportunity: true,
      estimatedAmount: 250000
    });

    assert.equal(result.success, true);
    assert.ok(result.accountId);
    assert.ok(result.contactId);
    assert.ok(result.opportunityId);

    const lead = db.leads.get('ld_vanguard_logistics');
    assert.equal(lead?.status, LeadStatus.CONVERTED);
    assert.equal(lead?.convertedAccountId, result.accountId);

    const account = db.accounts.get(result.accountId!);
    assert.ok(account);
    assert.equal(account?.name, 'Vanguard Global Logistics Corp');

    const opportunity = db.opportunities.get(result.opportunityId!);
    assert.ok(opportunity);
    assert.equal(opportunity?.amount, 250000);
  });
});
