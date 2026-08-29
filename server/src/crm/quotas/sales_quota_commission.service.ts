/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Sales Quota, Multi-Rep Split Commission & Accelerator Calculation Engine
 *
 * Implements enterprise compensation tiers, milestone accelerator brackets,
 * multi-owner opportunity split attribution, and 90-day churn clawback mechanics.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { Opportunity, User } from '../domain/types.ts';
import { DealStage } from '../domain/enums.ts';

export interface RepCompensationPlan {
  userId: string;
  userName: string;
  fiscalYear: number;
  annualQuotaTargetUSD: number;
  quarterlyQuotaTargetUSD: number;
  baseCommissionRatePercentage: number;
  acceleratorTiers: {
    tierName: string;
    minAttainmentPercentage: number;
    maxAttainmentPercentage: number;
    acceleratorMultiplier: number;
    effectiveCommissionRate: number;
  }[];
  activeDealsWonCount: number;
  closedWonRevenueYTD: number;
  totalCommissionsEarnedYTD: number;
  totalClawbacksYTD: number;
  netPayoutPendingUSD: number;
}

export interface DealCommissionBreakdown {
  opportunityId: string;
  opportunityName: string;
  closedAmount: number;
  splitPercentage: number;
  attributedAmount: number;
  attainmentPriorToDeal: number;
  attainmentPostDeal: number;
  effectiveCommissionRate: number;
  commissionEarnedUSD: number;
  clawbackGracePeriodEndsAt: string;
  isEligibleForPayout: boolean;
}

