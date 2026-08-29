/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Domain Models & Type Specifications
 *
 * Designed with rigorous TypeScript type-safety for enterprise B2B/B2C
 * revenue operations, CPQ, SLA helpdesk, and automated sales orchestration.
 */

import type {
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
} from './enums.ts';

export interface BaseEntity {
  id: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  isDeleted?: boolean;
}

export interface CustomFieldValues {
  [fieldKey: string]: string | number | boolean | string[] | null | undefined;
}

export interface BANTScore {
  budgetScore: number; // 0-25
  authorityScore: number; // 0-25
  needScore: number; // 0-25
  timelineScore: number; // 0-25
  totalScore: number; // 0-100
  qualificationSummary: string;
  isQualified: boolean;
}

export interface LeadScoreBreakdown {
  demographicScore: number;
  behavioralScore: number;
  bantScore: number;
  overallScore: number; // 0-100
  rating: LeadRating;
  scoringFactors: string[];
}

export interface Lead extends BaseEntity {
  firstName: string;
  lastName: string;
  title: string;
  companyName: string;
  email: string;
  phone: string;
  website?: string;
  industry: IndustryClassification;
  annualRevenue?: number;
  numberOfEmployees?: number;
  source: LeadSource;
  status: LeadStatus;
  rating: LeadRating;
  score: number;
  bant: BANTScore;
  ownerId: string;
  ownerName: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  notes?: string;
  convertedAccountId?: string;
  convertedContactId?: string;
  convertedOpportunityId?: string;
  convertedAt?: string;
  customFields?: CustomFieldValues;
}

export interface AccountHierarchyNode {
  accountId: string;
  accountName: string;
  tier: AccountTier;
  annualRevenue: number;
  childAccounts: AccountHierarchyNode[];
}

export interface AccountHealthMetrics {
  healthScore: number; // 0-100
  churnRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  expansionProbability: number; // 0-100%
  activeOpportunitiesValue: number;
  totalWonDealsValue: number;
  openTicketsCount: number;
  lastContactedDaysAgo: number;
  relationshipStrengthScore: number;
}

export interface Account extends BaseEntity {
  name: string;
  type: AccountType;
  tier: AccountTier;
  industry: IndustryClassification;
  website?: string;
  phone: string;
  annualRevenue: number;
  employeeCount: number;
  parentAccountId?: string;
  parentAccountName?: string;
  ownerId: string;
  ownerName: string;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
  shippingStreet?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  healthMetrics: AccountHealthMetrics;
  customFields?: CustomFieldValues;
}

export interface Contact extends BaseEntity {
  accountId: string;
  accountName: string;
  firstName: string;
  lastName: string;
  title: string;
  department?: string;
  email: string;
  phone: string;
  mobilePhone?: string;
  persona: ContactPersona;
  isPrimaryContact: boolean;
  decisionInfluenceScore: number; // 1-10
  sentimentIndex: number; // -1.0 to 1.0
  doNotCall?: boolean;
  emailOptOut?: boolean;
  gdprConsentDate?: string;
  lastInteractionDate?: string;
  ownerId: string;
  ownerName: string;
  customFields?: CustomFieldValues;
}

export interface MEDDICAssessment {
  metrics: string;
  economicBuyer: string;
  decisionCriteria: string;
  decisionProcess: string;
  identifyPain: string;
  champion: string;
  isComplete: boolean;
}

export interface OpportunityStageHistory {
  fromStage?: DealStage;
  toStage: DealStage;
  changedAt: string;
  changedBy: string;
  durationInPreviousStageDays: number;
  stageNote?: string;
}

