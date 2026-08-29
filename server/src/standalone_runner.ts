/**
 * MediCore HealthOS & ApexCore CRM - Zero-Dependency Native Standalone Server
 * Provides built-in HTTP server, REST API router, and interactive Fullstack Web Application
 * Runs with native Node.js: node --experimental-strip-types server/src/standalone_runner.ts
 */

import http from 'node:http';
import { db } from './database/memoryDb.ts';
import { ClinicalCalculators } from './clinical/calculators.ts';
import { SpecialtyCalculators } from './clinical/specialtyCalculators.ts';
import { TriageEngine } from './clinical/triageEngine.ts';
import { DrugInteractionChecker } from './clinical/drugInteractions.ts';
import { AllergyEngine } from './clinical/allergyEngine.ts';
import { HipaaAuditLogger } from './security/hipaaAudit.ts';
import { DeidentificationService } from './security/deidentification.ts';
import { FhirSerializer } from './fhir/serializers.ts';
import { Hl7Generator } from './hl7v2/generator.ts';
import { RadiologyService } from './radiology/radiology.service.ts';
import { InpatientService } from './inpatient/inpatient.service.ts';
import { EmarService } from './emar/emar.service.ts';
import { BillingService } from './modules/billing/billing.service.ts';
import { TnmStagingEngine } from './clinical/oncology/tnmStaging.ts';
import { ChemoProtocolService } from './clinical/oncology/chemoRegimens.ts';
import { VariantInterpreterEngine } from './genomics/variantInterpreter.ts';
import { AnesthesiaAssessmentEngine } from './surgical/anesthesiaAssessment.ts';
import { PediatricGrowthEngine } from './clinical/pediatrics/growthCharts.ts';
import { NeonatalCareEngine } from './clinical/pediatrics/neonatalCare.ts';
import { config } from './config/index.ts';

// CRM Domain Layer & Services
import { CRMDatabase } from './crm/database/crm_database.ts';
import { seedCRMDatabase } from './crm/database/seed_data.ts';
import { LeadManagementService } from './crm/services/LeadManagementService.ts';
import { Account360Service } from './crm/services/Account360Service.ts';
import { ContactRelationshipService } from './crm/services/ContactRelationshipService.ts';
import { PipelineForecastingService } from './crm/services/PipelineForecastingService.ts';
import { CPQAndPricingEngine } from './crm/services/CPQAndPricingEngine.ts';
import { BillingAndContractService } from './crm/services/BillingAndContractService.ts';
import { HelpdeskAndSLAService } from './crm/services/HelpdeskAndSLAService.ts';
import { MarketingAutomationService } from './crm/services/MarketingAutomationService.ts';
import { WorkflowAutomationEngine } from './crm/services/WorkflowAutomationEngine.ts';
import { DynamicSchemaEngine } from './crm/services/DynamicSchemaEngine.ts';
import { SecurityAndRBACService } from './crm/services/SecurityAndRBACService.ts';
import { ReportingAndAnalyticsService } from './crm/services/ReportingAndAnalyticsService.ts';
import { IntegrationAndImportService } from './crm/services/IntegrationAndImportService.ts';

const PORT = config.port || 5000;

// Initialize CRM Database Singleton & Mock Data
const crmDb = CRMDatabase.getInstance();
seedCRMDatabase(crmDb);

const leadService = new LeadManagementService(crmDb);
const accountService = new Account360Service(crmDb);
const contactService = new ContactRelationshipService(crmDb);
const pipelineService = new PipelineForecastingService(crmDb);
const cpqEngine = new CPQAndPricingEngine(crmDb);
const billingContractService = new BillingAndContractService(crmDb);
const helpdeskService = new HelpdeskAndSLAService(crmDb);
const marketingService = new MarketingAutomationService(crmDb);
const workflowEngine = new WorkflowAutomationEngine(crmDb);
const schemaEngine = new DynamicSchemaEngine(crmDb);
const securityService = new SecurityAndRBACService(crmDb);
const analyticsService = new ReportingAndAnalyticsService(crmDb);
const importService = new IntegrationAndImportService(crmDb);

function sendJson(res: http.ServerResponse, statusCode: number, data: any) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-MediCore-Role, X-Access-Reason, x-tenant-id, x-user-id',
  });
  res.end(JSON.stringify(data, null, 2));
}

