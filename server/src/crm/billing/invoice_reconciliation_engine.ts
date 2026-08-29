/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Multi-Jurisdiction Tax, Automated Invoice Reconciliation & Dunning Engine
 *
 * Implements multi-line item invoice calculation, tax jurisdiction rules (US Sales Tax, EU VAT, UK VAT, GST),
 * electronic bank transfer payment matching, and progressive dunning lifecycle state machines.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { Customer, Invoice } from '../domain/types.ts';
import { InvoiceStatus, PaymentMethod } from '../domain/enums.ts';

export interface TaxJurisdictionRate {
  countryCode: string;
  stateOrRegion?: string;
  taxName: string;
  standardRatePercentage: number;
  reverseChargeApplicable: boolean;
}

export interface InvoiceLineItemCalculated {
  lineNumber: number;
  productSku: string;
  description: string;
  quantity: number;
  unitPriceUSD: number;
  discountPercentage: number;
  grossAmountUSD: number;
  discountAmountUSD: number;
  netTaxableAmountUSD: number;
  taxRatePercentage: number;
  taxAmountUSD: number;
  lineTotalUSD: number;
}

export interface DunningEscalationAction {
  invoiceId: string;
  customerId: string;
  daysPastDue: number;
  escalationStage: 'STAGE_1_GENTLE_REMINDER' | 'STAGE_2_FORMAL_NOTICE' | 'STAGE_3_EXECUTIVE_WARNING' | 'STAGE_4_SERVICE_SUSPENSION';
  recipientEmails: string[];
  actionRequired: string;
  isAccountSuspended: boolean;
  scheduledDispatchAt: string;
}

export class InvoiceReconciliationEngine {
  private db: CRMDatabase;

