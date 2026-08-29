/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Enterprise In-Memory Database & Persistence Engine
 */

import type {
  User,
  Session,
  PasswordResetToken,
  Customer,
  CustomerInteraction,
  CustomerNote,
  CustomerAttachment,
  Lead,
  Contact,
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
  AuditLogEntry
} from '../domain/types.ts';

export class CRMDatabase {
  private static instance: CRMDatabase;

  // 1. User Auth & Security Store
  public users: Map<string, User> = new Map();
  public sessions: Map<string, Session> = new Map();
  public passwordResetTokens: Map<string, PasswordResetToken> = new Map();
  public userEmailIndex: Map<string, string> = new Map();

  // 2. Customer Management Store
  public customers: Map<string, Customer> = new Map();
  public interactions: Map<string, CustomerInteraction> = new Map();
  public notes: Map<string, CustomerNote> = new Map();
  public attachments: Map<string, CustomerAttachment> = new Map();

  // 3. Core CRM Revenue Stores
  public accounts: Map<string, Customer> = new Map();
  public contacts: Map<string, Contact> = new Map();
  public leads: Map<string, Lead> = new Map();
  public opportunities: Map<string, Opportunity> = new Map();
  public pipelines: Map<string, any> = new Map();
  public products: Map<string, Product> = new Map();
  public priceBooks: Map<string, any> = new Map();
  public priceBookEntries: Map<string, PriceBookEntry[]> = new Map();
  public quotes: Map<string, any> = new Map();
  public contracts: Map<string, Contract> = new Map();
  public invoices: Map<string, Invoice> = new Map();
  public tickets: Map<string, any> = new Map();
  public slaPolicies: Map<string, any> = new Map();
  public campaigns: Map<string, Campaign> = new Map();
  public workflowRules: Map<string, WorkflowRule> = new Map();
  public customFields: Map<string, CustomFieldDefinition> = new Map();
  public activities: Map<string, any> = new Map();
  public auditLogs: AuditLogEntry[] = [];

  // Secondary indices
  private customerContactIndex: Map<string, Set<string>> = new Map();
  private customerOpportunityIndex: Map<string, Set<string>> = new Map();
  private customerInteractionIndex: Map<string, Set<string>> = new Map();
  private customerNotesIndex: Map<string, Set<string>> = new Map();
  private customerAttachmentsIndex: Map<string, Set<string>> = new Map();
  private ownerLeadIndex: Map<string, Set<string>> = new Map();
  private ownerOpportunityIndex: Map<string, Set<string>> = new Map();

  private constructor() {}

  public static getInstance(): CRMDatabase {
    if (!CRMDatabase.instance) {
      CRMDatabase.instance = new CRMDatabase();
    }
    return CRMDatabase.instance;
  }

  public reset(): void {
    this.users.clear();
    this.sessions.clear();
    this.passwordResetTokens.clear();
    this.userEmailIndex.clear();
    this.customers.clear();
    this.interactions.clear();
    this.notes.clear();
    this.attachments.clear();
    this.accounts.clear();
    this.contacts.clear();
    this.leads.clear();
    this.opportunities.clear();
    this.pipelines.clear();
    this.products.clear();
    this.priceBooks.clear();
    this.priceBookEntries.clear();
    this.quotes.clear();
    this.contracts.clear();
    this.invoices.clear();
    this.tickets.clear();
    this.slaPolicies.clear();
    this.campaigns.clear();
    this.workflowRules.clear();
    this.customFields.clear();
    this.activities.clear();
    this.auditLogs = [];
    this.customerContactIndex.clear();
    this.customerOpportunityIndex.clear();
    this.customerInteractionIndex.clear();
    this.customerNotesIndex.clear();
    this.customerAttachmentsIndex.clear();
    this.ownerLeadIndex.clear();
    this.ownerOpportunityIndex.clear();
  }

  public indexUser(user: User): void {
    this.users.set(user.id, user);
    this.userEmailIndex.set(user.email.toLowerCase(), user.id);
  }

  public getUserByEmail(email: string): User | undefined {
    const userId = this.userEmailIndex.get(email.toLowerCase());
    if (!userId) return undefined;
    return this.users.get(userId);
  }

