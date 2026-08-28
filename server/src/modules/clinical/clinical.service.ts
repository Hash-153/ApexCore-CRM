/**
 * Clinical EHR & Physician Charting Service Layer
 */

import { db } from '../../database/memoryDb.ts';
import type { ClinicalEncounter } from '../../database/types.ts';
import { SoapNoteEngine, type SoapNoteInput } from '../../clinical/soapEngine.ts';
import { ClinicalCalculators, type VitalsInput } from '../../clinical/calculators.ts';

export class ClinicalService {
  public static listEncounters(filters?: { patientId?: string; status?: string }): ClinicalEncounter[] {
    let encounters = db.getAll(db.encounters);

    if (filters?.patientId) {
      encounters = encounters.filter((e) => e.patientId === filters.patientId);
    }
    if (filters?.status) {
      encounters = encounters.filter((e) => e.status === filters.status);
    }

    return encounters.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  }

  public static getEncounterById(id: string): ClinicalEncounter | null {
    return db.getById(db.encounters, id) || null;
  }

  public static createEncounter(input: {
    patientId: string;
    physicianId: string;
    physicianName: string;
    encounterType: 'EMERGENCY' | 'OUTPATIENT' | 'INPATIENT' | 'TELEHEALTH';
    chiefComplaint: string;
    esiLevel?: 1 | 2 | 3 | 4 | 5;
    admittedToRoom?: string;
  }): ClinicalEncounter {
    const patient = db.getById(db.patients, input.patientId);
    if (!patient) {
      throw new Error(`Patient not found with ID ${input.patientId}`);
    }

    const id = `ENC-${String(db.encounters.size + 1).padStart(3, '0')}`;
    const encounter: ClinicalEncounter = {
      id,
      patientId: input.patientId,
      patientName: patient.fullName,
      physicianId: input.physicianId,
      physicianName: input.physicianName,
      encounterType: input.encounterType,
      status: 'IN_PROGRESS',
      startedAt: new Date().toISOString(),
      chiefComplaint: input.chiefComplaint,
      esiLevel: input.esiLevel,
      admittedToRoom: input.admittedToRoom,
    };

    db.save(db.encounters, encounter);
    return encounter;
  }

  public static saveSoapNote(
    encounterId: string,
    soapInput: SoapNoteInput
  ): { encounter: ClinicalEncounter; formattedNote: string } {
    const encounter = db.getById(db.encounters, encounterId);
    if (!encounter) {
      throw new Error(`Encounter not found with ID ${encounterId}`);
    }

    const processed = SoapNoteEngine.processNote(soapInput);

    encounter.soapNote = {
      subjective: soapInput.subjective.chiefComplaint + '\n' + soapInput.subjective.historyOfPresentIllness,
      objective: soapInput.objective.vitalSignsSummary,
      assessment: `${soapInput.assessment.primaryDiagnosis.description} (${soapInput.assessment.primaryDiagnosis.code})`,
      plan: soapInput.plan.patientInstructions,
      primaryIcd10: soapInput.assessment.primaryDiagnosis.code,
      primaryDiagnosisDesc: soapInput.assessment.primaryDiagnosis.description,
    };

    if (soapInput.plan.disposition === 'DISCHARGED') {
      encounter.status = 'COMPLETED';
      encounter.endedAt = new Date().toISOString();
    }

    db.save(db.encounters, encounter);

    return {
      encounter,
      formattedNote: processed.formattedText,
    };
  }

  // Clinical Calculators execution endpoints
  public static calculateNews2(vitals: VitalsInput) {
    return ClinicalCalculators.calculateNEWS2(vitals);
  }

  public static calculateEGFR(creatinineMgDl: number, ageYears: number, gender: 'male' | 'female') {
    return ClinicalCalculators.calculateEGFR(creatinineMgDl, ageYears, gender);
  }

  public static calculateCHA2DS2VASc(params: any) {
    return ClinicalCalculators.calculateCHA2DS2VASc(params);
  }

  public static calculatePediatricDosing(params: any) {
    return ClinicalCalculators.calculatePediatricDosing(params);
  }
}