  private taxJurisdictions: TaxJurisdictionRate[] = [
    { countryCode: 'US', stateOrRegion: 'CA', taxName: 'California State & Local Tax', standardRatePercentage: 8.75, reverseChargeApplicable: false },
    { countryCode: 'US', stateOrRegion: 'NY', taxName: 'New York State & City Sales Tax', standardRatePercentage: 8.875, reverseChargeApplicable: false },
    { countryCode: 'US', stateOrRegion: 'TX', taxName: 'Texas Sales & Use Tax', standardRatePercentage: 8.25, reverseChargeApplicable: false },
    { countryCode: 'GB', taxName: 'UK Value Added Tax (VAT)', standardRatePercentage: 20.0, reverseChargeApplicable: true },
    { countryCode: 'DE', taxName: 'Germany Mehrwertsteuer (USt)', standardRatePercentage: 19.0, reverseChargeApplicable: true },
    { countryCode: 'FR', taxName: 'France TVA', standardRatePercentage: 20.0, reverseChargeApplicable: true },
    { countryCode: 'AU', taxName: 'Australia Goods and Services Tax (GST)', standardRatePercentage: 10.0, reverseChargeApplicable: false },
    { countryCode: 'SG', taxName: 'Singapore GST', standardRatePercentage: 9.0, reverseChargeApplicable: false }
  ];

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Generates a tax-compliant, multi-line item invoice for an enterprise customer.
   */
  public generateEnterpriseInvoice(params: {
    customerId: string;
    contractId: string;
    lineItems: {
      sku: string;
      description: string;
      quantity: number;
      unitPriceUSD: number;
      discountPct?: number;
    }[];
    countryCode: string;
    stateOrRegion?: string;
    vatOrTaxId?: string;
    paymentTermsDays?: number;
  }): {
    invoiceNumber: string;
    customerId: string;
    subtotalGrossUSD: number;
    totalDiscountUSD: number;
    subtotalNetTaxableUSD: number;
    totalTaxAmountUSD: number;
    grandTotalUSD: number;
    taxJurisdictionApplied: string;
    effectiveTaxRatePercentage: number;
    lineItems: InvoiceLineItemCalculated[];
    dueDate: string;
  } {
    const customer = this.db.customers.get(params.customerId);
    if (!customer) {
      throw new Error(`Customer not found: ${params.customerId}`);
    }

    // Determine Applicable Tax Rate
    const normCountry = params.countryCode.toUpperCase();
    const normState = params.stateOrRegion?.toUpperCase();

    let taxRule = this.taxJurisdictions.find(
      t => t.countryCode === normCountry && (!t.stateOrRegion || t.stateOrRegion === normState)
    );

    if (!taxRule) {
      taxRule = { countryCode: normCountry, taxName: 'Standard International Export (0% Tax)', standardRatePercentage: 0.0, reverseChargeApplicable: false };
    }

    // Check B2B Reverse Charge Exemption for EU/UK with valid VAT ID
    let taxRate = taxRule.standardRatePercentage;
    if (params.vatOrTaxId && taxRule.reverseChargeApplicable) {
      taxRate = 0.0;
    }

    let subtotalGross = 0;
    let totalDiscount = 0;
    let subtotalTaxable = 0;
    let totalTax = 0;

    const calculatedLines: InvoiceLineItemCalculated[] = params.lineItems.map((item, idx) => {
      const discPct = item.discountPct || 0;
      const gross = item.quantity * item.unitPriceUSD;
      const discAmt = Math.round(gross * (discPct / 100));
      const taxable = gross - discAmt;
      const lineTax = Math.round(taxable * (taxRate / 100));
      const total = taxable + lineTax;

      subtotalGross += gross;
      totalDiscount += discAmt;
      subtotalTaxable += taxable;
      totalTax += lineTax;

      return {
        lineNumber: idx + 1,
        productSku: item.sku,
        description: item.description,
        quantity: item.quantity,
        unitPriceUSD: item.unitPriceUSD,
        discountPercentage: discPct,
        grossAmountUSD: gross,
        discountAmountUSD: discAmt,
        netTaxableAmountUSD: taxable,
        taxRatePercentage: taxRate,
        taxAmountUSD: lineTax,
        lineTotalUSD: total
      };
    });

    const grandTotal = subtotalTaxable + totalTax;
    const now = new Date();
    const dueDate = new Date(now);
    dueDate.setDate(dueDate.getDate() + (params.paymentTermsDays || 30));

    const invoiceNumber = `INV-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      invoiceNumber,
      customerId: customer.id,
      subtotalGrossUSD: subtotalGross,
      totalDiscountUSD: totalDiscount,
      subtotalNetTaxableUSD: subtotalTaxable,
      totalTaxAmountUSD: totalTax,
      grandTotalUSD: grandTotal,
      taxJurisdictionApplied: taxRule.taxName,
      effectiveTaxRatePercentage: taxRate,
      lineItems: calculatedLines,
      dueDate: dueDate.toISOString()
    };
  }

  /**
   * Scans overdue accounts and evaluates dunning escalation stage.
   */
  public evaluateDunningEscalations(): DunningEscalationAction[] {
    const escalations: DunningEscalationAction[] = [];
    const now = new Date();

    for (const invoice of this.db.invoices.values()) {
      if (invoice.status === InvoiceStatus.PAID || invoice.status === InvoiceStatus.VOID) {
        continue;
      }

      const due = new Date(invoice.dueDate);
      const daysPastDue = Math.max(0, Math.round((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)));

      if (daysPastDue > 0) {
        let stage: DunningEscalationAction['escalationStage'] = 'STAGE_1_GENTLE_REMINDER';
        let action = 'Automated friendly email reminder sent to billing contact.';
        let isSuspended = false;

        if (daysPastDue >= 60) {
          stage = 'STAGE_4_SERVICE_SUSPENSION';
          action = 'Account suspended due to 60+ days past due balance. Legal collection notice issued.';
          isSuspended = true;

          // Update customer status to suspended
          const customer = this.db.customers.get(invoice.customerId);
          if (customer) {
            customer.status = 'SUSPENDED' as any;
            customer.updatedAt = now.toISOString();
          }
        } else if (daysPastDue >= 30) {
          stage = 'STAGE_3_EXECUTIVE_WARNING';
          action = 'Executive notice dispatched to CFO regarding upcoming service suspension in 30 days.';
        } else if (daysPastDue >= 14) {
          stage = 'STAGE_2_FORMAL_NOTICE';
          action = 'Second formal past-due notification dispatched to AP department.';
        }

        escalations.push({
          invoiceId: invoice.id,
          customerId: invoice.customerId,
          daysPastDue,
          escalationStage: stage,
          recipientEmails: ['billing@horizonhealth.example.com', 'ap@horizonhealth.example.com'],
          actionRequired: action,
          isAccountSuspended: isSuspended,
          scheduledDispatchAt: now.toISOString()
        });
      }
    }

    return escalations;
  }
}
