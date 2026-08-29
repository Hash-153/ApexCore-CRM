/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Pipeline Forecasting & MEDDIC Gatekeeper Unit Tests
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { CRMDatabase } from '../../src/crm/database/crm_database.ts';
import { seedCRMDatabase } from '../../src/crm/database/seed_data.ts';
import { PipelineForecastingService } from '../../src/crm/services/PipelineForecastingService.ts';
import { DealStage } from '../../src/crm/domain/enums.ts';

describe('PipelineForecastingService & MEDDIC Gatekeeper', () => {
  let db: CRMDatabase;
  let pipelineService: PipelineForecastingService;

  beforeEach(() => {
    db = CRMDatabase.getInstance();
    seedCRMDatabase(db);
    pipelineService = new PipelineForecastingService(db);
  });

  it('should generate accurate weighted pipeline forecast', () => {
    const forecast = pipelineService.generateForecast('pipe_enterprise_direct', 'tenant_apex_global_001');

    assert.equal(forecast.totalDeals, 3);
    assert.ok(forecast.totalPipelineValue > 1000000);
    assert.ok(forecast.weightedForecastValue > 500000);
    assert.ok(forecast.stageBreakdowns.length > 0);
  });

  it('should enforce MEDDIC qualification when transitioning to Quote/Negotiation stages', () => {
    // Attempting to advance incomplete MEDDIC deal to proposal stage
    const gateResult = pipelineService.validateStageTransition(
      'opp_lumina_pilot',
      DealStage.PROPOSAL_PRICE_QUOTE,
      'usr_marcus_vance'
    );

    assert.equal(gateResult.allowed, false);
    assert.ok(gateResult.blockers.length > 0);
    assert.ok(gateResult.blockers.some(b => b.includes('MEDDIC')));

    // Fulfilling MEDDIC criteria and re-testing
    const opp = db.opportunities.get('opp_lumina_pilot')!;
    opp.meddic = {
      metrics: 'Save 500 engineering hours',
      economicBuyer: 'Ananya Sharma',
      decisionCriteria: 'Security & Open APIs',
      decisionProcess: 'Legal review',
      identifyPain: 'Rigid schema',
      champion: 'Ananya Sharma',
      isComplete: true
    };

    const allowedResult = pipelineService.validateStageTransition(
      'opp_lumina_pilot',
      DealStage.PROPOSAL_PRICE_QUOTE,
      'usr_marcus_vance'
    );

    assert.equal(allowedResult.allowed, true);
    assert.equal(allowedResult.blockers.length, 0);
    assert.equal(allowedResult.opportunity.stage, DealStage.PROPOSAL_PRICE_QUOTE);
  });
});
