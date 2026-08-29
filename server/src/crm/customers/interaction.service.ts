/**
 * ApexCore Enterprise CRM - Customer Interaction & Activity Service
 * Manages omnichannel interaction logs across Calls, Emails, Meetings,
 * Demos, Support Tickets, and Stage Change events.
 */

import crypto from 'node:crypto';
import type { CRMDatabase } from '../database/crm_database.ts';
import type { CustomerInteraction } from '../domain/types.ts';
import { InteractionType, UserRole } from '../domain/enums.ts';

export class InteractionService {
  private db: CRMDatabase;

  constructor(db: CRMDatabase) {
    this.db = db;
  }

  /**
   * Logs a customer interaction event.
   */
  public logInteraction(
    data: {
      customerId: string;
      contactId?: string;
      contactName?: string;
      userId: string;
      userName: string;
      userRole?: UserRole;
      type: InteractionType;
      subject: string;
      description: string;
      channel?: string;
      durationMinutes?: number;
      sentiment?: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
      outcome?: string;
      nextSteps?: string;
      scheduledAt?: string;
      completedAt?: string;
    },
    actorId: string = 'system'
  ): CustomerInteraction {
    const customer = this.db.customers.get(data.customerId);
    if (!customer) {
      throw new Error(`Customer not found with ID: ${data.customerId}`);
    }

    const now = new Date().toISOString();
    const interactionId = `int_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    const interaction: CustomerInteraction = {
      id: interactionId,
      tenantId: customer.tenantId,
      customerId: data.customerId,
      customerName: customer.name,
      contactId: data.contactId,
      contactName: data.contactName,
      userId: data.userId,
      userName: data.userName,
      userRole: data.userRole || UserRole.SALES_REPRESENTATIVE,
      type: data.type,
      subject: data.subject,
      description: data.description,
      channel: data.channel || 'DIRECT',
      durationMinutes: data.durationMinutes || 30,
      sentiment: data.sentiment || 'POSITIVE',
      outcome: data.outcome,
      nextSteps: data.nextSteps,
      scheduledAt: data.scheduledAt,
      completedAt: data.completedAt || now,
      createdAt: now,
      updatedAt: now,
      createdBy: actorId,
      updatedBy: actorId
    };

    this.db.indexInteraction(interaction);

    // Update customer last activity timestamp
    customer.updatedAt = now;
    this.db.indexCustomer(customer);

    return interaction;
  }

  /**
   * Retrieves chronological interaction timeline for a customer.
   */
  public getCustomerInteractions(customerId: string): CustomerInteraction[] {
    return this.db.getInteractionsForCustomer(customerId);
  }
}
