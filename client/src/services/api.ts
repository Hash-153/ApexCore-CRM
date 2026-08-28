/**
 * Client API Service Layer
 * Fully typed client communicating with MediCore HealthOS Backend
 */

import type {
  PatientRecord,
  ClinicalEncounter,
  VitalSignRecord,
  PrescriptionRecord,
  LabOrderRecord,
  TelehealthSessionRecord,
  SuperbillClaimRecord,
  HipaaAuditEvent,
  HospitalExecutiveKPIs,
  UserRole,
} from '../types/index';

const API_BASE = '/api/v1';

let currentRole: UserRole = 'PHYSICIAN';
let accessReason = 'Clinical Charting & Direct Patient Care';

export function setApiRole(role: UserRole, reason?: string) {
  currentRole = role;
  if (reason) accessReason = reason;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    'X-MediCore-Role': currentRole,
    'X-Access-Reason': accessReason,
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const json = await response.json();
  if (!response.ok || json.success === false) {
    throw new Error(json.error || `HTTP ${response.status}: Failed to execute request`);
  }

  return json.data !== undefined ? json.data : json;
}

export const api = {
  // Patients
  getPatients: (query?: string) => request<PatientRecord[]>(`/patients${query ? `?q=${encodeURIComponent(query)}` : ''}`),
  getPatientById: (id: string) => request<PatientRecord>(`/patients/${id}`),
  createPatient: (data: Partial<PatientRecord>) =>
    request<PatientRecord>('/patients', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  exportFhirPatient: (id: string) => request<any>(`/patients/${id}/fhir`),
  exportDeidentifiedPatient: (id: string) => request<any>(`/patients/${id}/deidentified`),

  // Clinical & Encounters
  getEncounters: (patientId?: string, status?: string) => {
    const params = new URLSearchParams();
    if (patientId) params.append('patientId', patientId);
    if (status) params.append('status', status);
    return request<ClinicalEncounter[]>(`/clinical/encounters?${params.toString()}`);
  },
  createEncounter: (data: any) =>
    request<ClinicalEncounter>('/clinical/encounters', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  saveSoapNote: (encounterId: string, soapData: any) =>
    request<{ encounter: ClinicalEncounter; formattedNote: string }>(`/clinical/encounters/${encounterId}/soap`, {
      method: 'POST',
      body: JSON.stringify(soapData),
    }),

  // Calculators
  calculateNews2: (vitals: any) =>
    request<any>('/clinical/calculators/news2', {
      method: 'POST',
      body: JSON.stringify(vitals),
    }),
  calculateEgfr: (data: { creatinineMgDl: number; ageYears: number; gender: string }) =>
    request<any>('/clinical/calculators/egfr', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  calculateChadsvasc: (data: any) =>
    request<any>('/clinical/calculators/chadsvasc', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  calculatePediatricDosing: (data: any) =>
    request<any>('/clinical/calculators/pediatric-dosing', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Triage & Vitals
  recordVitals: (vitalsData: any) =>
    request<VitalSignRecord>('/triage/vitals', {
      method: 'POST',
      body: JSON.stringify(vitalsData),
    }),
  assessTriage: (triageData: any) =>
    request<any>('/triage/assess', {
      method: 'POST',
      body: JSON.stringify(triageData),
    }),
  getTriageQueue: () => request<any[]>('/triage/queue'),

  // Pharmacy & Prescriptions
  getPrescriptions: (patientId?: string) =>
    request<PrescriptionRecord[]>(`/pharmacy${patientId ? `?patientId=${patientId}` : ''}`),
  checkPrescriptionSafety: (patientId: string, proposedMedication: string) =>
    request<any>('/pharmacy/check-safety', {
      method: 'POST',
      body: JSON.stringify({ patientId, proposedMedication }),
    }),
  createPrescription: (data: any) =>
    request<any>('/pharmacy', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  dispensePrescription: (id: string) =>
    request<PrescriptionRecord>(`/pharmacy/${id}/dispense`, {
      method: 'PUT',
    }),

  // LIMS Diagnostics
  getLabPanels: () => request<any[]>('/lims/panels'),
  getLabOrders: (patientId?: string) =>
    request<LabOrderRecord[]>(`/lims/orders${patientId ? `?patientId=${patientId}` : ''}`),
  orderLabPanel: (data: { patientId: string; panelName: string; encounterId?: string }) =>
    request<LabOrderRecord>('/lims/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateSpecimenStatus: (id: string, status: string) =>
    request<LabOrderRecord>(`/lims/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  enterLabResults: (id: string, testResults: Array<{ testCode: string; value: number }>, technicianNotes?: string) =>
    request<LabOrderRecord>(`/lims/orders/${id}/results`, {
      method: 'POST',
      body: JSON.stringify({ testResults, technicianNotes }),
    }),

  // Telehealth
  getTelehealthSessions: () => request<TelehealthSessionRecord[]>('/telehealth'),
  scheduleTelehealth: (data: any) =>
    request<TelehealthSessionRecord>('/telehealth/schedule', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  enterWaitingRoom: (id: string) =>
    request<TelehealthSessionRecord>(`/telehealth/${id}/waiting`, {
      method: 'POST',
    }),
  startTelehealthCall: (id: string) =>
    request<TelehealthSessionRecord>(`/telehealth/${id}/start`, {
      method: 'POST',
    }),
  completeTelehealthCall: (id: string, summary: string, followUpPlan?: string) =>
    request<TelehealthSessionRecord>(`/telehealth/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify({ summary, followUpPlan }),
    }),

  // Billing & Claims
  getIcd10: (query?: string) => request<any[]>(`/billing/icd10${query ? `?q=${encodeURIComponent(query)}` : ''}`),
  getCpt: (query?: string) => request<any[]>(`/billing/cpt${query ? `?q=${encodeURIComponent(query)}` : ''}`),
  getClaims: (patientId?: string) =>
    request<SuperbillClaimRecord[]>(`/billing/claims${patientId ? `?patientId=${patientId}` : ''}`),
  createSuperbill: (data: any) =>
    request<SuperbillClaimRecord>('/billing/superbills', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getCms1500Payload: (claimId: string) => request<any>(`/billing/claims/${claimId}/cms1500`),

  // Analytics & KPIs
  getKPIs: () => request<HospitalExecutiveKPIs>('/analytics/kpis'),

  // HIPAA Audit Logs
  getAuditLogs: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return request<HipaaAuditEvent[]>(`/audit?${params.toString()}`);
  },
  verifyAuditChain: () => request<{ valid: boolean; inspectedCount: number }>('/audit/verify'),

  // Radiology & DICOM PACS
  getRadiologyStudies: (patientId?: string) =>
    request<any[]>(`/radiology/studies${patientId ? `?patientId=${patientId}` : ''}`),
  getRadiologyStudy: (uid: string) => request<any>(`/radiology/studies/${uid}`),
  getRadiologyReport: (uid: string) => request<any>(`/radiology/studies/${uid}/report`),
  signRadiologyReport: (data: any) =>
    request<any>('/radiology/reports', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Inpatient & Bed Management
  getInpatientBeds: (unitCode?: string) =>
    request<any[]>(`/inpatient/beds${unitCode ? `?unitCode=${unitCode}` : ''}`),
  assignInpatientBed: (bedId: string, patientId: string, patientName: string) =>
    request<any>('/inpatient/beds/assign', {
      method: 'POST',
      body: JSON.stringify({ bedId, patientId, patientName }),
    }),
  dischargeInpatientBed: (bedId: string) =>
    request<any>(`/inpatient/beds/${bedId}/discharge`, {
      method: 'POST',
    }),
  cleanInpatientBed: (bedId: string) =>
    request<any>(`/inpatient/beds/${bedId}/clean`, {
      method: 'POST',
    }),
  createSbarHandoff: (data: any) =>
    request<any>('/inpatient/handoffs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getSbarHandoffs: (patientId: string) => request<any[]>(`/inpatient/handoffs/patient/${patientId}`),

  // eMAR & BCMA
  getEmarSlots: (patientId: string) => request<any[]>(`/emar/patient/${patientId}`),
  verifyEmarFiveRights: (data: any) =>
    request<any>('/emar/verify-5-rights', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  administerEmarMedication: (data: any) =>
    request<any>('/emar/administer', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
