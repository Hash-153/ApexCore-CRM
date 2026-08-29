/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Sales Territory Management & Geographic Lead Routing Engine
 *
 * Implements intelligent territory assignment, round-robin capacity balancing,
 * postal code spatial mapping, and enterprise account realignment algorithms.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { Customer, Lead, Opportunity, User } from '../domain/types.ts';
import { LeadStatus, UserRole } from '../domain/enums.ts';

export interface TerritoryDefinition {
  id: string;
  name: string;
  code: string;
  region: 'NORTH_AMERICA' | 'EMEA' | 'APAC' | 'LATAM' | 'GLOBAL';
  countries: string[];
  statesOrProvinces: string[];
  postalCodePrefixes: string[];
  industrySpecializations: string[];
  minAnnualRevenue: number;
  maxAnnualRevenue: number;
  assignedSalesManagerId: string;
  assignedSalesManagerName: string;
  primaryAccountExecutives: {
    userId: string;
    userName: string;
    capacityWeight: number;
    currentLeadCount: number;
    maxActiveLeads: number;
    skills: string[];
  }[];
  secondarySupportAgents: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TerritoryAssignmentResult {
  territoryId: string;
  territoryName: string;
  assignedRepId: string;
  assignedRepName: string;
  routingRuleMatched: string;
  score: number;
  timestamp: string;
  isCapacityOverride: boolean;
}

export class TerritoryManagementService {
  private db: CRMDatabase;
  private territories: Map<string, TerritoryDefinition> = new Map();
  private roundRobinIndices: Map<string, number> = new Map();

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
    this.initializeDefaultTerritories();
  }

