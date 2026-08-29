# MediCore HealthOS - Enterprise Clinical & Healthcare Operating System

A comprehensive, production-grade, human-crafted Enterprise Electronic Health Record (EHR), Telehealth, Emergency Triage, Laboratory Information Management System (LIMS), and Medical Billing/Claims Platform.

Built with **Clean Architecture**, **HL7 FHIR R4 Standard Models**, **HIPAA Security & Privacy Standard Rules (45 CFR § 164)**, **NEWS2 Early Warning System**, and **ICD-10-CM / CPT-4 Coding & Superbill Engine**.

---

## 🏥 Subsystems & Architectural Modules

### 1. Security, RBAC & HIPAA Audit Layer
- **Role-Based Access Control (RBAC)**: Enforces HIPAA Minimum Necessary Standard (45 CFR § 164.502(b)) across 8 granular clinical and administrative roles:
  - `PHYSICIAN` - Complete clinical charting, SOAP documentation, e-Prescribing, lab ordering, telehealth.
  - `TRIAGE_NURSE` - Emergency Department triage intake, vitals entry, ESI prioritization.
  - `PHARMACIST` - Drug-drug interaction verification, allergy cross-reactivity checking, prescription dispensing.
  - `LAB_TECHNICIAN` - Specimen accessioning, barcode tracking, test result entry, panic alerts.
  - `RADIOLOGIST` - Diagnostic imaging and radiological report generation.
  - `BILLING_SPECIALIST` - ICD-10/CPT Superbill generation, insurance claims adjudication, CMS-1500 EDI-837 export.
  - `SYSTEM_ADMIN` - HIPAA audit log inspection, cryptographic hash chain validation.
  - `PATIENT` - Patient portal access for longitudinal records, lab results, and telehealth appointments.
- **Tamper-Evident HIPAA Audit Chain**: Sequential SHA-256 cryptographic hash-chaining of every PHI access event (`CREATE`, `READ`, `UPDATE`, `DELETE`, `EXPORT`), recording actor, IP, timestamp, reason, and signature.
- **Safe Harbor De-identification**: Automated scrub of the 18 HIPAA identifiers under 45 CFR § 164.514(b)(2).

### 2. HL7 FHIR R4 Interoperability
- Bidirectional transformation and validation for core HL7 FHIR Release 4 (v4.0.1) standard resources:
  - `Patient`, `Practitioner`, `Encounter`, `Observation` (Vitals & Labs), `Condition` (Problem List), `MedicationRequest` (e-Prescriptions), `DiagnosticReport` (LIMS), `Bundle` (SearchSet).

### 3. Clinical Decision Support System (CDSS)
- **NEWS2 (National Early Warning Score 2)**: Acute physiological deterioration risk calculator across 7 vital parameters.
- **eGFR (2021 CKD-EPI Race-Free)**: Standardized renal clearance estimator.
- **CHA2DS2-VASc**: Annual ischemic stroke risk assessment in atrial fibrillation.
- **Pediatric Weight-Based Dosing**: Exact mg/kg calculation with automatic maximum adult safety ceiling enforcement.
- **Drug-Drug Interaction (DDI) Matrix**: Real-time screening for critical pharmacological contraindications (e.g. Warfarin + NSAIDs, ACEi + Potassium-sparing diuretics, SSRI + MAOI, Sildenafil + Nitrates).
- **Allergy Cross-Reactivity Engine**: Cluster analysis detecting beta-lactam, sulfonamide, and NSAID hypersensitivity risks.

### 4. Emergency Triage (ESI v4)
- Automated 5-level Emergency Severity Index algorithm (Resuscitation, Emergent, Urgent, Less Urgent, Non-Urgent) with vital signs danger zone up-triage logic.

### 5. HL7 v2.5.1 Message Engine & MLLP Framing
- Full pipe-and-hat parser and generator with MLLP byte-level enveloping (`\x0B` VT to `\x1C\x0D` FS+CR).
- Supported Trigger Events: `ADT^A01` (Admit/Intake), `ADT^A03` (Discharge), `ORU^R01` (Unsolicited Observation/Lab Results with OBX series), and `ACK` (Acknowledgement).

