/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Deal Probability Calibration & Win-Rate Decay Analysis Service
 *
 * Calibrates opportunity win probabilities based on deal velocity,
 * stakeholder responsiveness, competitor presence, and MEDDIC completion rates.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { Opportunity } from '../domain/types.ts';
import { DealStage } from '../domain/enums.ts';

export interface CalibratedOpportunityScore {
  opportunityId: string;
  opportunityName: string;
  nominalProbability: number;
  calibratedProbability: number;
  expectedRevenueUSD: number;
  positiveDrivers: string[];
  negativeRiskDrivers: string[];
  recommendedAction: string;
}

export class DealProbabilityCalibrationService {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Calibrates probability score for an opportunity.
   */
  public calibrateOpportunity(opportunityId: string): CalibratedOpportunityScore {
    const opp = this.db.opportunities.get(opportunityId);
    if (!opp) {
      throw new Error(`Opportunity not found with ID: ${opportunityId}`);
    }

    const positiveDrivers: string[] = [];
    const negativeRiskDrivers: string[] = [];
    let modifier = 1.0;

    // 1. Check MEDDIC Score
    if (opp.meddic) {
      if (opp.meddic.isComplete || opp.meddic.scorePercentage >= 90) {
        modifier *= 1.25;
        positiveDrivers.push('Comprehensive MEDDIC qualification completed (>90% score)');
      } else if (opp.meddic.scorePercentage < 60) {
        modifier *= 0.75;
        negativeRiskDrivers.push('Incomplete MEDDIC discovery score (<60%)');
      }

      if (opp.meddic.economicBuyer) {
        positiveDrivers.push('Identified Economic Buyer active in negotiations');
      } else {
        negativeRiskDrivers.push('No confirmed Economic Buyer relationship');
      }
    }

    // 2. Check Stage Stagnation
    const daysInStage = opp.daysInCurrentStage || 5;
    if (daysInStage > 60) {
      modifier *= 0.60;
      negativeRiskDrivers.push(`Deal stagnant in stage for ${daysInStage} days (>60 day threshold)`);
    } else if (daysInStage <= 14) {
      positiveDrivers.push('High deal velocity (<14 days in current stage)');
    }

    // 3. Amount Scale Guardrails
    if (opp.amount > 500000) {
      modifier *= 0.90; // Large enterprise deals require higher diligence
      negativeRiskDrivers.push('Mega-deal scrutiny ($500k+ requires CFO signoff)');
    }

    const nominalProbability = opp.probabilityPercentage;
    const calibrated = Math.min(99, Math.max(1, Math.round(nominalProbability * modifier)));
    const expectedRevenueUSD = Math.round(opp.amount * (calibrated / 100));

    let recommendedAction = 'Proceed with standard sales cadence.';
    if (calibrated < 40 && opp.amount > 100000) {
      recommendedAction = 'Execute Executive Alignment Intervention and re-evaluate Champion.';
    } else if (calibrated >= 80) {
      recommendedAction = 'Prepare CPQ Master Order Form and schedule Legal terms review.';
    }

    return {
      opportunityId: opp.id,
      opportunityName: opp.name,
      nominalProbability,
      calibratedProbability: calibrated,
      expectedRevenueUSD,
      positiveDrivers,
      negativeRiskDrivers,
      recommendedAction
    };
  }

  public calibrateAllActiveOpportunities(): CalibratedOpportunityScore[] {
    const opps = Array.from(this.db.opportunities.values()).filter(
      o => o.stage !== DealStage.CLOSED_LOST && o.stage !== DealStage.CLOSED_WON
    );
    return opps.map(o => this.calibrateOpportunity(o.id));
  }
}
