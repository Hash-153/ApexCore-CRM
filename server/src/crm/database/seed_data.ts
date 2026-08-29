/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Enterprise Seeder Dataset & Initializer
 *
 * Populates realistic enterprise B2B customers, authenticated users across all 5 roles,
 * BANT qualified leads, MEDDIC pipeline deals, CPQ price catalogs, SLA tickets,
 * interactions timeline, customer notes, document attachments, and audit logs.
 */

import { CRMDatabase } from './crm_database.ts';
import {
  UserRole,
  UserStatus,
  CustomerStatus,
  CustomerTier,
  CustomerLifecycleStage,
  InteractionType,
  AttachmentCategory,
  LeadStatus,
  LeadRating,
  LeadSource,
  DealStage,
  ForecastCategory,
  ContactPersona,
  QuoteStatus,
  DiscountType,
  ContractStatus,
  InvoiceStatus,
  TicketStatus,
  TicketPriority,
  TicketChannel,
  SLAPolicyTier,
  CampaignStatus,
  CampaignType,
  WorkflowTriggerType,
  WorkflowActionType,
  CustomFieldDataType
} from '../domain/enums.ts';
import type {
  User,
  Customer,
  Contact,
  Lead,
  Opportunity,
  Product,
  PriceBook,
  PriceBookEntry,
  Quote,
  Contract,
  Invoice,
  Ticket,
  Campaign,
  WorkflowRule,
  CustomFieldDefinition,
  CustomerInteraction,
  CustomerNote,
  CustomerAttachment,
  AuditLogEntry
} from '../domain/types.ts';
import { AuthService } from '../auth/auth.service.ts';

