/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Algorithmic Deal Coaching & Next-Best-Action (NBA) Suggestion Engine
 *
 * Evaluates opportunity progression roadblocks, competitor vulnerability traps,
 * buying committee champion gaps, and generates situational sales playbooks.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { Opportunity } from '../domain/types.ts';
import { DealStage } from '../domain/enums.ts';

export interface DealCoachingGuidance {
  opportunityId: string;
  opportunityName: string;
  stage: DealStage;
  healthStatus: 'STRONG_POSITION' | 'AT_RISK_NEEDS_COACHING' | 'STALLED_CRITICAL';
  stageReadinessScore: number; // 0-100
  nextBestActions: {
    sequenceNumber: number;
    actionTitle: string;
    description: string;
    suggestedStakeholderTarget: string;
    expectedImpact: string;
  }[];
  competitorTrapWarning?: {
    competitorName: string;
    competitorVulnerability: string;
    recommendedCounterStrategy: string;
    suggestedBattlecardAsset: string;
  };
  recommendedClosingTactics: string[];
}

export class DealCoachingAIEngine {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Evaluates deal mechanics and produces tactical coaching advice for sales reps.
   */
  public generateCoachingPlan(opportunityId: string): DealCoachingGuidance {
    const opp = this.db.opportunities.get(opportunityId);
    if (!opp) {
      throw new Error(`Opportunity not found: ${opportunityId}`);
    }

    const actions: DealCoachingGuidance['nextBestActions'] = [];
    const closingTactics: string[] = [];
    let readinessScore = 75;
    let health: DealCoachingGuidance['healthStatus'] = 'STRONG_POSITION';

    // 1. Evaluate MEDDIC Gaps
    if (!opp.meddic || opp.meddic.scorePercentage < 70) {
      readinessScore -= 25;
      health = 'AT_RISK_NEEDS_COACHING';

      actions.push({
        sequenceNumber: 1,
        actionTitle: 'Lock in Economic Buyer Discovery Session',
        description: 'No verified budget holder confirmed on deal. Schedule a 30-minute discovery session with VP/CFO to validate budget authorization path.',
        suggestedStakeholderTarget: 'Chief Information Officer (CIO) / CFO',
        expectedImpact: 'Prevents deal freeze in Legal & Procurement stages.'
      });

      actions.push({
        sequenceNumber: 2,
        actionTitle: 'Formally Document Identified Pain & Metrics',
        description: 'Quantify current business impact into dollar metrics (e.g. $450k lost productivity) to anchor value proposition.',
        suggestedStakeholderTarget: 'Internal Champion / VP Engineering',
        expectedImpact: 'Accelerates business case justification.'
      });
    }

    // 2. Evaluate Stage-Specific Playbooks
    if (opp.stage === DealStage.PROPOSAL_PRICE_QUOTE) {
      actions.push({
        sequenceNumber: actions.length + 1,
        actionTitle: 'Schedule CPQ Walkthrough with Financial Decision Maker',
        description: 'Walk through multi-year term options (3-year 12% discount) directly with Procurement to anchor ROI.',
        suggestedStakeholderTarget: 'Head of Procurement',
        expectedImpact: 'Reduces negotiation cycle time by 40%.'
      });
      closingTactics.push(
        'Offer 3-year price lock incentive with Year 1 payment deferral terms.',
        'Bundle 24/7 Platinum SLA Support at 50% discount to secure quarterly close.'
      );
    } else if (opp.stage === DealStage.NEGOTIATION_REVIEW) {
      actions.push({
        sequenceNumber: actions.length + 1,
        actionTitle: 'Engage Legal Team for Parallel Contract Redline',
        description: 'Initiate redline review of Master Services Agreement (MSA) and Data Protection Addendum (DPA) simultaneously with security review.',
        suggestedStakeholderTarget: 'Corporate Legal Counsel',
        expectedImpact: 'Eliminates 2-week serial review delay.'
      });
      closingTactics.push(
        'Executive Sponsor-to-Executive Sponsor close call (CEO to CEO alignment).',
        'End-of-quarter incentive expiration date stipulation.'
      );
    }

    // 3. Stagnation checks
    if (opp.daysInCurrentStage && opp.daysInCurrentStage > 45) {
      health = 'STALLED_CRITICAL';
      readinessScore = Math.max(10, readinessScore - 30);
      actions.unshift({
        sequenceNumber: 0,
        actionTitle: 'Immediate Deal Re-Qualification & Stalled Account Protocol',
        description: `Deal has remained in ${opp.stage} for ${opp.daysInCurrentStage} days. Re-verify if project funding was deferred or champion departed.`,
        suggestedStakeholderTarget: 'Primary Champion',
        expectedImpact: 'Identifies silent deal loss before quarter end.'
      });
    }

    return {
      opportunityId: opp.id,
      opportunityName: opp.name,
      stage: opp.stage,
      healthStatus: health,
      stageReadinessScore: Math.max(15, readinessScore),
      nextBestActions: actions,
      competitorTrapWarning: {
        competitorName: 'Legacy Monolith CRM Inc.',
        competitorVulnerability: 'High annual maintenance cost, inflexible data schemas, and slow API throughput.',
        recommendedCounterStrategy: 'Highlight ApexCore zero-dependency performance, native REST speed, and 5-role clean architecture.',
        suggestedBattlecardAsset: 'DOC_BATTLECARD_LEGACY_CRM_DISPLACEMENT_2026.pdf'
      },
      recommendedClosingTactics: closingTactics.length > 0 ? closingTactics : ['Maintain weekly stakeholder pulse meetings.']
    };
  }
}
