/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Finite State Machine (FSM) Lifecycle Transition Governance Engine
 *
 * Implements deterministic state transition graphs, precondition guards,
 * post-transition triggers, and unauthorized lifecycle transition rejection.
 */

import { CustomerStatus, LeadStatus, DealStage, QuoteStatus, InvoiceStatus, ContractStatus } from './enums.ts';

export interface StateTransitionRule<TState> {
  fromState: TState;
  toState: TState;
  requiredRole?: string;
  guardPredicate?: (context: any) => { isAllowed: boolean; failureReason?: string };
  triggerWebhookEvent?: string;
  description: string;
}

export class CRMStateMachineTransitions {
  // 1. Lead Lifecycle FSM Graph
  public static readonly LEAD_TRANSITIONS: StateTransitionRule<LeadStatus>[] = [
    {
      fromState: LeadStatus.NEW,
      toState: LeadStatus.CONTACTED,
      description: 'Lead outreach initiated by sales development rep.'
    },
    {
      fromState: LeadStatus.CONTACTED,
      toState: LeadStatus.QUALIFIED,
      guardPredicate: (ctx) => ({
        isAllowed: ctx.score >= 70,
        failureReason: 'Lead BANT score must be at least 70 for QUALIFIED status.'
      }),
      description: 'Lead qualified with budget and timeline verified.'
    },
    {
      fromState: LeadStatus.QUALIFIED,
      toState: LeadStatus.CONVERTED,
      description: 'Atomic 1-click conversion into Account + Contact + Opportunity.'
    },
    {
      fromState: LeadStatus.NEW,
      toState: LeadStatus.UNQUALIFIED,
      description: 'Lead disqualified due to criteria mismatch.'
    },
    {
      fromState: LeadStatus.CONTACTED,
      toState: LeadStatus.UNQUALIFIED,
      description: 'Lead disqualified after initial discovery call.'
    }
  ];

  // 2. Opportunity Stage FSM Graph
  public static readonly OPPORTUNITY_STAGE_TRANSITIONS: StateTransitionRule<DealStage>[] = [
    {
      fromState: DealStage.PROSPECTING,
      toState: DealStage.QUALIFICATION,
      description: 'Initial meeting completed and initial requirements logged.'
    },
    {
      fromState: DealStage.QUALIFICATION,
      toState: DealStage.NEEDS_ANALYSIS,
      description: 'Technical discovery and architectural fit evaluation.'
    },
    {
      fromState: DealStage.NEEDS_ANALYSIS,
      toState: DealStage.VALUE_PROPOSITION,
      description: 'Business case ROI presentation and executive demonstration.'
    },
    {
      fromState: DealStage.VALUE_PROPOSITION,
      toState: DealStage.DECISION_MAKERS_BOUGHT_IN,
      description: 'Internal champion and buying committee alignment secured.'
    },
    {
      fromState: DealStage.DECISION_MAKERS_BOUGHT_IN,
      toState: DealStage.PROPOSAL_PRICE_QUOTE,
      guardPredicate: (ctx) => ({
        isAllowed: ctx.meddicScore >= 70,
        failureReason: 'MEDDIC qualification score must be >= 70% before issuing formal CPQ proposal.'
      }),
      description: 'CPQ quote generated and delivered to procurement.'
    },
    {
      fromState: DealStage.PROPOSAL_PRICE_QUOTE,
      toState: DealStage.NEGOTIATION_REVIEW,
      description: 'Legal MSA redlines and commercial terms negotiation.'
    },
    {
      fromState: DealStage.NEGOTIATION_REVIEW,
      toState: DealStage.CLOSED_WON,
      guardPredicate: (ctx) => ({
        isAllowed: ctx.isContractSigned === true,
        failureReason: 'Mandatory fully executed contract required for CLOSED_WON state.'
      }),
      triggerWebhookEvent: 'DEAL_CLOSED_WON',
      description: 'Master contract fully executed by both parties.'
    },
    {
      fromState: DealStage.PROSPECTING,
      toState: DealStage.CLOSED_LOST,
      description: 'Deal disqualified or abandoned in prospecting stage.'
    },
    {
      fromState: DealStage.QUALIFICATION,
      toState: DealStage.CLOSED_LOST,
      description: 'Deal lost during qualification discovery.'
    },
    {
      fromState: DealStage.NEGOTIATION_REVIEW,
      toState: DealStage.CLOSED_LOST,
      description: 'Deal lost during legal negotiation or budget freeze.'
    }
  ];

  // 3. Customer Status FSM Graph
  public static readonly CUSTOMER_STATUS_TRANSITIONS: StateTransitionRule<CustomerStatus>[] = [
    {
      fromState: CustomerStatus.PROSPECT,
      toState: CustomerStatus.ONBOARDING,
      description: 'Account signed initial agreement; onboarding kickoff initiated.'
    },
    {
      fromState: CustomerStatus.ONBOARDING,
      toState: CustomerStatus.ACTIVE,
      description: 'Account completed implementation and user training.'
    },
    {
      fromState: CustomerStatus.ACTIVE,
      toState: CustomerStatus.SUSPENDED,
      requiredRole: 'Admin',
      description: 'Account suspended due to 60+ days payment default or compliance violation.'
    },
    {
      fromState: CustomerStatus.SUSPENDED,
      toState: CustomerStatus.ACTIVE,
      requiredRole: 'Admin',
      description: 'Account reactivated upon full payment reconciliation.'
    },
    {
      fromState: CustomerStatus.ACTIVE,
      toState: CustomerStatus.CHURNED,
      description: 'Account non-renewed or terminated agreement.'
    }
  ];

  /**
   * Validates if a state transition is permitted under the FSM graph.
   */
  public static canTransitionOpportunity(currentStage: DealStage, targetStage: DealStage, context?: any): {
    isPermitted: boolean;
    reason?: string;
  } {
    if (currentStage === targetStage) return { isPermitted: true };

    const rule = this.OPPORTUNITY_STAGE_TRANSITIONS.find(
      r => r.fromState === currentStage && r.toState === targetStage
    );

    if (!rule) {
      return {
        isPermitted: false,
        reason: `Direct transition from stage '${currentStage}' to '${targetStage}' is not allowed in pipeline state machine.`
      };
    }

    if (rule.guardPredicate && context) {
      const guardResult = rule.guardPredicate(context);
      if (!guardResult.isAllowed) {
        return {
          isPermitted: false,
          reason: guardResult.failureReason || 'Precondition check failed.'
        };
      }
    }

    return { isPermitted: true };
  }
}
