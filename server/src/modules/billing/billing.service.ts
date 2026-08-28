/**
 * Medical Billing, ICD-10/CPT Superbill & Insurance Claims Service
 */

import { db } from '../../database/memoryDb.ts';
import type { SuperbillClaimRecord } from '../../database/types.ts';
import { ICD10_CATALOG, CPT_CATALOG, type Icd10Entry, type CptEntry } from './icd10_cpt_catalog.ts';

export class BillingService {
  public static getIcd10Catalog(query?: string): Icd10Entry[] {
    if (!query) return ICD10_CATALOG;
    const q = query.toLowerCase();
    return ICD10_CATALOG.filter(
      (i) => i.code.toLowerCase().includes(q) || i.shortDesc.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    );
  }

  public static getCptCatalog(query?: string): CptEntry[] {
    if (!query) return CPT_CATALOG;
    const q = query.toLowerCase();
    return CPT_CATALOG.filter(
      (c) => c.code.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }

  /**
   * Generate a Superbill for a clinical encounter
   */
  public static createSuperbill(input: {
    encounterId: string;
    patientId: string;
    providerNpi: string;
    providerName: string;
    primaryDiagnosisCode: string;
    secondaryDiagnosisCodes?: string[];
    cptCodes: string[]; // List of CPT codes selected
  }): SuperbillClaimRecord {
    const patient = db.getById(db.patients, input.patientId);
    if (!patient) {
      throw new Error(`Patient not found with ID ${input.patientId}`);
    }

    const id = `CLM-${Date.now()}`;
    const claimNumber = `CLM-${new Date().toISOString().slice(0, 7).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const lineItems = input.cptCodes.map((code) => {
      const cpt = CPT_CATALOG.find((c) => c.code === code) || {
        code,
        description: 'Custom Procedure / Service',
        baseRateUsd: 150.0,
      };
      return {
        cptCode: cpt.code,
        description: cpt.description,
        units: 1,
        unitPriceUsd: cpt.baseRateUsd,
        totalChargeUsd: cpt.baseRateUsd,
      };
    });

    const totalBilledUsd = lineItems.reduce((sum, item) => sum + item.totalChargeUsd, 0);

    // Insurance Adjudication Simulation Logic
    const insuranceAllowedUsd = Math.round(totalBilledUsd * 0.8 * 100) / 100; // Contracted discount
    const copay = patient.insurance.copayAmountUsd || 0;
    const deductible = patient.insurance.deductibleRemainingUsd || 0;
    const coinsuranceRate = (patient.insurance.coinsurancePercent || 20) / 100;

    let patientResponsibility = copay;
    let remainingAllowed = Math.max(0, insuranceAllowedUsd - copay);

    if (deductible > 0) {
      const deductibleApplied = Math.min(deductible, remainingAllowed);
      patientResponsibility += deductibleApplied;
      remainingAllowed -= deductibleApplied;
    }

    const coinsuranceAmount = Math.round(remainingAllowed * coinsuranceRate * 100) / 100;
    patientResponsibility += coinsuranceAmount;

    const insurancePaidUsd = Math.round((remainingAllowed - coinsuranceAmount) * 100) / 100;

    const superbill: SuperbillClaimRecord = {
      id,
      claimNumber,
      encounterId: input.encounterId,
      patientId: input.patientId,
      patientName: patient.fullName,
      providerNpi: input.providerNpi,
      providerName: input.providerName,
      dosDate: new Date().toISOString().slice(0, 10),
      primaryDiagnosisCode: input.primaryDiagnosisCode,
      secondaryDiagnosisCodes: input.secondaryDiagnosisCodes || [],
      lineItems,
      totalBilledUsd,
      insuranceAllowedUsd,
      insurancePaidUsd,
      patientCopayUsd: copay,
      patientCoinsuranceUsd: coinsuranceAmount,
      patientBalanceDueUsd: Math.round(patientResponsibility * 100) / 100,
      claimStatus: 'SUBMITTED',
      adjudicationDate: new Date().toISOString(),
    };

    db.save(db.superbills, superbill);
    return superbill;
  }

  /**
   * Generate CMS-1500 / 837P Claim Electronic Payload
   */
  public static generateCms1500Payload(claimId: string) {
    const claim = db.getById(db.superbills, claimId);
    if (!claim) {
      throw new Error(`Claim not found with ID ${claimId}`);
    }

    const patient = db.getById(db.patients, claim.patientId);

    return {
      standardFormat: 'CMS-1500 / ANSI ASC X12N 837P (v005010X222A1)',
      claimHeader: {
        claimNumber: claim.claimNumber,
        filingDate: claim.dosDate,
        billingProvider: {
          name: claim.providerName,
          npi: claim.providerNpi,
          taxonomyCode: '207Q00000X', // Allopathic & Osteopathic Physicians
        },
      },
      patientSubscriber: {
        patientName: patient?.fullName,
        dob: patient?.dob,
        gender: patient?.gender,
        insuranceCarrier: patient?.insurance.providerName,
        policyNumber: patient?.insurance.policyNumber,
        groupNumber: patient?.insurance.groupNumber,
      },
      diagnosesPointers: [
        { pointer: 'A', icd10: claim.primaryDiagnosisCode },
        ...claim.secondaryDiagnosisCodes.map((code, idx) => ({
          pointer: String.fromCharCode(66 + idx),
          icd10: code,
        })),
      ],
      serviceLines: claim.lineItems.map((item, idx) => ({
        lineNumber: idx + 1,
        dateOfService: claim.dosDate,
        placeOfService: '11 (Office)',
        cptCode: item.cptCode,
        diagnosisPointer: 'A',
        chargeAmount: item.totalChargeUsd,
        units: item.units,
      })),
      financialSummary: {
        totalCharge: claim.totalBilledUsd,
        amountPaid: claim.insurancePaidUsd,
        balanceDue: claim.patientBalanceDueUsd,
        claimStatus: claim.claimStatus,
      },
    };
  }

  /**
   * List all Superbills / Claims
   */
  public static listClaims(filters?: { patientId?: string; status?: string }): SuperbillClaimRecord[] {
    let list = db.getAll(db.superbills);

    if (filters?.patientId) {
      list = list.filter((c) => c.patientId === filters.patientId);
    }
    if (filters?.status) {
      list = list.filter((c) => c.claimStatus === filters.status);
    }

    return list.sort((a, b) => new Date(b.dosDate).getTime() - new Date(a.dosDate).getTime());
  }
}
