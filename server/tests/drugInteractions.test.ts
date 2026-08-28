import test from 'node:test';
import assert from 'node:assert/strict';
import { DrugInteractionChecker } from '../src/clinical/drugInteractions.ts';
import { AllergyEngine } from '../src/clinical/allergyEngine.ts';

test('Drug Interaction Matrix - Contraindications and Major Warnings', () => {
  // Warfarin + Ibuprofen should be CONTRAINDICATED
  const warfarinCheck = DrugInteractionChecker.checkInteractions('Ibuprofen 400mg', ['Warfarin Sodium 5mg']);
  assert.equal(warfarinCheck.hasInteractions, true);
  assert.equal(warfarinCheck.highestSeverity, 'CONTRAINDICATED');
  assert.match(warfarinCheck.interactions[0].title, /Warfarin \+ NSAIDs/);

  // Lisinopril + Spironolactone should be MAJOR (Hyperkalemia)
  const aceCheck = DrugInteractionChecker.checkInteractions('Spironolactone 25mg', ['Lisinopril 20mg']);
  assert.equal(aceCheck.hasInteractions, true);
  assert.equal(aceCheck.highestSeverity, 'MAJOR');

  // Sildenafil + Nitroglycerin should be CONTRAINDICATED
  const nitrateCheck = DrugInteractionChecker.checkInteractions('Nitroglycerin 0.4mg SL', ['Sildenafil 50mg']);
  assert.equal(nitrateCheck.hasInteractions, true);
  assert.equal(nitrateCheck.highestSeverity, 'CONTRAINDICATED');

  // Safe combination: Acetaminophen + Lisinopril
  const safeCheck = DrugInteractionChecker.checkInteractions('Acetaminophen 500mg', ['Lisinopril 20mg']);
  assert.equal(safeCheck.hasInteractions, false);
});

test('Allergy Cross-Reactivity Engine', () => {
  const allergies = [
    {
      id: 'A1',
      patientId: 'P1',
      allergen: 'Penicillin',
      category: 'MEDICATION' as const,
      reaction: 'Anaphylaxis',
      severity: 'LIFE_THREATENING' as const,
    },
  ];

  // Direct allergen match
  const amoxicillinCheck = AllergyEngine.checkAllergyConflicts('Amoxicillin 500mg', allergies);
  assert.ok(amoxicillinCheck.length > 0);
  assert.equal(amoxicillinCheck[0].crossReactivityRisk, 'HIGH_CROSS_REACTIVITY');

  // Cross-reactivity: Cephalosporin (Cephalexin) with Penicillin allergy
  const cephalexinCheck = AllergyEngine.checkAllergyConflicts('Cephalexin 250mg', allergies);
  assert.ok(cephalexinCheck.length > 0);
  assert.equal(cephalexinCheck[0].crossReactivityRisk, 'HIGH_CROSS_REACTIVITY');

  // Unrelated medication (Azithromycin) -> No conflict
  const azithroCheck = AllergyEngine.checkAllergyConflicts('Azithromycin 250mg', allergies);
  assert.equal(azithroCheck.length, 0);
});
