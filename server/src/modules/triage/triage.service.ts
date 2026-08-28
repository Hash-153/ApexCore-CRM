/**
 * Emergency Department Triage & Vitals Monitoring Service
 */

import { db } from '../../database/memoryDb.ts';
import type { VitalSignRecord, ClinicalEncounter } from '../../database/types.ts';
import { ClinicalCalculators } from '../../clinical/calculators.ts';
import { TriageEngine, type TriageInput, type TriageAssessment } from '../../clinical/triageEngine.ts';

export class TriageService {
  /**
   * Record a complete set of vital signs with automated NEWS2 calculation
   */
  public static recordVitals(input: {
    patientId: string;
    encounterId?: string;
    recordedById: string;
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
  }): VitalSignRecord {
    const patient = db.getById(db.patients, input.patientId);
    if (!patient) {
      throw new Error(`Patient not found with ID ${input.patientId}`);
    }

    const news2 = ClinicalCalculators.calculateNEWS2({
      respiratoryRate: input.respiratoryRate,
      spO2: input.spO2,
      supplementalOxygen: input.supplementalOxygen,
      systolicBP: input.systolicBP,
      pulseRate: input.heartRate,
      consciousness: input.consciousness,
      temperature: input.temperatureCelsius,
    });

    const id = `VIT-${Date.now()}`;
    const vitalsRecord: VitalSignRecord = {
      id,
      patientId: input.patientId,
      encounterId: input.encounterId,
      recordedAt: new Date().toISOString(),
      recordedBy: input.recordedById,
      recordedByName: input.recordedByName,
      systolicBP: input.systolicBP,
      diastolicBP: input.diastolicBP,
      heartRate: input.heartRate,
      respiratoryRate: input.respiratoryRate,
      spO2: input.spO2,
      temperatureCelsius: input.temperatureCelsius,
      bloodGlucoseMgDl: input.bloodGlucoseMgDl,
      painScale: input.painScale,
      supplementalOxygen: input.supplementalOxygen,
      consciousness: input.consciousness,
      news2Score: news2.score,
      news2RiskLevel: news2.riskLevel,
    };

    db.save(db.vitals, vitalsRecord);
    return vitalsRecord;
  }

  /**
   * Evaluate Emergency Department Triage for a patient
   */
  public static assessTriage(input: {
    patientId: string;
    triageInput: TriageInput;
    chiefComplaint: string;
    nurseId: string;
    nurseName: string;
  }): { assessment: TriageAssessment; encounter: ClinicalEncounter } {
    const patient = db.getById(db.patients, input.patientId);
    if (!patient) {
      throw new Error(`Patient not found with ID ${input.patientId}`);
    }

    const assessment = TriageEngine.evaluateESI(input.triageInput);

    const encounterId = `ENC-ED-${Date.now()}`;
    const encounter: ClinicalEncounter = {
      id: encounterId,
      patientId: input.patientId,
      patientName: patient.fullName,
      physicianId: 'DOC-101',
      physicianName: 'Dr. Sarah Mitchell, MD',
      encounterType: 'EMERGENCY',
      status: 'TRIAGED',
      startedAt: new Date().toISOString(),
      chiefComplaint: input.chiefComplaint,
      esiLevel: assessment.esiLevel,
    };

    db.save(db.encounters, encounter);

    return {
      assessment,
      encounter,
    };
  }

  /**
   * Get real-time emergency department triage waiting queue
   */
  public static getTriageQueue() {
    const activeEdEncounters = db
      .getAll(db.encounters)
      .filter((e) => e.encounterType === 'EMERGENCY' && (e.status === 'TRIAGED' || e.status === 'IN_PROGRESS'));

    return activeEdEncounters.map((enc) => {
      const patient = db.getById(db.patients, enc.patientId);
      const patientVitals = db.getPatientVitals(enc.patientId);
      const latestVitals = patientVitals.length > 0 ? patientVitals[0] : null;

      return {
        encounterId: enc.id,
        patientId: enc.patientId,
        patientName: enc.patientName,
        gender: patient?.gender,
        dob: patient?.dob,
        esiLevel: enc.esiLevel || 3,
        chiefComplaint: enc.chiefComplaint,
        status: enc.status,
        admittedToRoom: enc.admittedToRoom,
        startedAt: enc.startedAt,
        latestVitals,
      };
    }).sort((a, b) => (a.esiLevel || 5) - (b.esiLevel || 5));
  }
}
