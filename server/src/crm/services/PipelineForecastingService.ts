/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Sales Pipeline Forecasting & MEDDIC Gatekeeper Service
 *
 * Implements weighted pipeline probability rollups, MEDDIC qualification validation,
 * stage gatekeeper policies, and deal stagnation alerts.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import { DealStage, ForecastCategory } from '../domain/enums.ts';
import type { Opportunity, Pipeline } from '../domain/types.ts';

export interface PipelineForecastRollup {
  pipelineId: string;
  pipelineName: string;
  totalDeals: number;
  totalPipelineValue: number;
  weightedForecastValue: number;
  committedValue: number;
  bestCaseValue: number;
  closedWonValue: number;
  closedLostValue: number;
  stageBreakdowns: {
    stage: DealStage;
    count: number;
    totalAmount: number;
    weightedAmount: number;
  }[];
}

export interface TransitionGateResult {
  allowed: boolean;
  blockers: string[];
  opportunity: Opportunity;
}

export class PipelineForecastingService {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Generates comprehensive weighted sales forecasts across an entire pipeline.
   */
  public generateForecast(pipelineId: string, tenantId: string): PipelineForecastRollup {
    const pipeline = this.db.pipelines.get(pipelineId);
    const pipelineName = pipeline ? pipeline.name : 'Direct Pipeline';

    let totalDeals = 0;
    let totalPipelineValue = 0;
    let weightedForecastValue = 0;
    let committedValue = 0;
    let bestCaseValue = 0;
    let closedWonValue = 0;
    let closedLostValue = 0;

    const stageMap = new Map<DealStage, { count: number; totalAmount: number; weightedAmount: number }>();

    for (const opp of this.db.opportunities.values()) {
      if (opp.tenantId !== tenantId || opp.pipelineId !== pipelineId || opp.isDeleted) continue;

      totalDeals++;
      totalPipelineValue += opp.amount;
      const weighted = (opp.amount * opp.probabilityPercentage) / 100;
      weightedForecastValue += weighted;

      if (opp.stage === DealStage.CLOSED_WON) {
        closedWonValue += opp.amount;
      } else if (opp.stage === DealStage.CLOSED_LOST) {
        closedLostValue += opp.amount;
      } else if (opp.forecastCategory === ForecastCategory.COMMIT) {
        committedValue += opp.amount;
      } else if (opp.forecastCategory === ForecastCategory.BEST_CASE) {
        bestCaseValue += opp.amount;
      }

      if (!stageMap.has(opp.stage)) {
        stageMap.set(opp.stage, { count: 0, totalAmount: 0, weightedAmount: 0 });
      }
      const entry = stageMap.get(opp.stage)!;
      entry.count++;
      entry.totalAmount += opp.amount;
      entry.weightedAmount += weighted;
    }

    const stageBreakdowns = Array.from(stageMap.entries()).map(([stage, stats]) => ({
      stage,
      count: stats.count,
      totalAmount: stats.totalAmount,
      weightedAmount: stats.weightedAmount
    }));

    return {
      pipelineId,
      pipelineName,
      totalDeals,
      totalPipelineValue,
      weightedForecastValue,
      committedValue,
      bestCaseValue,
      closedWonValue,
      closedLostValue,
      stageBreakdowns
    };
  }

  /**
   * Enforces MEDDIC qualification rules before permitting advancement into late-stage proposals or negotiations.
   */
  public validateStageTransition(
    opportunityId: string,
    targetStage: DealStage,
    actorId: string
  ): TransitionGateResult {
    const opp = this.db.opportunities.get(opportunityId);
    if (!opp) {
      throw new Error(`Opportunity not found with ID: ${opportunityId}`);
    }

    const blockers: string[] = [];

    // Stage Gate: Proposal or Negotiation requires completed MEDDIC criteria
    if (
      targetStage === DealStage.PROPOSAL_PRICE_QUOTE ||
      targetStage === DealStage.NEGOTIATION_REVIEW ||
      targetStage === DealStage.CLOSED_WON
    ) {
      if (!opp.meddic.economicBuyer || opp.meddic.economicBuyer.trim() === '') {
        blockers.push('MEDDIC: Identified Economic Buyer is required for Proposal/Negotiation stage.');
      }
      if (!opp.meddic.champion || opp.meddic.champion.trim() === '') {
        blockers.push('MEDDIC: Internal Champion is required before submitting formal price quotes.');
      }
      if (!opp.meddic.metrics || opp.meddic.metrics.trim() === '') {
        blockers.push('MEDDIC: Quantifiable ROI metrics must be documented.');
      }
    }

    // Gate: Closed Won requires at least 1 primary contact and positive amount
    if (targetStage === DealStage.CLOSED_WON) {
      if (opp.amount <= 0) {
        blockers.push('Opportunity amount must be greater than $0 to mark Closed Won.');
      }
      if (!opp.primaryContactId) {
        blockers.push('Primary decision-maker contact must be linked.');
      }
    }

    if (blockers.length === 0) {
      const now = new Date().toISOString();
      opp.stageHistory.push({
        fromStage: opp.stage,
        toStage: targetStage,
        changedAt: now,
        changedBy: actorId,
        durationInPreviousStageDays: opp.daysInCurrentStage
      });

      opp.stage = targetStage;
      opp.daysInCurrentStage = 0;
      opp.isStagnant = false;
      opp.updatedAt = now;
      opp.updatedBy = actorId;

      // Update probability and forecast category according to stage defaults
      if (targetStage === DealStage.CLOSED_WON) {
        opp.probabilityPercentage = 100;
        opp.forecastCategory = ForecastCategory.CLOSED;
      } else if (targetStage === DealStage.CLOSED_LOST) {
        opp.probabilityPercentage = 0;
        opp.forecastCategory = ForecastCategory.OMITTED;
      } else if (targetStage === DealStage.NEGOTIATION_REVIEW) {
        opp.probabilityPercentage = 90;
        opp.forecastCategory = ForecastCategory.COMMIT;
      } else if (targetStage === DealStage.PROPOSAL_PRICE_QUOTE) {
        opp.probabilityPercentage = 80;
        opp.forecastCategory = ForecastCategory.COMMIT;
      }
    }

    return {
      allowed: blockers.length === 0,
      blockers,
      opportunity: opp
    };
  }

  /**
   * Scans opportunities and flags deals that have remained in the same stage exceeding the threshold.
   */
  public flagStagnantDeals(tenantId: string, stagnationThresholdDays: number = 30): Opportunity[] {
    const stagnant: Opportunity[] = [];
    for (const opp of this.db.opportunities.values()) {
      if (opp.tenantId !== tenantId || opp.stage === DealStage.CLOSED_WON || opp.stage === DealStage.CLOSED_LOST) continue;

      if (opp.daysInCurrentStage >= stagnationThresholdDays) {
        opp.isStagnant = true;
        stagnant.push(opp);
      }
    }
    return stagnant;
  }
}
