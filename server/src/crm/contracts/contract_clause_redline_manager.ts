/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Enterprise Contract Clause Redline & Legal Deviation Engine
 *
 * Implements standard Master Services Agreement (MSA) clause libraries,
 * automated redline diffing, limitation of liability risk scoring, and DPA compliance tracking.
 */

import { CRMDatabase } from '../database/crm_database.ts';

export interface ContractStandardClause {
  clauseId: string;
  clauseTitle: string;
  category: 'LIMITATION_OF_LIABILITY' | 'INDEMNIFICATION' | 'SLA_AVAILABILITY' | 'DATA_PRIVACY_DPA' | 'PAYMENT_TERMS';
  standardText: string;
  isFallBackClause: boolean;
  maxApprovedLiabilityMultiplier: number;
}

export interface ContractRedlineReviewResult {
  contractId: string;
  customerName: string;
  overallLegalRiskRating: 'LOW_STANDARD' | 'MODERATE_ACCEPTABLE' | 'HIGH_EXECUTIVE_APPROVAL_REQUIRED';
  deviationsDetected: {
    clauseCategory: string;
    originalStandardClause: string;
    customerProposedRedline: string;
    riskScore: number;
    legalGuidance: string;
    requiresGeneralCounselSignOff: boolean;
  }[];
  liabilityCapUSD: number;
  slaAvailabilityCommitment: string;
  paymentTermDays: number;
  reviewedAt: string;
}

export class ContractClauseRedlineManager {
  private db: CRMDatabase;

  private standardClauseLibrary: ContractStandardClause[] = [
    {
      clauseId: 'cls_liability_12mo',
      clauseTitle: 'Limitation of Liability (12-Month Fees Cap)',
      category: 'LIMITATION_OF_LIABILITY',
      standardText: 'Neither party shall be liable for damages in excess of the total fees paid or payable by Customer under this Agreement in the twelve (12) months preceding the incident.',
      isFallBackClause: false,
      maxApprovedLiabilityMultiplier: 1.0
    },
    {
      clauseId: 'cls_sla_99_9',
      clauseTitle: '99.9% Uptime SLA Commitment',
      category: 'SLA_AVAILABILITY',
      standardText: 'ApexCore guarantees a Monthly Uptime Percentage of at least 99.9% during each monthly billing cycle.',
      isFallBackClause: false,
      maxApprovedLiabilityMultiplier: 1.0
    },
    {
      clauseId: 'cls_dpa_gdpr',
      clauseTitle: 'Data Protection Addendum (GDPR & CCPA Standard Clauses)',
      category: 'DATA_PRIVACY_DPA',
      standardText: 'ApexCore shall process Customer Personal Data only in accordance with Customer documented instructions and applicable Privacy Laws.',
      isFallBackClause: false,
      maxApprovedLiabilityMultiplier: 1.0
    }
  ];

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Reviews customer-proposed contract terms and flags non-standard deviations.
   */
  public reviewContractRedlines(params: {
    contractId: string;
    customerName: string;
    annualContractValueUSD: number;
    proposedLiabilityCapMultiplier: number;
    proposedPaymentTermsDays: number;
    proposedSLAUptime: number;
  }): ContractRedlineReviewResult {
    const deviations: ContractRedlineReviewResult['deviationsDetected'] = [];
    let requiresGC = false;
    let riskRating: ContractRedlineReviewResult['overallLegalRiskRating'] = 'LOW_STANDARD';

    // 1. Check Liability Cap (Standard is 1x ACV, Max Rep Approval is 2x ACV)
    if (params.proposedLiabilityCapMultiplier > 2.0) {
      deviations.push({
        clauseCategory: 'LIMITATION_OF_LIABILITY',
        originalStandardClause: '12 Months Fees Cap (1.0x ACV)',
        customerProposedRedline: `${params.proposedLiabilityCapMultiplier}x ACV Liability Cap`,
        riskScore: 85,
        legalGuidance: 'Proposed liability multiplier exceeds standard policy. Mandatory General Counsel approval required.',
        requiresGeneralCounselSignOff: true
      });
      requiresGC = true;
      riskRating = 'HIGH_EXECUTIVE_APPROVAL_REQUIRED';
    } else if (params.proposedLiabilityCapMultiplier > 1.0) {
      deviations.push({
        clauseCategory: 'LIMITATION_OF_LIABILITY',
        originalStandardClause: '12 Months Fees Cap (1.0x ACV)',
        customerProposedRedline: `${params.proposedLiabilityCapMultiplier}x ACV Liability Cap`,
        riskScore: 45,
        legalGuidance: 'Approved by Sales Management for strategic Tier 1 accounts.',
        requiresGeneralCounselSignOff: false
      });
      riskRating = 'MODERATE_ACCEPTABLE';
    }

    // 2. Check Payment Terms (Standard is Net 30, Extended is Net 60/90)
    if (params.proposedPaymentTermsDays > 60) {
      deviations.push({
        clauseCategory: 'PAYMENT_TERMS',
        originalStandardClause: 'Net 30 Days',
        customerProposedRedline: `Net ${params.proposedPaymentTermsDays} Days`,
        riskScore: 60,
        legalGuidance: 'Extended payment terms impact cash flow. Requires Finance VP signoff.',
        requiresGeneralCounselSignOff: false
      });
      if (riskRating !== 'HIGH_EXECUTIVE_APPROVAL_REQUIRED') {
        riskRating = 'MODERATE_ACCEPTABLE';
      }
    }

    const calculatedLiabilityCap = Math.round(params.annualContractValueUSD * params.proposedLiabilityCapMultiplier);

    return {
      contractId: params.contractId,
      customerName: params.customerName,
      overallLegalRiskRating: riskRating,
      deviationsDetected: deviations,
      liabilityCapUSD: calculatedLiabilityCap,
      slaAvailabilityCommitment: `${params.proposedSLAUptime || 99.9}%`,
      paymentTermDays: params.proposedPaymentTermsDays || 30,
      reviewedAt: new Date().toISOString()
    };
  }
}