  public indexCustomer(customer: Customer): void {
    this.customers.set(customer.id, customer);
    this.accounts.set(customer.id, customer);
  }

  public indexAccount(account: any): void {
    this.indexCustomer(account);
  }

  public indexLead(lead: Lead): void {
    this.leads.set(lead.id, lead);
    if (!this.ownerLeadIndex.has(lead.ownerId)) {
      this.ownerLeadIndex.set(lead.ownerId, new Set());
    }
    this.ownerLeadIndex.get(lead.ownerId)!.add(lead.id);
  }

  public indexContact(contact: Contact): void {
    this.contacts.set(contact.id, contact);
    if (!this.customerContactIndex.has(contact.accountId)) {
      this.customerContactIndex.set(contact.accountId, new Set());
    }
    this.customerContactIndex.get(contact.accountId)!.add(contact.id);
  }

  public getContactsForCustomer(customerId: string): Contact[] {
    const contactIds = this.customerContactIndex.get(customerId);
    if (!contactIds) return [];
    return Array.from(contactIds)
      .map(id => this.contacts.get(id))
      .filter((c): c is Contact => c !== undefined && !c.isDeleted);
  }

  public indexOpportunity(opp: Opportunity): void {
    this.opportunities.set(opp.id, opp);
    if (!this.customerOpportunityIndex.has(opp.accountId)) {
      this.customerOpportunityIndex.set(opp.accountId, new Set());
    }
    this.customerOpportunityIndex.get(opp.accountId)!.add(opp.id);

    if (!this.ownerOpportunityIndex.has(opp.ownerId)) {
      this.ownerOpportunityIndex.set(opp.ownerId, new Set());
    }
    this.ownerOpportunityIndex.get(opp.ownerId)!.add(opp.id);
  }

  public getOpportunitiesForCustomer(customerId: string): Opportunity[] {
    const oppIds = this.customerOpportunityIndex.get(customerId);
    if (!oppIds) return [];
    return Array.from(oppIds)
      .map(id => this.opportunities.get(id))
      .filter((o): o is Opportunity => o !== undefined && !o.isDeleted);
  }

  public indexInteraction(interaction: CustomerInteraction): void {
    this.interactions.set(interaction.id, interaction);
    if (!this.customerInteractionIndex.has(interaction.customerId)) {
      this.customerInteractionIndex.set(interaction.customerId, new Set());
    }
    this.customerInteractionIndex.get(interaction.customerId)!.add(interaction.id);
  }

  public getInteractionsForCustomer(customerId: string): CustomerInteraction[] {
    const ids = this.customerInteractionIndex.get(customerId);
    if (!ids) return [];
    return Array.from(ids)
      .map(id => this.interactions.get(id))
      .filter((i): i is CustomerInteraction => i !== undefined && !i.isDeleted)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public indexNote(note: CustomerNote): void {
    this.notes.set(note.id, note);
    if (!this.customerNotesIndex.has(note.customerId)) {
      this.customerNotesIndex.set(note.customerId, new Set());
    }
    this.customerNotesIndex.get(note.customerId)!.add(note.id);
  }

  public getNotesForCustomer(customerId: string): CustomerNote[] {
    const ids = this.customerNotesIndex.get(customerId);
    if (!ids) return [];
    return Array.from(ids)
      .map(id => this.notes.get(id))
      .filter((n): n is CustomerNote => n !== undefined && !n.isDeleted)
      .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public indexAttachment(attachment: CustomerAttachment): void {
    this.attachments.set(attachment.id, attachment);
    if (!this.customerAttachmentsIndex.has(attachment.customerId)) {
      this.customerAttachmentsIndex.set(attachment.customerId, new Set());
    }
    this.customerAttachmentsIndex.get(attachment.customerId)!.add(attachment.id);
  }

  public getAttachmentsForCustomer(customerId: string): CustomerAttachment[] {
    const ids = this.customerAttachmentsIndex.get(customerId);
    if (!ids) return [];
    return Array.from(ids)
      .map(id => this.attachments.get(id))
      .filter((a): a is CustomerAttachment => a !== undefined && !a.isDeleted)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
