/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * CPQ (Configure, Price, Quote) & Pricing Rules Engine
 *
 * Implements tiered volume discounting, multi-currency price book lookups,
 * minimum margin floor protection, tax calculation, and executive discount approvals.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import { DiscountType, QuoteStatus } from '../domain/enums.ts';
import type { Quote, QuoteLineItem } from '../domain/types.ts';

export interface CreateQuoteItemInput {
  productId: string;
  quantity: number;
  customDiscountType?: DiscountType;
  customDiscountValue?: number;
  notes?: string;
}

export interface QuoteCalculationResult {
  quote: Quote;
  requiresExecutiveApproval: boolean;
  approvalReasons: string[];
}

export class CPQAndPricingEngine {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Generates and prices an enterprise quote with automatic volume tier discounts.
   */
  public generateQuote(params: {
    tenantId: string;
    opportunityId: string;
    priceBookId: string;
    items: CreateQuoteItemInput[];
    paymentTerms?: string;
    taxRatePercentage?: number;
    actorId: string;
  }): QuoteCalculationResult {
    const opp = this.db.opportunities.get(params.opportunityId);
    if (!opp) {
      throw new Error(`Opportunity not found with ID: ${params.opportunityId}`);
    }

    const priceBook = this.db.priceBooks.get(params.priceBookId);
    if (!priceBook) {
      throw new Error(`Price Book not found with ID: ${params.priceBookId}`);
    }

    const approvalReasons: string[] = [];
    let requiresExecutiveApproval = false;
    let subtotal = 0;
    let totalDiscountAmount = 0;
    let taxAmount = 0;

    const lineItems: QuoteLineItem[] = [];

    for (const item of params.items) {
      const product = this.db.products.get(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      const pbEntry = priceBook.entries.find(e => e.productId === item.productId);
      const listPrice = pbEntry ? pbEntry.listPrice : product.unitPrice;
      const minimumPrice = pbEntry ? pbEntry.minimumPrice : product.unitPrice * 0.7;

      let effectiveUnitPrice = listPrice;
      let appliedDiscountType: DiscountType = DiscountType.PERCENTAGE;
      let appliedDiscountValue = 0;

      // 1. Evaluate Volume Tier Discount from Price Book
      if (pbEntry && pbEntry.tierDiscounts && pbEntry.tierDiscounts.length > 0) {
        // Sort descending by minQuantity
        const tiers = [...pbEntry.tierDiscounts].sort((a, b) => b.minQuantity - a.minQuantity);
        for (const tier of tiers) {
          if (item.quantity >= tier.minQuantity) {
            appliedDiscountValue = tier.discountPercentage;
            break;
          }
        }
      }

      // 2. Custom Sales Rep Override Discount
      if (item.customDiscountValue !== undefined && item.customDiscountValue > appliedDiscountValue) {
        appliedDiscountType = item.customDiscountType || DiscountType.PERCENTAGE;
        appliedDiscountValue = item.customDiscountValue;
      }

      // 3. Compute Item Math
      let itemDiscountAmount = 0;
      if (appliedDiscountType === DiscountType.PERCENTAGE) {
        itemDiscountAmount = (listPrice * item.quantity * appliedDiscountValue) / 100;
        effectiveUnitPrice = listPrice - (listPrice * appliedDiscountValue) / 100;
      } else {
        itemDiscountAmount = appliedDiscountValue;
        effectiveUnitPrice = (listPrice * item.quantity - itemDiscountAmount) / item.quantity;
      }

      // 4. Floor Price & Executive Approval Enforcement
      if (effectiveUnitPrice < minimumPrice) {
        requiresExecutiveApproval = true;
        approvalReasons.push(`Product [${product.name}] discounted below minimum floor price ($${effectiveUnitPrice.toFixed(2)} < $${minimumPrice.toFixed(2)}).`);
      }

      if (appliedDiscountType === DiscountType.PERCENTAGE && appliedDiscountValue > 20) {
        requiresExecutiveApproval = true;
        approvalReasons.push(`High discount (${appliedDiscountValue}%) on [${product.name}] exceeds rep threshold (20%).`);
      }

      const itemSubtotal = listPrice * item.quantity - itemDiscountAmount;
      const taxRate = params.taxRatePercentage || 0;
      const itemTax = (itemSubtotal * taxRate) / 100;
      const itemTotal = itemSubtotal + itemTax;

      subtotal += listPrice * item.quantity;
      totalDiscountAmount += itemDiscountAmount;
      taxAmount += itemTax;

      lineItems.push({
        id: `qli_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        productId: product.id,
        productSku: product.sku,
        productName: product.name,
        quantity: item.quantity,
        listPrice,
        unitPrice: effectiveUnitPrice,
        discountType: appliedDiscountType,
        discountValue: appliedDiscountValue,
        discountAmount: itemDiscountAmount,
        subtotal: itemSubtotal,
        taxRatePercentage: taxRate,
        taxAmount: itemTax,
        totalAmount: itemTotal,
        notes: item.notes
      });
    }

    const grandTotal = subtotal - totalDiscountAmount + taxAmount;
    const now = new Date().toISOString();
    const expirationDate = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

    const quoteId = `qte_${Date.now()}`;
    const quoteNumber = `Q-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const quote: Quote = {
      id: quoteId,
      tenantId: params.tenantId,
      quoteNumber,
      opportunityId: opp.id,
      opportunityName: opp.name,
      accountId: opp.accountId,
      accountName: opp.accountName,
      primaryContactId: opp.primaryContactId || '',
      primaryContactName: opp.primaryContactName || '',
      priceBookId: params.priceBookId,
      status: requiresExecutiveApproval ? QuoteStatus.PENDING_APPROVAL : QuoteStatus.DRAFT,
      expirationDate,
      lineItems,
      subtotal,
      totalDiscountAmount,
      taxAmount,
      grandTotal,
      currency: priceBook.currency,
      paymentTerms: params.paymentTerms || 'Net 30 Days',
      version: 1,
      createdAt: now,
      updatedAt: now,
      createdBy: params.actorId,
      updatedBy: params.actorId
    };

    this.db.quotes.set(quote.id, quote);

    return {
      quote,
      requiresExecutiveApproval,
      approvalReasons
    };
  }

  /**
   * Executive Quote Approval or Rejection workflow action.
   */
  public reviewQuote(
    quoteId: string,
    decision: 'APPROVE' | 'REJECT',
    reviewerId: string,
    rejectionReason?: string
  ): Quote {
    const quote = this.db.quotes.get(quoteId);
    if (!quote) {
      throw new Error(`Quote not found with ID: ${quoteId}`);
    }

    if (decision === 'APPROVE') {
      quote.status = QuoteStatus.APPROVED;
      quote.approvedBy = reviewerId;
      quote.approvedAt = new Date().toISOString();
    } else {
      quote.status = QuoteStatus.REJECTED;
      quote.rejectionReason = rejectionReason || 'Discount terms not approved by finance.';
    }

    quote.updatedAt = new Date().toISOString();
    quote.updatedBy = reviewerId;
    return quote;
  }
}
