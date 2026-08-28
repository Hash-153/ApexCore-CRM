import test from 'node:test';
import assert from 'node:assert/strict';
import { ClinicalCalculators } from '../src/clinical/calculators.ts';
import { TriageEngine } from '../src/clinical/triageEngine.ts';

test('Clinical Calculators - NEWS2 Score Evaluation', () => {
  // Normal vitals -> score 0
  const normalVitals = {
    respiratoryRate: 16,
    spO2: 98,
    supplementalOxygen: false,
    systolicBP: 120,
    pulseRate: 72,
    consciousness: 'ALERT' as const,
    temperature: 37.0,
  };
  const normalResult = ClinicalCalculators.calculateNEWS2(normalVitals);
  assert.equal(normalResult.score, 0);
  assert.equal(normalResult.riskLevel, 'LOW');

  // Severe vitals -> score >= 7 (High risk)
  const criticalVitals = {
    respiratoryRate: 28, // 3 pts
    spO2: 89, // 3 pts
    supplementalOxygen: true, // 2 pts
    systolicBP: 85, // 3 pts
    pulseRate: 135, // 3 pts
    consciousness: 'VOICE' as const, // 3 pts
    temperature: 39.5, // 2 pts
  };
  const criticalResult = ClinicalCalculators.calculateNEWS2(criticalVitals);
  assert.ok(criticalResult.score >= 7);
  assert.equal(criticalResult.riskLevel, 'HIGH');
});

test('Clinical Calculators - eGFR (CKD-EPI 2021 Race-Free)', () => {
  // 70-year-old female with normal creatinine 0.8 mg/dL
  const femaleNormal = ClinicalCalculators.calculateEGFR(0.8, 70, 'female');
  assert.ok(femaleNormal.egfr >= 60);

  // 75-year-old male with elevated creatinine 2.5 mg/dL (severe CKD)
  const maleImpaired = ClinicalCalculators.calculateEGFR(2.5, 75, 'male');
  assert.ok(maleImpaired.egfr < 35);
  assert.match(maleImpaired.stage, /G3b|G4/);
});

test('Clinical Calculators - CHA2DS2-VASc Score', () => {
  const result = ClinicalCalculators.calculateCHA2DS2VASc({
    congestiveHeartFailure: true, // 1
    hypertension: true, // 1
    age: 76, // 2 (age >= 75)
    diabetes: true, // 1
    strokeOrTIAHistory: false, // 0
    vascularDisease: true, // 1
    gender: 'male', // 0
  });

  assert.equal(result.score, 6);
  assert.ok(result.annualStrokeRiskPercent > 8.0);
  assert.match(result.anticoagulationRecommendation, /Oral anticoagulation strongly recommended/);
});

test('Clinical Triage Engine - Emergency Severity Index (ESI)', () => {
  // ESI Level 1: Life-saving resuscitation needed
  const resus = TriageEngine.evaluateESI({
    requiresImmediateLifeSaving: true,
    isHighRiskSituation: false,
    isConfusedOrLethargic: false,
    severePainScore: 5,
    expectedResourceCount: 2,
    vitalsDangerZone: false,
  });
  assert.equal(resus.esiLevel, 1);

  // ESI Level 2: High risk / severe pain (8/10)
  const emergent = TriageEngine.evaluateESI({
    requiresImmediateLifeSaving: false,
    isHighRiskSituation: true,
    isConfusedOrLethargic: false,
    severePainScore: 8,
    expectedResourceCount: 2,
    vitalsDangerZone: false,
  });
  assert.equal(emergent.esiLevel, 2);

  // ESI Level 5: No resources needed
  const nonUrgent = TriageEngine.evaluateESI({
    requiresImmediateLifeSaving: false,
    isHighRiskSituation: false,
    isConfusedOrLethargic: false,
    severePainScore: 1,
    expectedResourceCount: 0,
    vitalsDangerZone: false,
  });
  assert.equal(nonUrgent.esiLevel, 5);
});
