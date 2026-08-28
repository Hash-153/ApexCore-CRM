/**
 * Master Clinical Coding & Medical Terminology Catalog
 * Incorporates ICD-10-CM (Clinical Modification), CPT-4 (Current Procedural Terminology), and SNOMED-CT Concept Mappings
 */

export interface MasterIcd10Code {
  code: string;
  shortDesc: string;
  longDesc: string;
  category: string;
  hccCategory?: string; // Hierarchical Condition Category (Risk Adjustment)
  snomedConceptId?: string;
  isChronic: boolean;
}

export interface MasterCptCode {
  code: string;
  shortDesc: string;
  category: 'E&M_OUTPATIENT' | 'E&M_INPATIENT' | 'EMERGENCY_DEPT' | 'CRITICAL_CARE' | 'SURGERY' | 'RADIOLOGY' | 'LABORATORY' | 'ANESTHESIA';
  standardFeeUsd: number;
  relativeValueUnits: number; // Work RVU
  requiresPreAuthorization: boolean;
}

export const MASTER_ICD10_TAXONOMY: MasterIcd10Code[] = [
  // Cardiology & Vascular
  {
    code: 'I10',
    shortDesc: 'Essential (primary) hypertension',
    longDesc: 'Essential (primary) hypertension including high blood pressure without identified secondary cause.',
    category: 'Circulatory',
    snomedConceptId: '59621000',
    isChronic: true,
  },
  {
    code: 'I21.09',
    shortDesc: 'STEMI of anterior wall',
    longDesc: 'ST elevation (STEMI) myocardial infarction involving left anterior descending coronary artery or other anterior wall vessels.',
    category: 'Circulatory',
    hccCategory: 'HCC 86 (Acute Myocardial Infarction)',
    snomedConceptId: '401303003',
    isChronic: false,
  },
  {
    code: 'I21.4',
    shortDesc: 'Non-ST elevation (NSTEMI) MI',
    longDesc: 'Non-ST elevation (NSTEMI) myocardial infarction with elevated cardiac biomarkers and subendocardial ischemia.',
    category: 'Circulatory',
    hccCategory: 'HCC 86 (Acute Myocardial Infarction)',
    snomedConceptId: '401314000',
    isChronic: false,
  },
  {
    code: 'I48.0',
    shortDesc: 'Paroxysmal atrial fibrillation',
    longDesc: 'Paroxysmal atrial fibrillation terminating spontaneously or with intervention within 7 days.',
    category: 'Circulatory',
    hccCategory: 'HCC 96 (Specified Heart Arrhythmias)',
    snomedConceptId: '282825002',
    isChronic: true,
  },
  {
    code: 'I48.20',
    shortDesc: 'Chronic atrial fibrillation, unspecified',
    longDesc: 'Chronic atrial fibrillation without specification as permanent, persistent, or long-standing.',
    category: 'Circulatory',
    hccCategory: 'HCC 96 (Specified Heart Arrhythmias)',
    snomedConceptId: '426749004',
    isChronic: true,
  },
  {
    code: 'I50.22',
    shortDesc: 'Chronic systolic (HFrEF) heart failure',
    longDesc: 'Chronic systolic heart failure with reduced ejection fraction (HFrEF <= 40%).',
    category: 'Circulatory',
    hccCategory: 'HCC 85 (Congestive Heart Failure)',
    snomedConceptId: '441481004',
    isChronic: true,
  },
  {
    code: 'I50.32',
    shortDesc: 'Chronic diastolic (HFpEF) heart failure',
    longDesc: 'Chronic diastolic heart failure with preserved ejection fraction (HFpEF >= 50%).',
    category: 'Circulatory',
    hccCategory: 'HCC 85 (Congestive Heart Failure)',
    snomedConceptId: '441482006',
    isChronic: true,
  },
  {
    code: 'I26.99',
    shortDesc: 'Other pulmonary embolism without acute cor pulmonale',
    longDesc: 'Acute pulmonary embolism involving lobar or segmental pulmonary arterial branches without acute right ventricular overload.',
    category: 'Circulatory',
    hccCategory: 'HCC 107 (Vascular Disease)',
    snomedConceptId: '59282003',
    isChronic: false,
  },

  // Endocrinology & Metabolism
  {
    code: 'E11.9',
    shortDesc: 'Type 2 diabetes without complications',
    longDesc: 'Type 2 diabetes mellitus without documentation of microvascular or macrovascular complications.',
    category: 'Endocrine',
    hccCategory: 'HCC 19 (Diabetes without Complication)',
    snomedConceptId: '44054006',
    isChronic: true,
  },
  {
    code: 'E11.22',
    shortDesc: 'Type 2 diabetes with diabetic chronic kidney disease',
    longDesc: 'Type 2 diabetes mellitus with diabetic nephropathy and persistent microalbuminuria / renal impairment.',
    category: 'Endocrine',
    hccCategory: 'HCC 18 (Diabetes with Chronic Complications)',
    snomedConceptId: '127013003',
    isChronic: true,
  },
  {
    code: 'E11.40',
    shortDesc: 'Type 2 diabetes with diabetic neuropathy, unspecified',
    longDesc: 'Type 2 diabetes mellitus with distal symmetric polyneuropathy or autonomic neuropathy.',
    category: 'Endocrine',
    hccCategory: 'HCC 18 (Diabetes with Chronic Complications)',
    snomedConceptId: '230572002',
    isChronic: true,
  },
  {
    code: 'E03.9',
    shortDesc: 'Hypothyroidism, unspecified',
    longDesc: 'Acquired or primary hypothyroidism without documented goiter or myxedema.',
    category: 'Endocrine',
    snomedConceptId: '40930008',
    isChronic: true,
  },
  {
    code: 'E78.5',
    shortDesc: 'Hyperlipidemia, unspecified',
    longDesc: 'Dyslipidemia with mixed elevation of serum cholesterol and triglycerides.',
    category: 'Endocrine',
    snomedConceptId: '55822004',
    isChronic: true,
  },

  // Respiratory
  {
    code: 'J44.1',
    shortDesc: 'COPD with (acute) exacerbation',
    longDesc: 'Chronic obstructive pulmonary disease with acute exacerbation of bronchitis or dyspnea.',
    category: 'Respiratory',
    hccCategory: 'HCC 111 (Chronic Obstructive Pulmonary Disease)',
    snomedConceptId: '195951007',
    isChronic: true,
  },
  {
    code: 'J45.41',
    shortDesc: 'Moderate persistent asthma with (acute) exacerbation',
    longDesc: 'Moderate persistent bronchial asthma presenting with acute wheezing, cough, and decreased peak expiratory flow.',
    category: 'Respiratory',
    snomedConceptId: '427003001',
    isChronic: true,
  },
  {
    code: 'J18.9',
    shortDesc: 'Pneumonia, unspecified organism',
    longDesc: 'Community-acquired or lobar acute pneumonia with consolidative lung parenchymal infiltrate.',
    category: 'Respiratory',
    hccCategory: 'HCC 114 (Aspiration and Specified Bacterial Pneumonias)',
    snomedConceptId: '233604007',
    isChronic: false,
  },

  // Nephrology
  {
    code: 'N18.30',
    shortDesc: 'Chronic kidney disease, stage 3 unspecified',
    longDesc: 'Moderate chronic kidney disease with persistent eGFR between 30 and 59 mL/min/1.73m².',
    category: 'Genitourinary',
    hccCategory: 'HCC 138 (Chronic Kidney Disease, Moderate Stage 3)',
    snomedConceptId: '433144002',
    isChronic: true,
  },
  {
    code: 'N18.4',
    shortDesc: 'Chronic kidney disease, stage 4 (severe)',
    longDesc: 'Severe chronic kidney disease with persistent eGFR between 15 and 29 mL/min/1.73m².',
    category: 'Genitourinary',
    hccCategory: 'HCC 137 (Chronic Kidney Disease, Severe Stage 4)',
    snomedConceptId: '431856006',
    isChronic: true,
  },
  {
    code: 'N17.9',
    shortDesc: 'Acute kidney failure, unspecified',
    longDesc: 'Acute kidney injury (AKI) marked by rapid decline in glomerular filtration rate and oliguria.',
    category: 'Genitourinary',
    hccCategory: 'HCC 135 (Acute Renal Failure)',
    snomedConceptId: '14669001',
    isChronic: false,
  },

  // Infectious Disease & Sepsis
  {
    code: 'A41.9',
    shortDesc: 'Sepsis, unspecified organism',
    longDesc: 'Systemic inflammatory response syndrome (SIRS) due to severe infection with acute organ dysfunction.',
    category: 'Infectious',
    hccCategory: 'HCC 2 (Septicemia, Sepsis, Systemic Inflammatory Response)',
    snomedConceptId: '91302008',
    isChronic: false,
  },
  {
    code: 'N39.0',
    shortDesc: 'Urinary tract infection, site not specified',
    longDesc: 'Acute bacterial infection of the urinary tract with pyuria and positive urine culture.',
    category: 'Genitourinary',
    snomedConceptId: '68566005',
    isChronic: false,
  },
];

