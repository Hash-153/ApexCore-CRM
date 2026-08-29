/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * CPQ & Pricing Engine Automated Tests
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { CRMDatabase } from '../../src/crm/database/crm_database.ts';
import { seedCRMDatabase } from '../../src/crm/database/seed_data.ts';
import { CPQAndPricingEngine } from '../../src/crm/services/CPQAndPricingEngine.ts';
import { DiscountType, QuoteStatus } from '../../src/crm/domain/enums.ts';

describe('CPQAndPricingEngine', () => {
  let db: CRMDatabase;
  let cpqEngine: CPQAndPricingEngine;

  beforeEach(() => {
    db = CRMDatabase.getInstance();
    seedCRMDatabase(db);
    cpqEngine = new CPQAndPricingEngine(db);
  });

  it('should apply volume tier discounts automatically based on price book configuration', () => {
    // 200 enterprise seats qualify for 15% tier discount (min 100)
    const result = cpqEngine.generateQuote({
      tenantId: 'tenant_apex_global_001',
      opportunityId: 'opp_horizon_ehr_expansion',
      priceBookId: 'pb_standard_2026',
      items: [
        {
          productId: 'prd_crm_enterprise_seat',
          quantity: 200
        }
      ],
      actorId: 'usr_marcus_vance'
    });

    const quote = result.quote;
    assert.equal(quote.lineItems.length, 1);
    assert.equal(quote.lineItems[0].discountValue, 15);
    assert.equal(quote.subtotal, 360000); // 200 * 1800
    assert.equal(quote.totalDiscountAmount, 54000); // 15% of 360,000
    assert.equal(quote.grandTotal, 306000);
  });

  it('should trigger executive approval when custom discount exceeds sales rep authority (>20%)', () => {
    const result = cpqEngine.generateQuote({
      tenantId: 'tenant_apex_global_001',
      opportunityId: 'opp_horizon_ehr_expansion',
      priceBookId: 'pb_standard_2026',
      items: [
        {
          productId: 'prd_crm_enterprise_seat',
          quantity: 10,
          customDiscountType: DiscountType.PERCENTAGE,
          customDiscountValue: 35 // Exceeds 20% limit
        }
      ],
      actorId: 'usr_marcus_vance'
    });

    assert.equal(result.requiresExecutiveApproval, true);
    assert.equal(result.quote.status, QuoteStatus.PENDING_APPROVAL);
    assert.ok(result.approvalReasons.length > 0);
  });

  it('should handle executive quote review approval and rejection transitions', () => {
    const quote = cpqEngine.reviewQuote('qte_horizon_2026_01', 'APPROVE', 'usr_sarah_connor');
    assert.equal(quote.status, QuoteStatus.APPROVED);
    assert.equal(quote.approvedBy, 'usr_sarah_connor');
    assert.ok(quote.approvedAt);
  });
});
