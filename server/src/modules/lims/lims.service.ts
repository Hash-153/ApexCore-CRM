/**
 * Laboratory Information Management System (LIMS) & Diagnostic Service
 */

import { db } from '../../database/memoryDb.ts';
import type { LabOrderRecord, LabTestItem } from '../../database/types.ts';

export const STANDARD_PANEL_TEMPLATES: Record<string, { specimenType: 'SERUM' | 'WHOLE_BLOOD' | 'PLASMA' | 'URINE'; tests: LabTestItem[] }> = {
  'Comprehensive Metabolic Panel (CMP)': {
    specimenType: 'SERUM',
    tests: [
      { testCode: 'GLU', testName: 'Glucose', loincCode: '2345-7', referenceRangeLow: 70, referenceRangeHigh: 99, resultUnit: 'mg/dL' },
      { testCode: 'BUN', testName: 'Blood Urea Nitrogen', loincCode: '3094-0', referenceRangeLow: 7, referenceRangeHigh: 20, resultUnit: 'mg/dL' },
      { testCode: 'CREAT', testName: 'Creatinine', loincCode: '2160-0', referenceRangeLow: 0.5, referenceRangeHigh: 1.1, resultUnit: 'mg/dL' },
      { testCode: 'NA', testName: 'Sodium', loincCode: '2951-2', referenceRangeLow: 135, referenceRangeHigh: 145, resultUnit: 'mmol/L' },
      { testCode: 'K', testName: 'Potassium', loincCode: '2823-3', referenceRangeLow: 3.5, referenceRangeHigh: 5.1, resultUnit: 'mmol/L' },
      { testCode: 'CL', testName: 'Chloride', loincCode: '2075-0', referenceRangeLow: 96, referenceRangeHigh: 106, resultUnit: 'mmol/L' },
      { testCode: 'CO2', testName: 'Carbon Dioxide (Bicarbonate)', loincCode: '2028-9', referenceRangeLow: 22, referenceRangeHigh: 29, resultUnit: 'mmol/L' },
      { testCode: 'ALT', testName: 'Alanine Aminotransferase', loincCode: '1742-6', referenceRangeLow: 7, referenceRangeHigh: 56, resultUnit: 'U/L' },
      { testCode: 'AST', testName: 'Aspartate Aminotransferase', loincCode: '1920-8', referenceRangeLow: 10, referenceRangeHigh: 40, resultUnit: 'U/L' },
    ],
  },
  'Complete Blood Count (CBC)': {
    specimenType: 'WHOLE_BLOOD',
    tests: [
      { testCode: 'WBC', testName: 'White Blood Cell Count', loincCode: '6690-2', referenceRangeLow: 4.5, referenceRangeHigh: 11.0, resultUnit: 'x10^3/uL' },
      { testCode: 'RBC', testName: 'Red Blood Cell Count', loincCode: '789-8', referenceRangeLow: 4.2, referenceRangeHigh: 5.8, resultUnit: 'x10^6/uL' },
      { testCode: 'HGB', testName: 'Hemoglobin', loincCode: '718-7', referenceRangeLow: 12.0, referenceRangeHigh: 17.5, resultUnit: 'g/dL' },
      { testCode: 'HCT', testName: 'Hematocrit', loincCode: '4544-3', referenceRangeLow: 37.0, referenceRangeHigh: 50.0, resultUnit: '%' },
      { testCode: 'PLT', testName: 'Platelet Count', loincCode: '777-3', referenceRangeLow: 150, referenceRangeHigh: 450, resultUnit: 'x10^3/uL' },
    ],
  },
  'Lipid Panel': {
    specimenType: 'SERUM',
    tests: [
      { testCode: 'CHOL_TOT', testName: 'Total Cholesterol', loincCode: '2093-3', referenceRangeLow: 100, referenceRangeHigh: 199, resultUnit: 'mg/dL' },
      { testCode: 'HDL', testName: 'HDL Cholesterol (Good)', loincCode: '2085-9', referenceRangeLow: 40, referenceRangeHigh: 80, resultUnit: 'mg/dL' },
      { testCode: 'TRIG', testName: 'Triglycerides', loincCode: '2571-8', referenceRangeLow: 0, referenceRangeHigh: 149, resultUnit: 'mg/dL' },
      { testCode: 'LDL_CALC', testName: 'Calculated LDL Cholesterol', loincCode: '13457-7', referenceRangeLow: 0, referenceRangeHigh: 99, resultUnit: 'mg/dL' },
    ],
  },
  'STAT Cardiac Biomarkers & Troponin': {
    specimenType: 'WHOLE_BLOOD',
    tests: [
      { testCode: 'TROP_I', testName: 'Troponin I, High-Sensitivity', loincCode: '89579-7', referenceRangeLow: 0.0, referenceRangeHigh: 0.04, resultUnit: 'ng/mL' },
      { testCode: 'CK_MB', testName: 'Creatine Kinase-MB', loincCode: '2039-6', referenceRangeLow: 0.0, referenceRangeHigh: 4.9, resultUnit: 'ng/mL' },
      { testCode: 'BNP', testName: 'B-Type Natriuretic Peptide', loincCode: '30934-4', referenceRangeLow: 0.0, referenceRangeHigh: 100.0, resultUnit: 'pg/mL' },
    ],
  },
};

