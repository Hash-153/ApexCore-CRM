/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Domain Models & Type Specifications
 *
 * Designed with rigorous TypeScript type-safety for enterprise B2B/B2C
 * revenue operations, CPQ, SLA helpdesk, and automated sales orchestration.
 */

import type {
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
  AccountType,
  AccountTier,
  IndustryClassification,
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

// ============================================================================
// 1. User Authentication & 5 Core RBAC Models
// ============================================================================
export interface User extends BaseEntity {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  jobTitle: string;
  avatarUrl?: string;
  phoneNumber?: string;
  quotaARR?: number;
  lastLoginAt?: string;
  failedLoginAttempts: number;
  lockedUntil?: string;
  passwordResetToken?: string;
  passwordResetExpiresAt?: string;
}

export interface Session {
  token: string;
  userId: string;
  tenantId: string;
  role: UserRole;
  expiresAt: string;
  createdAt: string;
}

export interface PasswordResetToken {
  id: string;
  token: string;
  userId: string;
  email: string;
  expiresAt: string;
  used: boolean;
  createdAt: string;
}

export interface RolePermissions {
  role: UserRole;
  description: string;
  permissions: string[];
}

// ============================================================================
// 2. Customer Management Models
// ============================================================================
export interface Customer extends BaseEntity {
  customerNumber: string;
  name: string;
  legalName?: string;
  domain?: string;
  status: CustomerStatus;
  tier: CustomerTier;
  lifecycleStage: CustomerLifecycleStage;
  industry: string;
  industryCode?: string;
  annualRevenue: number;
  employeeCount: number;
  parentCustomerId?: string;
  ownerId: string;
  ownerName: string;
  healthScore: number; // 0-100
  churnRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  expansionProbability: number; // 0-100
  lifetimeValue: number;
  activeARR: number;
  phone: string;
  email: string;
  website: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  tags: string[];
  customFields?: CustomFieldValues;
}

export interface CustomerInteraction extends BaseEntity {
  customerId: string;
  customerName: string;
  contactId?: string;
  contactName?: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  type: InteractionType;
  subject: string;
  description: string;
  channel: string;
  durationMinutes?: number;
  sentiment?: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  outcome?: string;
  nextSteps?: string;
  scheduledAt?: string;
  completedAt?: string;
}

export interface CustomerNote extends BaseEntity {
  customerId: string;
  userId: string;
  authorName: string;
  authorRole: UserRole;
  title: string;
  content: string;
  isPinned: boolean;
  tags: string[];
}

export interface CustomerAttachment extends BaseEntity {
  customerId: string;
  fileName: string;
  fileSize: number; // in bytes
  mimeType: string;
  category: AttachmentCategory;
  downloadUrl: string;
  uploadedBy: string;
  uploaderName: string;
  version: string;
  checksumSha256?: string;
}

// ============================================================================
// 3. Lead & Qualification (BANT) Models
// ============================================================================
export interface BANTScore {
  budgetScore: number; // 0-25
  authorityScore: number; // 0-25
  needScore: number; // 0-25
  timelineScore: number; // 0-25
  totalScore: number; // 0-100
  qualificationSummary: string;
  isQualified: boolean;
}

export interface Lead extends BaseEntity {
  leadNumber: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  employeeCount: number;
  annualRevenue: number;
  website: string;
  status: LeadStatus;
  rating: LeadRating;
  source: LeadSource;
  sourceCampaignId?: string;
  ownerId: string;
  ownerName: string;
  score: number;
  bant: BANTScore;
  convertedAccountId?: string;
  convertedContactId?: string;
  convertedOpportunityId?: string;
  convertedAt?: string;
  notes?: string;
  customFields?: CustomFieldValues;
}

// ============================================================================
// 4. Contact & Influence Graph
// ============================================================================
export interface Contact extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobilePhone?: string;
  title: string;
  department: string;
  accountId: string;
  accountName: string;
  reportsToContactId?: string;
  persona: ContactPersona;
  decisionInfluenceScore: number; // 1-10
  sentimentScore: number; // 1-10
  isPrimaryForAccount: boolean;
  doNotCall: boolean;
  emailOptOut: boolean;
  preferredContactMethod: 'EMAIL' | 'PHONE' | 'SLACK' | 'SMS';
  customFields?: CustomFieldValues;
}

// ============================================================================
// 5. Deal Pipeline & MEDDIC Forecasting
// ============================================================================
export interface MEDDICAssessment {
  metrics: string;
  economicBuyer: string;
  decisionCriteria: string;
  decisionProcess: string;
  identifyPain: string;
  champion: string;
  isComplete: boolean;
  scorePercentage: number;
}

export interface Opportunity extends BaseEntity {
  opportunityNumber: string;
  name: string;
  accountId: string;
  accountName: string;
  primaryContactId: string;
  primaryContactName: string;
  stage: DealStage;
  probabilityPercentage: number;
  forecastCategory: ForecastCategory;
  amount: number;
  currency: string;
  expectedRevenue: number;
  closeDate: string;
  actualCloseDate?: string;
  pipelineId: string;
  ownerId: string;
  ownerName: string;
  leadSource: LeadSource;
  campaignId?: string;
  lostReason?: string;
  wonReason?: string;
  meddic: MEDDICAssessment;
  lineItemsCount: number;
  customFields?: CustomFieldValues;
}

