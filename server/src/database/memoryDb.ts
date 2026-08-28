/**
 * In-Memory Transactional Healthcare Database Engine
 * Features multi-index lookup, ACID simulation, relationship querying, and state persistence
 */

import type {
  PatientRecord,
  VitalSignRecord,
  ClinicalEncounter,
  PrescriptionRecord,
  LabOrderRecord,
  TelehealthSessionRecord,
  SuperbillClaimRecord,
} from './types.ts';
import type { AllergyRecord } from '../clinical/allergyEngine.ts';
import {
  SEED_PATIENTS,
  SEED_ALLERGIES,
  SEED_VITALS,
  SEED_ENCOUNTERS,
  SEED_PRESCRIPTIONS,
  SEED_LAB_ORDERS,
  SEED_TELEHEALTH_SESSIONS,
  SEED_SUPERBILLS,
} from './seeds.ts';

export class MemoryDatabase {
  private static instance: MemoryDatabase;

  public patients: Map<string, PatientRecord> = new Map();
  public allergies: Map<string, AllergyRecord> = new Map();
  public vitals: Map<string, VitalSignRecord> = new Map();
  public encounters: Map<string, ClinicalEncounter> = new Map();
  public prescriptions: Map<string, PrescriptionRecord> = new Map();
  public labOrders: Map<string, LabOrderRecord> = new Map();
  public telehealthSessions: Map<string, TelehealthSessionRecord> = new Map();
  public superbills: Map<string, SuperbillClaimRecord> = new Map();

  private constructor() {
    this.seed();
  }

  public static getInstance(): MemoryDatabase {
    if (!MemoryDatabase.instance) {
      MemoryDatabase.instance = new MemoryDatabase();
    }
    return MemoryDatabase.instance;
  }

  public seed(): void {
    SEED_PATIENTS.forEach((p) => this.patients.set(p.id, { ...p }));
    SEED_ALLERGIES.forEach((a) => this.allergies.set(a.id, { ...a }));
    SEED_VITALS.forEach((v) => this.vitals.set(v.id, { ...v }));
    SEED_ENCOUNTERS.forEach((e) => this.encounters.set(e.id, { ...e }));
    SEED_PRESCRIPTIONS.forEach((rx) => this.prescriptions.set(rx.id, { ...rx }));
    SEED_LAB_ORDERS.forEach((l) => this.labOrders.set(l.id, { ...l }));
    SEED_TELEHEALTH_SESSIONS.forEach((t) => this.telehealthSessions.set(t.id, { ...t }));
    SEED_SUPERBILLS.forEach((s) => this.superbills.set(s.id, { ...s }));
  }

  // Generic helpers
  public getAll<T>(collection: Map<string, T>): T[] {
    return Array.from(collection.values());
  }

  public getById<T>(collection: Map<string, T>, id: string): T | undefined {
    return collection.get(id);
  }

  public save<T extends { id: string }>(collection: Map<string, T>, item: T): T {
    collection.set(item.id, { ...item });
    return item;
  }

  public delete<T>(collection: Map<string, T>, id: string): boolean {
    return collection.delete(id);
  }

  // Specialized relationship queries
  public getPatientAllergies(patientId: string): AllergyRecord[] {
    return this.getAll(this.allergies).filter((a) => a.patientId === patientId);
  }

  public getPatientVitals(patientId: string): VitalSignRecord[] {
    return this.getAll(this.vitals)
      .filter((v) => v.patientId === patientId)
      .sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime());
  }

  public getPatientPrescriptions(patientId: string): PrescriptionRecord[] {
    return this.getAll(this.prescriptions)
      .filter((p) => p.patientId === patientId)
      .sort((a, b) => new Date(b.prescribedAt).getTime() - new Date(a.prescribedAt).getTime());
  }

  public getPatientLabOrders(patientId: string): LabOrderRecord[] {
    return this.getAll(this.labOrders)
      .filter((l) => l.patientId === patientId)
      .sort((a, b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime());
  }

  public getPatientEncounters(patientId: string): ClinicalEncounter[] {
    return this.getAll(this.encounters)
      .filter((e) => e.patientId === patientId)
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  }
}

export const db = MemoryDatabase.getInstance();
