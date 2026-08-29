/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Enterprise Sales Taxonomies, MEDDIC Criteria & Objection Frameworks
 *
 * Defines standardized sales qualification models, ideal customer profile (ICP) scoring matrices,
 * competitor displacement strategies, and loss reason taxonomies.
 */

export interface MEDDICCriterionDefinition {
  code: 'M' | 'E' | 'D_CRITERIA' | 'D_PROCESS' | 'I' | 'C';
  name: string;
  weightPercentage: number;
  verificationQuestions: string[];
  mandatoryForStage: string;
  passThresholdPercentage: number;
}

export interface DisqualificationReasonDefinition {
  code: string;
  category: 'BUDGET' | 'AUTHORITY' | 'TIMELINE' | 'COMPETITOR' | 'TECHNICAL_FIT' | 'NO_DECISION';
  description: string;
  isEligibleForNurtureCampaign: boolean;
  revisitCadenceMonths: number;
}

export class EnterpriseSalesTaxonomies {
  public static readonly MEDDIC_FRAMEWORK: MEDDICCriterionDefinition[] = [
    {
      code: 'M',
      name: 'Metrics (Quantified Economic Impact)',
      weightPercentage: 20,
      verificationQuestions: [
        'What specific KPI or business metric will this project improve (e.g. 25% ARR growth, $400k labor savings)?',
        'Has the customer agreed to the ROI calculation model and payback timeline?'
      ],
      mandatoryForStage: 'VALUE_PROPOSITION',
      passThresholdPercentage: 70
    },
    {
      code: 'E',
      name: 'Economic Buyer (Budget Authorization)',
      weightPercentage: 25,
      verificationQuestions: [
        'Have you met with the individual who has final profit-and-loss (P&L) discretionary veto authority?',
        'Does the Economic Buyer have direct sign-off capacity up to the proposed contract value?'
      ],
      mandatoryForStage: 'DECISION_MAKERS_BOUGHT_IN',
      passThresholdPercentage: 80
    },
    {
      code: 'D_CRITERIA',
      name: 'Decision Criteria (Technical & Commercial Vendor Matrix)',
      weightPercentage: 15,
      verificationQuestions: [
        'What are the formal technical, security, and architectural evaluation criteria?',
        'Has our solution scored highest on the customer formal weighted scorecard?'
      ],
      mandatoryForStage: 'NEEDS_ANALYSIS',
      passThresholdPercentage: 75
    },
    {
      code: 'D_PROCESS',
      name: 'Decision Process (Step-by-Step Purchasing Timeline)',
      weightPercentage: 15,
      verificationQuestions: [
        'What are the exact sequential steps from security review to Legal redlines to Board approval?',
        'What is the hard compelling event driving the target contract execution date?'
      ],
      mandatoryForStage: 'PROPOSAL_PRICE_QUOTE',
      passThresholdPercentage: 85
    },
    {
      code: 'I',
      name: 'Identify Pain (Acute Business Consequences)',
      weightPercentage: 10,
      verificationQuestions: [
        'What happens to the organization if this project is delayed or not funded?',
        'Is the current manual process causing compliance failure, customer churn, or lost revenue?'
      ],
      mandatoryForStage: 'QUALIFICATION',
      passThresholdPercentage: 65
    },
    {
      code: 'C',
      name: 'Champion (Internal Executive Advocate)',
      weightPercentage: 15,
      verificationQuestions: [
        'Do we have an internal power sponsor with personal credibility who actively sells on our behalf?',
        'Will the Champion facilitate direct access to the Economic Buyer?'
      ],
      mandatoryForStage: 'VALUE_PROPOSITION',
      passThresholdPercentage: 80
    }
  ];

  public static readonly DISQUALIFICATION_REASONS: DisqualificationReasonDefinition[] = [
    {
      code: 'NO_BUDGET_ALLOCATED',
      category: 'BUDGET',
      description: 'Account lacks discretionary software budget in current fiscal year.',
      isEligibleForNurtureCampaign: true,
      revisitCadenceMonths: 6
    },
    {
      code: 'CHOSEN_COMPETITOR_INCUMBENT',
      category: 'COMPETITOR',
      description: 'Account signed multi-year renewal with legacy CRM incumbent.',
      isEligibleForNurtureCampaign: true,
      revisitCadenceMonths: 18
    },
    {
      code: 'TECHNICAL_REQUIREMENTS_MISMATCH',
      category: 'TECHNICAL_FIT',
      description: 'Account requires proprietary legacy on-premise mainframe integration.',
      isEligibleForNurtureCampaign: false,
      revisitCadenceMonths: 0
    },
    {
      code: 'INTERNAL_PROJECT_CANCELLED',
      category: 'NO_DECISION',
      description: 'Customer underwent corporate restructuring or merger freeze.',
      isEligibleForNurtureCampaign: true,
      revisitCadenceMonths: 9
    }
  ];
}
