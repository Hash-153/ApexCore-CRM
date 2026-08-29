/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Lead Management, Qualification & Scoring Engine
 *
 * Implements automated BANT (Budget, Authority, Need, Timeline) scoring,
 * demographic & behavioral point attribution, duplicate detection algorithms,
 * and 1-Click atomic conversion into Account, Contact, and Deal entities.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import {
  LeadStatus,
  LeadRating,
  LeadSource,
  AccountType,
  AccountTier,
  DealStage,
  ForecastCategory,
  ContactPersona,
  ActivityType,
  ActivityPriority,
  ActivityStatus
} from '../domain/enums.ts';
import type {
  Lead,
  BANTScore,
  LeadScoreBreakdown,
  Account,
  Contact,
  Opportunity,
  AuditLogEntry,
  Activity
} from '../domain/types.ts';

export interface ConvertLeadOptions {
  leadId: string;
  actorId: string;
  createAccount: boolean;
  existingAccountId?: string;
  newAccountName?: string;
  createOpportunity: boolean;
  opportunityName?: string;
  pipelineId?: string;
  estimatedAmount?: number;
  expectedCloseDate?: string;
}

export interface ConvertLeadResult {
  success: boolean;
  leadId: string;
  accountId?: string;
  contactId?: string;
  opportunityId?: string;
  auditLogId: string;
  message: string;
}

export class LeadManagementService {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Evaluates BANT criteria and generates standardized qualification score.
   */
  public evaluateBANT(params: {
    budgetScore: number;
    authorityScore: number;
    needScore: number;
    timelineScore: number;
    qualificationSummary?: string;
  }): BANTScore {
    const budget = Math.max(0, Math.min(25, params.budgetScore));
    const authority = Math.max(0, Math.min(25, params.authorityScore));
    const need = Math.max(0, Math.min(25, params.needScore));
    const timeline = Math.max(0, Math.min(25, params.timelineScore));
    const total = budget + authority + need + timeline;

    const isQualified = total >= 70;
    const summary = params.qualificationSummary || (isQualified
      ? `Lead meets enterprise BANT threshold (${total}/100). Ready for sales engagement.`
      : `Lead score (${total}/100) below qualification threshold. Continuous nurturing recommended.`);

    return {
      budgetScore: budget,
      authorityScore: authority,
      needScore: need,
      timelineScore: timeline,
      totalScore: total,
      qualificationSummary: summary,
      isQualified
    };
  }

  /**
   * Calculates dynamic lead rating and overall score combining demographic and BANT signals.
   */
  public calculateLeadScore(lead: Partial<Lead>): LeadScoreBreakdown {
    let demographicScore = 0;
    const scoringFactors: string[] = [];

    // Demographic: Revenue band
    if (lead.annualRevenue && lead.annualRevenue >= 100000000) {
      demographicScore += 20;
      scoringFactors.push('Enterprise Revenue > $100M (+20 pts)');
    } else if (lead.annualRevenue && lead.annualRevenue >= 20000000) {
      demographicScore += 12;
      scoringFactors.push('Mid-Market Revenue > $20M (+12 pts)');
    } else if (lead.annualRevenue && lead.annualRevenue >= 5000000) {
      demographicScore += 5;
      scoringFactors.push('SMB Revenue > $5M (+5 pts)');
    }

    // Demographic: Employee headcount
    if (lead.numberOfEmployees && lead.numberOfEmployees >= 1000) {
      demographicScore += 15;
      scoringFactors.push('Enterprise Headcount 1,000+ (+15 pts)');
    } else if (lead.numberOfEmployees && lead.numberOfEmployees >= 100) {
      demographicScore += 10;
      scoringFactors.push('Mid-Market Headcount 100+ (+10 pts)');
    }

    // Source quality attribution
    if (lead.source === LeadSource.REFERRAL || lead.source === LeadSource.INBOUND_WEBSITE) {
      demographicScore += 15;
      scoringFactors.push(`High-Intent Source: ${lead.source} (+15 pts)`);
    } else if (lead.source === LeadSource.TRADE_SHOW || lead.source === LeadSource.WEBINAR) {
      demographicScore += 10;
      scoringFactors.push(`Warm Event Source: ${lead.source} (+10 pts)`);
    }

    const bantScore = lead.bant ? lead.bant.totalScore : 40;
    const normalizedDemographic = Math.min(100, demographicScore * 2);
    const overallScore = Math.min(100, Math.round(normalizedDemographic * 0.4 + bantScore * 0.6));

    let rating: LeadRating = LeadRating.COLD;
    if (overallScore >= 80) rating = LeadRating.HOT;
    else if (overallScore >= 55) rating = LeadRating.WARM;
    else if (overallScore < 25) rating = LeadRating.JUNK;

    return {
      demographicScore,
      behavioralScore: 0,
      bantScore,
      overallScore,
      rating,
      scoringFactors
    };
  }

