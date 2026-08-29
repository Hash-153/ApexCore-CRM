/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Domain Enumerations & Classification Standards
 *
 * Designed following Clean Architecture principles for high-reliability
 * enterprise revenue operations, customer support, and sales workflow automation.
 */

// ============================================================================
// 1. User Authentication & 5 Core RBAC Roles
// ============================================================================
export const UserRole = {
  ADMIN: 'Admin',
  SALES_MANAGER: 'Sales Manager',
  SALES_REPRESENTATIVE: 'Sales Representative',
  SUPPORT_AGENT: 'Support Agent',
  MARKETING_EXECUTIVE: 'Marketing Executive',

  // Granular Sub-Roles
  GLOBAL_ADMIN: 'GLOBAL_ADMIN',
  SALES_VP: 'SALES_VP',
  ACCOUNT_EXECUTIVE: 'ACCOUNT_EXECUTIVE',
  SALES_DEVELOPMENT_REP: 'SALES_DEVELOPMENT_REP',
  SUPPORT_DIRECTOR: 'SUPPORT_DIRECTOR',
  SUPPORT_SPECIALIST: 'SUPPORT_SPECIALIST',
  MARKETING_MANAGER: 'MARKETING_MANAGER',
  FINANCE_CONTROLLER: 'FINANCE_CONTROLLER',
  READ_ONLY_AUDITOR: 'READ_ONLY_AUDITOR'
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING_INVITATION: 'PENDING_INVITATION',
  LOCKED: 'LOCKED'
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

// ============================================================================
// 2. Customer Management & Lifecycle Status
// ============================================================================
export const CustomerStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PROSPECT: 'PROSPECT',
  CHURNED: 'CHURNED',
  SUSPENDED: 'SUSPENDED',
  ONBOARDING: 'ONBOARDING'
} as const;
export type CustomerStatus = (typeof CustomerStatus)[keyof typeof CustomerStatus];

export const CustomerTier = {
  TIER_1_STRATEGIC: 'TIER_1_STRATEGIC',
  TIER_2_KEY: 'TIER_2_KEY',
  TIER_3_STANDARD: 'TIER_3_STANDARD',
  TIER_4_EMERGING: 'TIER_4_EMERGING'
} as const;
export type CustomerTier = (typeof CustomerTier)[keyof typeof CustomerTier];

export const CustomerLifecycleStage = {
  SUBSCRIBER: 'SUBSCRIBER',
  LEAD: 'LEAD',
  MARKETING_QUALIFIED: 'MARKETING_QUALIFIED',
  SALES_QUALIFIED: 'SALES_QUALIFIED',
  OPPORTUNITY: 'OPPORTUNITY',
  CUSTOMER: 'CUSTOMER',
  EVANGELIST: 'EVANGELIST'
} as const;
export type CustomerLifecycleStage = (typeof CustomerLifecycleStage)[keyof typeof CustomerLifecycleStage];

export const InteractionType = {
  CALL: 'CALL',
  EMAIL: 'EMAIL',
  MEETING: 'MEETING',
  DEMO: 'DEMO',
  NOTE: 'NOTE',
  SUPPORT_TICKET: 'SUPPORT_TICKET',
  CONTRACT_SIGN: 'CONTRACT_SIGN',
  STAGE_CHANGE: 'STAGE_CHANGE'
} as const;
export type InteractionType = (typeof InteractionType)[keyof typeof InteractionType];

export const AttachmentCategory = {
  CONTRACT: 'CONTRACT',
  PROPOSAL: 'PROPOSAL',
  INVOICE: 'INVOICE',
  NDA: 'NDA',
  SECURITY_REVIEW: 'SECURITY_REVIEW',
  TECHNICAL_SPEC: 'TECHNICAL_SPEC',
  CORRESPONDENCE: 'CORRESPONDENCE',
  OTHER: 'OTHER'
} as const;
export type AttachmentCategory = (typeof AttachmentCategory)[keyof typeof AttachmentCategory];

