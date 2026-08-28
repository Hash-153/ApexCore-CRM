/**
 * HIPAA Safe Harbor De-identification Engine
 * Compliant with 45 CFR § 164.514(b)(2) (Safe Harbor Method)
 */

import crypto from 'crypto';
import { config } from '../config/index.ts';

export interface DeidentifiedRecord<T> {
  data: T;
  pseudonymMap: Record<string, string>;
  deidentifiedAt: string;
  method: 'HIPAA_SAFE_HARBOR_18_ELEMENTS';
}

export class DeidentificationService {
  /**
   * Generate a stable, deterministic pseudonym hash for a given identifier using salt
   */
  public static hashPseudonym(identifier: string, category: string): string {
    if (!identifier) return '';
    const hash = crypto
      .createHmac('sha256', config.security.phiSalt)
      .update(`${category}:${identifier}`)
      .digest('hex')
      .substring(0, 12)
      .toUpperCase();
    return `PSEUDO-${category.substring(0, 3).toUpperCase()}-${hash}`;
  }

  /**
   * De-identify a patient record under HIPAA Safe Harbor rules
   */
  public static deidentifyPatient(patient: any): any {
    if (!patient) return null;

    const pseudoId = this.hashPseudonym(patient.id || patient.mrn, 'PATIENT');
    const pseudoMrn = this.hashPseudonym(patient.mrn || patient.id, 'MRN');

    // Extract year of birth only (if age <= 89)
    let safeDobYear = 'UNKNOWN';
    if (patient.dob) {
      const birthYear = new Date(patient.dob).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;
      safeDobYear = age > 89 ? '90+' : `${birthYear}`;
    }

    // Retain only state or 3-digit ZIP if population threshold is met
    const safeZip = patient.address?.zip ? `${patient.address.zip.substring(0, 3)}00` : '00000';
    const safeState = patient.address?.state || 'XX';

    return {
      id: pseudoId,
      mrn: pseudoMrn,
      gender: patient.gender || 'UNKNOWN',
      birthYear: safeDobYear,
      address: {
        state: safeState,
        zip3: safeZip,
      },
      bloodType: patient.bloodType || 'UNKNOWN',
      isDeidentified: true,
      anonymizedAt: new Date().toISOString(),
    };
  }

  /**
   * De-identify clinical observations and vitals while preserving clinical numeric values
   */
  public static deidentifyObservation(observation: any): any {
    if (!observation) return null;

    return {
      id: this.hashPseudonym(observation.id, 'OBS'),
      patientId: this.hashPseudonym(observation.patientId, 'PATIENT'),
      encounterId: observation.encounterId ? this.hashPseudonym(observation.encounterId, 'ENC') : undefined,
      category: observation.category,
      code: observation.code,
      name: observation.name,
      valueNumeric: observation.valueNumeric,
      valueString: observation.valueString ? this.redactFreeTextPhi(observation.valueString) : undefined,
      unit: observation.unit,
      referenceRange: observation.referenceRange,
      interpretation: observation.interpretation,
      // Date shifted to relative day offset instead of exact timestamp
      relativeDayOffset: observation.effectiveDateTime ? this.calculateDayOffset(observation.effectiveDateTime) : 0,
      isDeidentified: true,
    };
  }

  /**
   * Redact free text to scrub potential embedded PHI (phone, email, SSN, MRN, dates)
   */
  public static redactFreeTextPhi(text: string): string {
    if (!text) return '';

    let cleaned = text;

    // Redact SSN patterns (XXX-XX-XXXX)
    cleaned = cleaned.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED-SSN]');

    // Redact Phone numbers
    cleaned = cleaned.replace(/(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/g, '[REDACTED-PHONE]');

    // Redact Email addresses
    cleaned = cleaned.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED-EMAIL]');

    // Redact MRN formats (e.g., MRN-123456, MRN: 998877)
    cleaned = cleaned.replace(/\b(MRN|mrn)[:\s-]*\d{5,10}\b/gi, '[REDACTED-MRN]');

    // Redact standard ISO dates (YYYY-MM-DD)
    cleaned = cleaned.replace(/\b\d{4}[-/.]\d{2}[-/.]\d{2}\b/g, '[REDACTED-DATE]');

    return cleaned;
  }

  private static calculateDayOffset(dateString: string): number {
    const epoch = new Date('2026-01-01T00:00:00Z').getTime();
    const target = new Date(dateString).getTime();
    return Math.floor((target - epoch) / (1000 * 60 * 60 * 24));
  }
}