### 6. DICOM PACS & Radiology Diagnostic Workstation
- DICOM PS 3.3/3.4 compliant study/series/instance hierarchy and C-FIND query retriever.
- Web DICOM Viewer with Window/Level presets (Bone, Soft Tissue, Lung, Brain), Caliper mm distance measurement, and ROI Hounsfield Unit (HU) density analytics.
- Radiologist Structured Reporting with BI-RADS, Lung-RADS, and RECIST criteria scoring.

### 7. Inpatient Bed Management & SBAR Nursing Handoffs
- Ward unit census tracking across ICU (4-North), Med-Surg (3-West), and Telemetry (5-East).
- Bed turnover lifecycle (Occupied -> Cleaning Required -> Terminal Clean Complete -> Available).
- Infection control isolation protocols (Airborne, Droplet, Contact).
- SBAR (Situation, Background, Assessment, Recommendation) structured handoff documenter.

### 8. eMAR & Barcode Medication Administration (BCMA)
- 5 Rights of Medication Administration verification (Right Patient, Right Drug, Right Dose, Right Route, Right Time).
- ISMP High-Alert dual-nurse co-signature enforcement (Insulin, Heparin, Hydromorphone).
- Pre-administration clinical vitals checks (Apical Heart Rate, Blood Pressure, POC Blood Glucose).

### 9. Specialty Clinical Decision Support (CDSS)
- **Cardiology**: HEART Score for Major Adverse Cardiac Events (MACE).
- **Hepatology**: MELD-Na (2016 UNOS/OPTN allocation formula) for end-stage liver disease.
- **Pulmonology**: CURB-65 community-acquired pneumonia severity, Wells' Criteria for PE.
- **Nephrology**: Fractional Excretion of Sodium (FENa) for AKI differentiation.

### 10. Laboratory Information Management System (LIMS)
- Specimen accessioning workflow (`ORDERED` -> `COLLECTED` -> `RECEIVED` -> `IN_ANALYSIS` -> `FINALIZED`).
- Standardized laboratory panels: Comprehensive Metabolic Panel (CMP), Complete Blood Count (CBC), Lipid Panel, STAT Cardiac Troponin.
- Reference interval bounds with automated panic critical alert dispatch.

### 11. Telehealth Virtual Clinic
- WebRTC virtual room signaling broker with waiting room queue, in-call clinical note documentation, and EHR encounter sync.

### 12. Medical Billing & Insurance Claims
- ICD-10-CM diagnosis registry and CPT-4 procedure code taxonomy with SNOMED-CT cross-mapping.
- Superbill generation and automated insurance adjudication simulator (copay, deductible, coinsurance, patient balance).
- Standard CMS-1500 / ANSI ASC X12N 837P electronic claim payload generator.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn

### Installation
```bash
# 1. Clone repository and navigate to workspace
cd "c:\health care"

# 2. Install dependencies
npm install

# 3. Setup environment configuration
# 4. Build Production Artifacts
npm run build

# 5. Run automated test suites
npm test

# 6. Start Fullstack Platform (API Server + React Web Portal)
npm run dev
```

The system will start:
- **API Backend**: `http://localhost:5000` (API prefix: `/api/v1` and `/api/crm`)
- **Web Portal Workstation**: `http://localhost:3000`
- **Health Check**: `http://localhost:5000/health`

---

## 🧪 Automated Testing

Execute the test suites verifying clinical algorithms, HIPAA RBAC, FHIR serialization, and billing:
```bash
npm test
```

Test coverage includes:
- `server/tests/clinical.test.ts` - NEWS2, eGFR (CKD-EPI), CHA2DS2-VASc, ESI triage algorithms.
- `server/tests/specialtyCalculators.test.ts` - HEART score, MELD-Na, CURB-65 pneumonia, Wells PE, FENa.
- `server/tests/drugInteractions.test.ts` - Contraindications, DDI detection, allergy cross-reactivity.
- `server/tests/emar.test.ts` - 5 Rights BCMA verification & ISMP High-Alert dual sign-off.
- `server/tests/hl7v2.test.ts` - HL7 v2.5.1 ADT, ORU, MLLP framing & ACK parsing.
- `server/tests/fhir.test.ts` - FHIR R4 Patient and Observation serialization/conformance.
- `server/tests/radiology.test.ts` - DICOM PACS C-FIND queries, series hierarchy, structured reporting.
- `server/tests/inpatient.test.ts` - Bed turnover lifecycle & SBAR nursing handoffs.
- `server/tests/hipaa.test.ts` - RBAC guards, cryptographic chain integrity, Safe Harbor de-identification.
- `server/tests/billing.test.ts` - Superbill generation, CPT/ICD-10 fee calculation, CMS-1500 EDI-837 formatting.