export class SalesQuotaCommissionService {
  private db: CRMDatabase;
  private compensationPlans: Map<string, RepCompensationPlan> = new Map();

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
    this.initializeStandardCompPlans();
  }

  private initializeStandardCompPlans(): void {
    const defaultReps = [
      { id: 'usr_marcus_vance', name: 'Marcus Vance', quota: 1800000 },
      { id: 'usr_alex_sterling', name: 'Alexandra Sterling', quota: 2500000 },
      { id: 'usr_sales_rep', name: 'Commercial AE', quota: 1200000 }
    ];

    for (const rep of defaultReps) {
      const annualQuota = rep.quota;
      const quarterlyQuota = Math.round(annualQuota / 4);

      const plan: RepCompensationPlan = {
        userId: rep.id,
        userName: rep.name,
        fiscalYear: 2026,
        annualQuotaTargetUSD: annualQuota,
        quarterlyQuotaTargetUSD: quarterlyQuota,
        baseCommissionRatePercentage: 8.0,
        acceleratorTiers: [
          {
            tierName: 'Baseline Tier (0% - 80% Quota)',
            minAttainmentPercentage: 0,
            maxAttainmentPercentage: 80,
            acceleratorMultiplier: 1.0,
            effectiveCommissionRate: 8.0
          },
          {
            tierName: 'Target Tier (80% - 100% Quota)',
            minAttainmentPercentage: 80,
            maxAttainmentPercentage: 100,
            acceleratorMultiplier: 1.25,
            effectiveCommissionRate: 10.0
          },
          {
            tierName: 'High Performer Accelerator (100% - 130% Quota)',
            minAttainmentPercentage: 100,
            maxAttainmentPercentage: 130,
            acceleratorMultiplier: 1.75,
            effectiveCommissionRate: 14.0
          },
          {
            tierName: 'President Club Elite Accelerator (>130% Quota)',
            minAttainmentPercentage: 130,
            maxAttainmentPercentage: 999,
            acceleratorMultiplier: 2.25,
            effectiveCommissionRate: 18.0
          }
        ],
        activeDealsWonCount: 0,
        closedWonRevenueYTD: 0,
        totalCommissionsEarnedYTD: 0,
        totalClawbacksYTD: 0,
        netPayoutPendingUSD: 0
      };

      this.compensationPlans.set(rep.id, plan);
    }
  }

  public getCompensationPlan(userId: string): RepCompensationPlan | undefined {
    return this.compensationPlans.get(userId);
  }

  /**
   * Calculates commission on a Closed Won deal with accelerator tier factoring.
   */
  public calculateDealCommission(params: {
    opportunityId: string;
    repUserId: string;
    splitPercentage?: number;
  }): DealCommissionBreakdown {
    const opp = this.db.opportunities.get(params.opportunityId);
    if (!opp) {
      throw new Error(`Opportunity not found: ${params.opportunityId}`);
    }

    const plan = this.compensationPlans.get(params.repUserId);
    if (!plan) {
      throw new Error(`Compensation plan not configured for rep: ${params.repUserId}`);
    }

    const split = params.splitPercentage !== undefined ? params.splitPercentage : 100;
    const attributedAmount = Math.round(opp.amount * (split / 100));

    const priorRevenue = plan.closedWonRevenueYTD;
    const newRevenue = priorRevenue + attributedAmount;

    const priorAttainmentPct = Math.round((priorRevenue / plan.annualQuotaTargetUSD) * 100);
    const postAttainmentPct = Math.round((newRevenue / plan.annualQuotaTargetUSD) * 100);

    // Determine applicable accelerator tier
    let effectiveRate = plan.baseCommissionRatePercentage;
    for (const tier of plan.acceleratorTiers) {
      if (postAttainmentPct >= tier.minAttainmentPercentage) {
        effectiveRate = tier.effectiveCommissionRate;
      }
    }

    const commissionEarnedUSD = Math.round(attributedAmount * (effectiveRate / 100));

    const graceDate = new Date();
    graceDate.setDate(graceDate.getDate() + 90);

    // Update Rep YTD Totals
    plan.activeDealsWonCount += 1;
    plan.closedWonRevenueYTD = newRevenue;
    plan.totalCommissionsEarnedYTD += commissionEarnedUSD;
    plan.netPayoutPendingUSD += commissionEarnedUSD;

    return {
      opportunityId: opp.id,
      opportunityName: opp.name,
      closedAmount: opp.amount,
      splitPercentage: split,
      attributedAmount,
      attainmentPriorToDeal: priorAttainmentPct,
      attainmentPostDeal: postAttainmentPct,
      effectiveCommissionRate: effectiveRate,
      commissionEarnedUSD,
      clawbackGracePeriodEndsAt: graceDate.toISOString(),
      isEligibleForPayout: true
    };
  }

  /**
   * Applies an automated clawback deduction if an enterprise deal cancels/churns within 90 days.
   */
  public applyDealClawback(opportunityId: string, repUserId: string, clawbackAmountUSD: number): void {
    const plan = this.compensationPlans.get(repUserId);
    if (!plan) {
      throw new Error(`Compensation plan not found for: ${repUserId}`);
    }

    plan.totalClawbacksYTD += clawbackAmountUSD;
    plan.netPayoutPendingUSD = Math.max(0, plan.netPayoutPendingUSD - clawbackAmountUSD);
  }

  public getLeaderboardSummary(): {
    userId: string;
    userName: string;
    annualQuotaTargetUSD: number;
    closedWonRevenueYTD: number;
    attainmentPercentage: number;
    totalCommissionsEarnedYTD: number;
    rank: number;
  }[] {
    const list = Array.from(this.compensationPlans.values()).map(p => {
      const attainmentPercentage = Math.round((p.closedWonRevenueYTD / p.annualQuotaTargetUSD) * 100);
      return {
        userId: p.userId,
        userName: p.userName,
        annualQuotaTargetUSD: p.annualQuotaTargetUSD,
        closedWonRevenueYTD: p.closedWonRevenueYTD,
        attainmentPercentage,
        totalCommissionsEarnedYTD: p.totalCommissionsEarnedYTD,
        rank: 1
      };
    });

    list.sort((a, b) => b.attainmentPercentage - a.attainmentPercentage);
    list.forEach((item, idx) => { item.rank = idx + 1; });

    return list;
  }
}
