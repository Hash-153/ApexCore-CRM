/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Account 360 & Relationship Graph Engine
 *
 * Implements parent-child organizational hierarchy traversal,
 * dynamic Account Health & Churn Risk index heuristics, and annual revenue rollups.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { Account, AccountHierarchyNode, AccountHealthMetrics } from '../domain/types.ts';
import { TicketStatus } from '../domain/enums.ts';

export class Account360Service {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Builds full organizational hierarchy tree starting from a parent or root account.
   */
  public getAccountHierarchyTree(rootAccountId: string): AccountHierarchyNode | null {
    const root = this.db.accounts.get(rootAccountId);
    if (!root || root.isDeleted) return null;

    const buildNode = (acc: Account): AccountHierarchyNode => {
      const childAccounts: AccountHierarchyNode[] = [];
      for (const candidate of this.db.accounts.values()) {
        if (candidate.parentAccountId === acc.id && !candidate.isDeleted) {
          childAccounts.push(buildNode(candidate));
        }
      }

      return {
        accountId: acc.id,
        accountName: acc.name,
        tier: acc.tier,
        annualRevenue: acc.annualRevenue,
        childAccounts
      };
    };

    return buildNode(root);
  }

  /**
   * Recalculates Account Health Metrics and Churn Risk dynamically.
   */
  public evaluateAccountHealth(accountId: string): AccountHealthMetrics {
    const account = this.db.accounts.get(accountId);
    if (!account) {
      throw new Error(`Account not found with ID: ${accountId}`);
    }

    const contacts = this.db.getContactsByAccountId(accountId);
    const opportunities = this.db.getOpportunitiesByAccountId(accountId);
    
    // Open tickets
    let openTicketsCount = 0;
    let highPriorityTickets = 0;
    for (const ticket of this.db.tickets.values()) {
      if (ticket.accountId === accountId && ticket.status !== TicketStatus.RESOLVED && ticket.status !== TicketStatus.CLOSED) {
        openTicketsCount++;
        if (ticket.priority === 'P1_URGENT' || ticket.priority === 'P2_HIGH') {
          highPriorityTickets++;
        }
      }
    }

    // Opportunity values
    let activeOpportunitiesValue = 0;
    let totalWonDealsValue = 0;
    for (const opp of opportunities) {
      if (opp.stage === 'CLOSED_WON') {
        totalWonDealsValue += opp.amount;
      } else if (opp.stage !== 'CLOSED_LOST') {
        activeOpportunitiesValue += opp.amount;
      }
    }

    // Contact relationship strength
    let relationshipStrengthScore = 50;
    if (contacts.length >= 5) relationshipStrengthScore += 25;
    else if (contacts.length >= 2) relationshipStrengthScore += 15;

    // Executive sponsor presence
    const hasExecutiveBuyer = contacts.some(c => c.persona === 'ECONOMIC_BUYER' || c.persona === 'DECISION_MAKER');
    if (hasExecutiveBuyer) relationshipStrengthScore += 20;

    // Churn Risk heuristics
    let healthScore = 85;
    if (highPriorityTickets > 0) healthScore -= highPriorityTickets * 15;
    if (openTicketsCount > 3) healthScore -= 10;
    if (totalWonDealsValue > 500000) healthScore += 15;
    if (activeOpportunitiesValue > 100000) healthScore += 10;

    healthScore = Math.max(10, Math.min(100, healthScore));

    let churnRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    if (healthScore < 40) churnRisk = 'CRITICAL';
    else if (healthScore < 60) churnRisk = 'HIGH';
    else if (healthScore < 75) churnRisk = 'MEDIUM';

    const metrics: AccountHealthMetrics = {
      healthScore,
      churnRisk,
      expansionProbability: healthScore >= 80 ? 75 : 40,
      activeOpportunitiesValue,
      totalWonDealsValue,
      openTicketsCount,
      lastContactedDaysAgo: account.healthMetrics ? account.healthMetrics.lastContactedDaysAgo : 2,
      relationshipStrengthScore: Math.min(100, relationshipStrengthScore)
    };

    account.healthMetrics = metrics;
    return metrics;
  }

  /**
   * Aggregates total enterprise contract value and pipeline across an entire parent-child account group.
   */
  public aggregateEnterpriseRollup(rootAccountId: string): {
    totalRevenue: number;
    totalWonDeals: number;
    activePipeline: number;
    accountCount: number;
  } {
    const tree = this.getAccountHierarchyTree(rootAccountId);
    if (!tree) {
      return { totalRevenue: 0, totalWonDeals: 0, activePipeline: 0, accountCount: 0 };
    }

    let totalRevenue = 0;
    let totalWonDeals = 0;
    let activePipeline = 0;
    let accountCount = 0;

    const traverse = (node: AccountHierarchyNode) => {
      accountCount++;
      totalRevenue += node.annualRevenue;
      const opps = this.db.getOpportunitiesByAccountId(node.accountId);
      for (const opp of opps) {
        if (opp.stage === 'CLOSED_WON') {
          totalWonDeals += opp.amount;
        } else if (opp.stage !== 'CLOSED_LOST') {
          activePipeline += opp.amount;
        }
      }
      for (const child of node.childAccounts) {
        traverse(child);
      }
    };

    traverse(tree);

    return { totalRevenue, totalWonDeals, activePipeline, accountCount };
  }
}