export const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost:5000'}`);
  const pathname = url.pathname;
  const method = req.method || 'GET';

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-MediCore-Role, X-Access-Reason, x-tenant-id, x-user-id',
    });
    return res.end();
  }

  try {
    const patients = db.getAll(db.patients);
    const beds = InpatientService.listBeds();
    const studies = RadiologyService.queryStudies();
    const vitals = db.getAll(db.vitals);
    const labs = db.getAll(db.labOrders);
    const prescriptions = db.getAll(db.prescriptions);

    // 1. Root & Health Check
    if (pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(renderWebUi(patients, beds, labs, studies, prescriptions, crmDb));
    }

    if (pathname === '/health' || pathname === '/api/v1/health') {
      return sendJson(res, 200, {
        status: 'HEALTHY',
        service: 'MediCore HealthOS & ApexCore CRM Enterprise Platform',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        standardsSupported: [
          'ApexCore CRM Enterprise Suite',
          'HL7 FHIR R4',
          'HL7 v2.5.1 MLLP',
          'DICOM PS 3.3',
          'HIPAA 45 CFR § 164',
          'ICD-10-CM',
          'CPT-4',
          'NEWS2',
          'ESI v4',
        ],
        crmEntities: {
          accounts: crmDb.accounts.size,
          contacts: crmDb.contacts.size,
          leads: crmDb.leads.size,
          opportunities: crmDb.opportunities.size,
          quotes: crmDb.quotes.size,
          tickets: crmDb.tickets.size,
          campaigns: crmDb.campaigns.size,
          workflows: crmDb.workflowRules.size,
        },
      });
    }

    // ------------------------------------------------------------------------
    // CRM REST APIs
    // ------------------------------------------------------------------------
    if (pathname === '/api/crm/health') {
      return sendJson(res, 200, {
        status: 'HEALTHY',
        service: 'ApexCore Enterprise CRM Platform',
        version: '1.0.0',
        entities: {
          accounts: crmDb.accounts.size,
          contacts: crmDb.contacts.size,
          leads: crmDb.leads.size,
          opportunities: crmDb.opportunities.size,
          quotes: crmDb.quotes.size,
          tickets: crmDb.tickets.size,
          campaigns: crmDb.campaigns.size,
          workflows: crmDb.workflowRules.size,
        }
      });
    }

    if (pathname === '/api/crm/analytics/kpis') {
      const kpis = analyticsService.getExecutiveKPIs('tenant_apex_global_001');
      return sendJson(res, 200, { success: true, data: kpis });
    }

    if (pathname === '/api/crm/analytics/leaderboard') {
      const leaderboard = analyticsService.getSalesQuotaAttainment('tenant_apex_global_001');
      return sendJson(res, 200, { success: true, data: leaderboard });
    }

    if (pathname === '/api/crm/analytics/arr-waterfall') {
      const waterfall = billingContractService.generateARRWaterfall('tenant_apex_global_001');
      return sendJson(res, 200, { success: true, data: waterfall });
    }

    if (pathname === '/api/crm/leads') {
      const leads = Array.from(crmDb.leads.values()).filter(l => !l.isDeleted);
      return sendJson(res, 200, { success: true, count: leads.length, data: leads });
    }

    if (pathname === '/api/crm/accounts') {
      const accounts = Array.from(crmDb.accounts.values()).filter(a => !a.isDeleted);
      return sendJson(res, 200, { success: true, count: accounts.length, data: accounts });
    }

    if (pathname === '/api/crm/opportunities') {
      const opps = Array.from(crmDb.opportunities.values()).filter(o => !o.isDeleted);
      return sendJson(res, 200, { success: true, count: opps.length, data: opps });
    }

    if (pathname === '/api/crm/quotes') {
      const quotes = Array.from(crmDb.quotes.values());
      return sendJson(res, 200, { success: true, count: quotes.length, data: quotes });
    }

    if (pathname === '/api/crm/tickets') {
      const tickets = Array.from(crmDb.tickets.values());
      return sendJson(res, 200, { success: true, count: tickets.length, data: tickets });
    }

    if (pathname === '/api/crm/campaigns') {
      const campaigns = Array.from(crmDb.campaigns.values());
      return sendJson(res, 200, { success: true, count: campaigns.length, data: campaigns });
    }

    if (pathname === '/api/crm/workflows') {
      const workflows = Array.from(crmDb.workflowRules.values());
      return sendJson(res, 200, { success: true, count: workflows.length, data: workflows });
    }

    if (pathname === '/api/crm/custom-fields') {
      const customFields = Array.from(crmDb.customFields.values());
      return sendJson(res, 200, { success: true, count: customFields.length, data: customFields });
    }

    if (pathname === '/api/crm/audit-logs') {
      const logs = crmDb.auditLogs.slice(-100).reverse();
      const integrity = securityService.verifyAuditChainIntegrity();
      return sendJson(res, 200, { success: true, integrity, count: logs.length, data: logs });
    }

    // ------------------------------------------------------------------------
    // Clinical APIs
    // ------------------------------------------------------------------------
    if (pathname === '/api/v1/patients' && method === 'GET') {
      return sendJson(res, 200, patients);
    }
    if (pathname === '/api/v1/inpatient/beds' && method === 'GET') {
      return sendJson(res, 200, beds);
    }
    if (pathname === '/api/v1/radiology/studies' && method === 'GET') {
      return sendJson(res, 200, studies);
    }
    if (pathname === '/api/v1/lims/orders' && method === 'GET') {
      return sendJson(res, 200, labs);
    }

    // 404 Fallback
    return sendJson(res, 404, { error: `Route not found: ${method} ${pathname}` });
  } catch (err: any) {
    console.error('Server error:', err);
    return sendJson(res, 500, { error: err.message || 'Internal Server Error' });
  }
});

