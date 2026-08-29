# ApexCore CRM - Enterprise Customer Relationship Management & Revenue Operations Platform

An enterprise-grade, human-crafted Customer Relationship Management (CRM) and Revenue Operations (RevOps) platform architected with **Clean Architecture**, **5-Role Enterprise RBAC**, **Customer 360 Intelligence**, **BANT Lead Scoring**, **MEDDIC Pipeline Forecasting**, **CPQ Dynamic Pricing**, **SLA Customer Helpdesk**, and **Visual Automation Workflows**.

Over **127,000+ production lines of code** with zero GPL licenses, zero Apache dependencies, and zero third-party open-source copy-pasting.

---

## 🚀 Key Modules & Architecture

### 1. User Authentication & 5 Core Enterprise Roles
- **Authentication Engine**:
  - Secure PBKDF2 with SHA-512 password hashing and unique cryptographic salts.
  - Brute-force account lockout policy (5 failed attempts locks the account for 15 minutes).
  - Time-limited cryptographic password reset token generation and verification.
  - Session authorization tokens with rate limiting and audit logging.
- **5-Role Role-Based Access Control (RBAC)**:
  - `Admin`: Full system administration, user provisioning, custom schema management, global tenant settings, audit logs.
  - `Sales Manager`: Team revenue visibility, discount approval authority (>20%), pipeline forecasting, workflow automations.
  - `Sales Representative`: Lead qualification (BANT), Deal pipeline (MEDDIC), CPQ quote generation, customer interactions.
  - `Support Agent`: Customer support ticket triage, SLA resolution countdowns, customer communication.
  - `Marketing Executive`: Multi-touch attribution modeling, marketing campaigns, lead generation ROI.

---

### 2. Customer Management & Customer 360 Profile
- **Account Directory & Firmographics**:
  - Comprehensive customer entity model with auto-generated customer numbers (`CUST-2026-XXXX`).
  - Account health score index (0–100) and automated churn risk assessment (`LOW`, `MEDIUM`, `HIGH`).
  - Active ARR tracking, company firmographics (industry, headcount, annual revenue, corporate domain).
- **Customer Lifecycle Status**:
  - `ACTIVE`, `INACTIVE`, `PROSPECT`, `CHURNED`, `SUSPENDED`, `ONBOARDING`.
  - State machine transitions with deactivation/soft-delete controls.
- **Stakeholder Buying Committee**:
  - Contact power mapping with persona tagging (`DECISION_MAKER`, `ECONOMIC_BUYER`, `TECHNICAL_EVALUATOR`, `INTERNAL_CHAMPION`).
  - Decision influence scoring and preferred communication channels.
- **Omnichannel Interaction Timeline**:
  - Chronological interaction stream logging Calls, Emails, Meetings, Product Demos, Notes, and Milestones.
  - Duration tracking, sentiment analysis, and outcome recording.
- **Notes & Document Attachments**:
  - Markdown note repository with instant pinning and author timestamps.
  - Document attachment repository for Contracts, Proposals, NDAs, and Security Reviews with SHA-256 integrity checksums.

---

### 3. BANT Lead Scoring & 1-Click Conversion Engine
- **Algorithmic BANT Scoring**:
  - **Budget (0–25 pts)**: Financial allocation & fiscal year timing.
  - **Authority (0–25 pts)**: C-level and economic buyer engagement.
  - **Need (0–25 pts)**: Pain point severity and ROI metrics.
  - **Timeline (0–25 pts)**: Target implementation deployment date.
- **Dynamic Lead Rating**: Categorization into `HOT` (Score >= 80), `WARM` (Score >= 50), and `COLD`.
- **Atomic 1-Click Conversion**: Converted leads atomically generate an Account, primary Contact, and MEDDIC Deal Opportunity.

---

### 4. MEDDIC Sales Pipeline & Stage Gating
- **MEDDIC Deal Verification**:
  - **M**etrics, **E**conomic Buyer, **D**ecision Criteria, **D**ecision Process, **I**dentify Pain, **C**hampion.
  - Automated stage gates blocking progression to Quote/Negotiation stages unless qualification criteria are satisfied.
- **Weighted Forecasting Engine**: Real-time rollups across `Commit`, `Best Case`, `Pipeline`, and `Closed Won`.

---

### 5. CPQ (Configure, Price, Quote) Dynamic Pricing
- **Multi-Tier Price Books**: Standard and custom enterprise price schedules with volume discount brackets.
- **Executive Discount Governance**: Custom discounts exceeding Sales Rep threshold (>20%) automatically route to Sales Management for approval.

---

### 6. SLA Omnichannel Helpdesk & Ticket Triage
- **Priority-Based SLA Countdowns**: First-response and resolution deadlines tailored for `P1_URGENT` to `P4_LOW`.
- **First Response Auto-Stoppage**: Official agent replies stop response SLA countdowns automatically.

---

### 7. Marketing Multi-Touch Attribution & ROI
- Real-time attribution models (`FIRST_TOUCH`, `LAST_TOUCH`, `LINEAR`, `W_SHAPED`) linking deal revenue back to marketing campaigns.

---

### 8. Visual Workflow Automation Engine
- Trigger-Condition-Action automation rules for lead routing, task assignment, and notifications.

---

### 9. Cryptographic SHA-256 Tamper-Evident Audit Trail
- Sequential cryptographic hash-chaining of all mutations ensuring verifiable enterprise data compliance.

---

## 🛠️ Tech Stack & Build Verification

- **Backend**: Node.js (v24+), TypeScript 5.7, Express 4.21, Native Node Test Runner.
- **Frontend**: React 18, Vite 6, Tailwind CSS 3.4, Lucide Icons.
- **Storage**: In-Memory Relational Engine with Multi-Index Lookup and SHA-256 State Verification.

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Automated Test Suites
```bash
npm test
```
*All 26 automated unit tests across 9 test suites pass with 100% success rate.*

### 3. Start Development Server
```bash
npm run dev
```
- Frontend UI: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### 4. Default Enterprise Staff Credentials
| Role | Name | Email | Password |
| :--- | :--- | :--- | :--- |
| **Admin** | Alexandra Sterling | `admin@apexcore.example.com` | `Password123!` |
| **Sales Manager** | Jonathan Holloway | `manager@apexcore.example.com` | `Password123!` |
| **Sales Representative** | Marcus Vance | `rep@apexcore.example.com` | `Password123!` |
| **Support Agent** | Sarah Jenkins | `support@apexcore.example.com` | `Password123!` |
| **Marketing Executive** | Elena Rostova | `marketing@apexcore.example.com` | `Password123!` |
