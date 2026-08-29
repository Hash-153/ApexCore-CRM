/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Enterprise Seeder Dataset & Initializer
 *
 * Populates realistic enterprise B2B accounts, sales reps, BANT qualified leads,
 * multi-pipeline deals with MEDDIC attributes, CPQ catalogs, SLA helpdesk tickets,
 * marketing campaigns, visual workflow rules, and cryptographic audit logs.
 */

import { CRMDatabase } from './crm_database.ts';
import {
  LeadStatus,
  LeadRating,
  LeadSource,
  DealStage,
  ForecastCategory,
  AccountType,
  AccountTier,
  IndustryClassification,
  ContactPersona,
  ActivityType,
  ActivityPriority,
  ActivityStatus,
  QuoteStatus,
  DiscountType,
  ContractStatus,
  SubscriptionBillingCycle,
  TicketStatus,
  TicketPriority,
  TicketChannel,
  SLAPolicyTier,
  CampaignStatus,
  CampaignType,
  WorkflowTriggerType,
  WorkflowActionType,
  FieldDataType,
  UserRole,
  AuditAction
} from '../domain/enums.ts';
import type {
  User,
  Account,
  Contact,
  Lead,
  Pipeline,
  Opportunity,
  Product,
  PriceBook,
  Quote,
  Contract,
  Invoice,
  SLAPolicyConfig,
  Ticket,
  Campaign,
  WorkflowRule,
  CustomFieldDefinition,
  Activity,
  AuditLogEntry
} from '../domain/types.ts';