export const MASTER_CPT_TAXONOMY: MasterCptCode[] = [
  // Outpatient Evaluation & Management (E&M)
  {
    code: '99202',
    shortDesc: 'Office/outpatient visit new patient, 15-29 mins, straightforward MDM',
    category: 'E&M_OUTPATIENT',
    standardFeeUsd: 115.0,
    relativeValueUnits: 0.93,
    requiresPreAuthorization: false,
  },
  {
    code: '99203',
    shortDesc: 'Office/outpatient visit new patient, 30-44 mins, low level MDM',
    category: 'E&M_OUTPATIENT',
    standardFeeUsd: 165.0,
    relativeValueUnits: 1.6,
    requiresPreAuthorization: false,
  },
  {
    code: '99204',
    shortDesc: 'Office/outpatient visit new patient, 45-59 mins, moderate MDM',
    category: 'E&M_OUTPATIENT',
    standardFeeUsd: 235.0,
    relativeValueUnits: 2.6,
    requiresPreAuthorization: false,
  },
  {
    code: '99205',
    shortDesc: 'Office/outpatient visit new patient, 60-74 mins, high MDM',
    category: 'E&M_OUTPATIENT',
    standardFeeUsd: 310.0,
    relativeValueUnits: 3.5,
    requiresPreAuthorization: false,
  },
  {
    code: '99213',
    shortDesc: 'Office/outpatient visit established patient, 20-29 mins, low MDM',
    category: 'E&M_OUTPATIENT',
    standardFeeUsd: 130.0,
    relativeValueUnits: 1.3,
    requiresPreAuthorization: false,
  },
  {
    code: '99214',
    shortDesc: 'Office/outpatient visit established patient, 30-39 mins, moderate MDM',
    category: 'E&M_OUTPATIENT',
    standardFeeUsd: 195.0,
    relativeValueUnits: 1.92,
    requiresPreAuthorization: false,
  },
  {
    code: '99215',
    shortDesc: 'Office/outpatient visit established patient, 40-54 mins, high MDM',
    category: 'E&M_OUTPATIENT',
    standardFeeUsd: 265.0,
    relativeValueUnits: 2.8,
    requiresPreAuthorization: false,
  },

  // Inpatient & Critical Care E&M
  {
    code: '99221',
    shortDesc: 'Initial hospital care, per day, straightforward/low MDM',
    category: 'E&M_INPATIENT',
    standardFeeUsd: 155.0,
    relativeValueUnits: 1.63,
    requiresPreAuthorization: false,
  },
  {
    code: '99223',
    shortDesc: 'Initial hospital care, per day, high complexity MDM',
    category: 'E&M_INPATIENT',
    standardFeeUsd: 295.0,
    relativeValueUnits: 3.86,
    requiresPreAuthorization: false,
  },
  {
    code: '99232',
    shortDesc: 'Subsequent hospital care, per day, moderate MDM',
    category: 'E&M_INPATIENT',
    standardFeeUsd: 110.0,
    relativeValueUnits: 1.39,
    requiresPreAuthorization: false,
  },
  {
    code: '99291',
    shortDesc: 'Critical care, evaluation and management of critically ill, first 30-74 mins',
    category: 'CRITICAL_CARE',
    standardFeeUsd: 420.0,
    relativeValueUnits: 4.5,
    requiresPreAuthorization: false,
  },

  // Emergency Department E&M
  {
    code: '99283',
    shortDesc: 'Emergency dept visit, moderate severity / low MDM',
    category: 'EMERGENCY_DEPT',
    standardFeeUsd: 175.0,
    relativeValueUnits: 1.42,
    requiresPreAuthorization: false,
  },
  {
    code: '99284',
    shortDesc: 'Emergency dept visit, high severity / moderate MDM',
    category: 'EMERGENCY_DEPT',
    standardFeeUsd: 275.0,
    relativeValueUnits: 2.56,
    requiresPreAuthorization: false,
  },
  {
    code: '99285',
    shortDesc: 'Emergency dept visit, immediate threat to life / high MDM',
    category: 'EMERGENCY_DEPT',
    standardFeeUsd: 395.0,
    relativeValueUnits: 3.8,
    requiresPreAuthorization: false,
  },

  // Diagnostic Radiology
  {
    code: '71045',
    shortDesc: 'Radiologic examination, chest; single view',
    category: 'RADIOLOGY',
    standardFeeUsd: 45.0,
    relativeValueUnits: 0.35,
    requiresPreAuthorization: false,
  },
  {
    code: '71046',
    shortDesc: 'Radiologic examination, chest; 2 views',
    category: 'RADIOLOGY',
    standardFeeUsd: 65.0,
    relativeValueUnits: 0.5,
    requiresPreAuthorization: false,
  },
  {
    code: '71275',
    shortDesc: 'Computed tomographic angiography, chest (PE protocol)',
    category: 'RADIOLOGY',
    standardFeeUsd: 480.0,
    relativeValueUnits: 2.3,
    requiresPreAuthorization: true,
  },

  // Clinical Laboratory Panels
  {
    code: '80053',
    shortDesc: 'Comprehensive metabolic panel (CMP)',
    category: 'LABORATORY',
    standardFeeUsd: 45.0,
    relativeValueUnits: 0.3,
    requiresPreAuthorization: false,
  },
  {
    code: '85025',
    shortDesc: 'Complete blood count (CBC) with automated differential',
    category: 'LABORATORY',
    standardFeeUsd: 35.0,
    relativeValueUnits: 0.25,
    requiresPreAuthorization: false,
  },
  {
    code: '84484',
    shortDesc: 'Troponin, quantitative high-sensitivity',
    category: 'LABORATORY',
    standardFeeUsd: 55.0,
    relativeValueUnits: 0.35,
    requiresPreAuthorization: false,
  },
];
