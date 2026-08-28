/**
 * Telehealth & Virtual Consultation Broker Service
 */

import { db } from '../../database/memoryDb.ts';
import type { TelehealthSessionRecord } from '../../database/types.ts';

export class TelehealthService {
  /**
   * Schedule a new virtual telehealth session
   */
  public static scheduleSession(input: {
    patientId: string;
    physicianId: string;
    physicianName: string;
    scheduledTime: string;
    durationMinutes?: number;
    notes?: string;
  }): TelehealthSessionRecord {
    const patient = db.getById(db.patients, input.patientId);
    if (!patient) {
      throw new Error(`Patient not found with ID ${input.patientId}`);
    }

    const id = `TEL-${Date.now()}`;
    const sessionRoomCode = `MEDICORE-ROOM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const session: TelehealthSessionRecord = {
      id,
      sessionRoomCode,
      patientId: input.patientId,
      patientName: patient.fullName,
      physicianId: input.physicianId,
      physicianName: input.physicianName,
      scheduledTime: input.scheduledTime,
      status: 'SCHEDULED',
      durationMinutes: input.durationMinutes || 30,
      consultationSummary: input.notes,
    };

    db.save(db.telehealthSessions, session);
    return session;
  }

  /**
   * Patient enters virtual waiting room
   */
  public static enterWaitingRoom(sessionId: string): TelehealthSessionRecord {
    const session = db.getById(db.telehealthSessions, sessionId);
    if (!session) {
      throw new Error(`Session not found with ID ${sessionId}`);
    }

    session.status = 'WAITING';
    db.save(db.telehealthSessions, session);
    return session;
  }

  /**
   * Physician admits patient to active call
   */
  public static startCall(sessionId: string): TelehealthSessionRecord {
    const session = db.getById(db.telehealthSessions, sessionId);
    if (!session) {
      throw new Error(`Session not found with ID ${sessionId}`);
    }

    session.status = 'IN_CALL';
    db.save(db.telehealthSessions, session);
    return session;
  }

  /**
   * Complete telehealth session and save summary notes
   */
  public static completeSession(
    sessionId: string,
    summary: string,
    followUpPlan?: string
  ): TelehealthSessionRecord {
    const session = db.getById(db.telehealthSessions, sessionId);
    if (!session) {
      throw new Error(`Session not found with ID ${sessionId}`);
    }

    session.status = 'COMPLETED';
    session.consultationSummary = summary;
    session.followUpPlan = followUpPlan;

    db.save(db.telehealthSessions, session);
    return session;
  }

  /**
   * List telehealth sessions
   */
  public static listSessions(filters?: { patientId?: string; physicianId?: string }): TelehealthSessionRecord[] {
    let list = db.getAll(db.telehealthSessions);

    if (filters?.patientId) {
      list = list.filter((s) => s.patientId === filters.patientId);
    }
    if (filters?.physicianId) {
      list = list.filter((s) => s.physicianId === filters.physicianId);
    }

    return list.sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());
  }
}