export interface Opportunity extends BaseEntity {
  name: string;
  accountId: string;
  accountName: string;
  primaryContactId?: string;
  primaryContactName?: string;
  stage: DealStage;
  amount: number;
  expectedRevenue: number;
  probabilityPercentage: number;
  forecastCategory: ForecastCategory;
  pipelineId: string;
  pipelineName: string;
  closeDate: string;
  type: 'NEW_BUSINESS' | 'UPSELL' | 'RENEWAL' | 'CROSS_SELL';
  leadSource?: LeadSource;
  ownerId: string;
  ownerName: string;
  meddic: MEDDICAssessment;
  stageHistory: OpportunityStageHistory[];
  winLossReason?: string;
  competitors?: string[];
  daysInCurrentStage: number;
  isStagnant: boolean;
  customFields?: CustomFieldValues;
}

export interface PipelineStageConfig {
  id: string;
  stage: DealStage;
  displayName: string;
  defaultProbability: number;
  defaultForecastCategory: ForecastCategory;
  orderIndex: number;
  requiredFieldsToEnter?: string[];
}

export interface Pipeline extends BaseEntity {
  name: string;
  description: string;
  isDefault: boolean;
  stages: PipelineStageConfig[];
}

export interface Product extends BaseEntity {
  sku: string;
  name: string;
  description: string;
  category: string;
  unitPrice: number;
  currency: string;
  isActive: boolean;
  billingFrequency: 'ONE_TIME' | 'MONTHLY' | 'ANNUAL';
  taxCode: string;
  costPrice?: number;
}

export interface PriceBookEntry {
  productId: string;
  productSku: string;
  productName: string;
  listPrice: number;
  minimumPrice: number;
  tierDiscounts?: {
    minQuantity: number;
    discountPercentage: number;
  }[];
}

export interface PriceBook extends BaseEntity {
  name: string;
  currency: string;
  isActive: boolean;
  isStandard: boolean;
  entries: PriceBookEntry[];
}

export interface QuoteLineItem {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  quantity: number;
  listPrice: number;
  unitPrice: number;
  discountType: DiscountType;
  discountValue: number;
  discountAmount: number;
  subtotal: number;
  taxRatePercentage: number;
  taxAmount: number;
  totalAmount: number;
  notes?: string;
}

export interface Quote extends BaseEntity {
  quoteNumber: string;
  opportunityId: string;
  opportunityName: string;
  accountId: string;
  accountName: string;
  primaryContactId: string;
  primaryContactName: string;
  priceBookId: string;
  status: QuoteStatus;
  expirationDate: string;
  lineItems: QuoteLineItem[];
  subtotal: number;
  totalDiscountAmount: number;
  taxAmount: number;
  grandTotal: number;
  currency: string;
  paymentTerms: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  version: number;
  notes?: string;
}

export interface Contract extends BaseEntity {
  contractNumber: string;
  accountId: string;
  accountName: string;
  opportunityId?: string;
  quoteId?: string;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  billingCycle: SubscriptionBillingCycle;
  contractValueARR: number;
  totalContractValueTCV: number;
  autoRenew: boolean;
  signedDate?: string;
  signeeName?: string;
  ownerId: string;
  termsAndConditions: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxAmount: number;
  totalAmount: number;
}

export interface Invoice extends BaseEntity {
  invoiceNumber: string;
  contractId: string;
  accountId: string;
  accountName: string;
  issueDate: string;
  dueDate: string;
  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'PARTIALLY_PAID' | 'OVERDUE' | 'VOIDED';
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  currency: string;
  lineItems: InvoiceLineItem[];
}

export interface TicketComment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  isInternalOnly: boolean;
  content: string;
  createdAt: string;
}

export interface TicketSLAPerformance {
  policyTier: SLAPolicyTier;
  firstResponseDueAt: string;
  resolutionDueAt: string;
  firstResponseMetAt?: string;
  resolvedAt?: string;
  isFirstResponseBreached: boolean;
  isResolutionBreached: boolean;
  minutesRemainingToResolution: number;
}

export interface Ticket extends BaseEntity {
  ticketNumber: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: TicketChannel;
  accountId?: string;
  accountName?: string;
  contactId?: string;
  contactName?: string;
  contactEmail?: string;
  assigneeId?: string;
  assigneeName?: string;
  sla: TicketSLAPerformance;
  tags: string[];
  comments: TicketComment[];
  csatScore?: number; // 1-5
  csatFeedback?: string;
}

