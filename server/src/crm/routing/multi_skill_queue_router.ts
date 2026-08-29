/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Multi-Skill Omnichannel Queue Routing & Agent Capacity Balancer
 *
 * Implements skill-matrix matching (Language, Product Specialization, Tier 1 VIP handling),
 * weighted agent capacity tracking, and spillover overflow routing.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { Ticket } from '../domain/types.ts';
import { TicketPriority, UserRole } from '../domain/enums.ts';

export interface SupportAgentSkillProfile {
  agentUserId: string;
  agentName: string;
  languages: string[]; // e.g. ['EN', 'ES', 'DE', 'FR', 'JA']
  productSpecializations: string[]; // e.g. ['CPQ_ENGINE', 'CORE_CRM', 'API_INTEGRATIONS', 'SECURITY_HIPAA']
  maxConcurrentTickets: number;
  currentActiveTickets: number;
  isAvailable: boolean;
  vipCertified: boolean;
}

export interface RoutingDecisionResult {
  ticketId: string;
  assignedAgentId: string;
  assignedAgentName: string;
  queueMatched: 'VIP_STRATEGIC_TIER_1' | 'SPECIALIZED_CPQ_ENGINE' | 'TECHNICAL_INTEGRATIONS' | 'GENERAL_SUPPORT_QUEUE';
  routingScore: number;
  isSpilloverOverflow: boolean;
  timestamp: string;
}

export class MultiSkillQueueRouter {
  private db: CRMDatabase;
  private agentProfiles: Map<string, SupportAgentSkillProfile> = new Map();

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
    this.initializeStandardAgentProfiles();
  }

  private initializeStandardAgentProfiles(): void {
    const agents: SupportAgentSkillProfile[] = [
      {
        agentUserId: 'usr_sarah_jenkins',
        agentName: 'Sarah Jenkins',
        languages: ['EN', 'ES'],
        productSpecializations: ['CORE_CRM', 'CPQ_ENGINE', 'BILLING'],
        maxConcurrentTickets: 8,
        currentActiveTickets: 2,
        isAvailable: true,
        vipCertified: true
      },
      {
        agentUserId: 'usr_alex_tech_support',
        agentName: 'Alex Chen (Senior Escalations)',
        languages: ['EN', 'ZH', 'JA'],
        productSpecializations: ['API_INTEGRATIONS', 'SECURITY_HIPAA', 'DATABASE_SYNC'],
        maxConcurrentTickets: 6,
        currentActiveTickets: 3,
        isAvailable: true,
        vipCertified: true
      },
      {
        agentUserId: 'usr_general_support',
        agentName: 'General Tier 1 Support Agent',
        languages: ['EN', 'FR', 'DE'],
        productSpecializations: ['CORE_CRM', 'USER_MANAGEMENT'],
        maxConcurrentTickets: 12,
        currentActiveTickets: 4,
        isAvailable: true,
        vipCertified: false
      }
    ];

    agents.forEach(a => this.agentProfiles.set(a.agentUserId, a));
  }

  /**
   * Routes a customer support ticket to the best matching agent based on skill matrix and capacity.
   */
  public routeTicket(
    ticket: Ticket,
    customerTier: 'TIER_1_STRATEGIC' | 'TIER_2_KEY' | 'TIER_3_STANDARD' = 'TIER_1_STRATEGIC',
    requiredSkills: string[] = ['CORE_CRM']
  ): RoutingDecisionResult {
    let bestAgent: SupportAgentSkillProfile | null = null;
    let highestScore = -1;
    let queue: RoutingDecisionResult['queueMatched'] = 'GENERAL_SUPPORT_QUEUE';

    if (customerTier === 'TIER_1_STRATEGIC' || ticket.priority === TicketPriority.P1_URGENT) {
      queue = 'VIP_STRATEGIC_TIER_1';
    } else if (requiredSkills.includes('CPQ_ENGINE')) {
      queue = 'SPECIALIZED_CPQ_ENGINE';
    } else if (requiredSkills.includes('API_INTEGRATIONS')) {
      queue = 'TECHNICAL_INTEGRATIONS';
    }

    for (const agent of this.agentProfiles.values()) {
      if (!agent.isAvailable) continue;

      let score = 0;

      // 1. Capacity availability
      const capacityFraction = 1 - (agent.currentActiveTickets / agent.maxConcurrentTickets);
      if (capacityFraction <= 0) continue; // Agent at maximum load
      score += Math.round(capacityFraction * 40);

      // 2. VIP Certification
      if (queue === 'VIP_STRATEGIC_TIER_1' && agent.vipCertified) {
        score += 35;
      }

      // 3. Skill Overlap
      const matchedSkills = requiredSkills.filter(s => agent.productSpecializations.includes(s)).length;
      score += matchedSkills * 25;

      if (score > highestScore) {
        highestScore = score;
        bestAgent = agent;
      }
    }

    // Fallback if all specialized agents are full
    let isSpillover = false;
    if (!bestAgent) {
      isSpillover = true;
      bestAgent = Array.from(this.agentProfiles.values())[0];
    }

    // Increment active ticket load
    bestAgent.currentActiveTickets += 1;

    // Update ticket entity
    ticket.assigneeId = bestAgent.agentUserId;
    ticket.assigneeName = bestAgent.agentName;
    ticket.updatedAt = new Date().toISOString();

    return {
      ticketId: ticket.id,
      assignedAgentId: bestAgent.agentUserId,
      assignedAgentName: bestAgent.agentName,
      queueMatched: queue,
      routingScore: highestScore,
      isSpilloverOverflow: isSpillover,
      timestamp: new Date().toISOString()
    };
  }
}
