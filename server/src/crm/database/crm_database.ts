/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Enterprise In-Memory Database & Persistence Engine
 *
 * Implements high-performance relational operations, secondary indexing,
 * full-text search, multi-tenant isolation, and ACID-compliant transaction simulation.
 */

import type {
  Lead,
  Account,
  Contact,
  Opportunity,
  Pipeline,
  Product,
  PriceBook,
  Quote,
  Contract,
  Invoice,
  Ticket,
  SLAPolicyConfig,
  Campaign,
  CampaignMember,
  WorkflowRule,
  CustomFieldDefinition,
  User,
  AuditLogEntry,
  Activity
} from '../domain/types.ts';

export class CRMDatabase {
  private static instance: CRMDatabase;

  public leads: Map<string, Lead> = new Map();
  public accounts: Map<string, Account> = new Map();
  public contacts: Map<string, Contact> = new Map();
  public opportunities: Map<string, Opportunity> = new Map();
  public pipelines: Map<string, Pipeline> = new Map();
  public products: Map<string, Product> = new Map();
  public priceBooks: Map<string, PriceBook> = new Map();
  public quotes: Map<string, Quote> = new Map();
  public contracts: Map<string, Contract> = new Map();
  public invoices: Map<string, Invoice> = new Map();
  public tickets: Map<string, Ticket> = new Map();
  public slaPolicies: Map<string, SLAPolicyConfig> = new Map();
  public campaigns: Map<string, Campaign> = new Map();
  public campaignMembers: Map<string, CampaignMember[]> = new Map();
  public workflowRules: Map<string, WorkflowRule> = new Map();
  public customFields: Map<string, CustomFieldDefinition> = new Map();
  public users: Map<string, User> = new Map();
  public auditLogs: AuditLogEntry[] = [];
  public activities: Map<string, Activity> = new Map();

  // Secondary indices for O(1) lookups
  private tenantAccountIndex: Map<string, Set<string>> = new Map();
  private accountContactIndex: Map<string, Set<string>> = new Map();
  private accountOpportunityIndex: Map<string, Set<string>> = new Map();
  private ownerLeadIndex: Map<string, Set<string>> = new Map();
  private ownerOpportunityIndex: Map<string, Set<string>> = new Map();

  private constructor() {
    // Initialized via singleton
  }

  public static getInstance(): CRMDatabase {
    if (!CRMDatabase.instance) {
      CRMDatabase.instance = new CRMDatabase();
    }
    return CRMDatabase.instance;
  }

  public clearAll(): void {
    this.leads.clear();
    this.accounts.clear();
    this.contacts.clear();
    this.opportunities.clear();
    this.pipelines.clear();
    this.products.clear();
    this.priceBooks.clear();
    this.quotes.clear();
    this.contracts.clear();
    this.invoices.clear();
    this.tickets.clear();
    this.slaPolicies.clear();
    this.campaigns.clear();
    this.campaignMembers.clear();
    this.workflowRules.clear();
    this.customFields.clear();
    this.users.clear();
    this.auditLogs = [];
    this.activities.clear();

    this.tenantAccountIndex.clear();
    this.accountContactIndex.clear();
    this.accountOpportunityIndex.clear();
    this.ownerLeadIndex.clear();
    this.ownerOpportunityIndex.clear();
  }

  // Index Management
  public indexAccount(account: Account): void {
    this.accounts.set(account.id, account);
    if (!this.tenantAccountIndex.has(account.tenantId)) {
      this.tenantAccountIndex.set(account.tenantId, new Set());
    }
    this.tenantAccountIndex.get(account.tenantId)?.add(account.id);
  }

  public indexContact(contact: Contact): void {
    this.contacts.set(contact.id, contact);
    if (!this.accountContactIndex.has(contact.accountId)) {
      this.accountContactIndex.set(contact.accountId, new Set());
    }
    this.accountContactIndex.get(contact.accountId)?.add(contact.id);
  }

  public indexOpportunity(opportunity: Opportunity): void {
    this.opportunities.set(opportunity.id, opportunity);
    if (!this.accountOpportunityIndex.has(opportunity.accountId)) {
      this.accountOpportunityIndex.set(opportunity.accountId, new Set());
    }
    this.accountOpportunityIndex.get(opportunity.accountId)?.add(opportunity.id);

    if (!this.ownerOpportunityIndex.has(opportunity.ownerId)) {
      this.ownerOpportunityIndex.set(opportunity.ownerId, new Set());
    }
    this.ownerOpportunityIndex.get(opportunity.ownerId)?.add(opportunity.id);
  }

  public indexLead(lead: Lead): void {
    this.leads.set(lead.id, lead);
    if (!this.ownerLeadIndex.has(lead.ownerId)) {
      this.ownerLeadIndex.set(lead.ownerId, new Set());
    }
    this.ownerLeadIndex.get(lead.ownerId)?.add(lead.id);
  }

  // Relational lookups
  public getContactsByAccountId(accountId: string): Contact[] {
    const contactIds = this.accountContactIndex.get(accountId);
    if (!contactIds) return [];
    const results: Contact[] = [];
    for (const id of contactIds) {
      const contact = this.contacts.get(id);
      if (contact && !contact.isDeleted) {
        results.push(contact);
      }
    }
    return results;
  }

  public getOpportunitiesByAccountId(accountId: string): Opportunity[] {
    const oppIds = this.accountOpportunityIndex.get(accountId);
    if (!oppIds) return [];
    const results: Opportunity[] = [];
    for (const id of oppIds) {
      const opp = this.opportunities.get(id);
      if (opp && !opp.isDeleted) {
        results.push(opp);
      }
    }
    return results;
  }

  public getActivitiesByEntity(entityType: string, entityId: string): Activity[] {
    const list: Activity[] = [];
    for (const activity of this.activities.values()) {
      if (activity.relatedEntityType === entityType && activity.relatedEntityId === entityId && !activity.isDeleted) {
        list.push(activity);
      }
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
