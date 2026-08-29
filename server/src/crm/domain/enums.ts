/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Domain Enumerations & Classification Standards
 *
 * Designed following Clean Architecture principles for high-reliability
 * enterprise revenue operations, customer support, and sales workflow automation.
 */

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
  HEALTHCARE_LIFE_SCIENCES: 'HEALTHCARE_LIFE_SCIENCES',
  FINANCIAL_SERVICES: 'FINANCIAL_SERVICES',
  TECHNOLOGY_SOFTWARE: 'TECHNOLOGY_SOFTWARE',
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
  EXECUTIVE_SPONSOR: 'EXECUTIVE_SPONSOR',
  INTERNAL_CHAMPION: 'INTERNAL_CHAMPION',
  INFLUENCER: 'INFLUENCER',
  END_USER: 'END_USER',
  BLOCKER: 'BLOCKER'
} as const;
export type ContactPersona = (typeof ContactPersona)[keyof typeof ContactPersona];

export const ActivityType = {
  CALL: 'CALL',
  EMAIL: 'EMAIL',
  MEETING: 'MEETING',
  NOTE: 'NOTE',
  TASK: 'TASK',
  DEMO: 'DEMO',
  CONTRACT_SENT: 'CONTRACT_SENT',
  AUDIT_EVENT: 'AUDIT_EVENT'
} as const;
export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];

export const ActivityPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
} as const;
export type ActivityPriority = (typeof ActivityPriority)[keyof typeof ActivityPriority];

export const ActivityStatus = {
  PLANNED: 'PLANNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  DEFERRED: 'DEFERRED'
} as const;
export type ActivityStatus = (typeof ActivityStatus)[keyof typeof ActivityStatus];

export const QuoteStatus = {
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PRESENTED: 'PRESENTED',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  EXPIRED: 'EXPIRED'
} as const;
export type QuoteStatus = (typeof QuoteStatus)[keyof typeof QuoteStatus];

export const DiscountType = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED_AMOUNT: 'FIXED_AMOUNT'
} as const;
export type DiscountType = (typeof DiscountType)[keyof typeof DiscountType];

export const ContractStatus = {
  DRAFT: 'DRAFT',
  IN_APPROVAL: 'IN_APPROVAL',
  ACTIVE: 'ACTIVE',
  UNDER_AMENDMENT: 'UNDER_AMENDMENT',
  EXPIRED: 'EXPIRED',
  TERMINATED: 'TERMINATED'
} as const;
export type ContractStatus = (typeof ContractStatus)[keyof typeof ContractStatus];

export const SubscriptionBillingCycle = {
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  SEMI_ANNUAL: 'SEMI_ANNUAL',
  ANNUAL: 'ANNUAL',
  MULTI_YEAR: 'MULTI_YEAR'
} as const;
export type SubscriptionBillingCycle = (typeof SubscriptionBillingCycle)[keyof typeof SubscriptionBillingCycle];

export const TicketStatus = {
  NEW: 'NEW',
  OPEN: 'OPEN',
  PENDING_CUSTOMER: 'PENDING_CUSTOMER',
  PENDING_INTERNAL: 'PENDING_INTERNAL',
  ESCALATED: 'ESCALATED',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED'
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
  EMAIL: 'EMAIL',
  WEB_PORTAL: 'WEB_PORTAL',
  PHONE: 'PHONE',
  LIVE_CHAT: 'LIVE_CHAT',
  API: 'API',
  SOCIAL_MEDIA: 'SOCIAL_MEDIA'
} as const;
export type TicketChannel = (typeof TicketChannel)[keyof typeof TicketChannel];

export const SLAPolicyTier = {
  PLATINUM_MISSION_CRITICAL: 'PLATINUM_MISSION_CRITICAL',
  GOLD_ENTERPRISE: 'GOLD_ENTERPRISE',
  SILVER_BUSINESS: 'SILVER_BUSINESS',
  BRONZE_STANDARD: 'BRONZE_STANDARD'
} as const;
export type SLAPolicyTier = (typeof SLAPolicyTier)[keyof typeof SLAPolicyTier];