// ============================================================================
// 6. CPQ & Dynamic Pricing Models
// ============================================================================
export interface Product extends BaseEntity {
  sku: string;
  name: string;
  description: string;
  category: string;
  unitPrice: number;
  currency: string;
  isActive: boolean;
  billingFrequency: 'MONTHLY' | 'ANNUAL' | 'ONE_TIME';
  taxCode: string;
}

export interface PriceBookTierDiscount {
  minQuantity: number;
  maxQuantity?: number;
  discountPercentage: number;
}

export interface PriceBookEntry extends BaseEntity {
  priceBookId: string;
  productId: string;
  productName: string;
  productSku: string;
  listPrice: number;
  currency: string;
  floorPrice: number; // Lowest allowed price without VP approval
  volumeTiers: PriceBookTierDiscount[];
}

export interface PriceBook extends BaseEntity {
  name: string;
  description: string;
  isStandard: boolean;
  isActive: boolean;
  currency: string;
  effectiveFrom: string;
  effectiveTo?: string;
}

export interface QuoteLineItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  listPrice: number;
  volumeDiscountPercentage: number;
  customDiscountType?: DiscountType;
  customDiscountValue?: number;
  finalUnitPrice: number;
  totalExtendedPrice: number;
  requiresFloorApproval: boolean;
}

export interface Quote extends BaseEntity {
  quoteNumber: string;
  opportunityId: string;
  opportunityName: string;
  priceBookId: string;
  status: QuoteStatus;
  currency: string;
  subtotal: number;
  totalDiscountAmount: number;
  taxAmount: number;
  grandTotal: number;
  termsAndConditions: string;
  validUntil: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  lineItems: QuoteLineItem[];
}

// ============================================================================
// 7. Contracts & Billing Models
// ============================================================================
export interface Contract extends BaseEntity {
  contractNumber: string;
  accountId: string;
  accountName: string;
  opportunityId: string;
  status: ContractStatus;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  totalContractValue: number;
  annualRecurringRevenue: number;
  paymentTerms: string;
  billingCycle: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
}

export interface Invoice extends BaseEntity {
  invoiceNumber: string;
  contractId: string;
  accountId: string;
  accountName: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
}

// ============================================================================
// 8. Helpdesk & SLA Engine Models
// ============================================================================
export interface SLAPerformance {
  policyTier: SLAPolicyTier;
  firstResponseDueAt: string;
  resolutionDueAt: string;
  firstResponseMetAt?: string;
  resolutionMetAt?: string;
  isFirstResponseBreached: boolean;
  isResolutionBreached: boolean;
  minutesRemainingToResolution: number;
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

export interface Ticket extends BaseEntity {
  ticketNumber: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: TicketChannel;
  accountId: string;
  accountName: string;
  contactId: string;
  contactName: string;
  contactEmail: string;
  assigneeId: string;
  assigneeName: string;
  tags: string[];
  sla: SLAPerformance;
  comments: TicketComment[];
}

// ============================================================================
// 9. Marketing Automation & Attribution
// ============================================================================
export interface Campaign extends BaseEntity {
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: string;
  endDate?: string;
  budgetCost: number;
  actualCost: number;
  expectedRevenue: number;
  actualRevenueWon: number;
  roiPercentage: number;
  membersCount: number;
  convertedCount: number;
  description: string;
}

// ============================================================================
// 10. Visual Workflow Automation Engine
// ============================================================================
export interface WorkflowCondition {
  field: string;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'GREATER_THAN' | 'LESS_THAN' | 'CONTAINS' | 'STARTS_WITH';
  value: any;
}

export interface WorkflowAction {
  type: WorkflowActionType;
  targetField?: string;
  targetValue?: any;
  recipientEmail?: string;
  templateId?: string;
  webhookUrl?: string;
}

export interface WorkflowRule extends BaseEntity {
  name: string;
  description: string;
  entityType: 'LEAD' | 'OPPORTUNITY' | 'ACCOUNT' | 'CUSTOMER' | 'TICKET' | 'QUOTE';
  triggerType: WorkflowTriggerType;
  conditions: WorkflowCondition[];
  conditionLogic: 'AND' | 'OR';
  actions: WorkflowAction[];
  isActive: boolean;
  executionCount: number;
  lastExecutedAt?: string;
}

// ============================================================================
// 11. Dynamic Custom Schemas
// ============================================================================
export interface CustomFieldDefinition extends BaseEntity {
  targetEntity: 'LEAD' | 'OPPORTUNITY' | 'ACCOUNT' | 'CUSTOMER' | 'CONTACT' | 'TICKET';
  fieldName: string;
  fieldKey: string;
  dataType: CustomFieldDataType;
  isRequired: boolean;
  defaultValue?: any;
  dropdownOptions?: string[];
  helpText?: string;
}

// ============================================================================
// 12. Security & SHA-256 Audit Trails
// ============================================================================
export interface AuditLogEntry {
  id: string;
  tenantId: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  clientIp: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
  details: string;
  previousHash: string;
  currentHash: string;
}