  private initializeDefaultTerritories(): void {
    const now = new Date().toISOString();

    const northAmericaEnterprise: TerritoryDefinition = {
      id: 'terr_na_enterprise_01',
      name: 'North America Major Enterprise (East & Central)',
      code: 'TERR-NA-ENT-EAST',
      region: 'NORTH_AMERICA',
      countries: ['US', 'CA'],
      statesOrProvinces: ['NY', 'MA', 'NJ', 'PA', 'IL', 'OH', 'MI', 'GA', 'FL', 'ON', 'QC'],
      postalCodePrefixes: ['10', '11', '02', '19', '60', '30', '33'],
      industrySpecializations: ['ENTERPRISE_SOFTWARE', 'FINANCIAL_SERVICES_FINTECH', 'HEALTHCARE_MEDTECH'],
      minAnnualRevenue: 50000000,
      maxAnnualRevenue: 10000000000,
      assignedSalesManagerId: 'usr_sales_manager',
      assignedSalesManagerName: 'Jonathan Holloway',
      primaryAccountExecutives: [
        {
          userId: 'usr_marcus_vance',
          userName: 'Marcus Vance',
          capacityWeight: 1.5,
          currentLeadCount: 8,
          maxActiveLeads: 25,
          skills: ['MEDDIC', 'FINTECH', 'ENTERPRISE_SECURITY']
        },
        {
          userId: 'usr_alex_sterling',
          userName: 'Alexandra Sterling',
          capacityWeight: 1.0,
          currentLeadCount: 4,
          maxActiveLeads: 20,
          skills: ['HEALTHCARE', 'CPQ_ARCH', 'EXECUTIVE_NEGOTIATION']
        }
      ],
      secondarySupportAgents: ['usr_support_agent'],
      isActive: true,
      createdAt: now,
      updatedAt: now
    };

    const northAmericaWest: TerritoryDefinition = {
      id: 'terr_na_west_tech_02',
      name: 'North America West & Pacific Innovation Corridor',
      code: 'TERR-NA-WEST-TECH',
      region: 'NORTH_AMERICA',
      countries: ['US', 'CA'],
      statesOrProvinces: ['CA', 'WA', 'OR', 'CO', 'TX', 'UT', 'BC'],
      postalCodePrefixes: ['94', '95', '98', '97', '80', '78', '84'],
      industrySpecializations: ['ENTERPRISE_SOFTWARE', 'ARTIFICIAL_INTELLIGENCE', 'CLOUD_INFRASTRUCTURE'],
      minAnnualRevenue: 20000000,
      maxAnnualRevenue: 10000000000,
      assignedSalesManagerId: 'usr_sales_manager',
      assignedSalesManagerName: 'Jonathan Holloway',
      primaryAccountExecutives: [
        {
          userId: 'usr_marcus_vance',
          userName: 'Marcus Vance',
          capacityWeight: 1.2,
          currentLeadCount: 10,
          maxActiveLeads: 25,
          skills: ['AI_SOLUTIONS', 'DEVELOPER_TOOLS', 'B2B_SAAS']
        }
      ],
      secondarySupportAgents: ['usr_support_agent'],
      isActive: true,
      createdAt: now,
      updatedAt: now
    };

    const emeaStrategic: TerritoryDefinition = {
      id: 'terr_emea_strategic_03',
      name: 'EMEA Strategic Accounts (UK, DACH, Nordics)',
      code: 'TERR-EMEA-STRAT',
      region: 'EMEA',
      countries: ['GB', 'DE', 'CH', 'NL', 'SE', 'FR', 'IE'],
      statesOrProvinces: ['London', 'Bavaria', 'Zurich', 'Stockholm', 'Ile-de-France'],
      postalCodePrefixes: ['EC', 'WC', 'SW', '80', '10', '75'],
      industrySpecializations: ['FINANCIAL_SERVICES_FINTECH', 'LOGISTICS_SUPPLY_CHAIN', 'MANUFACTURING'],
      minAnnualRevenue: 30000000,
      maxAnnualRevenue: 10000000000,
      assignedSalesManagerId: 'usr_sales_manager',
      assignedSalesManagerName: 'Jonathan Holloway',
      primaryAccountExecutives: [
        {
          userId: 'usr_marcus_vance',
          userName: 'Marcus Vance',
          capacityWeight: 1.0,
          currentLeadCount: 5,
          maxActiveLeads: 20,
          skills: ['GDPR_COMPLIANCE', 'CROSS_BORDER_TRADE', 'CURRENCY_CPQ']
        }
      ],
      secondarySupportAgents: ['usr_support_agent'],
      isActive: true,
      createdAt: now,
      updatedAt: now
    };

    const apacCommercial: TerritoryDefinition = {
      id: 'terr_apac_commercial_04',
      name: 'APAC Growth Markets (Singapore, Australia, Japan)',
      code: 'TERR-APAC-GROWTH',
      region: 'APAC',
      countries: ['SG', 'AU', 'JP', 'NZ', 'KR', 'IN'],
      statesOrProvinces: ['NSW', 'VIC', 'Tokyo', 'Singapore', 'Maharashtra'],
      postalCodePrefixes: ['20', '30', '10', '01', '40'],
      industrySpecializations: ['RETAIL_ECOMMERCE', 'TELECOMMUNICATIONS', 'FINANCIAL_SERVICES_FINTECH'],
      minAnnualRevenue: 10000000,
      maxAnnualRevenue: 10000000000,
      assignedSalesManagerId: 'usr_sales_manager',
      assignedSalesManagerName: 'Jonathan Holloway',
      primaryAccountExecutives: [
        {
          userId: 'usr_marcus_vance',
          userName: 'Marcus Vance',
          capacityWeight: 1.0,
          currentLeadCount: 3,
          maxActiveLeads: 15,
          skills: ['APAC_LOCALIZATION', 'RETAIL_TECH', 'PAYMENT_GATEWAYS']
        }
      ],
      secondarySupportAgents: ['usr_support_agent'],
      isActive: true,
      createdAt: now,
      updatedAt: now
    };

    this.territories.set(northAmericaEnterprise.id, northAmericaEnterprise);
    this.territories.set(northAmericaWest.id, northAmericaWest);
    this.territories.set(emeaStrategic.id, emeaStrategic);
    this.territories.set(apacCommercial.id, apacCommercial);
  }

  public getTerritories(): TerritoryDefinition[] {
    return Array.from(this.territories.values()).filter(t => t.isActive);
  }

  public getTerritoryById(id: string): TerritoryDefinition | undefined {
    return this.territories.get(id);
  }