export function seedCRMDatabase(db: CRMDatabase): void {
  db.clearAll();
  const TENANT = 'tenant_apex_global_001';
  const NOW = new Date().toISOString();
  const YESTERDAY = new Date(Date.now() - 86400000).toISOString();
  const THREE_DAYS_AGO = new Date(Date.now() - 3 * 86400000).toISOString();

  // 1. Seed Users
  const users: User[] = [
    {
      id: 'usr_sarah_connor',
      tenantId: TENANT,
      email: 'sarah.connor@apexcrm.internal',
      fullName: 'Sarah Connor',
      role: UserRole.SALES_VP,
      department: 'Global Revenue Operations',
      isActive: true,
      quotaARR: 5000000,
      territory: 'North America Enterprise',
      permissions: ['*'],
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    },
    {
      id: 'usr_marcus_vance',
      tenantId: TENANT,
      email: 'marcus.vance@apexcrm.internal',
      fullName: 'Marcus Vance',
      role: UserRole.ACCOUNT_EXECUTIVE,
      department: 'Strategic Accounts',
      isActive: true,
      quotaARR: 1800000,
      territory: 'US East - Healthcare & Fintech',
      permissions: ['leads:*', 'accounts:*', 'opportunities:*', 'quotes:*'],
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    },
    {
      id: 'usr_elena_rostova',
      tenantId: TENANT,
      email: 'elena.rostova@apexcrm.internal',
      fullName: 'Elena Rostova',
      role: UserRole.SALES_DEVELOPMENT_REP,
      department: 'Inbound Inquiries & BDR',
      isActive: true,
      quotaARR: 600000,
      territory: 'Global Inbound',
      permissions: ['leads:*', 'contacts:read', 'accounts:read'],
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    },
    {
      id: 'usr_david_chen',
      tenantId: TENANT,
      email: 'david.chen@apexcrm.internal',
      fullName: 'David Chen',
      role: UserRole.SUPPORT_SPECIALIST,
      department: 'Tier-3 Technical Support',
      isActive: true,
      quotaARR: 0,
      territory: 'Global Customer Success',
      permissions: ['tickets:*', 'accounts:read', 'contacts:read'],
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    }
  ];

  for (const u of users) {
    db.users.set(u.id, u);
  }

  // 2. Seed Accounts
  const accounts: Account[] = [
    {
      id: 'acc_horizon_health',
      tenantId: TENANT,
      name: 'Horizon Health System',
      type: AccountType.CUSTOMER,
      tier: AccountTier.TIER_1_STRATEGIC,
      industry: IndustryClassification.HEALTHCARE_LIFE_SCIENCES,
      website: 'https://horizonhealth.example.com',
      phone: '+1 (555) 392-8811',
      annualRevenue: 420000000,
      employeeCount: 14500,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      billingStreet: '742 Healthcare Parkway',
      billingCity: 'Boston',
      billingState: 'MA',
      billingPostalCode: '02115',
      billingCountry: 'USA',
      healthMetrics: {
        healthScore: 94,
        churnRisk: 'LOW',
        expansionProbability: 85,
        activeOpportunitiesValue: 350000,
        totalWonDealsValue: 920000,
        openTicketsCount: 1,
        lastContactedDaysAgo: 2,
        relationshipStrengthScore: 92
      },
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'acc_apex_fintech',
      tenantId: TENANT,
      name: 'Apex Capital & Asset Management',
      type: AccountType.ENTERPRISE,
      tier: AccountTier.TIER_1_STRATEGIC,
      industry: IndustryClassification.FINANCIAL_SERVICES,
      website: 'https://apexcapital.example.com',
      phone: '+1 (555) 844-9022',
      annualRevenue: 1200000000,
      employeeCount: 8200,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      billingStreet: '100 Wall Street, Floor 34',
      billingCity: 'New York',
      billingState: 'NY',
      billingPostalCode: '10005',
      billingCountry: 'USA',
      healthMetrics: {
        healthScore: 88,
        churnRisk: 'LOW',
        expansionProbability: 70,
        activeOpportunitiesValue: 680000,
        totalWonDealsValue: 1450000,
        openTicketsCount: 0,
        lastContactedDaysAgo: 1,
        relationshipStrengthScore: 86
      },
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'acc_lumina_tech',
      tenantId: TENANT,
      name: 'Lumina Cloud Technologies',
      type: AccountType.PROSPECT,
      tier: AccountTier.TIER_2_KEY,
      industry: IndustryClassification.TECHNOLOGY_SOFTWARE,
      website: 'https://luminatech.example.com',
      phone: '+1 (555) 711-2090',
      annualRevenue: 85000000,
      employeeCount: 1200,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      billingStreet: '400 Silicon Avenue',
      billingCity: 'Austin',
      billingState: 'TX',
      billingPostalCode: '78701',
      billingCountry: 'USA',
      healthMetrics: {
        healthScore: 78,
        churnRisk: 'MEDIUM',
        expansionProbability: 60,
        activeOpportunitiesValue: 180000,
        totalWonDealsValue: 0,
        openTicketsCount: 0,
        lastContactedDaysAgo: 4,
        relationshipStrengthScore: 74
      },
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    }
  ];

  for (const a of accounts) {
    db.indexAccount(a);
  }

  // 3. Seed Contacts
  const contacts: Contact[] = [
    {
      id: 'cnt_dr_rachel_stern',
      tenantId: TENANT,
      accountId: 'acc_horizon_health',
      accountName: 'Horizon Health System',
      firstName: 'Rachel',
      lastName: 'Stern',
      title: 'Chief Medical Information Officer (CMIO)',
      department: 'Clinical Informatics & Operations',
      email: 'r.stern@horizonhealth.example.com',
      phone: '+1 (555) 392-8812',
      mobilePhone: '+1 (555) 392-9900',
      persona: ContactPersona.DECISION_MAKER,
      isPrimaryContact: true,
      decisionInfluenceScore: 9,
      sentimentIndex: 0.85,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'cnt_gordon_hayward',
      tenantId: TENANT,
      accountId: 'acc_apex_fintech',
      accountName: 'Apex Capital & Asset Management',
      firstName: 'Gordon',
      lastName: 'Hayward',
      title: 'Head of Enterprise Technology & Risk',
      department: 'Information Technology',
      email: 'g.hayward@apexcapital.example.com',
      phone: '+1 (555) 844-9025',
      persona: ContactPersona.ECONOMIC_BUYER,
      isPrimaryContact: true,
      decisionInfluenceScore: 10,
      sentimentIndex: 0.9,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'cnt_ananya_sharma',
      tenantId: TENANT,
      accountId: 'acc_lumina_tech',
      accountName: 'Lumina Cloud Technologies',
      firstName: 'Ananya',
      lastName: 'Sharma',
      title: 'VP of Platform Engineering',
      department: 'Engineering',
      email: 'ananya.sharma@luminatech.example.com',
      phone: '+1 (555) 711-2095',
      persona: ContactPersona.TECHNICAL_EVALUATOR,
      isPrimaryContact: true,
      decisionInfluenceScore: 8,
      sentimentIndex: 0.65,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    }
  ];

  for (const c of contacts) {
    db.indexContact(c);
  }

  // 4. Seed Leads with BANT Scores
  const leads: Lead[] = [
    {
      id: 'ld_vanguard_logistics',
      tenantId: TENANT,
      firstName: 'Julian',
      lastName: 'Mercer',
      title: 'Director of Global Supply Chain Operations',
      companyName: 'Vanguard Global Logistics Corp',
      email: 'j.mercer@vanguardlogistics.example.com',
      phone: '+1 (555) 602-4411',
      industry: IndustryClassification.MANUFACTURING_LOGISTICS,
      annualRevenue: 520000000,
      numberOfEmployees: 6400,
      source: LeadSource.INBOUND_WEBSITE,
      status: LeadStatus.QUALIFYING,
      rating: LeadRating.HOT,
      score: 88,
      bant: {
        budgetScore: 23,
        authorityScore: 22,
        needScore: 24,
        timelineScore: 19,
        totalScore: 88,
        qualificationSummary: 'Budget allocated for Q3 modernization ($250k+). Decision board meets next Thursday.',
        isQualified: true
      },
      ownerId: 'usr_elena_rostova',
      ownerName: 'Elena Rostova',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      notes: 'Interested in CPQ automated quotes and SLA compliance monitoring for 30 global warehouses.',
      createdAt: YESTERDAY,
      updatedAt: NOW,
      createdBy: 'usr_elena_rostova',
      updatedBy: 'usr_elena_rostova'
    },
    {
      id: 'ld_solaris_energy',
      tenantId: TENANT,
      firstName: 'Kavita',
      lastName: 'Patel',
      title: 'VP of Customer Experience',
      companyName: 'Solaris Renewable Energy',
      email: 'k.patel@solarisenergy.example.com',
      phone: '+1 (555) 890-3321',
      industry: IndustryClassification.ENERGY_UTILITIES,
      annualRevenue: 140000000,
      numberOfEmployees: 1800,
      source: LeadSource.TRADE_SHOW,
      status: LeadStatus.NEW,
      rating: LeadRating.WARM,
      score: 72,
      bant: {
        budgetScore: 18,
        authorityScore: 20,
        needScore: 19,
        timelineScore: 15,
        totalScore: 72,
        qualificationSummary: 'Evaluating replacements for legacy Zendesk/Salesforce stack.',
        isQualified: true
      },
      ownerId: 'usr_elena_rostova',
      ownerName: 'Elena Rostova',
      city: 'Denver',
      state: 'CO',
      country: 'USA',
      createdAt: NOW,
      updatedAt: NOW,
      createdBy: 'usr_elena_rostova',
      updatedBy: 'usr_elena_rostova'
    }
  ];

  for (const l of leads) {
    db.indexLead(l);
  }

  // 5. Seed Pipelines & Stages
  const standardPipeline: Pipeline = {
    id: 'pipe_enterprise_direct',
    tenantId: TENANT,
    name: 'Enterprise Direct Sales Pipeline',
    description: 'Standard 8-stage sales cycle for mid-market and enterprise B2B contracts.',
    isDefault: true,
    stages: [
      { id: 'stg_1', stage: DealStage.PROSPECTING, displayName: '1. Discovery & Prospecting', defaultProbability: 10, defaultForecastCategory: ForecastCategory.PIPELINE, orderIndex: 0 },
      { id: 'stg_2', stage: DealStage.QUALIFICATION, displayName: '2. BANT / MEDDIC Qualification', defaultProbability: 25, defaultForecastCategory: ForecastCategory.PIPELINE, orderIndex: 1 },
      { id: 'stg_3', stage: DealStage.NEEDS_ANALYSIS, displayName: '3. Technical Needs Scoping', defaultProbability: 40, defaultForecastCategory: ForecastCategory.PIPELINE, orderIndex: 2 },
      { id: 'stg_4', stage: DealStage.VALUE_PROPOSITION, displayName: '4. Solution Demo & Value Pitch', defaultProbability: 60, defaultForecastCategory: ForecastCategory.BEST_CASE, orderIndex: 3 },
      { id: 'stg_5', stage: DealStage.DECISION_MAKERS_BOUGHT_IN, displayName: '5. Executive Sponsor Sign-off', defaultProbability: 75, defaultForecastCategory: ForecastCategory.BEST_CASE, orderIndex: 4 },
      { id: 'stg_6', stage: DealStage.PROPOSAL_PRICE_QUOTE, displayName: '6. CPQ Proposal & Pricing', defaultProbability: 85, defaultForecastCategory: ForecastCategory.COMMIT, orderIndex: 5 },
      { id: 'stg_7', stage: DealStage.NEGOTIATION_REVIEW, displayName: '7. Legal & Security Review', defaultProbability: 90, defaultForecastCategory: ForecastCategory.COMMIT, orderIndex: 6 },
      { id: 'stg_8_won', stage: DealStage.CLOSED_WON, displayName: '8. Closed Won', defaultProbability: 100, defaultForecastCategory: ForecastCategory.CLOSED, orderIndex: 7 },
      { id: 'stg_8_lost', stage: DealStage.CLOSED_LOST, displayName: 'Closed Lost', defaultProbability: 0, defaultForecastCategory: ForecastCategory.OMITTED, orderIndex: 8 }
    ],
    createdAt: THREE_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'system',
    updatedBy: 'system'
  };

  db.pipelines.set(standardPipeline.id, standardPipeline);

  // 6. Seed Opportunities (Deals)
  const opportunities: Opportunity[] = [
    {
      id: 'opp_horizon_ehr_expansion',
      tenantId: TENANT,
      name: 'Horizon Health - 15-Hospital Clinical CRM Expansion',
      accountId: 'acc_horizon_health',
      accountName: 'Horizon Health System',
      primaryContactId: 'cnt_dr_rachel_stern',
      primaryContactName: 'Rachel Stern',
      stage: DealStage.PROPOSAL_PRICE_QUOTE,
      amount: 350000,
      expectedRevenue: 297500,
      probabilityPercentage: 85,
      forecastCategory: ForecastCategory.COMMIT,
      pipelineId: 'pipe_enterprise_direct',
      pipelineName: 'Enterprise Direct Sales Pipeline',
      closeDate: '2026-09-30',
      type: 'UPSELL',
      leadSource: LeadSource.REFERRAL,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      meddic: {
        metrics: '$1.2M annual savings via unified clinical communication & reduced missed appointments.',
        economicBuyer: 'CFO Thomas Albright & CMIO Rachel Stern',
        decisionCriteria: 'HIPAA compliance, real-time HL7 FHIR sync, SLA <15min for P1.',
        decisionProcess: 'Clinical Informatics Board -> IT Security -> Legal Review.',
        identifyPain: 'Fragmented patient records across 15 hospital campuses causing scheduling delays.',
        champion: 'Dr. Rachel Stern (CMIO)',
        isComplete: true
      },
      stageHistory: [
        { fromStage: DealStage.PROSPECTING, toStage: DealStage.QUALIFICATION, changedAt: THREE_DAYS_AGO, changedBy: 'usr_marcus_vance', durationInPreviousStageDays: 5 },
        { fromStage: DealStage.QUALIFICATION, toStage: DealStage.VALUE_PROPOSITION, changedAt: YESTERDAY, changedBy: 'usr_marcus_vance', durationInPreviousStageDays: 7 },
        { fromStage: DealStage.VALUE_PROPOSITION, toStage: DealStage.PROPOSAL_PRICE_QUOTE, changedAt: NOW, changedBy: 'usr_marcus_vance', durationInPreviousStageDays: 3 }
      ],
      daysInCurrentStage: 2,
      isStagnant: false,
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'opp_apex_fintech_core',
      tenantId: TENANT,
      name: 'Apex Capital - Multi-Tenant CRM & Compliance Cloud',
      accountId: 'acc_apex_fintech',
      accountName: 'Apex Capital & Asset Management',
      primaryContactId: 'cnt_gordon_hayward',
      primaryContactName: 'Gordon Hayward',
      stage: DealStage.NEGOTIATION_REVIEW,
      amount: 680000,
      expectedRevenue: 612000,
      probabilityPercentage: 90,
      forecastCategory: ForecastCategory.COMMIT,
      pipelineId: 'pipe_enterprise_direct',
      pipelineName: 'Enterprise Direct Sales Pipeline',
      closeDate: '2026-09-15',
      type: 'NEW_BUSINESS',
      leadSource: LeadSource.OUTBOUND_SALES,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      meddic: {
        metrics: 'Automate KYC compliance, manage $40B asset portfolio client interactions.',
        economicBuyer: 'Gordon Hayward (Head of Tech & Risk)',
        decisionCriteria: 'SOC2 Type II, cryptographic audit logs, sub-100ms API response.',
        decisionProcess: 'Risk committee final signature scheduled Sept 10.',
        identifyPain: 'Manual relationship mapping across wealth management clients.',
        champion: 'Gordon Hayward',
        isComplete: true
      },
      stageHistory: [],
      daysInCurrentStage: 4,
      isStagnant: false,
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'opp_lumina_pilot',
      tenantId: TENANT,
      name: 'Lumina Tech - Developer Edition CRM Sandbox',
      accountId: 'acc_lumina_tech',
      accountName: 'Lumina Cloud Technologies',
      primaryContactId: 'cnt_ananya_sharma',
      primaryContactName: 'Ananya Sharma',
      stage: DealStage.NEEDS_ANALYSIS,
      amount: 180000,
      expectedRevenue: 72000,
      probabilityPercentage: 40,
      forecastCategory: ForecastCategory.PIPELINE,
      pipelineId: 'pipe_enterprise_direct',
      pipelineName: 'Enterprise Direct Sales Pipeline',
      closeDate: '2026-11-15',
      type: 'NEW_BUSINESS',
      leadSource: LeadSource.INBOUND_WEBSITE,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      meddic: {
        metrics: '10x faster custom field extensibility without schema migrations.',
        economicBuyer: 'VP Engineering Ananya Sharma',
        decisionCriteria: 'Open REST API, dynamic custom fields, webhook events.',
        decisionProcess: '2-week technical evaluation -> Executive sign-off.',
        identifyPain: 'Rigid CRM schema blocking custom AI data pipelines.',
        champion: 'Ananya Sharma',
        isComplete: false
      },
      stageHistory: [],
      daysInCurrentStage: 6,
      isStagnant: false,
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    }
  ];

  for (const o of opportunities) {
    db.indexOpportunity(o);
  }

  // 7. Seed Products & PriceBooks (CPQ)
  const products: Product[] = [
    {
      id: 'prd_crm_enterprise_seat',
      tenantId: TENANT,
      sku: 'SKU-CRM-ENT-SEAT',
      name: 'ApexCore CRM Enterprise User License',
      description: 'Full-featured enterprise seat including Lead Scoring, Accounts 360, Kanban Deals, and Custom Schemas.',
      category: 'Software Licenses',
      unitPrice: 150,
      currency: 'USD',
      isActive: true,
      billingFrequency: 'ANNUAL',
      taxCode: 'SW-SAAS-01',
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    },
    {
      id: 'prd_cpq_engine_addon',
      tenantId: TENANT,
      sku: 'SKU-CPQ-MODULE',
      name: 'Advanced CPQ & Proposal Generation Engine',
      description: 'Multi-tier pricing, discount rules, margin threshold approval flows, and dynamic PDF quotes.',
      category: 'Addon Modules',
      unitPrice: 12000,
      currency: 'USD',
      isActive: true,
      billingFrequency: 'ANNUAL',
      taxCode: 'SW-SAAS-01',
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    },
    {
      id: 'prd_sla_platinum_support',
      tenantId: TENANT,
      sku: 'SKU-SUPP-PLATINUM',
      name: 'Platinum 24x7 Mission-Critical SLA Support',
      description: '15-minute response guarantee for P1 incidents with dedicated technical account manager.',
      category: 'Support Services',
      unitPrice: 24000,
      currency: 'USD',
      isActive: true,
      billingFrequency: 'ANNUAL',
      taxCode: 'SRV-SUPP-01',
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    }
  ];

  for (const p of products) {
    db.products.set(p.id, p);
  }

  const standardPriceBook: PriceBook = {
    id: 'pb_standard_2026',
    tenantId: TENANT,
    name: '2026 Global Enterprise Price Book',
    currency: 'USD',
    isActive: true,
    isStandard: true,
    entries: [
      {
        productId: 'prd_crm_enterprise_seat',
        productSku: 'SKU-CRM-ENT-SEAT',
        productName: 'ApexCore CRM Enterprise User License',
        listPrice: 1800,
        minimumPrice: 1200,
        tierDiscounts: [
          { minQuantity: 50, discountPercentage: 10 },
          { minQuantity: 100, discountPercentage: 15 },
          { minQuantity: 500, discountPercentage: 25 }
        ]
      },
      {
        productId: 'prd_cpq_engine_addon',
        productSku: 'SKU-CPQ-MODULE',
        productName: 'Advanced CPQ & Proposal Generation Engine',
        listPrice: 12000,
        minimumPrice: 9000
      },
      {
        productId: 'prd_sla_platinum_support',
        productSku: 'SKU-SUPP-PLATINUM',
        productName: 'Platinum 24x7 Mission-Critical SLA Support',
        listPrice: 24000,
        minimumPrice: 18000
      }
    ],
    createdAt: THREE_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'system',
    updatedBy: 'system'
  };

  db.priceBooks.set(standardPriceBook.id, standardPriceBook);

  // 8. Seed Quote
  const quoteHorizon: Quote = {
    id: 'qte_horizon_2026_01',
    tenantId: TENANT,
    quoteNumber: 'Q-2026-0889',
    opportunityId: 'opp_horizon_ehr_expansion',
    opportunityName: 'Horizon Health - 15-Hospital Clinical CRM Expansion',
    accountId: 'acc_horizon_health',
    accountName: 'Horizon Health System',
    primaryContactId: 'cnt_dr_rachel_stern',
    primaryContactName: 'Rachel Stern',
    priceBookId: 'pb_standard_2026',
    status: QuoteStatus.APPROVED,
    expirationDate: '2026-09-30',
    currency: 'USD',
    paymentTerms: 'Net 30 Days',
    version: 1,
    subtotal: 396000,
    totalDiscountAmount: 46000,
    taxAmount: 0,
    grandTotal: 350000,
    approvedBy: 'usr_sarah_connor',
    approvedAt: YESTERDAY,
    lineItems: [
      {
        id: 'qli_1',
        productId: 'prd_crm_enterprise_seat',
        productSku: 'SKU-CRM-ENT-SEAT',
        productName: 'ApexCore CRM Enterprise User License',
        quantity: 200,
        listPrice: 1800,
        unitPrice: 1620,
        discountType: DiscountType.PERCENTAGE,
        discountValue: 10,
        discountAmount: 36000,
        subtotal: 324000,
        taxRatePercentage: 0,
        taxAmount: 0,
        totalAmount: 324000
      },
      {
        id: 'qli_2',
        productId: 'prd_sla_platinum_support',
        productSku: 'SKU-SUPP-PLATINUM',
        productName: 'Platinum 24x7 Mission-Critical SLA Support',
        quantity: 1,
        listPrice: 24000,
        unitPrice: 14000,
        discountType: DiscountType.FIXED_AMOUNT,
        discountValue: 10000,
        discountAmount: 10000,
        subtotal: 14000,
        taxRatePercentage: 0,
        taxAmount: 0,
        totalAmount: 14000
      },
      {
        id: 'qli_3',
        productId: 'prd_cpq_engine_addon',
        productSku: 'SKU-CPQ-MODULE',
        productName: 'Advanced CPQ & Proposal Generation Engine',
        quantity: 1,
        listPrice: 12000,
        unitPrice: 12000,
        discountType: DiscountType.PERCENTAGE,
        discountValue: 0,
        discountAmount: 0,
        subtotal: 12000,
        taxRatePercentage: 0,
        taxAmount: 0,
        totalAmount: 12000
      }
    ],
    createdAt: YESTERDAY,
    updatedAt: NOW,
    createdBy: 'usr_marcus_vance',
    updatedBy: 'usr_marcus_vance'
  };

  db.quotes.set(quoteHorizon.id, quoteHorizon);

  // 9. Seed SLA Policies & Tickets
  const platinumSLA: SLAPolicyConfig = {
    id: 'sla_platinum',
    tenantId: TENANT,
    tier: SLAPolicyTier.PLATINUM_MISSION_CRITICAL,
    name: 'Platinum 24x7 Mission-Critical SLA',
    firstResponseMinutes: {
      P1_URGENT: 15,
      P2_HIGH: 60,
      P3_MEDIUM: 240,
      P4_LOW: 480
    },
    resolutionHours: {
      P1_URGENT: 2,
      P2_HIGH: 8,
      P3_MEDIUM: 24,
      P4_LOW: 72
    },
    businessHoursOnly: false
  };

  db.slaPolicies.set(platinumSLA.id, platinumSLA);

  const ticket1: Ticket = {
    id: 'tkt_horizon_sso_issue',
    tenantId: TENANT,
    ticketNumber: 'TKT-2026-1044',
    subject: 'SAML 2.0 SSO Certificate Roll-over Integration Test',
    description: 'Horizon clinical staff conducting pre-flight SSO rollover in staging environment. Need Tier-3 engineer validation.',
    status: TicketStatus.OPEN,
    priority: TicketPriority.P2_HIGH,
    channel: TicketChannel.WEB_PORTAL,
    accountId: 'acc_horizon_health',
    accountName: 'Horizon Health System',
    contactId: 'cnt_dr_rachel_stern',
    contactName: 'Rachel Stern',
    contactEmail: 'r.stern@horizonhealth.example.com',
    assigneeId: 'usr_david_chen',
    assigneeName: 'David Chen',
    tags: ['SSO', 'SAML', 'Staging', 'Security'],
    sla: {
      policyTier: SLAPolicyTier.PLATINUM_MISSION_CRITICAL,
      firstResponseDueAt: new Date(Date.now() + 45 * 60000).toISOString(),
      resolutionDueAt: new Date(Date.now() + 7 * 3600000).toISOString(),
      firstResponseMetAt: new Date(Date.now() - 10 * 60000).toISOString(),
      isFirstResponseBreached: false,
      isResolutionBreached: false,
      minutesRemainingToResolution: 420
    },
    comments: [
      {
        id: 'cmnt_1',
        authorId: 'cnt_dr_rachel_stern',
        authorName: 'Dr. Rachel Stern',
        authorRole: 'Customer CMIO',
        isInternalOnly: false,
        content: 'We uploaded the new Okta metadata XML to the sandbox environment. Awaiting confirmation.',
        createdAt: THREE_DAYS_AGO
      },
      {
        id: 'cmnt_2',
        authorId: 'usr_david_chen',
        authorName: 'David Chen',
        authorRole: 'Support Specialist',
        isInternalOnly: false,
        content: 'Metadata verified and signature thumbprint match confirmed. Test sign-in succeeded.',
        createdAt: YESTERDAY
      }
    ],
    createdAt: THREE_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'cnt_dr_rachel_stern',
    updatedBy: 'usr_david_chen'
  };

  db.tickets.set(ticket1.id, ticket1);

  // 10. Seed Marketing Campaigns
  const campaignQ3: Campaign = {
    id: 'cmp_q3_health_summit',
    tenantId: TENANT,
    name: 'Q3 Enterprise Healthcare Digital Transformation Summit',
    type: CampaignType.WEBINAR,
    status: CampaignStatus.ACTIVE,
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    budgetedCost: 45000,
    actualCost: 38500,
    expectedRevenue: 600000,
    actualRevenueWon: 350000,
    targetAudience: 'Hospital CIOs, CMIOs, and VP Informatics at 500+ bed health systems.',
    membersCount: 420,
    openedCount: 310,
    clickedCount: 185,
    convertedCount: 28,
    roiPercentage: 809.09,
    ownerId: 'usr_sarah_connor',
    ownerName: 'Sarah Connor',
    createdAt: THREE_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'usr_sarah_connor',
    updatedBy: 'usr_sarah_connor'
  };

  db.campaigns.set(campaignQ3.id, campaignQ3);

  // 11. Seed Workflow Rules
  const workflowHighValueLead: WorkflowRule = {
    id: 'wf_hot_lead_escalation',
    tenantId: TENANT,
    name: 'High-Score Lead Executive Auto-Assignment & Slack Alert',
    description: 'When a new lead achieves a BANT score >= 80, automatically assign to Senior AE and create high priority intro task.',
    entityType: 'LEAD',
    triggerType: WorkflowTriggerType.FIELD_VALUE_CHANGED,
    isActive: true,
    conditions: [
      { field: 'score', operator: 'GREATER_THAN', value: 79 },
      { field: 'status', operator: 'EQUALS', value: LeadStatus.QUALIFYING }
    ],
    conditionLogic: 'AND',
    actions: [
      {
        id: 'act_1',
        type: WorkflowActionType.ASSIGN_OWNER,
        value: 'usr_marcus_vance'
      },
      {
        id: 'act_2',
        type: WorkflowActionType.CREATE_TASK,
        taskTitleTemplate: 'Executive Outreach: Hot Lead {companyName}',
        taskDueDaysOffset: 1
      },
      {
        id: 'act_3',
        type: WorkflowActionType.SEND_EMAIL_NOTIFICATION,
        recipientEmail: 'marcus.vance@apexcrm.internal',
        emailSubjectTemplate: '🔥 Hot Lead Escalation: {companyName} (Score: {score})'
      }
    ],
    executionCount: 14,
    lastExecutedAt: YESTERDAY,
    createdAt: THREE_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'usr_sarah_connor',
    updatedBy: 'usr_sarah_connor'
  };

  db.workflowRules.set(workflowHighValueLead.id, workflowHighValueLead);

  // 12. Seed Custom Fields
  const customFields: CustomFieldDefinition[] = [
    {
      id: 'cf_account_security_tier',
      tenantId: TENANT,
      targetEntity: 'ACCOUNT',
      fieldName: 'Data Security Compliance Level',
      fieldKey: 'security_compliance_level',
      dataType: FieldDataType.ENUM_DROPDOWN,
      isRequired: true,
      dropdownOptions: ['HIPAA + HITECH', 'SOC2 Type II', 'FedRAMP High', 'PCI-DSS Level 1'],
      defaultValue: 'SOC2 Type II',
      helpText: 'Primary regulatory framework for customer data segregation.',
      orderIndex: 1,
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    },
    {
      id: 'cf_opp_competitor_incumbent',
      tenantId: TENANT,
      targetEntity: 'OPPORTUNITY',
      fieldName: 'Incumbent Legacy Vendor',
      fieldKey: 'legacy_vendor_incumbent',
      dataType: FieldDataType.STRING,
      isRequired: false,
      defaultValue: '',
      helpText: 'Name of the existing vendor being displaced.',
      orderIndex: 2,
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    }
  ];

  for (const cf of customFields) {
    db.customFields.set(cf.id, cf);
  }

  // 13. Seed Activities
  const sampleActivities: Activity[] = [
    {
      id: 'actv_call_horizon_demo',
      tenantId: TENANT,
      type: ActivityType.DEMO,
      subject: 'Executive Solution Demo for Horizon Health CMIO',
      description: 'Demonstrated HL7 FHIR sync, SLA countdown timers, and automated CPQ proposal generation.',
      priority: ActivityPriority.HIGH,
      status: ActivityStatus.COMPLETED,
      dueDate: YESTERDAY,
      completedDate: YESTERDAY,
      relatedEntityType: 'OPPORTUNITY',
      relatedEntityId: 'opp_horizon_ehr_expansion',
      relatedEntityName: 'Horizon Health - 15-Hospital Clinical CRM Expansion',
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      createdAt: THREE_DAYS_AGO,
      updatedAt: YESTERDAY,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'actv_task_quote_approval',
      tenantId: TENANT,
      type: ActivityType.TASK,
      subject: 'Review Discount Tier for Horizon Health Super Quote',
      description: 'Margin analysis for 10% volume discount on 200 enterprise seats.',
      priority: ActivityPriority.CRITICAL,
      status: ActivityStatus.COMPLETED,
      dueDate: YESTERDAY,
      completedDate: YESTERDAY,
      relatedEntityType: 'OPPORTUNITY',
      relatedEntityId: 'opp_horizon_ehr_expansion',
      relatedEntityName: 'Horizon Health - 15-Hospital Clinical CRM Expansion',
      ownerId: 'usr_sarah_connor',
      ownerName: 'Sarah Connor',
      createdAt: YESTERDAY,
      updatedAt: YESTERDAY,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_sarah_connor'
    }
  ];

  for (const act of sampleActivities) {
    db.activities.set(act.id, act);
  }

  // 14. Seed Cryptographic Audit Trail
  const initialAudit: AuditLogEntry = {
    id: 'aud_genesis_001',
    tenantId: TENANT,
    timestamp: THREE_DAYS_AGO,
    actorId: 'usr_sarah_connor',
    actorName: 'Sarah Connor',
    actorRole: UserRole.SALES_VP,
    clientIp: '10.0.4.12',
    action: AuditAction.CREATE,
    entityType: 'ACCOUNT',
    entityId: 'acc_horizon_health',
    details: 'Initial creation of Strategic Tier 1 Account: Horizon Health System',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    currentHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  };

  db.auditLogs.push(initialAudit);
}
