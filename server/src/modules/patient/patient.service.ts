/**
 * Patient Service Layer
 * Handles Patient Demographics, MRN Generation, FHIR Transformation & HIPAA De-identification
 */

import { db } from '../../database/memoryDb.ts';
import type { PatientRecord } from '../../database/types.ts';
import { FhirSerializer } from '../../fhir/serializers.ts';
import { DeidentificationService } from '../../security/deidentification.ts';
import { EncryptionService } from '../../security/encryption.ts';

export class PatientService {
  /**
   * List all patients with optional search query (Name or MRN)
   */
  public static listPatients(query?: string): PatientRecord[] {
    let patients = db.getAll(db.patients);

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      patients = patients.filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          p.mrn.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.email.toLowerCase().includes(q)
      );
    }

    return patients.sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  /**
   * Get single patient by ID with full clinical relationships
   */
  public static getPatientById(id: string) {
    const patient = db.getById(db.patients, id);
    if (!patient) return null;

    const allergies = db.getPatientAllergies(id);
    const vitals = db.getPatientVitals(id);
    const encounters = db.getPatientEncounters(id);
    const prescriptions = db.getPatientPrescriptions(id);
    const labOrders = db.getPatientLabOrders(id);

    return {
      ...patient,
      allergies,
      recentVitals: vitals.slice(0, 5),
      recentEncounters: encounters.slice(0, 5),
      activePrescriptions: prescriptions.filter((p) => p.status === 'ACTIVE'),
      recentLabOrders: labOrders.slice(0, 5),
    };
  }

  /**
   * Register a new patient with auto-generated MRN and masked SSN
   */
  public static createPatient(input: {
    fullName: string;
    dob: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    ssn?: string;
    phone: string;
    email: string;
    bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country?: string;
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
      copayAmountUsd?: number;
      deductibleRemainingUsd?: number;
      coinsurancePercent?: number;
    };
    primaryPhysicianId?: string;
    primaryPhysicianName?: string;
  }): PatientRecord {
    const id = `PAT-${String(db.patients.size + 1).padStart(3, '0')}`;
    const mrnRandom = Math.floor(100000 + Math.random() * 900000);
    const mrn = `MRN-${mrnRandom}`;

    const newPatient: PatientRecord = {
      id,
      mrn,
      fullName: input.fullName,
      dob: input.dob,
      gender: input.gender,
      ssnMasked: EncryptionService.maskSSN(input.ssn),
      phone: input.phone,
      email: input.email,
      bloodType: input.bloodType,
      address: {
        street: input.address.street,
        city: input.address.city,
        state: input.address.state,
        zip: input.address.zip,
        country: input.address.country || 'USA',
      },
      emergencyContact: input.emergencyContact,
      insurance: {
        providerName: input.insurance.providerName,
        policyNumber: input.insurance.policyNumber,
        groupNumber: input.insurance.groupNumber,
        subscriberName: input.insurance.subscriberName,
        copayAmountUsd: input.insurance.copayAmountUsd || 25.0,
        deductibleRemainingUsd: input.insurance.deductibleRemainingUsd || 500.0,
        coinsurancePercent: input.insurance.coinsurancePercent || 20,
      },
      status: 'ACTIVE',
      primaryPhysicianId: input.primaryPhysicianId || 'DOC-101',
      primaryPhysicianName: input.primaryPhysicianName || 'Dr. Sarah Mitchell, MD',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.save(db.patients, newPatient);
    return newPatient;
  }

  /**
   * Export patient record as standard HL7 FHIR R4 Patient resource
   */
  public static exportAsFhir(patientId: string) {
    const patient = db.getById(db.patients, patientId);
    if (!patient) return null;
    return FhirSerializer.toFhirPatient(patient);
  }

  /**
   * Export patient data under HIPAA Safe Harbor de-identification
   */
  public static exportDeidentified(patientId: string) {
    const patient = db.getById(db.patients, patientId);
    if (!patient) return null;
    return DeidentificationService.deidentifyPatient(patient);
  }
}
