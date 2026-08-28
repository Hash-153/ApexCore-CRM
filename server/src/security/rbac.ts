/**
 * Role-Based Access Control (RBAC) & Security Policy Enforcement
 * Compliant with HIPAA Minimum Necessary Standard (45 CFR § 164.502(b))
 */

export type UserRole =
  | 'PATIENT'
  | 'PHYSICIAN'
  | 'TRIAGE_NURSE'
  | 'PHARMACIST'
  | 'LAB_TECHNICIAN'
  | 'RADIOLOGIST'
  | 'BILLING_SPECIALIST'
  | 'SYSTEM_ADMIN';

export type HealthcareResource =
  | 'PATIENT_DEMOGRAPHICS'
  | 'CLINICAL_NOTES'
  | 'VITALS_MEASUREMENTS'
  | 'DIAGNOSTIC_LABS'
  | 'PRESCRIPTIONS'
  | 'IMAGING_REPORTS'
  | 'BILLING_CLAIMS'
  | 'TELEHEALTH_SESSION'
  | 'HIPAA_AUDIT_LOGS'
  | 'USER_MANAGEMENT';

export type AccessAction = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'EXPORT' | 'ADMIN';

export interface UserPrincipal {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  npiNumber?: string; // National Provider Identifier
  patientId?: string; // If role is PATIENT
}