// ============================================================================
// 3. Activity & Task Types
// ============================================================================
export const ActivityType = {
  CALL: 'CALL',
  EMAIL: 'EMAIL',
  MEETING: 'MEETING',
  TASK: 'TASK',
  DEMO: 'DEMO',
  NOTE: 'NOTE'
} as const;
export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];

export const ActivityPriority = {
  HIGH: 'HIGH',
  NORMAL: 'NORMAL',
  LOW: 'LOW'
} as const;
export type ActivityPriority = (typeof ActivityPriority)[keyof typeof ActivityPriority];

export const ActivityStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  OVERDUE: 'OVERDUE'
} as const;
export type ActivityStatus = (typeof ActivityStatus)[keyof typeof ActivityStatus];

// ============================================================================
// 4. Lead & Pipeline Enums
// ============================================================================
export const LeadStatus = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  QUALIFYING: 'QUALIFYING',
  QUALIFIED: 'QUALIFIED',
  UNQUALIFIED: 'UNQUALIFIED',
  CONVERTED: 'CONVERTED',
  NURTURING: 'NURTURING'
} as const;
export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];

export const LeadRating = {
  HOT: 'HOT',
  WARM: 'WARM',
  COLD: 'COLD',
  JUNK: 'JUNK'
} as const;
export type LeadRating = (typeof LeadRating)[keyof typeof LeadRating];

export const LeadSource = {
  INBOUND_WEBSITE: 'INBOUND_WEBSITE',
  OUTBOUND_SALES: 'OUTBOUND_SALES',
  REFERRAL: 'REFERRAL',
  PARTNER: 'PARTNER',
  ORGANIC_SEARCH: 'ORGANIC_SEARCH',
  PAID_ADVERTISING: 'PAID_ADVERTISING',
  TRADE_SHOW: 'TRADE_SHOW',
  WEBINAR: 'WEBINAR',
  OTHER: 'OTHER'
} as const;
export type LeadSource = (typeof LeadSource)[keyof typeof LeadSource];

export const DealStage = {
  PROSPECTING: 'PROSPECTING',
  QUALIFICATION: 'QUALIFICATION',
  NEEDS_ANALYSIS: 'NEEDS_ANALYSIS',
  VALUE_PROPOSITION: 'VALUE_PROPOSITION',
  DECISION_MAKERS_BOUGHT_IN: 'DECISION_MAKERS_BOUGHT_IN',
  PROPOSAL_PRICE_QUOTE: 'PROPOSAL_PRICE_QUOTE',
  NEGOTIATION_REVIEW: 'NEGOTIATION_REVIEW',
  CLOSED_WON: 'CLOSED_WON',
  CLOSED_LOST: 'CLOSED_LOST'
} as const;
export type DealStage = (typeof DealStage)[keyof typeof DealStage];

export const ForecastCategory = {
  OMITTED: 'OMITTED',
  PIPELINE: 'PIPELINE',
  BEST_CASE: 'BEST_CASE',
  COMMIT: 'COMMIT',
  CLOSED: 'CLOSED'
} as const;
export type ForecastCategory = (typeof ForecastCategory)[keyof typeof ForecastCategory];

export const AccountType = {
  CUSTOMER: 'CUSTOMER',
  PROSPECT: 'PROSPECT',
  ENTERPRISE: 'ENTERPRISE',
  MID_MARKET: 'MID_MARKET',
  SMB: 'SMB',
  CHANNEL_PARTNER: 'CHANNEL_PARTNER',
  VENDOR: 'VENDOR',
  COMPETITOR: 'COMPETITOR'
} as const;
export type AccountType = (typeof AccountType)[keyof typeof AccountType];

export const AccountTier = {
  TIER_1_STRATEGIC: 'TIER_1_STRATEGIC',
  TIER_2_KEY: 'TIER_2_KEY',
  TIER_3_STANDARD: 'TIER_3_STANDARD',
  TIER_4_EMERGING: 'TIER_4_EMERGING'
} as const;
export type AccountTier = (typeof AccountTier)[keyof typeof AccountTier];

