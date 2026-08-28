/**
 * e-Prescriptions & Pharmacy Management Service
 * Features automated drug-drug interaction matrix and allergy cross-reactivity checks
 */

import { db } from '../../database/memoryDb.ts';
import type { PrescriptionRecord } from '../../database/types.ts';
import { DrugInteractionChecker, type DetectedInteraction } from '../../clinical/drugInteractions.ts';
import { AllergyEngine, type AllergyConflict } from '../../clinical/allergyEngine.ts';

export interface PrescribeSafetyCheckResult {
  safeToPrescribe: boolean;
  blockReason?: string;
  drugInteractions: DetectedInteraction[];
  allergyConflicts: AllergyConflict[];
}

export class PharmacyService {
  /**
   * Run safety check on a proposed prescription before authoring
   */
  public static checkSafety(patientId: string, proposedMedication: string): PrescribeSafetyCheckResult {
    const patient = db.getById(db.patients, patientId);
    if (!patient) {
      throw new Error(`Patient not found with ID ${patientId}`);
    }

    const activePrescriptions = db.getPatientPrescriptions(patientId).filter((p) => p.status === 'ACTIVE');
    const activeMedNames = activePrescriptions.map((p) => p.medicationName);
    const allergies = db.getPatientAllergies(patientId);

    // 1. Check Drug-Drug Interactions
    const ddiResult = DrugInteractionChecker.checkInteractions(proposedMedication, activeMedNames);

    // 2. Check Allergy Cross-Reactivity
    const allergyConflicts = AllergyEngine.checkAllergyConflicts(proposedMedication, allergies);

    const hasContraindication =
      ddiResult.highestSeverity === 'CONTRAINDICATED' ||
      allergyConflicts.some((a) => a.severity === 'LIFE_THREATENING' || a.crossReactivityRisk === 'DIRECT_MATCH');

    let blockReason: string | undefined;
    if (hasContraindication) {
      blockReason =
        'Prescription blocked by Clinical Decision Support: Absolute contraindication or life-threatening allergy match detected.';
    }

    return {
      safeToPrescribe: !hasContraindication,
      blockReason,
      drugInteractions: ddiResult.interactions,
      allergyConflicts,
    };
  }

  /**
   * Author a new e-Prescription
   */
  public static createPrescription(input: {
    patientId: string;
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
    instructions: string;
    overrideWarningConsent?: boolean; // Doctor explicit override with justification
    overrideJustification?: string;
  }): { prescription: PrescriptionRecord; safetyAudit: PrescribeSafetyCheckResult } {
    const patient = db.getById(db.patients, input.patientId);
    if (!patient) {
      throw new Error(`Patient not found with ID ${input.patientId}`);
    }

    const safety = this.checkSafety(input.patientId, input.medicationName);

    if (!safety.safeToPrescribe && !input.overrideWarningConsent) {
      throw new Error(
        `Safety Check Failed: ${safety.blockReason || 'Critical interaction or allergy conflict detected. Explicit clinical override required.'}`
      );
    }

    const id = `RX-${Date.now()}`;
    const warningFlags: string[] = [];

    safety.drugInteractions.forEach((i) => warningFlags.push(`[${i.severity}] ${i.title}`));
    safety.allergyConflicts.forEach((a) => warningFlags.push(`[ALLERGY-${a.severity}] ${a.recommendation}`));

    if (input.overrideWarningConsent && input.overrideJustification) {
      warningFlags.push(`[OVERRIDE JUSTIFIED]: ${input.overrideJustification}`);
    }

    const prescription: PrescriptionRecord = {
      id,
      patientId: input.patientId,
      patientName: patient.fullName,
      prescribedById: input.prescribedById,
      prescribedByName: input.prescribedByName,
      encounterId: input.encounterId,
      medicationName: input.medicationName,
      rxNormCode: input.rxNormCode,
      dosage: input.dosage,
      frequency: input.frequency,
      route: input.route,
      quantity: input.quantity,
      refillsRemaining: input.refillsRemaining,
      status: 'ACTIVE',
      prescribedAt: new Date().toISOString(),
      instructions: input.instructions,
      warningFlags: warningFlags.length > 0 ? warningFlags : undefined,
    };

    db.save(db.prescriptions, prescription);

    return {
      prescription,
      safetyAudit: safety,
    };
  }

  /**
   * Dispense a prescription (Pharmacist action)
   */
  public static dispensePrescription(prescriptionId: string, pharmacistName: string): PrescriptionRecord {
    const rx = db.getById(db.prescriptions, prescriptionId);
    if (!rx) {
      throw new Error(`Prescription not found with ID ${prescriptionId}`);
    }

    if (rx.status !== 'ACTIVE') {
      throw new Error(`Cannot dispense prescription in status: ${rx.status}`);
    }

    rx.status = 'DISPENSED';
    rx.dispensedAt = new Date().toISOString();
    rx.instructions = `${rx.instructions} (Verified & Dispensed by ${pharmacistName})`;

    db.save(db.prescriptions, rx);
    return rx;
  }

  /**
   * List all prescriptions or filter by patient / status
   */
  public static listPrescriptions(filters?: { patientId?: string; status?: string }): PrescriptionRecord[] {
    let list = db.getAll(db.prescriptions);

    if (filters?.patientId) {
      list = list.filter((p) => p.patientId === filters.patientId);
    }
    if (filters?.status) {
      list = list.filter((p) => p.status === filters.status);
    }

    return list.sort((a, b) => new Date(b.prescribedAt).getTime() - new Date(a.prescribedAt).getTime());
  }
}