export class LimsService {
  /**
   * Order a laboratory panel
   */
  public static orderPanel(input: {
    patientId: string;
    orderedById: string;
    orderedByName: string;
    encounterId?: string;
    panelName: string;
  }): LabOrderRecord {
    const patient = db.getById(db.patients, input.patientId);
    if (!patient) {
      throw new Error(`Patient not found with ID ${input.patientId}`);
    }

    const template = STANDARD_PANEL_TEMPLATES[input.panelName];
    if (!template) {
      throw new Error(`Unrecognized laboratory panel: ${input.panelName}`);
    }

    const id = `LAB-ORD-${Date.now()}`;
    const orderNumber = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
    const specimenBarcode = `BC-${Math.floor(100000 + Math.random() * 900000)}-${template.specimenType.substring(0, 3)}`;

    const labOrder: LabOrderRecord = {
      id,
      orderNumber,
      patientId: input.patientId,
      patientName: patient.fullName,
      orderedById: input.orderedById,
      orderedByName: input.orderedByName,
      encounterId: input.encounterId,
      panelName: input.panelName,
      specimenType: template.specimenType,
      specimenBarcode,
      status: 'ORDERED',
      orderedAt: new Date().toISOString(),
      tests: template.tests.map((t) => ({ ...t })),
    };

    db.save(db.labOrders, labOrder);
    return labOrder;
  }

  /**
   * Update specimen status (Accessioning)
   */
  public static updateSpecimenStatus(
    orderId: string,
    status: 'COLLECTED' | 'RECEIVED' | 'IN_ANALYSIS' | 'FINALIZED'
  ): LabOrderRecord {
    const order = db.getById(db.labOrders, orderId);
    if (!order) {
      throw new Error(`Lab order not found with ID ${orderId}`);
    }

    order.status = status;
    if (status === 'COLLECTED') order.collectedAt = new Date().toISOString();
    if (status === 'FINALIZED') order.finalizedAt = new Date().toISOString();

    db.save(db.labOrders, order);
    return order;
  }

  /**
   * Enter test result values and compare against reference ranges
   */
  public static enterResults(
    orderId: string,
    testResults: Array<{ testCode: string; value: number }>,
    technicianNotes?: string
  ): LabOrderRecord {
    const order = db.getById(db.labOrders, orderId);
    if (!order) {
      throw new Error(`Lab order not found with ID ${orderId}`);
    }

    let hasCritical = false;

    for (const res of testResults) {
      const test = order.tests.find((t) => t.testCode === res.testCode);
      if (!test) continue;

      test.resultValue = res.value;

      // Evaluation against reference range
      if (test.referenceRangeLow !== undefined && test.referenceRangeHigh !== undefined) {
        if (res.value < test.referenceRangeLow) {
          test.interpretation = res.value < test.referenceRangeLow * 0.7 ? 'CRITICAL_LOW' : 'LOW';
        } else if (res.value > test.referenceRangeHigh) {
          test.interpretation = res.value > test.referenceRangeHigh * 1.5 ? 'CRITICAL_HIGH' : 'HIGH';
        } else {
          test.interpretation = 'NORMAL';
        }
      }

      // Critical Panic Flags
      if (test.testCode === 'TROP_I' && res.value > 0.04) {
        test.interpretation = 'CRITICAL_HIGH';
        test.isCriticalAlert = true;
        hasCritical = true;
      }
      if (test.testCode === 'K' && (res.value < 2.8 || res.value > 6.2)) {
        test.interpretation = res.value > 6.2 ? 'CRITICAL_HIGH' : 'CRITICAL_LOW';
        test.isCriticalAlert = true;
        hasCritical = true;
      }
      if (test.testCode === 'GLU' && (res.value < 50 || res.value > 450)) {
        test.interpretation = res.value > 450 ? 'CRITICAL_HIGH' : 'CRITICAL_LOW';
        test.isCriticalAlert = true;
        hasCritical = true;
      }
    }

    order.status = 'FINALIZED';
    order.finalizedAt = new Date().toISOString();
    if (technicianNotes) {
      order.technicianNotes = technicianNotes;
    }

    if (hasCritical && !order.technicianNotes) {
      order.technicianNotes = 'CRITICAL VALUE ALERT: Immediate readback verification required with ordering provider.';
    }

    db.save(db.labOrders, order);
    return order;
  }

  /**
   * List lab orders
   */
  public static listOrders(filters?: { patientId?: string; status?: string }): LabOrderRecord[] {
    let list = db.getAll(db.labOrders);

    if (filters?.patientId) {
      list = list.filter((l) => l.patientId === filters.patientId);
    }
    if (filters?.status) {
      list = list.filter((l) => l.status === filters.status);
    }

    return list.sort((a, b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime());
  }
}
