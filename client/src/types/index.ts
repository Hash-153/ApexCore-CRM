export type UserRole =
  | 'PATIENT'
  | 'PHYSICIAN'
  | 'TRIAGE_NURSE'
  | 'PHARMACIST'
  | 'LAB_TECHNICIAN'
  | 'RADIOLOGIST'
  | 'BILLING_SPECIALIST'
  | 'SYSTEM_ADMIN';

export type EsiLevel = 1 | 2 | 3 | 4 | 5;

export interface UserPrincipal {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  npiNumber?: string;
  patientId?: string;
}

export interface PatientRecord {
  id: string;
  mrn: string;
  fullName: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  ssnMasked: string;
  phone: string;
  email: string;
  bloodType: string;
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
    coinsurancePercent: number;
  };
  status: 'ACTIVE' | 'INACTIVE' | 'ADMITTED' | 'DISCHARGED';
  primaryPhysicianId: string;
  primaryPhysicianName: string;
  createdAt: string;
  updatedAt: string;
  allergies?: AllergyRecord[];
  recentVitals?: VitalSignRecord[];
  recentEncounters?: ClinicalEncounter[];
  activePrescriptions?: PrescriptionRecord[];
  recentLabOrders?: LabOrderRecord[];
}

export interface AllergyRecord {
  id: string;
  patientId: string;
  allergen: string;
  category: 'MEDICATION' | 'FOOD' | 'ENVIRONMENTAL' | 'BIOLOGICAL';
  reaction: string;
  severity: 'MILD' | 'MODERATE' | 'SEVERE' | 'LIFE_THREATENING';
  onsetYear?: number;
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
  painScale: number;
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
  panelName: string;
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
  dosDate: string;
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
}

export interface HipaaAuditEvent {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  resource: string;
  patientId?: string;
  recordId?: string;
  ipAddress?: string;
  accessReason: string;
  status: 'SUCCESS' | 'DENIED' | 'FLAGGED';
  phiElementsAccessed: string[];
  signatureHash: string;
}

export interface HospitalExecutiveKPIs {
  patientCensus: {
    totalRegistered: number;
    admittedInpatients: number;
    activeOutpatients: number;
    bedOccupancyPercent: number;
  };
  emergencyDepartment: {
    activeTriageQueue: number;
    esi1Count: number;
    esi2Count: number;
    esi3PlusCount: number;
    averageWaitTimeMinutes: number;
  };
  diagnosticsAndPharmacy: {
    pendingLabOrders: number;
    finalizedLabOrders: number;
    criticalAlertsActive: number;
    activePrescriptions: number;
    dispensedToday: number;
  };
  revenueCycle: {
    totalBilledUsd: number;
    insurancePaidUsd: number;
    patientBalanceDueUsd: number;
    collectionRatePercent: number;
  };
}

// Radiology & DICOM types
export type DicomModality = 'CT' | 'MR' | 'CR' | 'DX' | 'US' | 'NM' | 'PET' | 'XA';

export interface DicomInstance {
  sopInstanceUid: string;
  sopClassUid: string;
  instanceNumber: number;
  rows: number;
  columns: number;
  pixelSpacing: [number, number];
  sliceThickness?: number;
  sliceLocation?: number;
  windowCenter: number;
  windowWidth: number;
  rescaleIntercept: number;
  rescaleSlope: number;
  acquisitionDateTime: string;
  imageUrl: string;
}

export interface DicomSeries {
  seriesInstanceUid: string;
  seriesNumber: number;
  modality: DicomModality;
  seriesDescription: string;
  bodyPartExamined: string;
  numberOfInstances: number;
  protocolName?: string;
  instances: DicomInstance[];
}

export interface DicomStudy {
  studyInstanceUid: string;
  patientId: string;
  patientName: string;
  patientBirthDate: string;
  patientSex: 'M' | 'F' | 'O';
  accessionNumber: string;
  studyDate: string;
  studyTime: string;
  studyDescription: string;
  referringPhysicianName: string;
  modalitiesInStudy: DicomModality[];
  numberOfSeries: number;
  numberOfInstances: number;
  series: DicomSeries[];
}

export interface RadiologyStructuredReport {
  id: string;
  studyInstanceUid: string;
  accessionNumber: string;
  patientId: string;
  radiologistId: string;
  radiologistName: string;
  technique: string;
  comparisonStudies?: string;
  findings: string;
  impression: string;
  structuredClassification?: {
    system: 'BI-RADS' | 'LUNG-RADS' | 'TI-RADS' | 'PI-RADS' | 'RECIST';
    categoryScore: string;
    actionRecommendation: string;
  };
  criticalAlertFlag: boolean;
  status: 'PRELIMINARY' | 'FINALIZED' | 'AMENDED';
  signedAt?: string;
}

// Inpatient & Bed Management types
export type WardUnitType =
  | 'INTENSIVE_CARE_UNIT'
  | 'CORONARY_CARE_UNIT'
  | 'NEONATAL_ICU'
  | 'STEP_DOWN_TELEMETRY'
  | 'MED_SURG_ACUTE'
  | 'LABOR_AND_DELIVERY'
  | 'EMERGENCY_OBSERVATION';

export type BedStatus = 'AVAILABLE' | 'OCCUPIED' | 'CLEANING_REQUIRED' | 'MAINTENANCE' | 'BLOCKED';
export type IsolationType = 'STANDARD' | 'CONTACT' | 'DROPLET' | 'AIRBORNE' | 'PROTECTIVE_ENVIRONMENT';

export interface InpatientBed {
  id: string;
  unitCode: string;
  unitName: string;
  unitType: WardUnitType;
  roomNumber: string;
  bedLabel: string;
  status: BedStatus;
  isolationRequired: IsolationType;
  currentPatientId?: string;
  currentPatientName?: string;
  assignedNurseId?: string;
  assignedNurseName?: string;
  telemetryMonitored: boolean;
  ventilatorAttached: boolean;
  lastCleanedAt: string;
}

export interface SbarHandoff {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  mrn: string;
  unitAndBed: string;
  codeStatus: 'FULL_CODE' | 'DNR' | 'DNI' | 'COMFORT_CARE';
  admitDiagnosis: string;
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
  nurseGivingHandoff: string;
  nurseReceivingHandoff?: string;
  timestamp: string;
}

// eMAR & BCMA types
export interface EmarDoseSlot {
  id: string;
  prescriptionId: string;
  patientId: string;
  medicationName: string;
  dose: string;
  route: string;
  scheduledTime: string;
  scheduleType: 'SCHEDULED' | 'PRN' | 'STAT' | 'CONTINUOUS_IV';
  highAlert: {
    isHighAlert: boolean;
    requiresDualSignOff: boolean;
    warningText?: string;
  };
  status: 'PENDING' | 'GIVEN' | 'HELD' | 'REFUSED';
  administrationDetails?: {
    administeredAt: string;
    administeredByNurseId: string;
    administeredByNurseName: string;
    coSigningNurseId?: string;
    coSigningNurseName?: string;
    siteOfAdministration?: string;
    barcodeVerified: boolean;
    vitalsBeforeAdmin?: {
      heartRate?: number;
      bloodPressure?: string;
      bloodGlucose?: number;
    };
    nurseNotes?: string;
  };
}

export interface FiveRightsCheckResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}
