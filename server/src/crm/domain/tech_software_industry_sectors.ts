/**
 * ApexCore Enterprise CRM - Enterprise Technology & Cloud Software Sector Specification
 * Clean domain classification model with sales cycle benchmarks and ICP score adjustments.
 */

export interface TECHIndustryProfile {
  subSectorId: string;
  subSectorName: string;
  naicsCode: string;
  sicCode: string;
  averageSalesCycleDays: number;
  averageDealACV: number;
  targetBuyerPersonas: string[];
  complianceStandards: string[];
  corePainPoints: string[];
  discoveryQuestions: string[];
  leadScoreModifier: number;
}

export const TECH_INDUSTRY_PROFILES: TECHIndustryProfile[] = [
  {
    subSectorId: 'TECH_SEG_1',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 1',
    naicsCode: 'NAICS-500010',
    sicCode: 'SIC-7001',
    averageSalesCycleDays: 36,
    averageDealACV: 88500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 1.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 11
  },
  {
    subSectorId: 'TECH_SEG_2',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 2',
    naicsCode: 'NAICS-500020',
    sicCode: 'SIC-7002',
    averageSalesCycleDays: 37,
    averageDealACV: 92000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 2.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 12
  },
  {
    subSectorId: 'TECH_SEG_3',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 3',
    naicsCode: 'NAICS-500030',
    sicCode: 'SIC-7003',
    averageSalesCycleDays: 38,
    averageDealACV: 95500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 3.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 13
  },
  {
    subSectorId: 'TECH_SEG_4',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 4',
    naicsCode: 'NAICS-500040',
    sicCode: 'SIC-7004',
    averageSalesCycleDays: 39,
    averageDealACV: 99000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 4.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 14
  },
  {
    subSectorId: 'TECH_SEG_5',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 5',
    naicsCode: 'NAICS-500050',
    sicCode: 'SIC-7005',
    averageSalesCycleDays: 40,
    averageDealACV: 102500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 5.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 15
  },
  {
    subSectorId: 'TECH_SEG_6',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 6',
    naicsCode: 'NAICS-500060',
    sicCode: 'SIC-7006',
    averageSalesCycleDays: 41,
    averageDealACV: 106000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 6.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 16
  },
  {
    subSectorId: 'TECH_SEG_7',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 7',
    naicsCode: 'NAICS-500070',
    sicCode: 'SIC-7007',
    averageSalesCycleDays: 42,
    averageDealACV: 109500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 7.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 17
  },
  {
    subSectorId: 'TECH_SEG_8',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 8',
    naicsCode: 'NAICS-500080',
    sicCode: 'SIC-7008',
    averageSalesCycleDays: 43,
    averageDealACV: 113000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 8.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 18
  },
  {
    subSectorId: 'TECH_SEG_9',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 9',
    naicsCode: 'NAICS-500090',
    sicCode: 'SIC-7009',
    averageSalesCycleDays: 44,
    averageDealACV: 116500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 9.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 19
  },
  {
    subSectorId: 'TECH_SEG_10',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 10',
    naicsCode: 'NAICS-500100',
    sicCode: 'SIC-7010',
    averageSalesCycleDays: 45,
    averageDealACV: 120000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 10.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 20
  },
  {
    subSectorId: 'TECH_SEG_11',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 11',
    naicsCode: 'NAICS-500110',
    sicCode: 'SIC-7011',
    averageSalesCycleDays: 46,
    averageDealACV: 123500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 11.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 21
  },
  {
    subSectorId: 'TECH_SEG_12',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 12',
    naicsCode: 'NAICS-500120',
    sicCode: 'SIC-7012',
    averageSalesCycleDays: 47,
    averageDealACV: 127000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 12.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 22
  },
  {
    subSectorId: 'TECH_SEG_13',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 13',
    naicsCode: 'NAICS-500130',
    sicCode: 'SIC-7013',
    averageSalesCycleDays: 48,
    averageDealACV: 130500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 13.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 23
  },
  {
    subSectorId: 'TECH_SEG_14',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 14',
    naicsCode: 'NAICS-500140',
    sicCode: 'SIC-7014',
    averageSalesCycleDays: 49,
    averageDealACV: 134000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 14.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 24
  },
  {
    subSectorId: 'TECH_SEG_15',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 15',
    naicsCode: 'NAICS-500150',
    sicCode: 'SIC-7015',
    averageSalesCycleDays: 50,
    averageDealACV: 137500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 15.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 10
  },
  {
    subSectorId: 'TECH_SEG_16',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 16',
    naicsCode: 'NAICS-500160',
    sicCode: 'SIC-7016',
    averageSalesCycleDays: 51,
    averageDealACV: 141000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 16.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 11
  },
  {
    subSectorId: 'TECH_SEG_17',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 17',
    naicsCode: 'NAICS-500170',
    sicCode: 'SIC-7017',
    averageSalesCycleDays: 52,
    averageDealACV: 144500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 17.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 12
  },
  {
    subSectorId: 'TECH_SEG_18',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 18',
    naicsCode: 'NAICS-500180',
    sicCode: 'SIC-7018',
    averageSalesCycleDays: 53,
    averageDealACV: 148000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 18.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 13
  },
  {
    subSectorId: 'TECH_SEG_19',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 19',
    naicsCode: 'NAICS-500190',
    sicCode: 'SIC-7019',
    averageSalesCycleDays: 54,
    averageDealACV: 151500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 19.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 14
  },
  {
    subSectorId: 'TECH_SEG_20',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 20',
    naicsCode: 'NAICS-500200',
    sicCode: 'SIC-7020',
    averageSalesCycleDays: 55,
    averageDealACV: 155000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 20.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 15
  },
  {
    subSectorId: 'TECH_SEG_21',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 21',
    naicsCode: 'NAICS-500210',
    sicCode: 'SIC-7021',
    averageSalesCycleDays: 56,
    averageDealACV: 158500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 21.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 16
  },
  {
    subSectorId: 'TECH_SEG_22',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 22',
    naicsCode: 'NAICS-500220',
    sicCode: 'SIC-7022',
    averageSalesCycleDays: 57,
    averageDealACV: 162000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 22.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 17
  },
  {
    subSectorId: 'TECH_SEG_23',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 23',
    naicsCode: 'NAICS-500230',
    sicCode: 'SIC-7023',
    averageSalesCycleDays: 58,
    averageDealACV: 165500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 23.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 18
  },
  {
    subSectorId: 'TECH_SEG_24',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 24',
    naicsCode: 'NAICS-500240',
    sicCode: 'SIC-7024',
    averageSalesCycleDays: 59,
    averageDealACV: 169000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 24.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 19
  },
  {
    subSectorId: 'TECH_SEG_25',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 25',
    naicsCode: 'NAICS-500250',
    sicCode: 'SIC-7025',
    averageSalesCycleDays: 60,
    averageDealACV: 172500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 25.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 20
  },
  {
    subSectorId: 'TECH_SEG_26',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 26',
    naicsCode: 'NAICS-500260',
    sicCode: 'SIC-7026',
    averageSalesCycleDays: 61,
    averageDealACV: 176000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 26.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 21
  },
  {
    subSectorId: 'TECH_SEG_27',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 27',
    naicsCode: 'NAICS-500270',
    sicCode: 'SIC-7027',
    averageSalesCycleDays: 62,
    averageDealACV: 179500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 27.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 22
  },
  {
    subSectorId: 'TECH_SEG_28',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 28',
    naicsCode: 'NAICS-500280',
    sicCode: 'SIC-7028',
    averageSalesCycleDays: 63,
    averageDealACV: 183000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 28.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 23
  },
  {
    subSectorId: 'TECH_SEG_29',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 29',
    naicsCode: 'NAICS-500290',
    sicCode: 'SIC-7029',
    averageSalesCycleDays: 64,
    averageDealACV: 186500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 29.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 24
  },
  {
    subSectorId: 'TECH_SEG_30',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 30',
    naicsCode: 'NAICS-500300',
    sicCode: 'SIC-7030',
    averageSalesCycleDays: 65,
    averageDealACV: 190000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 30.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 10
  },
  {
    subSectorId: 'TECH_SEG_31',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 31',
    naicsCode: 'NAICS-500310',
    sicCode: 'SIC-7031',
    averageSalesCycleDays: 66,
    averageDealACV: 193500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 31.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 11
  },
  {
    subSectorId: 'TECH_SEG_32',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 32',
    naicsCode: 'NAICS-500320',
    sicCode: 'SIC-7032',
    averageSalesCycleDays: 67,
    averageDealACV: 197000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 32.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 12
  },
  {
    subSectorId: 'TECH_SEG_33',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 33',
    naicsCode: 'NAICS-500330',
    sicCode: 'SIC-7033',
    averageSalesCycleDays: 68,
    averageDealACV: 200500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 33.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 13
  },
  {
    subSectorId: 'TECH_SEG_34',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 34',
    naicsCode: 'NAICS-500340',
    sicCode: 'SIC-7034',
    averageSalesCycleDays: 69,
    averageDealACV: 204000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 34.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 14
  },
  {
    subSectorId: 'TECH_SEG_35',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 35',
    naicsCode: 'NAICS-500350',
    sicCode: 'SIC-7035',
    averageSalesCycleDays: 70,
    averageDealACV: 207500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 35.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 15
  },
  {
    subSectorId: 'TECH_SEG_36',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 36',
    naicsCode: 'NAICS-500360',
    sicCode: 'SIC-7036',
    averageSalesCycleDays: 71,
    averageDealACV: 211000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 36.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 16
  },
  {
    subSectorId: 'TECH_SEG_37',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 37',
    naicsCode: 'NAICS-500370',
    sicCode: 'SIC-7037',
    averageSalesCycleDays: 72,
    averageDealACV: 214500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 37.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 17
  },
  {
    subSectorId: 'TECH_SEG_38',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 38',
    naicsCode: 'NAICS-500380',
    sicCode: 'SIC-7038',
    averageSalesCycleDays: 73,
    averageDealACV: 218000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 38.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 18
  },
  {
    subSectorId: 'TECH_SEG_39',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 39',
    naicsCode: 'NAICS-500390',
    sicCode: 'SIC-7039',
    averageSalesCycleDays: 74,
    averageDealACV: 221500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 39.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 19
  },
  {
    subSectorId: 'TECH_SEG_40',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 40',
    naicsCode: 'NAICS-500400',
    sicCode: 'SIC-7040',
    averageSalesCycleDays: 35,
    averageDealACV: 225000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 40.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 20
  },
  {
    subSectorId: 'TECH_SEG_41',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 41',
    naicsCode: 'NAICS-500410',
    sicCode: 'SIC-7041',
    averageSalesCycleDays: 36,
    averageDealACV: 228500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 41.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 21
  },
  {
    subSectorId: 'TECH_SEG_42',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 42',
    naicsCode: 'NAICS-500420',
    sicCode: 'SIC-7042',
    averageSalesCycleDays: 37,
    averageDealACV: 232000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 42.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 22
  },
  {
    subSectorId: 'TECH_SEG_43',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 43',
    naicsCode: 'NAICS-500430',
    sicCode: 'SIC-7043',
    averageSalesCycleDays: 38,
    averageDealACV: 235500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 43.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 23
  },
  {
    subSectorId: 'TECH_SEG_44',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 44',
    naicsCode: 'NAICS-500440',
    sicCode: 'SIC-7044',
    averageSalesCycleDays: 39,
    averageDealACV: 239000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 44.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 24
  },
  {
    subSectorId: 'TECH_SEG_45',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 45',
    naicsCode: 'NAICS-500450',
    sicCode: 'SIC-7045',
    averageSalesCycleDays: 40,
    averageDealACV: 242500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 45.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 10
  },
  {
    subSectorId: 'TECH_SEG_46',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 46',
    naicsCode: 'NAICS-500460',
    sicCode: 'SIC-7046',
    averageSalesCycleDays: 41,
    averageDealACV: 246000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 46.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 11
  },
  {
    subSectorId: 'TECH_SEG_47',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 47',
    naicsCode: 'NAICS-500470',
    sicCode: 'SIC-7047',
    averageSalesCycleDays: 42,
    averageDealACV: 249500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 47.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 12
  },
  {
    subSectorId: 'TECH_SEG_48',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 48',
    naicsCode: 'NAICS-500480',
    sicCode: 'SIC-7048',
    averageSalesCycleDays: 43,
    averageDealACV: 253000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 48.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 13
  },
  {
    subSectorId: 'TECH_SEG_49',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 49',
    naicsCode: 'NAICS-500490',
    sicCode: 'SIC-7049',
    averageSalesCycleDays: 44,
    averageDealACV: 256500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 49.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 14
  },
  {
    subSectorId: 'TECH_SEG_50',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 50',
    naicsCode: 'NAICS-500500',
    sicCode: 'SIC-7050',
    averageSalesCycleDays: 45,
    averageDealACV: 260000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 50.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 15
  },
  {
    subSectorId: 'TECH_SEG_51',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 51',
    naicsCode: 'NAICS-500510',
    sicCode: 'SIC-7051',
    averageSalesCycleDays: 46,
    averageDealACV: 263500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 51.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 16
  },
  {
    subSectorId: 'TECH_SEG_52',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 52',
    naicsCode: 'NAICS-500520',
    sicCode: 'SIC-7052',
    averageSalesCycleDays: 47,
    averageDealACV: 267000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 52.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 17
  },
  {
    subSectorId: 'TECH_SEG_53',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 53',
    naicsCode: 'NAICS-500530',
    sicCode: 'SIC-7053',
    averageSalesCycleDays: 48,
    averageDealACV: 270500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 53.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 18
  },
  {
    subSectorId: 'TECH_SEG_54',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 54',
    naicsCode: 'NAICS-500540',
    sicCode: 'SIC-7054',
    averageSalesCycleDays: 49,
    averageDealACV: 274000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 54.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 19
  },
  {
    subSectorId: 'TECH_SEG_55',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 55',
    naicsCode: 'NAICS-500550',
    sicCode: 'SIC-7055',
    averageSalesCycleDays: 50,
    averageDealACV: 277500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 55.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 20
  },
  {
    subSectorId: 'TECH_SEG_56',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 56',
    naicsCode: 'NAICS-500560',
    sicCode: 'SIC-7056',
    averageSalesCycleDays: 51,
    averageDealACV: 281000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 56.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 21
  },
  {
    subSectorId: 'TECH_SEG_57',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 57',
    naicsCode: 'NAICS-500570',
    sicCode: 'SIC-7057',
    averageSalesCycleDays: 52,
    averageDealACV: 284500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 57.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 22
  },
  {
    subSectorId: 'TECH_SEG_58',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 58',
    naicsCode: 'NAICS-500580',
    sicCode: 'SIC-7058',
    averageSalesCycleDays: 53,
    averageDealACV: 288000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 58.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 23
  },
  {
    subSectorId: 'TECH_SEG_59',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 59',
    naicsCode: 'NAICS-500590',
    sicCode: 'SIC-7059',
    averageSalesCycleDays: 54,
    averageDealACV: 291500,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 59.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 24
  },
  {
    subSectorId: 'TECH_SEG_60',
    subSectorName: 'Enterprise Technology & Cloud Software - Segment Tier 60',
    naicsCode: 'NAICS-500600',
    sicCode: 'SIC-7060',
    averageSalesCycleDays: 55,
    averageDealACV: 295000,
    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],
    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],
    corePainPoints: [
      'Legacy siloed customer databases impeding real-time RevOps alignment for tier 60.',
      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',
      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'
    ],
    discoveryQuestions: [
      'What is your current average sales cycle duration for mid-market vs enterprise deals?',
      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',
      'What percentage of pipeline deals slip into subsequent quarters?'
    ],
    leadScoreModifier: 10
  }
];

export class TECHSectorRegistry {
  public static getProfileById(id: string): TECHIndustryProfile | undefined {
    return TECH_INDUSTRY_PROFILES.find(p => p.subSectorId === id);
  }
  public static getProfilesByACV(minACV: number): TECHIndustryProfile[] {
    return TECH_INDUSTRY_PROFILES.filter(p => p.averageDealACV >= minACV);
  }
}