export interface PermissionRule {
  resource: HealthcareResource;
  allowedActions: AccessAction[];
  condition?: (principal: UserPrincipal, targetRecord?: any) => boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, PermissionRule[]> = {
  SYSTEM_ADMIN: [
    { resource: 'PATIENT_DEMOGRAPHICS', allowedActions: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'EXPORT', 'ADMIN'] },
    { resource: 'CLINICAL_NOTES', allowedActions: ['READ', 'EXPORT', 'ADMIN'] },
    { resource: 'VITALS_MEASUREMENTS', allowedActions: ['READ', 'EXPORT', 'ADMIN'] },
    { resource: 'DIAGNOSTIC_LABS', allowedActions: ['READ', 'EXPORT', 'ADMIN'] },
    { resource: 'PRESCRIPTIONS', allowedActions: ['READ', 'EXPORT', 'ADMIN'] },
    { resource: 'IMAGING_REPORTS', allowedActions: ['READ', 'EXPORT', 'ADMIN'] },
    { resource: 'BILLING_CLAIMS', allowedActions: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'EXPORT', 'ADMIN'] },
    { resource: 'TELEHEALTH_SESSION', allowedActions: ['READ', 'ADMIN'] },
    { resource: 'HIPAA_AUDIT_LOGS', allowedActions: ['READ', 'EXPORT', 'ADMIN'] },
    { resource: 'USER_MANAGEMENT', allowedActions: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'ADMIN'] },
  ],

  PHYSICIAN: [
    { resource: 'PATIENT_DEMOGRAPHICS', allowedActions: ['CREATE', 'READ', 'UPDATE'] },
    { resource: 'CLINICAL_NOTES', allowedActions: ['CREATE', 'READ', 'UPDATE'] },
    { resource: 'VITALS_MEASUREMENTS', allowedActions: ['CREATE', 'READ', 'UPDATE'] },
    { resource: 'DIAGNOSTIC_LABS', allowedActions: ['CREATE', 'READ', 'UPDATE'] },
    { resource: 'PRESCRIPTIONS', allowedActions: ['CREATE', 'READ', 'UPDATE', 'DELETE'] },
    { resource: 'IMAGING_REPORTS', allowedActions: ['CREATE', 'READ', 'UPDATE'] },
    { resource: 'BILLING_CLAIMS', allowedActions: ['CREATE', 'READ'] },
    { resource: 'TELEHEALTH_SESSION', allowedActions: ['CREATE', 'READ', 'UPDATE'] },
    { resource: 'HIPAA_AUDIT_LOGS', allowedActions: [] },
    { resource: 'USER_MANAGEMENT', allowedActions: [] },
  ],

  TRIAGE_NURSE: [
    { resource: 'PATIENT_DEMOGRAPHICS', allowedActions: ['CREATE', 'READ', 'UPDATE'] },
    { resource: 'CLINICAL_NOTES', allowedActions: ['READ', 'CREATE'] },
    { resource: 'VITALS_MEASUREMENTS', allowedActions: ['CREATE', 'READ', 'UPDATE'] },
    { resource: 'DIAGNOSTIC_LABS', allowedActions: ['READ', 'CREATE'] },
    { resource: 'PRESCRIPTIONS', allowedActions: ['READ'] },
    { resource: 'IMAGING_REPORTS', allowedActions: ['READ'] },
    { resource: 'BILLING_CLAIMS', allowedActions: [] },
    { resource: 'TELEHEALTH_SESSION', allowedActions: ['READ'] },
    { resource: 'HIPAA_AUDIT_LOGS', allowedActions: [] },
    { resource: 'USER_MANAGEMENT', allowedActions: [] },
  ],

  PHARMACIST: [
    { resource: 'PATIENT_DEMOGRAPHICS', allowedActions: ['READ'] },
    { resource: 'CLINICAL_NOTES', allowedActions: ['READ'] },
    { resource: 'VITALS_MEASUREMENTS', allowedActions: ['READ'] },
    { resource: 'DIAGNOSTIC_LABS', allowedActions: ['READ'] },
    { resource: 'PRESCRIPTIONS', allowedActions: ['CREATE', 'READ', 'UPDATE'] },
    { resource: 'IMAGING_REPORTS', allowedActions: [] },
    { resource: 'BILLING_CLAIMS', allowedActions: ['READ'] },
    { resource: 'TELEHEALTH_SESSION', allowedActions: [] },
    { resource: 'HIPAA_AUDIT_LOGS', allowedActions: [] },
    { resource: 'USER_MANAGEMENT', allowedActions: [] },
  ],

  LAB_TECHNICIAN: [
    { resource: 'PATIENT_DEMOGRAPHICS', allowedActions: ['READ'] },
    { resource: 'CLINICAL_NOTES', allowedActions: [] },
    { resource: 'VITALS_MEASUREMENTS', allowedActions: [] },
    { resource: 'DIAGNOSTIC_LABS', allowedActions: ['CREATE', 'READ', 'UPDATE'] },
    { resource: 'PRESCRIPTIONS', allowedActions: [] },
    { resource: 'IMAGING_REPORTS', allowedActions: [] },
    { resource: 'BILLING_CLAIMS', allowedActions: [] },
    { resource: 'TELEHEALTH_SESSION', allowedActions: [] },
    { resource: 'HIPAA_AUDIT_LOGS', allowedActions: [] },
    { resource: 'USER_MANAGEMENT', allowedActions: [] },
  ],

  RADIOLOGIST: [
    { resource: 'PATIENT_DEMOGRAPHICS', allowedActions: ['READ'] },
    { resource: 'CLINICAL_NOTES', allowedActions: ['READ'] },
    { resource: 'VITALS_MEASUREMENTS', allowedActions: [] },
    { resource: 'DIAGNOSTIC_LABS', allowedActions: ['READ'] },
    { resource: 'PRESCRIPTIONS', allowedActions: [] },
    { resource: 'IMAGING_REPORTS', allowedActions: ['CREATE', 'READ', 'UPDATE'] },
    { resource: 'BILLING_CLAIMS', allowedActions: [] },
    { resource: 'TELEHEALTH_SESSION', allowedActions: [] },
    { resource: 'HIPAA_AUDIT_LOGS', allowedActions: [] },
    { resource: 'USER_MANAGEMENT', allowedActions: [] },
  ],

  BILLING_SPECIALIST: [
    { resource: 'PATIENT_DEMOGRAPHICS', allowedActions: ['READ', 'UPDATE'] },
    { resource: 'CLINICAL_NOTES', allowedActions: ['READ'] },
    { resource: 'VITALS_MEASUREMENTS', allowedActions: [] },
    { resource: 'DIAGNOSTIC_LABS', allowedActions: ['READ'] },
    { resource: 'PRESCRIPTIONS', allowedActions: ['READ'] },
    { resource: 'IMAGING_REPORTS', allowedActions: ['READ'] },
    { resource: 'BILLING_CLAIMS', allowedActions: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'EXPORT'] },
    { resource: 'TELEHEALTH_SESSION', allowedActions: ['READ'] },
    { resource: 'HIPAA_AUDIT_LOGS', allowedActions: [] },
    { resource: 'USER_MANAGEMENT', allowedActions: [] },
  ],

  PATIENT: [
    {
      resource: 'PATIENT_DEMOGRAPHICS',
      allowedActions: ['READ', 'UPDATE'],
      condition: (p, record) => !record || p.patientId === record.id || p.id === record.userId,
    },
    {
      resource: 'CLINICAL_NOTES',
      allowedActions: ['READ'],
      condition: (p, record) => !record || p.patientId === record.patientId,
    },
    {
      resource: 'VITALS_MEASUREMENTS',
      allowedActions: ['READ'],
      condition: (p, record) => !record || p.patientId === record.patientId,
    },
    {
      resource: 'DIAGNOSTIC_LABS',
      allowedActions: ['READ'],
      condition: (p, record) => !record || p.patientId === record.patientId,
    },
    {
      resource: 'PRESCRIPTIONS',
      allowedActions: ['READ'],
      condition: (p, record) => !record || p.patientId === record.patientId,
    },
    {
      resource: 'IMAGING_REPORTS',
      allowedActions: ['READ'],
      condition: (p, record) => !record || p.patientId === record.patientId,
    },
    {
      resource: 'BILLING_CLAIMS',
      allowedActions: ['READ'],
      condition: (p, record) => !record || p.patientId === record.patientId,
    },
    {
      resource: 'TELEHEALTH_SESSION',
      allowedActions: ['CREATE', 'READ', 'UPDATE'],
      condition: (p, record) => !record || p.patientId === record.patientId,
    },
    { resource: 'HIPAA_AUDIT_LOGS', allowedActions: [] },
    { resource: 'USER_MANAGEMENT', allowedActions: [] },
  ],
};