---

## 💼 ApexCore Enterprise Customer Relationship Management (CRM)

A comprehensive, production-grade, human-crafted Enterprise CRM and Revenue Operations platform built with **Clean Architecture**, **Domain-Driven Design (DDD)**, and strict secrets isolation.

### 🏢 CRM Subsystems & Modules
1. **Lead Intelligence & BANT Scoring Engine**:
   - Automated demographic, firmographic, and BANT scoring (Budget, Authority, Need, Timeline).
   - Atomic 1-Click Lead Conversion into Account, Contact, and Opportunity entities.
   - Fuzzy deduplication and round-robin sales rep lead routing.
2. **Account 360 & Relationship Graph**:
   - Multi-tier parent-child corporate organizational hierarchies.
   - Dynamic Account Health Index and Churn Risk calculation engine.
   - Associated buying committees with stakeholder influence scores.
3. **Deal Pipeline Kanban & Sales Forecasting**:
   - Multi-pipeline Kanban board with stage transition gatekeepers.
   - MEDDIC sales methodology compliance validation (Metrics, Economic Buyer, Decision Criteria, Decision Process, Pain, Champion).
   - Weighted pipeline probability forecasting and stage stagnation alarms.
4. **Configure, Price, Quote (CPQ) & Dynamic Pricing**:
   - Multi-tier volume discount rules and multi-currency enterprise price books.
   - Margin threshold checks triggering VP Revenue approval workflows.
   - Formal quote PDF generation data structures.
5. **Billing, Contracts & Subscription Revenue**:
   - ARR/MRR waterfall reporting (New, Expansion, Contraction, Churn, Net Retention).
   - Mid-cycle subscription proration calculation and automated invoice generation.
6. **Customer Support Helpdesk & SLA Engine**:
   - Omnichannel ticket triage (Web, Email, Phone, API).
   - Live resolution countdown timers with automated P1/P2 breach escalations.
   - Agent reply tracking with First Response timer resolution.
7. **Marketing Automation & Multi-Touch Attribution**:
   - Omnichannel campaign ROI and conversion tracking.
   - Multi-touch revenue attribution modeling (First-Touch, Last-Touch, Linear, Time-Decay).
8. **Visual Trigger-Condition-Action Workflow Engine**:
   - Recursive boolean condition evaluator (`AND` / `OR` trees).
   - Automated actions: Field updates, Owner assignment, Task generation, Notification emails, HMAC signed webhooks.
9. **Dynamic Schema Customizer**:
   - Runtime custom field registration (Text, Number, Currency, Dropdowns) with zero database migrations.
10. **Security & Cryptographic Audit Trails**:
    - Granular RBAC permission gates (`leads:read`, `quotes:approve`, `admin:*`).
    - Sequential SHA-256 cryptographic hash-chaining of all tenant mutations.

### 🧪 CRM Automated Test Suites
Run the dedicated CRM test suites:
```bash
npm run test:crm
```
Test files:
- `server/tests/crm/leadManagement.test.ts` - BANT evaluation, ratings, 1-Click atomic conversion.
- `server/tests/crm/pipelineForecasting.test.ts` - Weighted pipeline math, MEDDIC transition gatekeeper.
- `server/tests/crm/cpqPricing.test.ts` - Volume tier discounts, floor price checks, executive approvals.
- `server/tests/crm/slaHelpdesk.test.ts` - SLA countdowns, breach alarms, first response timers.
- `server/tests/crm/workflowEngine.test.ts` - Condition trees, field mutations, task auto-dispatch.
- `server/tests/crm/rbacSecurity.test.ts` - Role permission gates, SHA-256 audit chain verification.
- `server/tests/crm/dataImportExport.test.ts` - CSV bulk ingestion, deduplication, HMAC signed webhooks.

---

## 🔒 Security & Privacy Standard
- **No Hardcoded Secrets**: All configuration is loaded from environment variables with safe defaults.
- **Git Exclusions**: Strict `.gitignore` prevents `.env`, secrets, credentials, certificates, or logs from entering version control.
- **Zero Open-Source Copying**: 100% human-crafted clean architecture codebase.
- **No Apache Server / No GPL**: Modern native Node.js / TypeScript stack with zero GPL dependencies.

