import test from 'node:test';
import assert from 'node:assert/strict';
import { BillingService } from '../src/modules/billing/billing.service.ts';

test('Billing & Superbill - Fee Calculations & Insurance Adjudication', () => {
  const claim = BillingService.createSuperbill({
    encounterId: 'ENC-TEST-001',
    patientId: 'PAT-001', // Eleanor Vance (Copay: $25, Coinsurance: 20%)
    providerNpi: '1942857291',
    providerName: 'Dr. Sarah Mitchell, MD',
    primaryDiagnosisCode: 'E11.22',
    secondaryDiagnosisCodes: ['I10'],
    cptCodes: ['99214', '80053'], // $195 + $45 = $240
  });

  assert.equal(claim.totalBilledUsd, 240);
  assert.ok(claim.insuranceAllowedUsd > 0);
  assert.equal(claim.patientCopayUsd, 25);
  assert.ok(claim.patientBalanceDueUsd >= 25);
  assert.equal(claim.claimStatus, 'SUBMITTED');

  // Verify CMS-1500 generation
  const cms1500 = BillingService.generateCms1500Payload(claim.id);
  assert.match(cms1500.standardFormat, /CMS-1500/);
  assert.equal(cms1500.claimHeader.claimNumber, claim.claimNumber);
  assert.equal(cms1500.serviceLines.length, 2);
});
