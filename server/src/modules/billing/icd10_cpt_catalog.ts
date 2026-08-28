/**
 * ICD-10-CM Diagnosis & CPT-4 Procedure Coding Catalog
 * Official healthcare reimbursement taxonomy and Relative Value Units (RVU)
 */

export interface Icd10Entry {
  code: string;
  shortDesc: string;
  longDesc: string;
  category: string;
  hccEligible?: boolean; // Hierarchical Condition Category for risk adjustment
}

export interface CptEntry {
  code: string;
  description: string;
  category: 'E/M' | 'LABORATORY' | 'RADIOLOGY' | 'MEDICINE' | 'SURGERY' | 'TELEHEALTH';
  baseRateUsd: number;
  workRvu: number;
  requiresModifier?: boolean;
}

export const ICD10_CATALOG: Icd10Entry[] = [
  // Cardiovascular
  { code: 'I10', shortDesc: 'Essential (primary) hypertension', longDesc: 'Essential (primary) hypertension, unspecified benign or malignant', category: 'Cardiovascular', hccEligible: false },
  { code: 'I25.10', shortDesc: 'Atherosclerotic heart disease of native coronary artery', longDesc: 'Atherosclerotic heart disease of native coronary artery without angina pectoris', category: 'Cardiovascular', hccEligible: true },
  { code: 'I48.0', shortDesc: 'Paroxysmal atrial fibrillation', longDesc: 'Paroxysmal atrial fibrillation', category: 'Cardiovascular', hccEligible: true },
  { code: 'I50.9', shortDesc: 'Heart failure, unspecified', longDesc: 'Heart failure, unspecified including congestive heart failure NOS', category: 'Cardiovascular', hccEligible: true },

  // Endocrinology & Metabolic
  { code: 'E11.9', shortDesc: 'Type 2 diabetes mellitus without complications', longDesc: 'Type 2 diabetes mellitus without complications', category: 'Endocrine', hccEligible: false },
  { code: 'E11.22', shortDesc: 'Type 2 diabetes with diabetic chronic kidney disease', longDesc: 'Type 2 diabetes mellitus with diabetic chronic kidney disease', category: 'Endocrine', hccEligible: true },
  { code: 'E78.5', shortDesc: 'Hyperlipidemia, unspecified', longDesc: 'Hyperlipidemia, unspecified dyslipidemia', category: 'Endocrine', hccEligible: false },
  { code: 'E03.9', shortDesc: 'Hypothyroidism, unspecified', longDesc: 'Hypothyroidism, unspecified myxedema NOS', category: 'Endocrine', hccEligible: false },

  // Respiratory
  { code: 'J44.1', shortDesc: 'COPD with (acute) exacerbation', longDesc: 'Chronic obstructive pulmonary disease with (acute) exacerbation', category: 'Respiratory', hccEligible: true },
  { code: 'J45.909', shortDesc: 'Unspecified asthma, uncomplicated', longDesc: 'Unspecified asthma, uncomplicated', category: 'Respiratory', hccEligible: false },
  { code: 'J18.9', shortDesc: 'Pneumonia, unspecified organism', longDesc: 'Pneumonia, unspecified organism', category: 'Respiratory', hccEligible: true },
  { code: 'J06.9', shortDesc: 'Acute upper respiratory infection, unspecified', longDesc: 'Acute upper respiratory infection, unspecified', category: 'Respiratory', hccEligible: false },

  // Renal & Urinary
  { code: 'N18.3', shortDesc: 'Chronic kidney disease, stage 3', longDesc: 'Chronic kidney disease, stage 3 (moderate)', category: 'Nephrology', hccEligible: true },
  { code: 'N18.4', shortDesc: 'Chronic kidney disease, stage 4', longDesc: 'Chronic kidney disease, stage 4 (severe)', category: 'Nephrology', hccEligible: true },
  { code: 'N39.0', shortDesc: 'Urinary tract infection, site not specified', longDesc: 'Urinary tract infection, site not specified', category: 'Nephrology', hccEligible: false },

  // Musculoskeletal & General
  { code: 'M54.5', shortDesc: 'Low back pain', longDesc: 'Low back pain, lumbago NOS', category: 'Musculoskeletal', hccEligible: false },
  { code: 'M17.11', shortDesc: 'Primary osteoarthritis, right knee', longDesc: 'Unilateral primary osteoarthritis, right knee', category: 'Musculoskeletal', hccEligible: false },
  { code: 'R07.9', shortDesc: 'Chest pain, unspecified', longDesc: 'Chest pain, unspecified', category: 'Symptoms', hccEligible: false },
  { code: 'R55', shortDesc: 'Syncope and collapse', longDesc: 'Syncope and collapse (blackout / fainting)', category: 'Symptoms', hccEligible: false },
  { code: 'R50.9', shortDesc: 'Fever, unspecified', longDesc: 'Fever, unspecified pyrexia NOS', category: 'Symptoms', hccEligible: false },
];