export function seedCRMDatabase(db: CRMDatabase): void {
  db.reset();

  const authService = new AuthService(db);
  const defaultPasswordHash = authService.hashPassword('Password123!');
  const TENANT = 'tenant_apex_global_001';
  const NOW = new Date().toISOString();
  const ONE_DAY_AGO = new Date(Date.now() - 24 * 3600000).toISOString();
  const TWO_DAYS_AGO = new Date(Date.now() - 48 * 3600000).toISOString();
  const THREE_DAYS_AGO = new Date(Date.now() - 72 * 3600000).toISOString();

  // ==========================================================================
  // 1. Authenticated Users across all 5 Core RBAC Roles
  // ==========================================================================
  const users: User[] = [
    {
      id: 'usr_admin_root',
      tenantId: TENANT,
      email: 'admin@apexcore.example.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Alexandra',
      lastName: 'Sterling',
      displayName: 'Alexandra Sterling (Admin)',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      department: 'Executive Leadership & IT',
      jobTitle: 'VP of Technology & System Administrator',
      phoneNumber: '+1 (555) 100-0001',
      quotaARR: 0,
      failedLoginAttempts: 0,
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system_bootstrap',
      updatedBy: 'system_bootstrap'
    },
    {
      id: 'usr_sales_mgr',
      tenantId: TENANT,
      email: 'manager@apexcore.example.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Jonathan',
      lastName: 'Holloway',
      displayName: 'Jonathan Holloway (Sales Mgr)',
      role: UserRole.SALES_MANAGER,
      status: UserStatus.ACTIVE,
      department: 'Enterprise Revenue Operations',
      jobTitle: 'VP of Global Enterprise Sales',
      phoneNumber: '+1 (555) 100-0002',
      quotaARR: 5000000,
      failedLoginAttempts: 0,
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system_bootstrap',
      updatedBy: 'system_bootstrap'
    },
    {
      id: 'usr_marcus_vance',
      tenantId: TENANT,
      email: 'rep@apexcore.example.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Marcus',
      lastName: 'Vance',
      displayName: 'Marcus Vance (Sales Rep)',
      role: UserRole.SALES_REPRESENTATIVE,
      status: UserStatus.ACTIVE,
      department: 'Strategic Accounts',
      jobTitle: 'Strategic Account Executive',
      phoneNumber: '+1 (555) 100-0003',
      quotaARR: 1800000,
      failedLoginAttempts: 0,
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system_bootstrap',
      updatedBy: 'system_bootstrap'
    },
    {
      id: 'usr_support_agent',
      tenantId: TENANT,
      email: 'support@apexcore.example.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Sarah',
      lastName: 'Jenkins',
      displayName: 'Sarah Jenkins (Support Agent)',
      role: UserRole.SUPPORT_AGENT,
      status: UserStatus.ACTIVE,
      department: 'Customer Success & Tier-3 Support',
      jobTitle: 'Senior Escalation Engineer',
      phoneNumber: '+1 (555) 100-0004',
      quotaARR: 0,
      failedLoginAttempts: 0,
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system_bootstrap',
      updatedBy: 'system_bootstrap'
    },
    {
      id: 'usr_marketing_exec',
      tenantId: TENANT,
      email: 'marketing@apexcore.example.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Elena',
      lastName: 'Rostova',
      displayName: 'Elena Rostova (Marketing Exec)',
      role: UserRole.MARKETING_EXECUTIVE,
      status: UserStatus.ACTIVE,
      department: 'Growth & Demand Generation',
      jobTitle: 'Head of Global Campaign Strategy',
      phoneNumber: '+1 (555) 100-0005',
      quotaARR: 0,
      failedLoginAttempts: 0,
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system_bootstrap',
      updatedBy: 'system_bootstrap'
    }
  ];

  users.forEach(u => db.indexUser(u));

  // ==========================================================================
  // 2. Customer Management Dataset (Customer 360)
  // ==========================================================================
  const customers: Customer[] = [
    {
      id: 'acc_horizon_health',
      tenantId: TENANT,
      customerNumber: 'CUST-2026-1001',
      name: 'Horizon Global Health & Life Sciences',
      legalName: 'Horizon Health System Holding Corporation',
      domain: 'horizonhealth.example.com',
      status: CustomerStatus.ACTIVE,
      tier: CustomerTier.TIER_1_STRATEGIC,
      lifecycleStage: CustomerLifecycleStage.CUSTOMER,
      industry: 'Healthcare & Life Sciences',
      industryCode: 'NAICS-541512',
      annualRevenue: 450000000,
      employeeCount: 4500,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      healthScore: 94,
      churnRisk: 'LOW',
      expansionProbability: 88,
      lifetimeValue: 750000,
      activeARR: 240000,
      phone: '+1 (555) 234-5678',
      email: 'procurement@horizonhealth.example.com',
      website: 'https://horizonhealth.example.com',
      billingAddress: {
        street: '500 Medical Center Parkway',
        city: 'Boston',
        state: 'MA',
        postalCode: '02115',
        country: 'United States'
      },
      tags: ['Tier 1 Strategic', 'Direct Annual Contract', 'High Health Index'],
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'acc_vanguard_fintech',
      tenantId: TENANT,
      customerNumber: 'CUST-2026-1002',
      name: 'Vanguard FinTech Systems Corp',
      legalName: 'Vanguard Financial Technologies LLC',
      domain: 'vanguardfintech.example.com',
      status: CustomerStatus.ACTIVE,
      tier: CustomerTier.TIER_1_STRATEGIC,
      lifecycleStage: CustomerLifecycleStage.CUSTOMER,
      industry: 'Financial Services & FinTech',
      industryCode: 'NAICS-522110',
      annualRevenue: 890000000,
      employeeCount: 8200,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      healthScore: 91,
      churnRisk: 'LOW',
      expansionProbability: 82,
      lifetimeValue: 520000,
      activeARR: 180000,
      phone: '+1 (555) 345-6789',
      email: 'billing@vanguardfintech.example.com',
      website: 'https://vanguardfintech.example.com',
      billingAddress: {
        street: '100 Wall Street Tower, Suite 4200',
        city: 'New York',
        state: 'NY',
        postalCode: '10005',
        country: 'United States'
      },
      tags: ['FinTech Enterprise', 'SOC2 Compliant', 'Multi-Year Agreement'],
      createdAt: TWO_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'acc_lumina_ai',
      tenantId: TENANT,
      customerNumber: 'CUST-2026-1003',
      name: 'Lumina AI Intelligence Systems',
      legalName: 'Lumina Artificial Intelligence Inc',
      domain: 'lumina.ai.example.com',
      status: CustomerStatus.PROSPECT,
      tier: CustomerTier.TIER_2_KEY,
      lifecycleStage: CustomerLifecycleStage.OPPORTUNITY,
      industry: 'Enterprise Software & Cloud AI',
      industryCode: 'NAICS-511210',
      annualRevenue: 65000000,
      employeeCount: 350,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      healthScore: 82,
      churnRisk: 'MEDIUM',
      expansionProbability: 92,
      lifetimeValue: 0,
      activeARR: 0,
      phone: '+1 (555) 456-7890',
      email: 'contact@lumina.ai.example.com',
      website: 'https://lumina.ai.example.com',
      billingAddress: {
        street: '450 Innovation Way, Suite 800',
        city: 'Austin',
        state: 'TX',
        postalCode: '78701',
        country: 'United States'
      },
      tags: ['Prospect', 'High Growth', 'MEDDIC Pilot'],
      createdAt: ONE_DAY_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'acc_apex_logistics',
      tenantId: TENANT,
      customerNumber: 'CUST-2026-1004',
      name: 'Apex Global Logistics & Freight',
      legalName: 'Apex Worldwide Supply Chain Solutions',
      domain: 'apexlogistics.example.com',
      status: CustomerStatus.ACTIVE,
      tier: CustomerTier.TIER_2_KEY,
      lifecycleStage: CustomerLifecycleStage.CUSTOMER,
      industry: 'Manufacturing & Logistics',
      industryCode: 'NAICS-484110',
      annualRevenue: 280000000,
      employeeCount: 1900,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      healthScore: 88,
      churnRisk: 'LOW',
      expansionProbability: 70,
      lifetimeValue: 320000,
      activeARR: 120000,
      phone: '+1 (555) 567-8901',
      email: 'finance@apexlogistics.example.com',
      website: 'https://apexlogistics.example.com',
      billingAddress: {
        street: '720 O’Hare Cargo Expressway',
        city: 'Chicago',
        state: 'IL',
        postalCode: '60666',
        country: 'United States'
      },
      tags: ['Supply Chain', 'Active Contract'],
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'acc_summit_cloud',
      tenantId: TENANT,
      customerNumber: 'CUST-2026-1005',
      name: 'Summit Cloud Networks LLC',
      legalName: 'Summit Cloud Telecommunications Corp',
      domain: 'summitcloud.example.com',
      status: CustomerStatus.SUSPENDED,
      tier: CustomerTier.TIER_3_STANDARD,
      lifecycleStage: CustomerLifecycleStage.CUSTOMER,
      industry: 'Telecommunications',
      industryCode: 'NAICS-517311',
      annualRevenue: 15000000,
      employeeCount: 120,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      healthScore: 45,
      churnRisk: 'HIGH',
      expansionProbability: 20,
      lifetimeValue: 48000,
      activeARR: 0,
      phone: '+1 (555) 678-9012',
      email: 'accounts@summitcloud.example.com',
      website: 'https://summitcloud.example.com',
      billingAddress: {
        street: '1200 Mountainview Boulevard',
        city: 'Denver',
        state: 'CO',
        postalCode: '80202',
        country: 'United States'
      },
      tags: ['Billing Review', 'Suspended Pending Payment'],
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'acc_solaris_energy',
      tenantId: TENANT,
      customerNumber: 'CUST-2026-1006',
      name: 'Solaris Clean Energy Group',
      legalName: 'Solaris Renewables Holding Inc',
      domain: 'solariscleanenergy.example.com',
      status: CustomerStatus.CHURNED,
      tier: CustomerTier.TIER_3_STANDARD,
      lifecycleStage: CustomerLifecycleStage.CUSTOMER,
      industry: 'Energy, CleanTech & Utilities',
      industryCode: 'NAICS-221114',
      annualRevenue: 35000000,
      employeeCount: 220,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      healthScore: 25,
      churnRisk: 'CRITICAL',
      expansionProbability: 5,
      lifetimeValue: 36000,
      activeARR: 0,
      phone: '+1 (555) 789-0123',
      email: 'info@solariscleanenergy.example.com',
      website: 'https://solariscleanenergy.example.com',
      billingAddress: {
        street: '88 Solar Way',
        city: 'Phoenix',
        state: 'AZ',
        postalCode: '85001',
        country: 'United States'
      },
      tags: ['Churned', 'Exit Interview Complete'],
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    }
  ];

  customers.forEach(c => db.indexCustomer(c));

  // ==========================================================================
  // 3. Customer Interaction History Timeline
  // ==========================================================================
  const interactions: CustomerInteraction[] = [
    {
      id: 'int_001',
      tenantId: TENANT,
      customerId: 'acc_horizon_health',
      customerName: 'Horizon Global Health & Life Sciences',
      contactId: 'cnt_dr_rachel_stern',
      contactName: 'Dr. Rachel Stern (Chief Information Officer)',
      userId: 'usr_marcus_vance',
      userName: 'Marcus Vance',
      userRole: UserRole.SALES_REPRESENTATIVE,
      type: InteractionType.MEETING,
      subject: 'Executive Steering Committee Q3 Platform Review',
      description: 'Reviewed multi-facility deployment timeline, CPQ automated workflows, and SOC 2 security compliance validation.',
      channel: 'ZOOM_CONFERENCE',
      durationMinutes: 45,
      sentiment: 'POSITIVE',
      outcome: 'Customer approved Q3 expansion into 150 additional sales workstation licenses.',
      nextSteps: 'Deliver formal CPQ Proposal Quote for review by Economic Buyer.',
      completedAt: ONE_DAY_AGO,
      createdAt: ONE_DAY_AGO,
      updatedAt: ONE_DAY_AGO,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'int_002',
      tenantId: TENANT,
      customerId: 'acc_horizon_health',
      contactId: 'cnt_dr_rachel_stern',
      contactName: 'Dr. Rachel Stern',
      userId: 'usr_support_agent',
      userName: 'Sarah Jenkins',
      userRole: UserRole.SUPPORT_AGENT,
      type: InteractionType.SUPPORT_TICKET,
      subject: 'SAML 2.0 SSO Certificate Roll-over Integration Test',
      description: 'Verified SAML 2.0 assertions and Okta SSO certificate rollover in sandbox. Test passed with zero downtime.',
      channel: 'PORTAL_HELPDESK',
      durationMinutes: 20,
      sentiment: 'POSITIVE',
      outcome: 'Ticket TKT-2026-1044 resolved within SLA time window (45 min first response).',
      completedAt: TWO_DAYS_AGO,
      createdAt: TWO_DAYS_AGO,
      updatedAt: TWO_DAYS_AGO,
      createdBy: 'usr_support_agent',
      updatedBy: 'usr_support_agent'
    },
    {
      id: 'int_003',
      tenantId: TENANT,
      customerId: 'acc_lumina_ai',
      contactId: 'cnt_ananya_sharma',
      contactName: 'Ananya Sharma (VP of Engineering)',
      userId: 'usr_marcus_vance',
      userName: 'Marcus Vance',
      userRole: UserRole.SALES_REPRESENTATIVE,
      type: InteractionType.DEMO,
      subject: 'Technical Architecture Deep-Dive & REST Webhook Demo',
      description: 'Demonstrated real-time BANT lead qualification, trigger-condition-action workflow automation, and custom dynamic schemas.',
      channel: 'GOOGLE_MEET',
      durationMinutes: 60,
      sentiment: 'POSITIVE',
      outcome: 'Engineering team validated API throughput. Requested MEDDIC proposal quote for 150 developer seats.',
      nextSteps: 'Draft CPQ quote proposal with 15% annual volume discount.',
      completedAt: THREE_DAYS_AGO,
      createdAt: THREE_DAYS_AGO,
      updatedAt: THREE_DAYS_AGO,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    }
  ];

  interactions.forEach(i => db.indexInteraction(i));

  // ==========================================================================
  // 4. Customer Notes & Attachments
  // ==========================================================================
  const notes: CustomerNote[] = [
    {
      id: 'note_001',
      tenantId: TENANT,
      customerId: 'acc_horizon_health',
      userId: 'usr_marcus_vance',
      authorName: 'Marcus Vance',
      authorRole: UserRole.SALES_REPRESENTATIVE,
      title: 'Executive Buying Committee Alignment Summary',
      content: 'CIO Dr. Rachel Stern confirmed that ApexCore CRM is the designated system of record for 2026 revenue operations. VP Finance signed off on Net 30 payment terms.',
      isPinned: true,
      tags: ['Buying Committee', 'Strategic Priority', 'Executive Sponsor'],
      createdAt: TWO_DAYS_AGO,
      updatedAt: TWO_DAYS_AGO,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'note_002',
      tenantId: TENANT,
      customerId: 'acc_horizon_health',
      userId: 'usr_support_agent',
      authorName: 'Sarah Jenkins',
      authorRole: UserRole.SUPPORT_AGENT,
      title: 'Tier-3 Mission Critical SLA Policy Enabled',
      content: 'Platinum 24/7/365 SLA profile configured with 15-minute P1 critical breach notification alerts routed directly to on-call duty engineer Slack channel.',
      isPinned: false,
      tags: ['SLA Configuration', 'Platinum Support'],
      createdAt: THREE_DAYS_AGO,
      updatedAt: THREE_DAYS_AGO,
      createdBy: 'usr_support_agent',
      updatedBy: 'usr_support_agent'
    }
  ];

  notes.forEach(n => db.indexNote(n));

  const attachments: CustomerAttachment[] = [
    {
      id: 'att_001',
      tenantId: TENANT,
      customerId: 'acc_horizon_health',
      fileName: 'Horizon_Master_Service_Agreement_2026_Executed.pdf',
      fileSize: 2450000,
      mimeType: 'application/pdf',
      category: AttachmentCategory.CONTRACT,
      downloadUrl: '/api/crm/customers/acc_horizon_health/attachments/att_001/download',
      uploadedBy: 'usr_marcus_vance',
      uploaderName: 'Marcus Vance',
      version: 'v2.1',
      checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      createdAt: TWO_DAYS_AGO,
      updatedAt: TWO_DAYS_AGO,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'att_002',
      tenantId: TENANT,
      customerId: 'acc_horizon_health',
      fileName: 'ApexCore_SOC2_Type_II_Security_Addendum.pdf',
      fileSize: 1820000,
      mimeType: 'application/pdf',
      category: AttachmentCategory.SECURITY_REVIEW,
      downloadUrl: '/api/crm/customers/acc_horizon_health/attachments/att_002/download',
      uploadedBy: 'usr_admin_root',
      uploaderName: 'Alexandra Sterling',
      version: 'v1.0',
      checksumSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      createdAt: THREE_DAYS_AGO,
      updatedAt: THREE_DAYS_AGO,
      createdBy: 'usr_admin_root',
      updatedBy: 'usr_admin_root'
    }
  ];

  attachments.forEach(a => db.indexAttachment(a));

  // ==========================================================================
  // 5. Contacts (Stakeholder Power Map)
  // ==========================================================================
  const contacts: Contact[] = [
    {
      id: 'cnt_dr_rachel_stern',
      tenantId: TENANT,
      firstName: 'Rachel',
      lastName: 'Stern',
      email: 'r.stern@horizonhealth.example.com',
      phone: '+1 (555) 234-1101',
      title: 'Chief Information Officer (CIO)',
      department: 'Information Technology & Informatics',
      accountId: 'acc_horizon_health',
      accountName: 'Horizon Global Health & Life Sciences',
      persona: ContactPersona.ECONOMIC_BUYER,
      decisionInfluenceScore: 10,
      sentimentScore: 9,
      isPrimaryForAccount: true,
      doNotCall: false,
      emailOptOut: false,
      preferredContactMethod: 'EMAIL',
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'cnt_ananya_sharma',
      tenantId: TENANT,
      firstName: 'Ananya',
      lastName: 'Sharma',
      email: 'ananya@lumina.ai.example.com',
      phone: '+1 (555) 456-1102',
      title: 'VP of Engineering',
      department: 'Platform Architecture',
      accountId: 'acc_lumina_ai',
      accountName: 'Lumina AI Intelligence Systems',
      persona: ContactPersona.TECHNICAL_EVALUATOR,
      decisionInfluenceScore: 9,
      sentimentScore: 8,
      isPrimaryForAccount: true,
      doNotCall: false,
      emailOptOut: false,
      preferredContactMethod: 'SLACK',
      createdAt: TWO_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'cnt_victoria_sterling',
      tenantId: TENANT,
      firstName: 'Victoria',
      lastName: 'Sterling',
      email: 'v.sterling@vanguardfintech.example.com',
      phone: '+1 (555) 345-1103',
      title: 'Head of Enterprise Procurement',
      department: 'Vendor Management',
      accountId: 'acc_vanguard_fintech',
      accountName: 'Vanguard FinTech Systems Corp',
      persona: ContactPersona.DECISION_MAKER,
      decisionInfluenceScore: 9,
      sentimentScore: 9,
      isPrimaryForAccount: true,
      doNotCall: false,
      emailOptOut: false,
      preferredContactMethod: 'EMAIL',
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    }
  ];

  contacts.forEach(c => db.indexContact(c));

  // ==========================================================================
  // 6. Inbound Leads with BANT Scores
  // ==========================================================================
  const leads: Lead[] = [
    {
      id: 'lead_metropolis_health',
      tenantId: TENANT,
      leadNumber: 'LEAD-2026-5001',
      firstName: 'Arthur',
      lastName: 'Pendleton',
      title: 'Chief Medical Officer',
      email: 'a.pendleton@metropolishealth.example.com',
      phone: '+1 (555) 890-1234',
      companyName: 'Metropolis Health System',
      industry: 'Healthcare & Life Sciences',
      employeeCount: 2400,
      annualRevenue: 180000000,
      website: 'https://metropolishealth.example.com',
      status: LeadStatus.QUALIFYING,
      rating: LeadRating.HOT,
      source: LeadSource.WEBINAR,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      score: 92,
      bant: {
        budgetScore: 25,
        authorityScore: 25,
        needScore: 22,
        timelineScore: 20,
        totalScore: 92,
        qualificationSummary: 'Budget allocated for 2026 Q3 rollout. Executive authority confirmed.',
        isQualified: true
      },
      createdAt: TWO_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'ld_vanguard_logistics',
      tenantId: TENANT,
      leadNumber: 'LEAD-2026-5001',
      firstName: 'Jonathan',
      lastName: 'Mercer',
      title: 'VP of Global Operations',
      email: 'j.mercer@vanguardlogistics.example.com',
      phone: '+1 (555) 789-1101',
      companyName: 'Vanguard Global Logistics Corp',
      industry: 'Transportation & Logistics',
      employeeCount: 3500,
      annualRevenue: 420000000,
      website: 'https://vanguardlogistics.example.com',
      status: LeadStatus.QUALIFYING,
      rating: LeadRating.WARM,
      source: LeadSource.INBOUND_WEBSITE,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      score: 82,
      bant: {
        budgetScore: 20,
        authorityScore: 22,
        needScore: 20,
        timelineScore: 20,
        totalScore: 82,
        qualificationSummary: 'Budget allocated for modern fleet management and TMS integration.',
        isQualified: true
      },
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    },
    {
      id: 'lead_solaris_pharma',
      tenantId: TENANT,
      leadNumber: 'LEAD-2026-5002',
      firstName: 'Elena',
      lastName: 'Gomez',
      title: 'Director of Clinical Operations',
      email: 'e.gomez@solarispharma.example.com',
      phone: '+1 (555) 901-2345',
      companyName: 'Solaris Biopharmaceuticals',
      industry: 'Biotechnology & Pharma',
      employeeCount: 450,
      annualRevenue: 45000000,
      website: 'https://solarispharma.example.com',
      status: LeadStatus.NEW,
      rating: LeadRating.WARM,
      source: LeadSource.INBOUND_WEBSITE,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      score: 74,
      bant: {
        budgetScore: 20,
        authorityScore: 18,
        needScore: 20,
        timelineScore: 16,
        totalScore: 74,
        qualificationSummary: 'Strong clinical need identified. Decision maker engagement in progress.',
        isQualified: true
      },
      createdAt: ONE_DAY_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    }
  ];

  leads.forEach(l => db.indexLead(l));

  // ==========================================================================
  // 7. Deal Pipeline & MEDDIC Opportunities
  // ==========================================================================
  const opps: Opportunity[] = [
    {
      id: 'opp_horizon_ehr_expansion',
      tenantId: TENANT,
      opportunityNumber: 'OPP-2026-8001',
      name: 'Horizon Health - 450 Seat CRM Expansion',
      accountId: 'acc_horizon_health',
      accountName: 'Horizon Global Health & Life Sciences',
      primaryContactId: 'cnt_dr_rachel_stern',
      primaryContactName: 'Dr. Rachel Stern',
      stage: DealStage.PROPOSAL_PRICE_QUOTE,
      probabilityPercentage: 80,
      forecastCategory: ForecastCategory.COMMIT,
      amount: 450000,
      currency: 'USD',
      expectedRevenue: 360000,
      closeDate: '2026-11-15',
      pipelineId: 'pipe_enterprise_direct',
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      leadSource: LeadSource.REFERRAL,
      meddic: {
        metrics: 'Expected $1.2M annual savings through automated CPQ and patient workflow orchestration.',
        economicBuyer: 'CIO Dr. Rachel Stern and CFO Robert Sterling.',
        decisionCriteria: 'HIPAA compliance, HL7 FHIR interoperability, and sub-100ms API SLA.',
        decisionProcess: 'Legal privacy review completed; awaiting formal CPQ quote sign-off.',
        identifyPain: 'Fragmented legacy systems causing delayed care handoffs and billing leakage.',
        champion: 'Dr. Rachel Stern (CIO)',
        isComplete: true,
        scorePercentage: 95
      },
      lineItemsCount: 3,
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'opp_vanguard_core_suite',
      tenantId: TENANT,
      opportunityNumber: 'OPP-2026-8002',
      name: 'Vanguard FinTech - Enterprise Suite Renewal',
      accountId: 'acc_vanguard_fintech',
      accountName: 'Vanguard FinTech Systems Corp',
      primaryContactId: 'cnt_victoria_sterling',
      primaryContactName: 'Victoria Sterling',
      stage: DealStage.NEGOTIATION_REVIEW,
      probabilityPercentage: 90,
      forecastCategory: ForecastCategory.CLOSED,
      amount: 320000,
      currency: 'USD',
      expectedRevenue: 288000,
      closeDate: '2026-09-30',
      pipelineId: 'pipe_enterprise_direct',
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      leadSource: LeadSource.PARTNER,
      meddic: {
        metrics: 'Zero downtime guarantee with automated compliance auditing.',
        economicBuyer: 'Victoria Sterling (Head of Enterprise Procurement)',
        decisionCriteria: 'SOC 2 Type II, multi-tenant isolation, real-time webhooks.',
        decisionProcess: 'Procurement redlines completed.',
        identifyPain: 'Scaling to 10M daily transactions requiring low-latency CRM operations.',
        champion: 'Victoria Sterling',
        isComplete: true,
        scorePercentage: 98
      },
      lineItemsCount: 2,
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    },
    {
      id: 'opp_lumina_pilot',
      tenantId: TENANT,
      opportunityNumber: 'OPP-2026-8003',
      name: 'Lumina AI - Developer Platform Pilot',
      accountId: 'acc_lumina_ai',
      accountName: 'Lumina AI Intelligence Systems',
      primaryContactId: 'cnt_ananya_sharma',
      primaryContactName: 'Ananya Sharma',
      stage: DealStage.QUALIFICATION,
      probabilityPercentage: 40,
      forecastCategory: ForecastCategory.PIPELINE,
      amount: 420000,
      currency: 'USD',
      expectedRevenue: 168000,
      closeDate: '2026-12-15',
      pipelineId: 'pipe_enterprise_direct',
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      leadSource: LeadSource.INBOUND_WEBSITE,
      meddic: {
        metrics: 'Sub-second model latency monitoring for 50M API inferences.',
        economicBuyer: 'VP Engineering Ananya Sharma',
        decisionCriteria: 'Multi-cloud LLM support, sub-50ms token latency.',
        decisionProcess: 'Technical pilot benchmark in progress.',
        identifyPain: 'Unpredictable token throughput and fragmented developer billing.',
        champion: 'Ananya Sharma',
        isComplete: false,
        scorePercentage: 55
      },
      lineItemsCount: 1,
      createdAt: ONE_DAY_AGO,
      updatedAt: NOW,
      createdBy: 'usr_marcus_vance',
      updatedBy: 'usr_marcus_vance'
    }
  ];

  opps.forEach(o => db.indexOpportunity(o));

  // ==========================================================================
  // 8. CPQ Products & Price Books
  // ==========================================================================
  const products: Product[] = [
    {
      id: 'prd_crm_enterprise_seat',
      tenantId: TENANT,
      sku: 'SKU-CRM-ENT-SEAT',
      name: 'ApexCore CRM Enterprise Workstation Seat',
      description: 'Full revenue operations seat with BANT lead qualification, MEDDIC pipeline management, and contact graph.',
      category: 'User Licenses',
      unitPrice: 1800,
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
      name: 'Advanced CPQ & Dynamic Pricing Engine',
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
      id: 'prd_sla_helpdesk_suite',
      tenantId: TENANT,
      sku: 'SKU-HELPDESK-ENT',
      name: 'Omnichannel Customer Support & SLA Helpdesk',
      description: '24/7 SLA resolution countdowns, omnichannel ticket triage, and automated breach escalation workflows.',
      category: 'Addon Modules',
      unitPrice: 18000,
      currency: 'USD',
      isActive: true,
      billingFrequency: 'ANNUAL',
      taxCode: 'SW-SAAS-01',
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    }
  ];

  products.forEach(p => db.products.set(p.id, p));

  // Seed Pipelines
  db.pipelines.set('pipe_enterprise_direct', {
    id: 'pipe_enterprise_direct',
    tenantId: TENANT,
    name: 'Global Enterprise Direct Sales Pipeline',
    stages: Object.values(DealStage),
    isActive: true
  });

  // Seed SLA Policies
  db.slaPolicies.set('sla_platinum', {
    id: 'sla_platinum',
    tenantId: TENANT,
    name: 'Platinum Mission-Critical SLA',
    tier: SLAPolicyTier.PLATINUM_MISSION_CRITICAL,
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
      P4_LOW: 48
    },
    businessHoursOnly: false
  });

  const priceBookEntriesList = [
    {
      id: 'pbe_001',
      productId: 'prd_crm_enterprise_seat',
      productName: 'ApexCore CRM Enterprise Workstation Seat',
      productSku: 'SKU-CRM-ENT-SEAT',
      listPrice: 1800,
      minimumPrice: 1300,
      currency: 'USD',
      floorPrice: 1300,
      tierDiscounts: [
        { minQuantity: 10, discountPercentage: 5 },
        { minQuantity: 50, discountPercentage: 10 },
        { minQuantity: 100, discountPercentage: 15 },
        { minQuantity: 250, discountPercentage: 20 }
      ],
      volumeTiers: [
        { minQuantity: 1, maxQuantity: 49, discountPercentage: 0 },
        { minQuantity: 50, maxQuantity: 199, discountPercentage: 10 },
        { minQuantity: 200, maxQuantity: 499, discountPercentage: 18 },
        { minQuantity: 500, discountPercentage: 25 }
      ]
    },
    {
      id: 'pbe_002',
      productId: 'prd_cpq_engine_addon',
      productName: 'Advanced CPQ & Dynamic Pricing Engine',
      productSku: 'SKU-CPQ-MODULE',
      listPrice: 12000,
      minimumPrice: 9000,
      currency: 'USD',
      floorPrice: 9000,
      tierDiscounts: [
        { minQuantity: 2, discountPercentage: 15 }
      ],
      volumeTiers: [
        { minQuantity: 1, maxQuantity: 1, discountPercentage: 0 },
        { minQuantity: 2, discountPercentage: 15 }
      ]
    }
  ];

  const standardPriceBook = {
    id: 'pb_standard_2026',
    tenantId: TENANT,
    name: 'Enterprise Commercial Price Book 2026',
    description: 'Standard master price schedule with automated volume tier discounts and margin guardrails.',
    isStandard: true,
    isActive: true,
    currency: 'USD',
    effectiveFrom: '2026-01-01',
    entries: priceBookEntriesList,
    createdAt: THREE_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'system',
    updatedBy: 'system'
  };

  db.priceBooks.set(standardPriceBook.id, standardPriceBook);
  db.priceBookEntries.set(standardPriceBook.id, priceBookEntriesList as any);

  // Quote
  const quote1: Quote = {
    id: 'qte_horizon_2026_01',
    tenantId: TENANT,
    quoteNumber: 'QTE-2026-0881',
    opportunityId: 'opp_horizon_ehr_expansion',
    opportunityName: 'Horizon Health - 450 Seat CRM Expansion',
    priceBookId: 'pb_standard_2026',
    status: QuoteStatus.IN_REVIEW,
    currency: 'USD',
    subtotal: 360000,
    totalDiscountAmount: 54000,
    taxAmount: 21600,
    grandTotal: 306000,
    termsAndConditions: 'Standard 30-Day Evaluation Period. Net 30 payment terms upon contract execution.',
    validUntil: '2026-11-30',
    lineItems: [
      {
        id: 'qli_1',
        productId: 'prd_crm_enterprise_seat',
        productName: 'ApexCore CRM Enterprise Workstation Seat',
        productSku: 'SKU-CRM-ENT-SEAT',
        quantity: 200,
        listPrice: 1800,
        volumeDiscountPercentage: 15,
        finalUnitPrice: 1530,
        totalExtendedPrice: 306000,
        requiresFloorApproval: false
      }
    ],
    createdAt: TWO_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'usr_marcus_vance',
    updatedBy: 'usr_marcus_vance'
  };

  db.quotes.set(quote1.id, quote1);
  db.quotes.set('qte_horizon_initial', quote1);

  // Contract & Invoices
  const contract1: Contract = {
    id: 'cntr_horizon_2026',
    tenantId: TENANT,
    contractNumber: 'CTR-2026-904',
    accountId: 'acc_horizon_health',
    accountName: 'Horizon Global Health & Life Sciences',
    opportunityId: 'opp_horizon_ehr_expansion',
    status: ContractStatus.EXECUTED_ACTIVE,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    autoRenew: true,
    totalContractValue: 240000,
    annualRecurringRevenue: 240000,
    paymentTerms: 'Net 30 Days',
    billingCycle: 'ANNUAL',
    createdAt: THREE_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'system',
    updatedBy: 'system'
  };

  db.contracts.set(contract1.id, contract1);

  const invoice1: Invoice = {
    id: 'inv_2026_001',
    tenantId: TENANT,
    invoiceNumber: 'INV-2026-1049',
    contractId: contract1.id,
    accountId: 'acc_horizon_health',
    accountName: 'Horizon Global Health & Life Sciences',
    status: InvoiceStatus.PAID,
    issueDate: '2026-01-05',
    dueDate: '2026-02-05',
    paidDate: '2026-01-20',
    subtotal: 240000,
    taxAmount: 19200,
    totalAmount: 259200,
    amountPaid: 259200,
    balanceDue: 0,
    createdAt: THREE_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'system',
    updatedBy: 'system'
  };

  db.invoices.set(invoice1.id, invoice1);

  // ==========================================================================
  // 9. Helpdesk Support Tickets & SLA Performance
  // ==========================================================================
  const ticket1: Ticket = {
    id: 'tkt_horizon_sso_issue',
    tenantId: TENANT,
    ticketNumber: 'TKT-2026-1044',
    subject: 'SAML 2.0 SSO Certificate Roll-over Integration Test',
    description: 'Horizon enterprise staff conducting pre-flight SSO rollover in staging environment. Need Tier-3 engineer validation.',
    status: TicketStatus.OPEN,
    priority: TicketPriority.P2_HIGH,
    channel: TicketChannel.WEB_PORTAL,
    accountId: 'acc_horizon_health',
    accountName: 'Horizon Global Health & Life Sciences',
    contactId: 'cnt_dr_rachel_stern',
    contactName: 'Rachel Stern',
    contactEmail: 'r.stern@horizonhealth.example.com',
    assigneeId: 'usr_support_agent',
    assigneeName: 'Sarah Jenkins',
    tags: ['SSO', 'SAML', 'Staging', 'Security'],
    sla: {
      policyTier: SLAPolicyTier.PLATINUM_MISSION_CRITICAL,
      firstResponseDueAt: new Date(Date.now() + 45 * 60000).toISOString(),
      resolutionDueAt: new Date(Date.now() + 7 * 3600000).toISOString(),
      firstResponseMetAt: undefined,
      isFirstResponseBreached: false,
      isResolutionBreached: false,
      minutesRemainingToResolution: 420
    },
    comments: [
      {
        id: 'cmnt_1',
        authorId: 'cnt_dr_rachel_stern',
        authorName: 'Dr. Rachel Stern',
        authorRole: 'Chief Information Officer',
        isInternalOnly: false,
        content: 'Sandbox certificate uploaded. Requesting verification against SAML entity endpoint.',
        createdAt: TWO_DAYS_AGO
      }
    ],
    createdAt: TWO_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'cnt_dr_rachel_stern',
    updatedBy: 'usr_support_agent'
  };

  db.tickets.set(ticket1.id, ticket1);

  // ==========================================================================
  // 10. Marketing Campaigns & Attribution
  // ==========================================================================
  const campaign1: Campaign = {
    id: 'cmp_q3_enterprise_webinar',
    tenantId: TENANT,
    name: 'Q3 Enterprise Revenue Operations & CRM Modernization Summit',
    type: CampaignType.WEBINAR_SERIES,
    status: CampaignStatus.COMPLETED,
    startDate: '2026-07-01',
    endDate: '2026-08-15',
    budgetCost: 25000,
    actualCost: 21500,
    expectedRevenue: 350000,
    actualRevenueWon: 450000,
    roiPercentage: 1993,
    membersCount: 840,
    convertedCount: 42,
    description: 'Executive digital summit covering MEDDIC pipeline forecasting and CPQ automation for Fortune 1000 enterprises.',
    createdAt: THREE_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'usr_marketing_exec',
    updatedBy: 'usr_marketing_exec'
  };

  db.campaigns.set(campaign1.id, campaign1);

  // ==========================================================================
  // 11. Visual Workflow Rules
  // ==========================================================================
  const workflow1: WorkflowRule = {
    id: 'wf_auto_hot_lead_assignment',
    tenantId: TENANT,
    name: 'Auto-Assign Hot BANT Qualified Inbound Leads',
    description: 'When an inbound lead BANT score >= 70, immediately set rating to HOT and dispatch Slack alert to on-duty Strategic Account Executive.',
    entityType: 'LEAD',
    triggerType: WorkflowTriggerType.ON_BANT_SCORE_THRESHOLD,
    conditionLogic: 'AND',
    conditions: [
      {
        field: 'bant.totalScore',
        operator: 'GREATER_THAN',
        value: 69
      }
    ],
    actions: [
      {
        type: WorkflowActionType.UPDATE_FIELD,
        targetField: 'rating',
        targetValue: 'HOT'
      },
      {
        type: WorkflowActionType.ASSIGN_OWNER,
        targetValue: 'usr_marcus_vance'
      },
      {
        type: WorkflowActionType.CREATE_TASK,
        targetValue: 'Conduct initial 15-minute qualification discovery call within 2 business hours.'
      }
    ],
    isActive: true,
    executionCount: 142,
    lastExecutedAt: ONE_DAY_AGO,
    createdAt: THREE_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'system',
    updatedBy: 'system'
  };

  db.workflowRules.set(workflow1.id, workflow1);

  const workflow2: WorkflowRule = {
    id: 'wf_field_change_lead',
    tenantId: TENANT,
    name: 'Lead Status Qualification Workflow',
    description: 'When lead status changes and score > 70',
    entityType: 'LEAD',
    triggerType: WorkflowTriggerType.FIELD_VALUE_CHANGED,
    conditionLogic: 'AND',
    conditions: [
      {
        field: 'score',
        operator: 'GREATER_THAN',
        value: 70
      }
    ],
    actions: [
      {
        type: WorkflowActionType.UPDATE_FIELD,
        targetField: 'status',
        targetValue: 'QUALIFIED'
      },
      {
        type: WorkflowActionType.ASSIGN_OWNER,
        targetValue: 'usr_marcus_vance'
      }
    ],
    isActive: true,
    executionCount: 50,
    lastExecutedAt: ONE_DAY_AGO,
    createdAt: THREE_DAYS_AGO,
    updatedAt: NOW,
    createdBy: 'system',
    updatedBy: 'system'
  };

  db.workflowRules.set(workflow2.id, workflow2);

  // ==========================================================================
  // 12. Dynamic Custom Field Definitions
  // ==========================================================================
  const customFields: CustomFieldDefinition[] = [
    {
      id: 'cf_account_security_tier',
      tenantId: TENANT,
      targetEntity: 'CUSTOMER',
      fieldName: 'Security & Compliance Classification',
      fieldKey: 'security_compliance_tier',
      dataType: CustomFieldDataType.DROPDOWN_SINGLE,
      isRequired: true,
      defaultValue: 'SOC2_TYPE_II',
      dropdownOptions: ['SOC2_TYPE_II', 'ISO_27001', 'FEDRAMP_MODERATE', 'HIPAA_BAA', 'PCI_DSS_LEVEL_1'],
      helpText: 'Primary regulatory compliance framework required for enterprise contract execution.',
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    },
    {
      id: 'cf_opportunity_economic_buyer_signoff',
      tenantId: TENANT,
      targetEntity: 'OPPORTUNITY',
      fieldName: 'Economic Buyer Verbal Commit Date',
      fieldKey: 'economic_buyer_verbal_date',
      dataType: CustomFieldDataType.DATE,
      isRequired: false,
      helpText: 'Date when the identified economic buyer formally committed to purchase in executive review.',
      createdAt: THREE_DAYS_AGO,
      updatedAt: NOW,
      createdBy: 'system',
      updatedBy: 'system'
    }
  ];

  customFields.forEach(cf => db.customFields.set(cf.id, cf));

  // ==========================================================================
  // 13. Cryptographic SHA-256 Audit Trail Chain
  // ==========================================================================
  const genesisHash = '0000000000000000000000000000000000000000000000000000000000000000';
  const audit1: AuditLogEntry = {
    id: 'aud_001',
    tenantId: TENANT,
    actorId: 'usr_admin_root',
    actorName: 'Alexandra Sterling',
    actorRole: UserRole.ADMIN,
    clientIp: '10.0.1.15',
    action: 'SYSTEM_BOOTSTRAP_INITIALIZED',
    entityType: 'TENANT_CONFIG',
    entityId: TENANT,
    timestamp: THREE_DAYS_AGO,
    details: 'ApexCore Enterprise CRM database schema and master encryption keys provisioned.',
    previousHash: genesisHash,
    currentHash: '4a5e2f7b1c3d9e8a7f6b5c4d3e2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a'
  };

  const audit2: AuditLogEntry = {
    id: 'aud_002',
    tenantId: TENANT,
    actorId: 'usr_marcus_vance',
    actorName: 'Marcus Vance',
    actorRole: UserRole.SALES_REPRESENTATIVE,
    clientIp: '10.0.1.28',
    action: 'LEAD_BANT_EVALUATION_COMPLETED',
    entityType: 'LEAD',
    entityId: 'lead_metropolis_health',
    timestamp: TWO_DAYS_AGO,
    details: 'Lead Metropolis Health evaluated: Score 92/100 (Qualified). Rating set to HOT.',
    previousHash: audit1.currentHash,
    currentHash: '7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c'
  };

  db.auditLogs.push(audit1, audit2);
}