export const IndustryClassification = {
  ENTERPRISE_SOFTWARE: 'ENTERPRISE_SOFTWARE',
  FINANCIAL_SERVICES_FINTECH: 'FINANCIAL_SERVICES_FINTECH',
  HEALTHCARE_MEDTECH: 'HEALTHCARE_MEDTECH',
  MANUFACTURING_LOGISTICS: 'MANUFACTURING_LOGISTICS',
  RETAIL_ECOMMERCE: 'RETAIL_ECOMMERCE',
  ENERGY_UTILITIES: 'ENERGY_UTILITIES',
  TELECOMMUNICATIONS: 'TELECOMMUNICATIONS',
  EDUCATION_PUBLIC_SECTOR: 'EDUCATION_PUBLIC_SECTOR',
  MEDIA_ENTERTAINMENT: 'MEDIA_ENTERTAINMENT',
  OTHER: 'OTHER'
} as const;
export type IndustryClassification = (typeof IndustryClassification)[keyof typeof IndustryClassification];

export const ContactPersona = {
  DECISION_MAKER: 'DECISION_MAKER',
  ECONOMIC_BUYER: 'ECONOMIC_BUYER',
  TECHNICAL_EVALUATOR: 'TECHNICAL_EVALUATOR',
  INTERNAL_CHAMPION: 'INTERNAL_CHAMPION',
  GATEKEEPER: 'GATEKEEPER',
  INFLUENCER: 'INFLUENCER',
  END_USER: 'END_USER',
  BLOCKER: 'BLOCKER'
} as const;
export type ContactPersona = (typeof ContactPersona)[keyof typeof ContactPersona];

export const QuoteStatus = {
  DRAFT: 'DRAFT',
  IN_REVIEW: 'IN_REVIEW',
  PENDING_APPROVAL: 'IN_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PRESENTED: 'PRESENTED',
  ACCEPTED: 'ACCEPTED',
  EXPIRED: 'EXPIRED'
} as const;
export type QuoteStatus = (typeof QuoteStatus)[keyof typeof QuoteStatus];

export const DiscountType = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED_AMOUNT: 'FIXED_AMOUNT',
  OVERRIDE_UNIT_PRICE: 'OVERRIDE_UNIT_PRICE'
} as const;
export type DiscountType = (typeof DiscountType)[keyof typeof DiscountType];

export const ContractStatus = {
  DRAFT: 'DRAFT',
  UNDER_LEGAL_REVIEW: 'UNDER_LEGAL_REVIEW',
  OUT_FOR_SIGNATURE: 'OUT_FOR_SIGNATURE',
  EXECUTED_ACTIVE: 'EXECUTED_ACTIVE',
  EXPIRED: 'EXPIRED',
  TERMINATED: 'TERMINATED'
} as const;
export type ContractStatus = (typeof ContractStatus)[keyof typeof ContractStatus];

export const InvoiceStatus = {
  DRAFT: 'DRAFT',
  POSTED: 'POSTED',
  SENT: 'SENT',
  PAID: 'PAID',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  OVERDUE: 'OVERDUE',
  VOIDED: 'VOIDED',
  REFUNDED: 'REFUNDED'
} as const;
export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];

export const TicketStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  PENDING_CUSTOMER: 'PENDING_CUSTOMER',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
  ESCALATED: 'ESCALATED'
} as const;
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export const TicketPriority = {
  P1_URGENT: 'P1_URGENT',
  P2_HIGH: 'P2_HIGH',
  P3_MEDIUM: 'P3_MEDIUM',
  P4_LOW: 'P4_LOW'
} as const;
export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority];

export const TicketChannel = {
  WEB_PORTAL: 'WEB_PORTAL',
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  SLACK_INTEGRATION: 'SLACK_INTEGRATION',
  API: 'API'
} as const;
export type TicketChannel = (typeof TicketChannel)[keyof typeof TicketChannel];

