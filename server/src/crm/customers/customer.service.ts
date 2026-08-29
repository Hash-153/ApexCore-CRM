/**
 * ApexCore Enterprise CRM - Customer Management & Account 360 Service
 * Implements comprehensive Customer CRUD, status lifecycle management,
 * health score computation, churn risk analysis, and customer profile aggregation.
 */

import crypto from 'node:crypto';
import type { CRMDatabase } from '../database/crm_database.ts';
import type { Customer, CustomerInteraction, CustomerNote, CustomerAttachment } from '../domain/types.ts';
import { CustomerStatus, CustomerTier, CustomerLifecycleStage, InteractionType } from '../domain/enums.ts';

export class CustomerService {
  private db: CRMDatabase;

  constructor(db: CRMDatabase) {
    this.db = db;
  }

  /**
   * Adds a new customer record with automated number generation and initial scoring.
   */
  public createCustomer(
    data: {
      tenantId?: string;
      name: string;
      legalName?: string;
      domain?: string;
      status?: CustomerStatus;
      tier?: CustomerTier;
      lifecycleStage?: CustomerLifecycleStage;
      industry?: string;
      annualRevenue?: number;
      employeeCount?: number;
      ownerId: string;
      ownerName: string;
      phone?: string;
      email?: string;
      website?: string;
      billingAddress?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
      tags?: string[];
      customFields?: Record<string, any>;
    },
    actorId: string = 'system'
  ): Customer {
    if (!data.name || data.name.trim() === '') {
      throw new Error('Customer name is required.');
    }

    const now = new Date().toISOString();
    const customerId = `cust_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const customerNumber = `CUST-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const customer: Customer = {
      id: customerId,
      tenantId: data.tenantId || 'tenant_apex_global_001',
      customerNumber,
      name: data.name.trim(),
      legalName: data.legalName || data.name.trim(),
      domain: data.domain || (data.website ? data.website.replace(/https?:\/\//, '').replace(/\/.*$/, '') : ''),
      status: data.status || CustomerStatus.PROSPECT,
      tier: data.tier || CustomerTier.TIER_3_STANDARD,
      lifecycleStage: data.lifecycleStage || CustomerLifecycleStage.OPPORTUNITY,
      industry: data.industry || 'Enterprise Software',
      annualRevenue: data.annualRevenue || 1000000,
      employeeCount: data.employeeCount || 50,
      ownerId: data.ownerId,
      ownerName: data.ownerName,
      healthScore: 85,
      churnRisk: 'LOW',
      expansionProbability: 75,
      lifetimeValue: 0,
      activeARR: 0,
      phone: data.phone || '+1 (555) 000-0000',
      email: data.email || `contact@${data.domain || 'example.com'}`,
      website: data.website || `https://${data.domain || 'example.com'}`,
      billingAddress: data.billingAddress || {
        street: '100 Enterprise Way',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'United States'
      },
      tags: data.tags || ['Inbound Lead', 'Standard Evaluation'],
      customFields: data.customFields || {},
      createdAt: now,
      updatedAt: now,
      createdBy: actorId,
      updatedBy: actorId
    };

    this.db.indexCustomer(customer);

    // Automatically log creation interaction
    this.db.indexInteraction({
      id: `act_${Date.now()}`,
      tenantId: customer.tenantId,
      customerId: customer.id,
      customerName: customer.name,
      userId: actorId,
      userName: data.ownerName || 'Sales Representative',
      userRole: 'Sales Representative' as any,
      type: InteractionType.NOTE,
      subject: 'Customer Account Created',
      description: `Initial customer profile registered in ApexCore CRM by ${data.ownerName}.`,
      channel: 'SYSTEM',
      createdAt: now,
      updatedAt: now,
      createdBy: actorId,
      updatedBy: actorId
    });

    return customer;
  }

  /**
   * Updates an existing customer's details and firmographics.
   */
  public updateCustomer(
    customerId: string,
    updates: Partial<Customer>,
    actorId: string = 'system'
  ): Customer {
    const customer = this.db.customers.get(customerId);
    if (!customer) {
      throw new Error(`Customer not found with ID: ${customerId}`);
    }

    const now = new Date().toISOString();

    Object.assign(customer, updates, {
      updatedAt: now,
      updatedBy: actorId
    });

    this.db.indexCustomer(customer);
    return customer;
  }

  /**
   * Soft-deletes / deactivates a customer.
   */
  public deleteCustomer(customerId: string, actorId: string = 'system'): boolean {
    const customer = this.db.customers.get(customerId);
    if (!customer) {
      throw new Error(`Customer not found with ID: ${customerId}`);
    }

    customer.isDeleted = true;
    customer.status = CustomerStatus.INACTIVE;
    customer.updatedAt = new Date().toISOString();
    customer.updatedBy = actorId;

    this.db.indexCustomer(customer);
    return true;
  }

  /**
   * Transitions customer status with audit logging.
   */
  public setCustomerStatus(customerId: string, newStatus: CustomerStatus, actorId: string = 'system'): Customer {
    const customer = this.db.customers.get(customerId);
    if (!customer) {
      throw new Error(`Customer not found with ID: ${customerId}`);
    }

    const previousStatus = customer.status;
    customer.status = newStatus;
    customer.updatedAt = new Date().toISOString();
    customer.updatedBy = actorId;

    this.db.indexCustomer(customer);

    // Log status transition interaction
    this.db.indexInteraction({
      id: `act_${Date.now()}`,
      tenantId: customer.tenantId,
      customerId: customer.id,
      customerName: customer.name,
      userId: actorId,
      userName: actorId,
      userRole: 'Admin' as any,
      type: InteractionType.STAGE_CHANGE,
      subject: `Status Changed: ${previousStatus} → ${newStatus}`,
      description: `Customer account status updated from ${previousStatus} to ${newStatus}.`,
      channel: 'SYSTEM',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: actorId,
      updatedBy: actorId
    });

    return customer;
  }

  /**
   * Aggregates full Customer 360 profile with all relations.
   */
  public getCustomerProfile(customerId: string): {
    customer: Customer;
    contacts: any[];
    opportunities: any[];
    interactions: CustomerInteraction[];
    notes: CustomerNote[];
    attachments: CustomerAttachment[];
    activeTickets: any[];
    activeContract: any | null;
  } {
    const customer = this.db.customers.get(customerId);
    if (!customer || customer.isDeleted) {
      throw new Error(`Customer not found with ID: ${customerId}`);
    }

    const contacts = this.db.getContactsForCustomer(customerId);
    const opportunities = this.db.getOpportunitiesForCustomer(customerId);
    const interactions = this.db.getInteractionsForCustomer(customerId);
    const notes = this.db.getNotesForCustomer(customerId);
    const attachments = this.db.getAttachmentsForCustomer(customerId);

    const activeTickets = Array.from(this.db.tickets.values()).filter(
      t => t.accountId === customerId && t.status !== 'CLOSED'
    );

    const activeContract = Array.from(this.db.contracts.values()).find(
      c => c.accountId === customerId && c.status === 'EXECUTED_ACTIVE'
    ) || null;

    return {
      customer,
      contacts,
      opportunities,
      interactions,
      notes,
      attachments,
      activeTickets,
      activeContract
    };
  }

  /**
   * Queries customer directory with filters and search.
   */
  public listCustomers(filters?: {
    search?: string;
    status?: CustomerStatus;
    tier?: CustomerTier;
    industry?: string;
    ownerId?: string;
    includeDeleted?: boolean;
  }): Customer[] {
    let list = Array.from(this.db.customers.values());

    if (!filters?.includeDeleted) {
      list = list.filter(c => !c.isDeleted);
    }

    if (filters?.status) {
      list = list.filter(c => c.status === filters.status);
    }

    if (filters?.tier) {
      list = list.filter(c => c.tier === filters.tier);
    }

    if (filters?.industry) {
      list = list.filter(c => c.industry.toLowerCase().includes(filters.industry!.toLowerCase()));
    }

    if (filters?.ownerId) {
      list = list.filter(c => c.ownerId === filters.ownerId);
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.customerNumber.toLowerCase().includes(q) ||
        c.domain?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
