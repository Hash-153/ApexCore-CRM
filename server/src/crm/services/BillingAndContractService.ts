/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Billing, Contracts & Subscription Revenue Service
 *
 * Implements ARR/MRR waterfall reporting, subscription proration calculations,
 * and automated invoice generation.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import { ContractStatus, SubscriptionBillingCycle } from '../domain/enums.ts';
import type { Contract, Invoice } from '../domain/types.ts';

export interface SubscriptionWaterfallReport {
  startingARR: number;
  newBusinessARR: number;
  expansionARR: number;
  contractionARR: number;
  churnARR: number;
  endingARR: number;
  netRevenueRetentionRate: number; // e.g. 115%
}

export class BillingAndContractService {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Generates ARR waterfall analytics across the active customer subscription base.
   */
  public generateARRWaterfall(tenantId: string): SubscriptionWaterfallReport {
    let startingARR = 2400000;
    let newBusinessARR = 0;
    let expansionARR = 0;
    let contractionARR = 0;
    let churnARR = 0;

    for (const contract of this.db.contracts.values()) {
      if (contract.tenantId !== tenantId) continue;

      if (contract.status === ContractStatus.ACTIVE) {
        newBusinessARR += contract.contractValueARR;
      } else if (contract.status === ContractStatus.TERMINATED) {
        churnARR += contract.contractValueARR;
      }
    }

    // Include won deals in current period as expansion / new
    for (const opp of this.db.opportunities.values()) {
      if (opp.tenantId !== tenantId || opp.stage !== 'CLOSED_WON') continue;
      if (opp.type === 'NEW_BUSINESS') {
        newBusinessARR += opp.amount;
      } else if (opp.type === 'UPSELL' || opp.type === 'CROSS_SELL') {
        expansionARR += opp.amount;
      }
    }

    const endingARR = startingARR + newBusinessARR + expansionARR - contractionARR - churnARR;
    const netRevenueRetentionRate = startingARR > 0
      ? Math.round(((startingARR + expansionARR - contractionARR - churnARR) / startingARR) * 1000) / 10
      : 100;

    return {
      startingARR,
      newBusinessARR,
      expansionARR,
      contractionARR,
      churnARR,
      endingARR,
      netRevenueRetentionRate
    };
  }

  /**
   * Calculates mid-cycle subscription proration amount when adding or upgrading seats.
   */
  public calculateSubscriptionProration(params: {
    contractId: string;
    addedARR: number;
    effectiveDate: string;
  }): {
    proratedAmount: number;
    daysRemaining: number;
    totalPeriodDays: number;
  } {
    const contract = this.db.contracts.get(params.contractId);
    if (!contract) {
      throw new Error(`Contract not found with ID: ${params.contractId}`);
    }

    const start = new Date(contract.startDate).getTime();
    const end = new Date(contract.endDate).getTime();
    const effective = new Date(params.effectiveDate).getTime();

    const totalPeriodDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    const daysRemaining = Math.max(0, Math.round((end - effective) / (1000 * 60 * 60 * 24)));

    const dailyRate = params.addedARR / 365;
    const proratedAmount = Math.round(dailyRate * daysRemaining * 100) / 100;

    return {
      proratedAmount,
      daysRemaining,
      totalPeriodDays
    };
  }

  /**
   * Generates a formal invoice from an active contract.
   */
  public generateInvoiceFromContract(contractId: string, actorId: string): Invoice {
    const contract = this.db.contracts.get(contractId);
    if (!contract) {
      throw new Error(`Contract not found: ${contractId}`);
    }

    const now = new Date().toISOString();
    const dueDate = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

    const invoiceId = `inv_${Date.now()}`;
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const invoice: Invoice = {
      id: invoiceId,
      tenantId: contract.tenantId,
      invoiceNumber,
      contractId: contract.id,
      accountId: contract.accountId,
      accountName: contract.accountName,
      issueDate: now.split('T')[0],
      dueDate,
      status: 'ISSUED',
      subtotal: contract.contractValueARR,
      taxAmount: 0,
      totalAmount: contract.contractValueARR,
      paidAmount: 0,
      balanceDue: contract.contractValueARR,
      currency: 'USD',
      lineItems: [
        {
          id: `ili_${Date.now()}`,
          description: `Annual Subscription: ${contract.accountName}`,
          quantity: 1,
          unitPrice: contract.contractValueARR,
          taxAmount: 0,
          totalAmount: contract.contractValueARR
        }
      ],
      createdAt: now,
      updatedAt: now,
      createdBy: actorId,
      updatedBy: actorId
    };

    this.db.invoices.set(invoice.id, invoice);
    return invoice;
  }
}
