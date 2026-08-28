/**
 * Relational Domain Entity Definitions for MediCore HealthOS
 */

import type { UserRole } from '../security/rbac.ts';
import type { EsiLevel } from '../clinical/triageEngine.ts';

export interface PatientRecord {
  id: string;
  mrn: string; // Medical Record Number
  fullName: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  ssnMasked: string;
  phone: string;
  email: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurance: {
    providerName: string;
    policyNumber: string;
    groupNumber: string;
    subscriberName: string;
    copayAmountUsd: number;
    deductibleRemainingUsd: number;
    coinsurancePercent: number; // e.g. 20%
  };
  status: 'ACTIVE' | 'INACTIVE' | 'ADMITTED' | 'DISCHARGED';
  primaryPhysicianId: string;
  primaryPhysicianName: string;
  createdAt: string;
  updatedAt: string;
}

export interface VitalSignRecord {
  id: string;
  patientId: string;
  encounterId?: string;
  recordedAt: string;
  recordedBy: string;
  recordedByName: string;
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  respiratoryRate: number;
  spO2: number;
  temperatureCelsius: number;
  bloodGlucoseMgDl?: number;
  painScale: number; // 0-10
  supplementalOxygen: boolean;
  consciousness: 'ALERT' | 'VOICE' | 'PAIN' | 'UNRESPONSIVE';
  news2Score: number;
  news2RiskLevel: 'LOW' | 'LOW-MEDIUM' | 'MEDIUM' | 'HIGH';
}

export interface ClinicalEncounter {
  id: string;
  patientId: string;
  patientName: string;
  physicianId: string;
  physicianName: string;
  encounterType: 'EMERGENCY' | 'OUTPATIENT' | 'INPATIENT' | 'TELEHEALTH';
  status: 'ARRIVED' | 'TRIAGED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  startedAt: string;
  endedAt?: string;
  chiefComplaint: string;
  esiLevel?: EsiLevel;
  soapNote?: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
    primaryIcd10: string;
    primaryDiagnosisDesc: string;
  };
  admittedToRoom?: string;
}

export interface PrescriptionRecord {
  id: string;
  patientId: string;
  patientName: string;
  prescribedById: string;
  prescribedByName: string;
  encounterId?: string;
  medicationName: string;
  rxNormCode?: string;
  dosage: string;
  frequency: string;
  route: string;
  quantity: number;
  refillsRemaining: number;
  status: 'DRAFT' | 'ACTIVE' | 'DISPENSED' | 'DISCONTINUED' | 'EXPIRED';
  prescribedAt: string;
  dispensedAt?: string;
  instructions: string;
  warningFlags?: string[];
}

export interface LabTestItem {
  testCode: string;
  testName: string;
  loincCode?: string;
  resultValue?: number;
  resultUnit?: string;
  referenceRangeLow?: number;
  referenceRangeHigh?: number;
  interpretation?: 'NORMAL' | 'LOW' | 'HIGH' | 'CRITICAL_LOW' | 'CRITICAL_HIGH';
  isCriticalAlert?: boolean;
}

export interface LabOrderRecord {
  id: string;
  orderNumber: string;
  patientId: string;
  patientName: string;
  orderedById: string;
  orderedByName: string;
  encounterId?: string;
  panelName: string; // e.g. "Comprehensive Metabolic Panel", "Complete Blood Count"
  specimenType: 'WHOLE_BLOOD' | 'SERUM' | 'PLASMA' | 'URINE' | 'SWAB' | 'CSF';
  specimenBarcode: string;
  status: 'ORDERED' | 'COLLECTED' | 'RECEIVED' | 'IN_ANALYSIS' | 'FINALIZED' | 'CANCELLED';
  orderedAt: string;
  collectedAt?: string;
  finalizedAt?: string;
  tests: LabTestItem[];
  technicianNotes?: string;
}

export interface TelehealthSessionRecord {
  id: string;
  sessionRoomCode: string;
  patientId: string;
  patientName: string;
  physicianId: string;
  physicianName: string;
  scheduledTime: string;
  status: 'SCHEDULED' | 'WAITING' | 'IN_CALL' | 'COMPLETED' | 'NO_SHOW';
  durationMinutes?: number;
  consultationSummary?: string;
  followUpPlan?: string;
}

export interface SuperbillClaimRecord {
  id: string;
  claimNumber: string;
  encounterId: string;
  patientId: string;
  patientName: string;
  providerNpi: string;
  providerName: string;
  dosDate: string; // Date of Service
  primaryDiagnosisCode: string;
  secondaryDiagnosisCodes: string[];
  lineItems: Array<{
    cptCode: string;
    description: string;
    units: number;
    unitPriceUsd: number;
    totalChargeUsd: number;
  }>;
  totalBilledUsd: number;
  insuranceAllowedUsd: number;
  insurancePaidUsd: number;
  patientCopayUsd: number;
  patientCoinsuranceUsd: number;
  patientBalanceDueUsd: number;
  claimStatus: 'DRAFT' | 'SUBMITTED' | 'ADJUDICATED' | 'PAID' | 'DENIED' | 'APPEALED';
  adjudicationDate?: string;
}