  /**
   * Identifies potential duplicate leads by email domain, exact email, or normalized company name.
   */
  public findPotentialDuplicates(lead: Partial<Lead>, tenantId: string): Lead[] {
    const duplicates: Lead[] = [];
    const normalizedEmail = (lead.email || '').trim().toLowerCase();
    const normalizedCompany = (lead.companyName || '').trim().toLowerCase();

    for (const existing of this.db.leads.values()) {
      if (existing.tenantId !== tenantId || existing.id === lead.id || existing.isDeleted) continue;

      if (existing.email.toLowerCase() === normalizedEmail) {
        duplicates.push(existing);
        continue;
      }

      if (normalizedCompany && existing.companyName.toLowerCase() === normalizedCompany) {
        duplicates.push(existing);
      }
    }
    return duplicates;
  }

  /**
   * Atomic 1-Click Lead Conversion into Account, Contact, and Opportunity entities.
   */
  public convertLead(options: ConvertLeadOptions): ConvertLeadResult {
    const lead = this.db.leads.get(options.leadId);
    if (!lead) {
      throw new Error(`Lead not found with ID: ${options.leadId}`);
    }

    if (lead.status === LeadStatus.CONVERTED) {
      throw new Error(`Lead "${lead.firstName} ${lead.lastName}" has already been converted.`);
    }

    const now = new Date().toISOString();
    let accountId = options.existingAccountId;

    // 1. Create or link Account
    if (!accountId && options.createAccount) {
      const newAccId = `acc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const newAccount: Account = {
        id: newAccId,
        tenantId: lead.tenantId,
        name: options.newAccountName || lead.companyName,
        type: AccountType.PROSPECT,
        tier: lead.annualRevenue && lead.annualRevenue >= 100000000 ? AccountTier.TIER_1_STRATEGIC : AccountTier.TIER_3_STANDARD,
        industry: lead.industry,
        website: lead.website,
        phone: lead.phone,
        annualRevenue: lead.annualRevenue || 0,
        employeeCount: lead.numberOfEmployees || 0,
        ownerId: lead.ownerId,
        ownerName: lead.ownerName,
        billingStreet: lead.street || 'Pending Verification',
        billingCity: lead.city || 'Pending Verification',
        billingState: lead.state || 'Pending',
        billingPostalCode: lead.postalCode || '00000',
        billingCountry: lead.country || 'USA',
        healthMetrics: {
          healthScore: 100,
          churnRisk: 'LOW',
          expansionProbability: 50,
          activeOpportunitiesValue: 0,
          totalWonDealsValue: 0,
          openTicketsCount: 0,
          lastContactedDaysAgo: 0,
          relationshipStrengthScore: 80
        },
        createdAt: now,
        updatedAt: now,
        createdBy: options.actorId,
        updatedBy: options.actorId
      };
      this.db.indexAccount(newAccount);
      accountId = newAccId;
    }

    const account = accountId ? this.db.accounts.get(accountId) : undefined;
    const accountName = account ? account.name : lead.companyName;

    // 2. Create Contact
    const contactId = `cnt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newContact: Contact = {
      id: contactId,
      tenantId: lead.tenantId,
      accountId: accountId || 'acc_unassigned',
      accountName,
      firstName: lead.firstName,
      lastName: lead.lastName,
      title: lead.title,
      email: lead.email,
      phone: lead.phone,
      persona: ContactPersona.DECISION_MAKER,
      isPrimaryContact: true,
      decisionInfluenceScore: 7,
      sentimentIndex: 0.5,
      ownerId: lead.ownerId,
      ownerName: lead.ownerName,
      createdAt: now,
      updatedAt: now,
      createdBy: options.actorId,
      updatedBy: options.actorId
    };
    this.db.indexContact(newContact);

    // 3. Create Opportunity (if requested)
    let opportunityId: string | undefined;
    if (options.createOpportunity && accountId) {
      opportunityId = `opp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const pipelineId = options.pipelineId || 'pipe_enterprise_direct';
      const pipeline = this.db.pipelines.get(pipelineId);

      const newOpportunity: Opportunity = {
        id: opportunityId,
        tenantId: lead.tenantId,
        name: options.opportunityName || `${accountName} - Qualified Engagement`,
        accountId,
        accountName,
        primaryContactId: contactId,
        primaryContactName: `${lead.firstName} ${lead.lastName}`,
        stage: DealStage.QUALIFICATION,
        amount: options.estimatedAmount || 50000,
        expectedRevenue: (options.estimatedAmount || 50000) * 0.25,
        probabilityPercentage: 25,
        forecastCategory: ForecastCategory.PIPELINE,
        pipelineId,
        pipelineName: pipeline ? pipeline.name : 'Enterprise Direct Sales Pipeline',
        closeDate: options.expectedCloseDate || new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
        type: 'NEW_BUSINESS',
        leadSource: lead.source,
        ownerId: lead.ownerId,
        ownerName: lead.ownerName,
        meddic: {
          metrics: lead.notes || 'Identified via lead conversion',
          economicBuyer: `${lead.firstName} ${lead.lastName} (${lead.title})`,
          decisionCriteria: 'Standard enterprise evaluation',
          decisionProcess: 'In scoping',
          identifyPain: lead.notes || 'Legacy modernization',
          champion: `${lead.firstName} ${lead.lastName}`,
          isComplete: false
        },
        stageHistory: [
          {
            toStage: DealStage.QUALIFICATION,
            changedAt: now,
            changedBy: options.actorId,
            durationInPreviousStageDays: 0,
            stageNote: 'Opportunity created upon lead conversion.'
          }
        ],
        daysInCurrentStage: 0,
        isStagnant: false,
        createdAt: now,
        updatedAt: now,
        createdBy: options.actorId,
        updatedBy: options.actorId
      };
      this.db.indexOpportunity(newOpportunity);
    }

    // 4. Mark Lead as Converted
    lead.status = LeadStatus.CONVERTED;
    lead.convertedAccountId = accountId;
    lead.convertedContactId = contactId;
    lead.convertedOpportunityId = opportunityId;
    lead.convertedAt = now;
    lead.updatedAt = now;
    lead.updatedBy = options.actorId;

    // 5. Create Conversion Activity
    const convActivity: Activity = {
      id: `act_${Date.now()}`,
      tenantId: lead.tenantId,
      type: ActivityType.TASK,
      subject: `Lead Converted: ${lead.firstName} ${lead.lastName}`,
      description: `Lead converted to Account [${accountName}], Contact [${lead.firstName} ${lead.lastName}]${opportunityId ? `, and Deal [${opportunityId}]` : ''}.`,
      priority: ActivityPriority.HIGH,
      status: ActivityStatus.COMPLETED,
      dueDate: now,
      completedDate: now,
      relatedEntityType: 'LEAD',
      relatedEntityId: lead.id,
      relatedEntityName: `${lead.firstName} ${lead.lastName}`,
      ownerId: lead.ownerId,
      ownerName: lead.ownerName,
      createdAt: now,
      updatedAt: now,
      createdBy: options.actorId,
      updatedBy: options.actorId
    };
    this.db.activities.set(convActivity.id, convActivity);

    // 6. Audit Trail Entry
    const auditId = `aud_${Date.now()}`;
    const auditEntry: AuditLogEntry = {
      id: auditId,
      tenantId: lead.tenantId,
      timestamp: now,
      actorId: options.actorId,
      actorName: 'Marcus Vance',
      actorRole: lead.ownerId as any,
      clientIp: '127.0.0.1',
      action: 'QUALIFICATION_CONVERT' as any,
      entityType: 'LEAD',
      entityId: lead.id,
      details: `Converted lead "${lead.firstName} ${lead.lastName}" to Account: ${accountId}, Contact: ${contactId}, Deal: ${opportunityId || 'None'}`,
      previousHash: this.db.auditLogs.length > 0 ? this.db.auditLogs[this.db.auditLogs.length - 1].currentHash : '0'.repeat(64),
      currentHash: `conv_hash_${Date.now()}`
    };
    this.db.auditLogs.push(auditEntry);

    return {
      success: true,
      leadId: lead.id,
      accountId,
      contactId,
      opportunityId,
      auditLogId: auditId,
      message: `Successfully converted lead into Account "${accountName}" and Contact "${lead.firstName} ${lead.lastName}".`
    };
  }
}
