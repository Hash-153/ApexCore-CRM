import test from 'node:test';
import assert from 'node:assert/strict';
import { AccessControlService } from '../src/security/rbac.ts';
import { HipaaAuditLogger } from '../src/security/hipaaAudit.ts';
import { DeidentificationService } from '../src/security/deidentification.ts';
import { DEMO_USERS } from '../src/security/authMiddleware.ts';

test('HIPAA RBAC - Minimum Necessary Access Permissions', () => {
  // Physician can read and create clinical notes
  const docCanReadNotes = AccessControlService.isAuthorized(DEMO_USERS.PHYSICIAN, 'CLINICAL_NOTES', 'READ');
  assert.equal(docCanReadNotes.allowed, true);

  // Lab Tech CANNOT read or create clinical notes (Minimum Necessary constraint)
  const labCantReadNotes = AccessControlService.isAuthorized(DEMO_USERS.LAB_TECHNICIAN, 'CLINICAL_NOTES', 'READ');
  assert.equal(labCantReadNotes.allowed, false);

  // Billing specialist CANNOT create prescriptions
  const billingCantRx = AccessControlService.isAuthorized(DEMO_USERS.BILLING_SPECIALIST, 'PRESCRIPTIONS', 'CREATE');
  assert.equal(billingCantRx.allowed, false);

  // System admin can access HIPAA Audit Logs
  const adminCanAudit = AccessControlService.isAuthorized(DEMO_USERS.SYSTEM_ADMIN, 'HIPAA_AUDIT_LOGS', 'READ');
  assert.equal(adminCanAudit.allowed, true);
});

test('HIPAA Audit Logger - Tamper-Evident Hash Chain Verification', () => {
  // Log several test PHI access events
  HipaaAuditLogger.log({
    actor: DEMO_USERS.PHYSICIAN,
    action: 'READ',
    resource: 'PATIENT_DEMOGRAPHICS',
    patientId: 'PAT-001',
    accessReason: 'Emergency Consultation',
    status: 'SUCCESS',
  });

  HipaaAuditLogger.log({
    actor: DEMO_USERS.TRIAGE_NURSE,
    action: 'CREATE',
    resource: 'VITALS_MEASUREMENTS',
    patientId: 'PAT-001',
    accessReason: 'Triage Intake',
    status: 'SUCCESS',
  });

  // Verify chain
  const verification = HipaaAuditLogger.verifyLogIntegrity();
  assert.equal(verification.valid, true);
  assert.ok(verification.inspectedCount >= 2);
});

test('HIPAA Safe Harbor De-identification', () => {
  const rawPatient = {
    id: 'PAT-999',
    mrn: 'MRN-887766',
    fullName: 'Robert Alexander Smith',
    dob: '1970-05-14',
    gender: 'MALE',
    address: {
      street: '450 West 33rd Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  };

  const deidentified = DeidentificationService.deidentifyPatient(rawPatient);

  // Names, exact street address, exact DOB must NOT be in output
  assert.equal(deidentified.fullName, undefined);
  assert.equal(deidentified.address.street, undefined);
  assert.equal(deidentified.birthYear, '1970');
  assert.equal(deidentified.address.state, 'NY');
  assert.equal(deidentified.address.zip3, '10000');
  assert.ok(deidentified.id.startsWith('PSEUDO-'));
  assert.equal(deidentified.isDeidentified, true);

  // Free-text redaction test
  const note = 'Patient SSN is 123-45-6789 and phone is (555) 234-5678, email is test@domain.com.';
  const redacted = DeidentificationService.redactFreeTextPhi(note);
  assert.ok(!redacted.includes('123-45-6789'));
  assert.ok(!redacted.includes('(555) 234-5678'));
  assert.ok(!redacted.includes('test@domain.com'));
  assert.ok(redacted.includes('[REDACTED-SSN]'));
  assert.ok(redacted.includes('[REDACTED-PHONE]'));
  assert.ok(redacted.includes('[REDACTED-EMAIL]'));
});