  public createTerritory(territory: Omit<TerritoryDefinition, 'id' | 'createdAt' | 'updatedAt'>): TerritoryDefinition {
    const id = `terr_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const now = new Date().toISOString();
    const newTerritory: TerritoryDefinition = {
      ...territory,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.territories.set(id, newTerritory);
    return newTerritory;
  }

  public updateTerritory(id: string, updates: Partial<TerritoryDefinition>): TerritoryDefinition {
    const existing = this.territories.get(id);
    if (!existing) {
      throw new Error(`Territory not found with ID: ${id}`);
    }
    const updated: TerritoryDefinition = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.territories.set(id, updated);
    return updated;
  }

  public deleteTerritory(id: string): boolean {
    const existing = this.territories.get(id);
    if (!existing) return false;
    existing.isActive = false;
    existing.updatedAt = new Date().toISOString();
    return true;
  }

  public assignLeadToTerritory(lead: Lead): TerritoryAssignmentResult {
    const country = (lead.country || 'US').toUpperCase();
    const state = (lead.state || '').toUpperCase();
    const revenue = lead.annualRevenue || 0;
    const industry = (lead.industry || '').toUpperCase();
    const postal = (lead.postalCode || '').trim();

    let bestTerritory: TerritoryDefinition | null = null;
    let highestScore = -1;
    let matchedRule = 'DEFAULT_FALLBACK';

    for (const territory of this.territories.values()) {
      if (!territory.isActive) continue;

      let score = 0;

      // 1. Country match
      if (territory.countries.includes(country)) {
        score += 40;
      }

      // 2. State / Province match
      if (state && territory.statesOrProvinces.includes(state)) {
        score += 30;
      }

      // 3. Postal prefix match
      if (postal && territory.postalCodePrefixes.some(pfx => postal.startsWith(pfx))) {
        score += 25;
      }

      // 4. Industry Specialization
      if (industry && territory.industrySpecializations.includes(industry)) {
        score += 20;
      }

      // 5. Revenue bracket
      if (revenue >= territory.minAnnualRevenue && revenue <= territory.maxAnnualRevenue) {
        score += 15;
      }

      if (score > highestScore) {
        highestScore = score;
        bestTerritory = territory;
        matchedRule = `MATCH_SCORE_${score}_COUNTRY_${country}`;
      }
    }

    if (!bestTerritory) {
      bestTerritory = Array.from(this.territories.values())[0];
      matchedRule = 'FALLBACK_PRIMARY_TERRITORY';
    }

    // Select Account Executive using Weighted Round-Robin with capacity checking
    const assignedRep = this.selectNextAvailableRep(bestTerritory);

    // Update lead record
    lead.ownerId = assignedRep.userId;
    lead.ownerName = assignedRep.userName;
    lead.updatedAt = new Date().toISOString();

    return {
      territoryId: bestTerritory.id,
      territoryName: bestTerritory.name,
      assignedRepId: assignedRep.userId,
      assignedRepName: assignedRep.userName,
      routingRuleMatched: matchedRule,
      score: highestScore,
      timestamp: new Date().toISOString(),
      isCapacityOverride: assignedRep.currentLeadCount >= assignedRep.maxActiveLeads
    };
  }

  private selectNextAvailableRep(territory: TerritoryDefinition): { userId: string; userName: string; currentLeadCount: number; maxActiveLeads: number } {
    const reps = territory.primaryAccountExecutives;
    if (!reps || reps.length === 0) {
      return {
        userId: territory.assignedSalesManagerId,
        userName: territory.assignedSalesManagerName,
        currentLeadCount: 0,
        maxActiveLeads: 100
      };
    }

    // Filter available reps under capacity
    const availableReps = reps.filter(r => r.currentLeadCount < r.maxActiveLeads);
    const candidateReps = availableReps.length > 0 ? availableReps : reps;

    const currentIndex = this.roundRobinIndices.get(territory.id) || 0;
    const nextIndex = (currentIndex + 1) % candidateReps.length;
    this.roundRobinIndices.set(territory.id, nextIndex);

    const selected = candidateReps[currentIndex % candidateReps.length];
    selected.currentLeadCount += 1;

    return selected;
  }

  public calculateTerritoryQuotaAttainment(territoryId: string): {
    territoryId: string;
    territoryName: string;
    totalOpportunitiesCount: number;
    closedWonAmount: number;
    pipelineWeightedAmount: number;
    quotaTarget: number;
    attainmentPercentage: number;
  } {
    const territory = this.territories.get(territoryId);
    if (!territory) {
      throw new Error(`Territory not found: ${territoryId}`);
    }

    const assignedRepIds = new Set(territory.primaryAccountExecutives.map(r => r.userId));
    let closedWonAmount = 0;
    let pipelineWeightedAmount = 0;
    let totalCount = 0;

    for (const opp of this.db.opportunities.values()) {
      if (assignedRepIds.has(opp.ownerId)) {
        totalCount++;
        if (opp.stage === 'CLOSED_WON') {
          closedWonAmount += opp.amount;
        } else if (opp.stage !== 'CLOSED_LOST') {
          pipelineWeightedAmount += opp.amount * (opp.probabilityPercentage / 100);
        }
      }
    }

    const quotaTarget = territory.primaryAccountExecutives.length * 1500000;
    const attainmentPercentage = quotaTarget > 0 ? Math.round((closedWonAmount / quotaTarget) * 100) : 0;

    return {
      territoryId: territory.id,
      territoryName: territory.name,
      totalOpportunitiesCount: totalCount,
      closedWonAmount,
      pipelineWeightedAmount: Math.round(pipelineWeightedAmount),
      quotaTarget,
      attainmentPercentage
    };
  }
}
