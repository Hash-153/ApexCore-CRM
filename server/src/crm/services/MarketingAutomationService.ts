/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Marketing Campaign ROI & Multi-Touch Attribution Engine
 *
 * Implements First-Touch, Last-Touch, Linear, and Time-Decay revenue attribution
 * models across omnichannel touchpoints and calculates true campaign ROI.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { Campaign, CampaignMember } from '../domain/types.ts';

export interface MultiTouchAttributionReport {
  dealId: string;
  dealName: string;
  totalDealAmount: number;
  attributionModel: 'FIRST_TOUCH' | 'LAST_TOUCH' | 'LINEAR' | 'TIME_DECAY';
  attributedCampaigns: {
    campaignId: string;
    campaignName: string;
    touchpointWeight: number; // 0.0 to 1.0
    attributedRevenue: number;
  }[];
}

export class MarketingAutomationService {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Evaluates Multi-Touch Revenue Attribution across touchpoints for a closed opportunity.
   */
  public calculateAttribution(
    opportunityId: string,
    model: 'FIRST_TOUCH' | 'LAST_TOUCH' | 'LINEAR' | 'TIME_DECAY' = 'LINEAR'
  ): MultiTouchAttributionReport {
    const opp = this.db.opportunities.get(opportunityId);
    if (!opp) {
      throw new Error(`Opportunity not found: ${opportunityId}`);
    }

    const campaigns = Array.from(this.db.campaigns.values()).filter(c => c.tenantId === opp.tenantId);
    if (campaigns.length === 0) {
      return {
        dealId: opp.id,
        dealName: opp.name,
        totalDealAmount: opp.amount,
        attributionModel: model,
        attributedCampaigns: []
      };
    }

    const count = campaigns.length;
    const attributedCampaigns: {
      campaignId: string;
      campaignName: string;
      touchpointWeight: number;
      attributedRevenue: number;
    }[] = [];

    if (model === 'FIRST_TOUCH') {
      attributedCampaigns.push({
        campaignId: campaigns[0].id,
        campaignName: campaigns[0].name,
        touchpointWeight: 1.0,
        attributedRevenue: opp.amount
      });
    } else if (model === 'LAST_TOUCH') {
      attributedCampaigns.push({
        campaignId: campaigns[count - 1].id,
        campaignName: campaigns[count - 1].name,
        touchpointWeight: 1.0,
        attributedRevenue: opp.amount
      });
    } else if (model === 'LINEAR') {
      const weight = 1 / count;
      const rev = Math.round((opp.amount / count) * 100) / 100;
      for (const cmp of campaigns) {
        attributedCampaigns.push({
          campaignId: cmp.id,
          campaignName: cmp.name,
          touchpointWeight: Math.round(weight * 1000) / 1000,
          attributedRevenue: rev
        });
      }
    } else {
      // TIME_DECAY: Exponential weighting
      let totalWeight = 0;
      const rawWeights = campaigns.map((_, idx) => {
        const w = Math.pow(2, idx);
        totalWeight += w;
        return w;
      });

      campaigns.forEach((cmp, idx) => {
        const normalizedWeight = rawWeights[idx] / totalWeight;
        attributedCampaigns.push({
          campaignId: cmp.id,
          campaignName: cmp.name,
          touchpointWeight: Math.round(normalizedWeight * 1000) / 1000,
          attributedRevenue: Math.round(opp.amount * normalizedWeight * 100) / 100
        });
      });
    }

    return {
      dealId: opp.id,
      dealName: opp.name,
      totalDealAmount: opp.amount,
      attributionModel: model,
      attributedCampaigns
    };
  }

  /**
   * Recalculates Campaign ROI percentage.
   */
  public updateCampaignROI(campaignId: string, additionalWonRevenue: number): Campaign {
    const cmp = this.db.campaigns.get(campaignId);
    if (!cmp) {
      throw new Error(`Campaign not found: ${campaignId}`);
    }

    cmp.actualRevenueWon += additionalWonRevenue;
    if (cmp.actualCost > 0) {
      cmp.roiPercentage = Math.round(((cmp.actualRevenueWon - cmp.actualCost) / cmp.actualCost) * 10000) / 100;
    }
    cmp.updatedAt = new Date().toISOString();
    return cmp;
  }
}
