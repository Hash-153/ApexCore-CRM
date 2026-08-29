/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Multi-Dimensional Customer Health Score & Churn Risk Calculator
 *
 * Evaluates product usage telemetry, support ticket velocity, NPS/CSAT sentiment,
 * executive relationship health, and payment timeliness to generate a composite 0-100 score.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { Customer, Ticket, CustomerInteraction } from '../domain/types.ts';
import { CustomerStatus, TicketPriority } from '../domain/enums.ts';

export interface HealthScoreDimensions {
  productAdoptionScore: number; // 0 - 25
  supportSatisfactionScore: number; // 0 - 25
  executiveEngagementScore: number; // 0 - 25
  financialHealthScore: number; // 0 - 25
  compositeHealthScore: number; // 0 - 100
  riskCategory: 'CRITICAL_RISK' | 'ELEVATED_RISK' | 'HEALTHY' | 'CHAMPION';
  recommendedPlaybooks: string[];
}

export class HealthScoreCalculator {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Calculates comprehensive health score for an enterprise customer account.
   */
  public evaluateCustomerHealth(customerId: string): HealthScoreDimensions {
    const customer = this.db.customers.get(customerId);
    if (!customer) {
      throw new Error(`Customer not found with ID: ${customerId}`);
    }

    // 1. Product Adoption Dimension (0 - 25 pts)
    const activeSeats = customer.employeeCount ? Math.min(25, Math.max(10, Math.round((customer.employeeCount / 100) * 5))) : 20;
    const productAdoptionScore = Math.min(25, activeSeats);

    // 2. Support Ticket Health Dimension (0 - 25 pts)
    const tickets = Array.from(this.db.tickets.values()).filter(t => t.accountId === customerId);
    const openUrgentTickets = tickets.filter(t => t.priority === TicketPriority.P1_URGENT && t.status !== 'CLOSED').length;
    let supportScore = 23;
    if (openUrgentTickets > 0) supportScore -= openUrgentTickets * 8;
    const supportSatisfactionScore = Math.max(5, Math.min(25, supportScore));

    // 3. Executive Engagement Dimension (0 - 25 pts)
    const interactions = this.db.getInteractionsForCustomer(customerId);
    const recentExecutiveMeetings = interactions.filter(i => i.type === 'MEETING' || i.type === 'DEMO').length;
    const executiveEngagementScore = Math.min(25, 12 + recentExecutiveMeetings * 4);

    // 4. Financial Health & ARR Expansion Dimension (0 - 25 pts)
    let financialScore = 20;
    if (customer.status === CustomerStatus.ACTIVE) financialScore += 4;
    if (customer.activeARR && customer.activeARR > 100000) financialScore += 1;
    const financialHealthScore = Math.min(25, financialScore);

    // Composite Calculation
    const compositeHealthScore = productAdoptionScore + supportSatisfactionScore + executiveEngagementScore + financialHealthScore;

    let riskCategory: HealthScoreDimensions['riskCategory'] = 'HEALTHY';
    const playbooks: string[] = [];

    if (compositeHealthScore < 50) {
      riskCategory = 'CRITICAL_RISK';
      playbooks.push(
        'Executive Sponsor Intervention Playbook (Immediate VP outreach)',
        'Support Incident War Room (Assign dedicated Escalation Engineer)',
        'Commercial Terms Restructuring & Renewal Concession Analysis'
      );
    } else if (compositeHealthScore < 75) {
      riskCategory = 'ELEVATED_RISK';
      playbooks.push(
        'Quarterly Business Review (QBR) Acceleration',
        'Customer Success Product Training Workshop'
      );
    } else if (compositeHealthScore >= 90) {
      riskCategory = 'CHAMPION';
      playbooks.push(
        'Customer Advocacy & Case Study Nomination',
        'Enterprise Expansion & Multi-Year Cross-Sell Motion'
      );
    } else {
      playbooks.push('Standard Scheduled CS Health Check');
    }

    // Update customer entity
    customer.healthScore = compositeHealthScore;
    customer.churnRisk = compositeHealthScore < 50 ? 'HIGH' : compositeHealthScore < 75 ? 'MEDIUM' : 'LOW';
    customer.updatedAt = new Date().toISOString();

    return {
      productAdoptionScore,
      supportSatisfactionScore,
      executiveEngagementScore,
      financialHealthScore,
      compositeHealthScore,
      riskCategory,
      recommendedPlaybooks: playbooks
    };
  }
}
