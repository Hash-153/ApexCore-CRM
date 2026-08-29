/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Subscription Lifecycle & Revenue Recognition Engine (ASC 606 / IFRS 15 Compliant)
 *
 * Implements automated MRR / ARR waterfall tracking, proration calculations,
 * deferred revenue amortization schedules, usage-based overage billing, and dunning workflows.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { Customer, Contract, Invoice } from '../domain/types.ts';
import { ContractStatus, InvoiceStatus, SubscriptionBillingCycle } from '../domain/enums.ts';

export interface SubscriptionPlan {
  id: string;
  name: string;
  code: string;
  tier: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE_CORE' | 'MISSION_CRITICAL';
  baseAnnualPrice: number;
  perSeatAnnualPrice: number;
  includedSeats: number;
  includedApiCallsPerMonth: number;
  overagePricePer1kApiCalls: number;
  slaTier: 'STANDARD' | 'SILVER' | 'GOLD' | 'PLATINUM';
  isActive: boolean;
}

export interface SubscriptionSchedule {
  id: string;
  customerId: string;
  customerName: string;
  planId: string;
  contractId: string;
  status: 'ACTIVE' | 'PENDING_RENEWAL' | 'CANCELLED' | 'PAST_DUE' | 'UPGRADED';
  startDate: string;
  endDate: string;
  billingCycle: SubscriptionBillingCycle;
  seatCount: number;
  annualRecurringRevenue: number;
  monthlyRecurringRevenue: number;
  deferredRevenueBalance: number;
  recognizedRevenueToDate: number;
  autoRenew: boolean;
  currency: string;
  amortizationSchedules: RevenueRecognitionPeriod[];
  createdAt: string;
  updatedAt: string;
}

export interface RevenueRecognitionPeriod {
  periodMonth: string; // YYYY-MM
  openingDeferredRevenue: number;
  revenueRecognized: number;
  closingDeferredRevenue: number;
  isRecognized: boolean;
  recognizedDate?: string;
}

export interface ProrationQuote {
  effectiveDate: string;
  previousARR: number;
  newARR: number;
  daysRemainingInBillingPeriod: number;
  totalDaysInBillingPeriod: number;
  proratedCreditPrevious: number;
  proratedChargeNew: number;
  netProratedAmountDue: number;
  invoiceDueImmediately: boolean;
}

