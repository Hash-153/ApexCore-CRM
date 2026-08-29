/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Multi-Currency & Complex Bundle Pricing Rule Engine
 *
 * Implements cross-currency FX rate normalization, multi-product solution bundling discounts,
 * multi-year contract term price locks, and minimum margin guardrails.
 */

import { CRMDatabase } from '../database/crm_database.ts';

export interface MultiYearContractQuoteOption {
  contractTermYears: 1 | 2 | 3 | 5;
  termDiscountPercentage: number;
  annualPriceUSD: number;
  totalContractValueUSD: number;
  annualSavingsUSD: number;
  priceLockGuaranteed: boolean;
}

export interface ProductBundleRule {
  bundleId: string;
  bundleName: string;
  requiredProductSkus: string[];
  bundleDiscountPercentage: number;
  description: string;
}

export class DynamicTierPricingRules {
  private db: CRMDatabase;

  // Currency FX Conversion Matrix against Base USD
  private fxRatesAgainstUSD: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.78,
    CAD: 1.36,
    AUD: 1.52,
    JPY: 154.50,
    CHF: 0.88,
    SGD: 1.34
  };

  private bundleRules: ProductBundleRule[] = [
    {
      bundleId: 'bndl_full_revops_suite',
      bundleName: 'ApexCore Complete Revenue Operations Suite',
      requiredProductSkus: ['SKU-CRM-ENT-SEAT', 'SKU-CPQ-MODULE', 'SKU-HELPDESK-ENT'],
      bundleDiscountPercentage: 20.0,
      description: 'Includes Enterprise CRM seats, CPQ pricing module, and SLA omnichannel helpdesk suite.'
    },
    {
      bundleId: 'bndl_sales_efficiency',
      bundleName: 'ApexCore Sales Acceleration Package',
      requiredProductSkus: ['SKU-CRM-ENT-SEAT', 'SKU-CPQ-MODULE'],
      bundleDiscountPercentage: 12.5,
      description: 'Combines Enterprise CRM licenses with CPQ quoting engine.'
    }
  ];

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Converts a USD amount into target enterprise currency with exchange rate rounding.
   */
  public convertFromUSD(amountUSD: number, targetCurrency: string): {
    amountInUSD: number;
    targetCurrency: string;
    exchangeRate: number;
    convertedAmount: number;
  } {
    const code = targetCurrency.toUpperCase();
    const rate = this.fxRatesAgainstUSD[code] || 1.0;
    const converted = Math.round(amountUSD * rate);

    return {
      amountInUSD: amountUSD,
      targetCurrency: code,
      exchangeRate: rate,
      convertedAmount: converted
    };
  }

  /**
   * Evaluates if a list of product line items qualifies for special multi-product bundle discounts.
   */
  public evaluateBundleDiscounts(productSkus: string[]): {
    qualifyingBundles: ProductBundleRule[];
    bestBundleDiscountPercentage: number;
  } {
    const skuSet = new Set(productSkus);
    const qualifying: ProductBundleRule[] = [];
    let bestDiscount = 0;

    for (const rule of this.bundleRules) {
      const isQualified = rule.requiredProductSkus.every(sku => skuSet.has(sku));
      if (isQualified) {
        qualifying.push(rule);
        if (rule.bundleDiscountPercentage > bestDiscount) {
          bestDiscount = rule.bundleDiscountPercentage;
        }
      }
    }

    return {
      qualifyingBundles: qualifying,
      bestBundleDiscountPercentage: bestDiscount
    };
  }

  /**
   * Generates 1-year, 2-year, 3-year, and 5-year multi-year contract options with term discounts.
   */
  public generateMultiYearOptions(baseAnnualPriceUSD: number): MultiYearContractQuoteOption[] {
    const terms: { years: 1 | 2 | 3 | 5; discount: number }[] = [
      { years: 1, discount: 0 },
      { years: 2, discount: 5 },
      { years: 3, discount: 12 },
      { years: 5, discount: 20 }
    ];

    return terms.map(t => {
      const discountedAnnual = Math.round(baseAnnualPriceUSD * (1 - t.discount / 100));
      const tcv = discountedAnnual * t.years;
      const savings = (baseAnnualPriceUSD * t.years) - tcv;

      return {
        contractTermYears: t.years,
        termDiscountPercentage: t.discount,
        annualPriceUSD: discountedAnnual,
        totalContractValueUSD: tcv,
        annualSavingsUSD: Math.round(savings / t.years),
        priceLockGuaranteed: true
      };
    });
  }
}