export interface SLAPolicyConfig {
  id: string;
  tier: SLAPolicyTier;
  name: string;
  firstResponseMinutes: {
    P1_URGENT: number;
    P2_HIGH: number;
    P3_MEDIUM: number;
    P4_LOW: number;
  };
  resolutionHours: {
    P1_URGENT: number;
    P2_HIGH: number;
    P3_MEDIUM: number;
    P4_LOW: number;
  };
  businessHoursOnly: boolean;
}

export interface CampaignMember {
  id: string;
  leadId?: string;
  contactId?: string;
  name: string;
  email: string;
  companyName: string;
  status: 'SENT' | 'OPENED' | 'CLICKED' | 'BOUNCED' | 'UNSUBSCRIBED' | 'CONVERTED';
  sentAt?: string;
  engagedAt?: string;
}

export interface Campaign extends BaseEntity {
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  budgetedCost: number;
  actualCost: number;
  expectedRevenue: number;
  actualRevenueWon: number;
  targetAudience: string;
  membersCount: number;
  openedCount: number;
  clickedCount: number;
  convertedCount: number;
  roiPercentage: number;
  ownerId: string;
  ownerName: string;
}

export interface WorkflowCondition {
  field: string;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'GREATER_THAN' | 'LESS_THAN' | 'IS_EMPTY' | 'IS_NOT_EMPTY';
  value: string | number | boolean;
}

export interface WorkflowAction {
  id: string;
  type: WorkflowActionType;
  targetField?: string;
  value?: string | number | boolean;
  recipientEmail?: string;
  emailSubjectTemplate?: string;
  emailBodyTemplate?: string;
  taskTitleTemplate?: string;
  taskDueDaysOffset?: number;
  webhookUrl?: string;
}

export interface WorkflowRule extends BaseEntity {
  name: string;
  description: string;
  entityType: 'LEAD' | 'OPPORTUNITY' | 'ACCOUNT' | 'TICKET';
  triggerType: WorkflowTriggerType;
  isActive: boolean;
  conditions: WorkflowCondition[];
  conditionLogic: 'AND' | 'OR';
  actions: WorkflowAction[];
  executionCount: number;
  lastExecutedAt?: string;
}

export interface CustomFieldDefinition extends BaseEntity {
  targetEntity: 'LEAD' | 'ACCOUNT' | 'CONTACT' | 'OPPORTUNITY' | 'TICKET';
  fieldName: string;
  fieldKey: string;
  dataType: FieldDataType;
  isRequired: boolean;
  defaultValue?: string | number | boolean;
  dropdownOptions?: string[];
  helpText?: string;
  orderIndex: number;
}

export interface User extends BaseEntity {
  email: string;
  fullName: string;
  role: UserRole;
  department: string;
  isActive: boolean;
  quotaARR: number;
  territory: string;
  permissions: string[];
}

export interface AuditLogEntry {
  id: string;
  tenantId: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  clientIp: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  details: string;
  previousValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  previousHash: string;
  currentHash: string;
}

export interface Activity extends BaseEntity {
  type: ActivityType;
  subject: string;
  description: string;
  priority: ActivityPriority;
  status: ActivityStatus;
  dueDate: string;
  completedDate?: string;
  relatedEntityType: 'LEAD' | 'ACCOUNT' | 'CONTACT' | 'OPPORTUNITY' | 'TICKET';
  relatedEntityId: string;
  relatedEntityName: string;
  ownerId: string;
  ownerName: string;
}

export interface ExecutiveKPIOverview {
  totalPipelineARR: number;
  totalClosedWonARR: number;
  averageDealSize: number;
  winRatePercentage: number;
  leadConversionRatePercentage: number;
  activeLeadsCount: number;
  openDealsCount: number;
  openTicketsCount: number;
  slaComplianceRatePercentage: number;
  salesCycleAverageDays: number;
}