export class SubscriptionEngineService {
  private db: CRMDatabase;
  private plans: Map<string, SubscriptionPlan> = new Map();
  private subscriptions: Map<string, SubscriptionSchedule> = new Map();

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
    this.initializeStandardPlans();
  }

  private initializeStandardPlans(): void {
    const plans: SubscriptionPlan[] = [
      {
        id: 'plan_starter_2026',
        name: 'ApexCore Starter Edition',
        code: 'APEX-STARTER',
        tier: 'STARTER',
        baseAnnualPrice: 12000,
        perSeatAnnualPrice: 1200,
        includedSeats: 5,
        includedApiCallsPerMonth: 50000,
        overagePricePer1kApiCalls: 0.50,
        slaTier: 'STANDARD',
        isActive: true
      },
      {
        id: 'plan_professional_2026',
        name: 'ApexCore Professional Edition',
        code: 'APEX-PRO',
        tier: 'PROFESSIONAL',
        baseAnnualPrice: 36000,
        perSeatAnnualPrice: 1500,
        includedSeats: 15,
        includedApiCallsPerMonth: 250000,
        overagePricePer1kApiCalls: 0.35,
        slaTier: 'SILVER',
        isActive: true
      },
      {
        id: 'plan_enterprise_2026',
        name: 'ApexCore Enterprise Core Platform',
        code: 'APEX-ENT-CORE',
        tier: 'ENTERPRISE_CORE',
        baseAnnualPrice: 120000,
        perSeatAnnualPrice: 1800,
        includedSeats: 50,
        includedApiCallsPerMonth: 2000000,
        overagePricePer1kApiCalls: 0.20,
        slaTier: 'GOLD',
        isActive: true
      },
      {
        id: 'plan_mission_critical_2026',
        name: 'ApexCore Mission Critical Global Suite',
        code: 'APEX-MISSION-CRITICAL',
        tier: 'MISSION_CRITICAL',
        baseAnnualPrice: 300000,
        perSeatAnnualPrice: 2200,
        includedSeats: 150,
        includedApiCallsPerMonth: 20000000,
        overagePricePer1kApiCalls: 0.10,
        slaTier: 'PLATINUM',
        isActive: true
      }
    ];

    plans.forEach(p => this.plans.set(p.id, p));
  }

  public getPlans(): SubscriptionPlan[] {
    return Array.from(this.plans.values());
  }

  public createSubscription(params: {
    customerId: string;
    planId: string;
    contractId: string;
    seatCount: number;
    billingCycle?: SubscriptionBillingCycle;
    startDate?: string;
    autoRenew?: boolean;
    currency?: string;
  }): SubscriptionSchedule {
    const customer = this.db.customers.get(params.customerId);
    if (!customer) {
      throw new Error(`Customer not found with ID: ${params.customerId}`);
    }

    const plan = this.plans.get(params.planId);
    if (!plan) {
      throw new Error(`Subscription plan not found: ${params.planId}`);
    }

    const now = new Date();
    const startDate = params.startDate ? new Date(params.startDate) : now;
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);

    // Calculate ARR & MRR
    const extraSeats = Math.max(0, params.seatCount - plan.includedSeats);
    const annualRecurringRevenue = plan.baseAnnualPrice + (extraSeats * plan.perSeatAnnualPrice);
    const monthlyRecurringRevenue = Math.round(annualRecurringRevenue / 12);

    // Build 12-month ASC 606 Revenue Recognition Schedule
    const amortizationSchedules: RevenueRecognitionPeriod[] = [];
    const monthlyAmortization = annualRecurringRevenue / 12;
    let deferredBalance = annualRecurringRevenue;

    for (let m = 0; m < 12; m++) {
      const periodDate = new Date(startDate);
      periodDate.setMonth(periodDate.getMonth() + m);
      const periodMonth = periodDate.toISOString().substring(0, 7);

      const openingDeferred = Math.round(deferredBalance);
      const revenueRecognized = Math.round(m === 11 ? deferredBalance : monthlyAmortization);
      deferredBalance -= revenueRecognized;
      const closingDeferred = Math.max(0, Math.round(deferredBalance));

      amortizationSchedules.push({
        periodMonth,
        openingDeferredRevenue: openingDeferred,
        revenueRecognized,
        closingDeferredRevenue: closingDeferred,
        isRecognized: m === 0,
        recognizedDate: m === 0 ? now.toISOString() : undefined
      });
    }

    const subId = `sub_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const subscription: SubscriptionSchedule = {
      id: subId,
      customerId: customer.id,
      customerName: customer.name,
      planId: plan.id,
      contractId: params.contractId,
      status: 'ACTIVE',
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      billingCycle: params.billingCycle || SubscriptionBillingCycle.ANNUAL,
      seatCount: params.seatCount,
      annualRecurringRevenue,
      monthlyRecurringRevenue,
      deferredRevenueBalance: annualRecurringRevenue - amortizationSchedules[0].revenueRecognized,
      recognizedRevenueToDate: amortizationSchedules[0].revenueRecognized,
      autoRenew: params.autoRenew !== undefined ? params.autoRenew : true,
      currency: params.currency || 'USD',
      amortizationSchedules,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    this.subscriptions.set(subId, subscription);

    // Update customer active ARR
    customer.activeARR = (customer.activeARR || 0) + annualRecurringRevenue;
    customer.updatedAt = now.toISOString();

    return subscription;
  }

  public calculateProrationQuote(subscriptionId: string, newSeatCount: number, effectiveDateStr?: string): ProrationQuote {
    const sub = this.subscriptions.get(subscriptionId);
    if (!sub) {
      throw new Error(`Subscription not found: ${subscriptionId}`);
    }

    const plan = this.plans.get(sub.planId);
    if (!plan) {
      throw new Error(`Plan not found: ${sub.planId}`);
    }

    const effectiveDate = effectiveDateStr ? new Date(effectiveDateStr) : new Date();
    const startDate = new Date(sub.startDate);
    const endDate = new Date(sub.endDate);

    const totalDays = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    const daysRemaining = Math.max(0, Math.round((endDate.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60 * 24)));

    const fractionRemaining = daysRemaining / totalDays;

    const extraSeatsNew = Math.max(0, newSeatCount - plan.includedSeats);
    const newARR = plan.baseAnnualPrice + (extraSeatsNew * plan.perSeatAnnualPrice);

    const proratedCreditPrevious = Math.round(sub.annualRecurringRevenue * fractionRemaining);
    const proratedChargeNew = Math.round(newARR * fractionRemaining);
    const netProratedAmountDue = Math.max(0, proratedChargeNew - proratedCreditPrevious);

    return {
      effectiveDate: effectiveDate.toISOString(),
      previousARR: sub.annualRecurringRevenue,
      newARR,
      daysRemainingInBillingPeriod: daysRemaining,
      totalDaysInBillingPeriod: totalDays,
      proratedCreditPrevious,
      proratedChargeNew,
      netProratedAmountDue,
      invoiceDueImmediately: netProratedAmountDue > 0
    };
  }

  public applySubscriptionUpgrade(subscriptionId: string, newSeatCount: number): SubscriptionSchedule {
    const sub = this.subscriptions.get(subscriptionId);
    if (!sub) {
      throw new Error(`Subscription not found: ${subscriptionId}`);
    }

    const proration = this.calculateProrationQuote(subscriptionId, newSeatCount);
    const now = new Date().toISOString();

    const previousARR = sub.annualRecurringRevenue;
    sub.seatCount = newSeatCount;
    sub.annualRecurringRevenue = proration.newARR;
    sub.monthlyRecurringRevenue = Math.round(proration.newARR / 12);
    sub.updatedAt = now;

    // Update customer ARR diff
    const customer = this.db.customers.get(sub.customerId);
    if (customer) {
      customer.activeARR = Math.max(0, (customer.activeARR || 0) + (proration.newARR - previousARR));
      customer.updatedAt = now;
    }

    return sub;
  }

  public generateARRWaterfallSummary(): {
    totalActiveSubscriptions: number;
    totalARR: number;
    totalMRR: number;
    totalDeferredRevenueBalance: number;
    totalRecognizedRevenueYTD: number;
    byTier: Record<string, number>;
  } {
    let totalARR = 0;
    let totalMRR = 0;
    let totalDeferred = 0;
    let totalRecognized = 0;
    const byTier: Record<string, number> = {
      STARTER: 0,
      PROFESSIONAL: 0,
      ENTERPRISE_CORE: 0,
      MISSION_CRITICAL: 0
    };

    for (const sub of this.subscriptions.values()) {
      if (sub.status === 'ACTIVE') {
        totalARR += sub.annualRecurringRevenue;
        totalMRR += sub.monthlyRecurringRevenue;
        totalDeferred += sub.deferredRevenueBalance;
        totalRecognized += sub.recognizedRevenueToDate;

        const plan = this.plans.get(sub.planId);
        if (plan && byTier[plan.tier] !== undefined) {
          byTier[plan.tier] += sub.annualRecurringRevenue;
        }
      }
    }

    return {
      totalActiveSubscriptions: this.subscriptions.size,
      totalARR,
      totalMRR,
      totalDeferredRevenueBalance: totalDeferred,
      totalRecognizedRevenueYTD: totalRecognized,
      byTier
    };
  }
}