export const CampaignStatus = {
  PLANNING: 'PLANNING',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
} as const;
export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus];

export const CampaignType = {
  EMAIL_BLAST: 'EMAIL_BLAST',
  DRIP_NURTURE: 'DRIP_NURTURE',
  PRODUCT_LAUNCH: 'PRODUCT_LAUNCH',
  WEBINAR: 'WEBINAR',
  CONTENT_SYNDICATION: 'CONTENT_SYNDICATION',
  CONFERENCE_EVENT: 'CONFERENCE_EVENT',
  ACCOUNT_BASED_MARKETING: 'ACCOUNT_BASED_MARKETING'
} as const;
export type CampaignType = (typeof CampaignType)[keyof typeof CampaignType];

export const WorkflowTriggerType = {
  RECORD_CREATED: 'RECORD_CREATED',
  RECORD_UPDATED: 'RECORD_UPDATED',
  FIELD_VALUE_CHANGED: 'FIELD_VALUE_CHANGED',
  STAGE_TRANSITIONED: 'STAGE_TRANSITIONED',
  SLA_BREACH_WARNING: 'SLA_BREACH_WARNING',
  SCHEDULED_TIME: 'SCHEDULED_TIME',
  MANUAL_WEBHOOK: 'MANUAL_WEBHOOK'
} as const;
export type WorkflowTriggerType = (typeof WorkflowTriggerType)[keyof typeof WorkflowTriggerType];

export const WorkflowActionType = {
  SEND_EMAIL_NOTIFICATION: 'SEND_EMAIL_NOTIFICATION',
  CREATE_TASK: 'CREATE_TASK',
  UPDATE_FIELD: 'UPDATE_FIELD',
  ASSIGN_OWNER: 'ASSIGN_OWNER',
  DISPATCH_WEBHOOK: 'DISPATCH_WEBHOOK',
  CREATE_AUDIT_LOG: 'CREATE_AUDIT_LOG',
  TRIGGER_DRIP_CAMPAIGN: 'TRIGGER_DRIP_CAMPAIGN'
} as const;
export type WorkflowActionType = (typeof WorkflowActionType)[keyof typeof WorkflowActionType];

export const FieldDataType = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  DATE: 'DATE',
  DATETIME: 'DATETIME',
  ENUM_DROPDOWN: 'ENUM_DROPDOWN',
  MULTI_SELECT: 'MULTI_SELECT',
  CURRENCY: 'CURRENCY',
  PERCENTAGE: 'PERCENTAGE',
  FORMULA: 'FORMULA',
  RELATION_LOOKUP: 'RELATION_LOOKUP'
} as const;
export type FieldDataType = (typeof FieldDataType)[keyof typeof FieldDataType];

export const UserRole = {
  GLOBAL_ADMIN: 'GLOBAL_ADMIN',
  SALES_VP: 'SALES_VP',
  SALES_MANAGER: 'SALES_MANAGER',
  ACCOUNT_EXECUTIVE: 'ACCOUNT_EXECUTIVE',
  SALES_DEVELOPMENT_REP: 'SALES_DEVELOPMENT_REP',
  SUPPORT_DIRECTOR: 'SUPPORT_DIRECTOR',
  SUPPORT_SPECIALIST: 'SUPPORT_SPECIALIST',
  MARKETING_MANAGER: 'MARKETING_MANAGER',
  FINANCE_CONTROLLER: 'FINANCE_CONTROLLER',
  READ_ONLY_AUDITOR: 'READ_ONLY_AUDITOR'
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const AuditAction = {
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  EXPORT: 'EXPORT',
  STAGE_TRANSITION: 'STAGE_TRANSITION',
  QUALIFICATION_CONVERT: 'QUALIFICATION_CONVERT',
  PERMISSION_GRANT: 'PERMISSION_GRANT',
  SCHEMA_ALTER: 'SCHEMA_ALTER',
  WORKFLOW_EXECUTE: 'WORKFLOW_EXECUTE'
} as const;
export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];