export const SLAPolicyTier = {
  PLATINUM_MISSION_CRITICAL: 'PLATINUM_MISSION_CRITICAL',
  GOLD_ENTERPRISE: 'GOLD_ENTERPRISE',
  SILVER_BUSINESS: 'SILVER_BUSINESS',
  BRONZE_STANDARD: 'BRONZE_STANDARD'
} as const;
export type SLAPolicyTier = (typeof SLAPolicyTier)[keyof typeof SLAPolicyTier];

export const CampaignType = {
  EMAIL_DRIP: 'EMAIL_DRIP',
  WEBINAR_SERIES: 'WEBINAR_SERIES',
  TRADE_CONFERENCE: 'TRADE_CONFERENCE',
  ABM_HIGH_TOUCH: 'ABM_HIGH_TOUCH',
  PAID_SEARCH_SEM: 'PAID_SEARCH_SEM',
  CONTENT_SYNDICATION: 'CONTENT_SYNDICATION',
  SOCIAL_CAMPAIGN: 'SOCIAL_CAMPAIGN'
} as const;
export type CampaignType = (typeof CampaignType)[keyof typeof CampaignType];

export const CampaignStatus = {
  PLANNING: 'PLANNING',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
} as const;
export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus];

export const WorkflowTriggerType = {
  ON_RECORD_CREATED: 'ON_RECORD_CREATED',
  ON_RECORD_UPDATED: 'ON_RECORD_UPDATED',
  ON_STAGE_CHANGED: 'ON_STAGE_CHANGED',
  ON_BANT_SCORE_THRESHOLD: 'ON_BANT_SCORE_THRESHOLD',
  ON_INACTIVITY_TIMEOUT: 'ON_INACTIVITY_TIMEOUT',
  MANUAL_WEBHOOK: 'MANUAL_WEBHOOK'
} as const;
export type WorkflowTriggerType = (typeof WorkflowTriggerType)[keyof typeof WorkflowTriggerType];

export const WorkflowActionType = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  ASSIGN_OWNER: 'ASSIGN_OWNER',
  SEND_EMAIL_TEMPLATE: 'SEND_EMAIL_TEMPLATE',
  CREATE_TASK: 'CREATE_TASK',
  TRIGGER_WEBHOOK: 'TRIGGER_WEBHOOK',
  CREATE_AUDIT_LOG: 'CREATE_AUDIT_LOG'
} as const;
export type WorkflowActionType = (typeof WorkflowActionType)[keyof typeof WorkflowActionType];

export const CustomFieldDataType = {
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  CURRENCY: 'CURRENCY',
  DATE: 'DATE',
  BOOLEAN: 'BOOLEAN',
  DROPDOWN_SINGLE: 'DROPDOWN_SINGLE',
  DROPDOWN_MULTI: 'DROPDOWN_MULTI',
  TEXTAREA: 'TEXTAREA'
} as const;
export type CustomFieldDataType = (typeof CustomFieldDataType)[keyof typeof CustomFieldDataType];

export const AuditAction = {
  USER_LOGIN: 'USER_LOGIN',
  USER_REGISTRATION: 'USER_REGISTRATION',
  RECORD_CREATED: 'RECORD_CREATED',
  RECORD_UPDATED: 'RECORD_UPDATED',
  RECORD_DELETED: 'RECORD_DELETED',
  STATUS_TRANSITIONED: 'STATUS_TRANSITIONED',
  BANT_QUALIFIED: 'BANT_QUALIFIED',
  QUOTE_CALCULATED: 'QUOTE_CALCULATED',
  QUOTE_APPROVED: 'QUOTE_APPROVED',
  SLA_BREACH_DETECTED: 'SLA_BREACH_DETECTED',
  WORKFLOW_EXECUTED: 'WORKFLOW_EXECUTED'
} as const;
export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];