export class AccessControlService {
  /**
   * Check if a principal is authorized to perform an action on a healthcare resource
   */
  public static isAuthorized(
    principal: UserPrincipal,
    resource: HealthcareResource,
    action: AccessAction,
    targetRecord?: any
  ): { allowed: boolean; reason?: string } {
    if (!principal || !principal.role) {
      return { allowed: false, reason: 'Unauthenticated or invalid principal' };
    }

    const rules = ROLE_PERMISSIONS[principal.role];
    if (!rules) {
      return { allowed: false, reason: `Unrecognized role: ${principal.role}` };
    }

    const rule = rules.find((r) => r.resource === resource);
    if (!rule || !rule.allowedActions.includes(action)) {
      return {
        allowed: false,
        reason: `Role '${principal.role}' is not granted '${action}' permission on '${resource}' under HIPAA Minimum Necessary Rule.`,
      };
    }

    if (rule.condition && targetRecord) {
      const conditionPassed = rule.condition(principal, targetRecord);
      if (!conditionPassed) {
        return {
          allowed: false,
          reason: 'Access denied: Resource ownership or relationship constraint failed.',
        };
      }
    }

    return { allowed: true };
  }

  /**
   * Filter accessible fields based on role to minimize PHI exposure
   */
  public static filterRecordFields<T extends Record<string, any>>(
    principal: UserPrincipal,
    resource: HealthcareResource,
    record: T
  ): Partial<T> {
    // If billing specialist accessing clinical note, strip narrative details if not necessary
    if (principal.role === 'BILLING_SPECIALIST' && resource === 'CLINICAL_NOTES') {
      const copy = { ...record };
      delete (copy as any).subjectiveNarrative;
      delete (copy as any).psychologicalNotes;
      return copy;
    }

    // Patients shouldn't see internal doctor private flags
    if (principal.role === 'PATIENT') {
      const copy = { ...record };
      delete (copy as any).internalClinicalNotes;
      delete (copy as any).physicianPrivateFlag;
      return copy;
    }

    return record;
  }
}