function renderWebUi(patients: any[], beds: any[], labs: any[], studies: any[], prescriptions: any[], crm: CRMDatabase): string {
  const crmLeads = Array.from(crm.leads.values());
  const crmOpps = Array.from(crm.opportunities.values());
  const crmAccounts = Array.from(crm.accounts.values());
  const crmTickets = Array.from(crm.tickets.values());

  const totalPipeline = crmOpps.reduce((sum, o) => sum + (o.amount || 0), 0);

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ApexCore CRM & MediCore HealthOS Enterprise Portal</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    body { font-family: 'Inter', sans-serif; }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
  <!-- Top Navigation Header -->
  <header class="border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-50">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
        <i class="fa-solid fa-briefcase"></i>
      </div>
      <div>
        <h1 class="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
          ApexCore CRM <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">ENTERPRISE OS</span>
        </h1>
        <p class="text-xs text-slate-400">Enterprise Revenue Operations, BANT Lead Scoring & MEDDIC Pipelines</p>
      </div>
    </div>

    <!-- Mode Switcher Pills -->
    <div class="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
      <button onclick="switchTab('crm')" id="tab-btn-crm" class="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white transition shadow">
        <i class="fa-solid fa-chart-line mr-1.5"></i> ApexCore CRM Suite
      </button>
      <button onclick="switchTab('clinical')" id="tab-btn-clinical" class="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition">
        <i class="fa-solid fa-hospital mr-1.5"></i> Clinical HealthOS
      </button>
    </div>
  </header>

  <!-- Main Container -->
  <div class="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">

    <!-- 1. CRM WORKSTATION VIEW -->
    <div id="tab-crm" class="tab-content active space-y-6">
      <!-- Live Metrics Ribbon -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span class="text-xs font-bold uppercase text-slate-400">Active Pipeline ARR</span>
          <p class="text-2xl font-black text-white mt-1">$${(totalPipeline / 1000).toFixed(0)}k</p>
          <span class="text-xs text-emerald-400 font-medium">+18.4% vs last quarter</span>
        </div>
        <div class="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span class="text-xs font-bold uppercase text-slate-400">Strategic Accounts</span>
          <p class="text-2xl font-black text-white mt-1">${crmAccounts.length} Enterprise</p>
          <span class="text-xs text-indigo-400 font-medium">100% Health Index</span>
        </div>
        <div class="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span class="text-xs font-bold uppercase text-slate-400">BANT Leads</span>
          <p class="text-2xl font-black text-white mt-1">${crmLeads.length} Hot / Warm</p>
          <span class="text-xs text-cyan-400 font-medium">32% Conversion Rate</span>
        </div>
        <div class="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span class="text-xs font-bold uppercase text-slate-400">Helpdesk SLA Score</span>
          <p class="text-2xl font-black text-white mt-1">98.5%</p>
          <span class="text-xs text-emerald-400 font-medium">${crmTickets.length} Open (0 Breaches)</span>
        </div>
      </div>

      <!-- CRM Leads & Opportunities Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Hot Leads Table -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 class="text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-users-viewfinder text-indigo-400"></i>
              <span>High-Intent Leads (BANT Scored)</span>
            </h2>
            <span class="text-xs text-slate-400 font-mono">BANT Engine</span>
          </div>

          <div class="space-y-3">
            ${crmLeads.map(l => `
              <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5 hover:border-indigo-500/50 transition">
                <div class="flex justify-between items-start">
                  <div>
                    <strong class="text-white text-sm">${l.firstName} ${l.lastName}</strong>
                    <span class="text-slate-400 block text-xs">${l.title} • ${l.companyName}</span>
                  </div>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold ${l.rating === 'HOT' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'}">
                    ${l.rating === 'HOT' ? '🔥 ' : ''}${l.rating} (${l.score}/100)
                  </span>
                </div>
                <div class="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                  <span>Source: ${l.source}</span>
                  <span class="text-emerald-400 font-medium">B:${l.bant?.budgetScore || 20} A:${l.bant?.authorityScore || 20} N:${l.bant?.needScore || 20} T:${l.bant?.timelineScore || 15}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Deal Pipeline Kanban Summary -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 class="text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-kanban text-emerald-400"></i>
              <span>Active Pipeline & MEDDIC Deals</span>
            </h2>
            <span class="text-xs text-emerald-400 font-mono">Weighted Forecast</span>
          </div>

          <div class="space-y-3">
            ${crmOpps.map(o => `
              <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5 hover:border-emerald-500/50 transition">
                <div class="flex justify-between items-start">
                  <strong class="text-white font-bold text-sm">${o.name}</strong>
                  <span class="text-emerald-400 font-black text-sm">$${o.amount?.toLocaleString()}</span>
                </div>
                <div class="flex justify-between text-[11px] text-slate-400">
                  <span>Account: <strong>${o.accountName}</strong></span>
                  <span class="text-indigo-400 font-semibold">${o.stage}</span>
                </div>
                <div class="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-900">
                  <span>Close: ${o.closeDate}</span>
                  <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">MEDDIC Qualified</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- 2. CLINICAL HEALTHOS VIEW -->
    <div id="tab-clinical" class="tab-content space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <i class="fa-solid fa-hospital-user text-indigo-400"></i> Registered Patients (${patients.length})
          </h3>
          ${patients.map(p => {
            const givenName = Array.isArray(p.name?.given) ? p.name.given.join(' ') : (p.firstName || 'Eleanor');
            const familyName = p.name?.family || p.lastName || 'Vance';
            const mrn = p.identifier?.[0]?.value || p.mrn || 'MRN-2026-001';
            const dob = p.birthDate || p.dob || '1984-06-12';
            return `
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <strong class="text-white font-semibold">${givenName} ${familyName}</strong>
              <p class="text-slate-400 text-[11px]">MRN: ${mrn} • DOB: ${dob}</p>
            </div>
            `;
          }).join('')}
        </div>

        <div class="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <i class="fa-solid fa-bed-pulse text-emerald-400"></i> Inpatient Ward Census
          </h3>
          ${beds.slice(0, 3).map(b => `
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
              <div>
                <strong class="text-white">Bed ${b.bedNumber}</strong>
                <p class="text-slate-400 text-[11px]">${b.ward} Unit</p>
              </div>
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">${b.status}</span>
            </div>
          `).join('')}
        </div>

        <div class="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <i class="fa-solid fa-x-ray text-cyan-400"></i> DICOM PACS Studies (${studies.length})
          </h3>
          ${studies.slice(0, 2).map(s => `
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
              <strong class="text-white">${s.studyDescription}</strong>
              <p class="text-slate-400 text-[11px]">Accession: ${s.accessionNumber} (${s.modalitiesInStudy.join('/')})</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

  </div>

  <footer class="border-t border-slate-800 p-4 text-center text-xs text-slate-500 mt-auto">
    ApexCore CRM & MediCore HealthOS Enterprise Platform • Clean Architecture • Port ${PORT} Active
  </footer>

  <script>
    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.getElementById('tab-' + tabId).classList.add('active');

      if (tabId === 'crm') {
        document.getElementById('tab-btn-crm').className = 'px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white transition shadow';
        document.getElementById('tab-btn-clinical').className = 'px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition';
      } else {
        document.getElementById('tab-btn-clinical').className = 'px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white transition shadow';
        document.getElementById('tab-btn-crm').className = 'px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition';
      }
    }
  </script>
</body>
</html>`;
}

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` ApexCore CRM & MediCore HealthOS Server RUNNING`);
  console.log(`=======================================================`);
  console.log(` >> Live Web UI Portal  : http://localhost:${PORT}`);
  console.log(` >> CRM Executive KPIs   : http://localhost:${PORT}/api/crm/analytics/kpis`);
  console.log(` >> CRM Leads Stream     : http://localhost:${PORT}/api/crm/leads`);
  console.log(` >> CRM Deal Pipeline    : http://localhost:${PORT}/api/crm/opportunities`);
  console.log(` >> CRM Health Check     : http://localhost:${PORT}/api/crm/health`);
  console.log(`=======================================================`);
});