export const CPT_CATALOG: CptEntry[] = [
  // Evaluation & Management (E/M) Outpatient
  { code: '99202', description: 'Office visit new patient, 15-29 mins, straightforward MDM', category: 'E/M', baseRateUsd: 115.0, workRvu: 0.93 },
  { code: '99203', description: 'Office visit new patient, 30-44 mins, low level MDM', category: 'E/M', baseRateUsd: 175.0, workRvu: 1.6 },
  { code: '99204', description: 'Office visit new patient, 45-59 mins, moderate MDM', category: 'E/M', baseRateUsd: 260.0, workRvu: 2.6 },
  { code: '99205', description: 'Office visit new patient, 60-74 mins, high complexity MDM', category: 'E/M', baseRateUsd: 350.0, workRvu: 3.5 },
  { code: '99212', description: 'Office visit established patient, 10-19 mins, straightforward MDM', category: 'E/M', baseRateUsd: 85.0, workRvu: 0.7 },
  { code: '99213', description: 'Office visit established patient, 20-29 mins, low level MDM', category: 'E/M', baseRateUsd: 130.0, workRvu: 1.3 },
  { code: '99214', description: 'Office visit established patient, 30-39 mins, moderate MDM', category: 'E/M', baseRateUsd: 195.0, workRvu: 1.92 },
  { code: '99215', description: 'Office visit established patient, 40-54 mins, high complexity MDM', category: 'E/M', baseRateUsd: 275.0, workRvu: 2.8 },

  // Telehealth / Virtual Consultations
  { code: '99441', description: 'Telephone evaluation and management, 5-10 mins', category: 'TELEHEALTH', baseRateUsd: 65.0, workRvu: 0.48 },
  { code: '99442', description: 'Telephone evaluation and management, 11-20 mins', category: 'TELEHEALTH', baseRateUsd: 110.0, workRvu: 0.97 },
  { code: '99443', description: 'Telephone evaluation and management, 21-30 mins', category: 'TELEHEALTH', baseRateUsd: 160.0, workRvu: 1.5 },

  // Diagnostic Laboratories
  { code: '80053', description: 'Comprehensive Metabolic Panel (CMP, 14 tests)', category: 'LABORATORY', baseRateUsd: 45.0, workRvu: 0.0 },
  { code: '80061', description: 'Lipid Panel (Total Cholesterol, HDL, Triglycerides, LDL)', category: 'LABORATORY', baseRateUsd: 38.0, workRvu: 0.0 },
  { code: '85025', description: 'Complete Blood Count (CBC) with automated differential', category: 'LABORATORY', baseRateUsd: 30.0, workRvu: 0.0 },
  { code: '84443', description: 'Thyroid Stimulating Hormone (TSH)', category: 'LABORATORY', baseRateUsd: 42.0, workRvu: 0.0 },
  { code: '83036', description: 'Hemoglobin A1c (Glycated Hemoglobin)', category: 'LABORATORY', baseRateUsd: 35.0, workRvu: 0.0 },
  { code: '81003', description: 'Automated Urinalysis without microscopy', category: 'LABORATORY', baseRateUsd: 22.0, workRvu: 0.0 },

  // Radiology & Cardiology Procedures
  { code: '93000', description: '12-lead Electrocardiogram (ECG) with interpretation and report', category: 'MEDICINE', baseRateUsd: 75.0, workRvu: 0.4 },
  { code: '71045', description: 'Chest X-ray, single view frontal', category: 'RADIOLOGY', baseRateUsd: 95.0, workRvu: 0.25 },
  { code: '71046', description: 'Chest X-ray, 2 views frontal and lateral', category: 'RADIOLOGY', baseRateUsd: 125.0, workRvu: 0.35 },
  { code: '70450', description: 'Computed Tomography (CT) head/brain without contrast', category: 'RADIOLOGY', baseRateUsd: 420.0, workRvu: 0.95 },
];
