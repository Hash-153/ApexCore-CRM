/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Comprehensive REST API Gateway & Route Handlers
 */

import { Router, Response } from 'express';
import { CRMDatabase } from '../database/crm_database.ts';
import { seedCRMDatabase } from '../database/seed_data.ts';
import { crmAuthMiddleware, AuthenticatedCRMRequest } from '../controllers/authMiddleware.ts';
import { LeadManagementService } from '../services/LeadManagementService.ts';
import { Account360Service } from '../services/Account360Service.ts';
import { ContactRelationshipService } from '../services/ContactRelationshipService.ts';
import { PipelineForecastingService } from '../services/PipelineForecastingService.ts';
import { CPQAndPricingEngine } from '../services/CPQAndPricingEngine.ts';
import { BillingAndContractService } from '../services/BillingAndContractService.ts';
import { HelpdeskAndSLAService } from '../services/HelpdeskAndSLAService.ts';
import { MarketingAutomationService } from '../services/MarketingAutomationService.ts';
import { WorkflowAutomationEngine } from '../services/WorkflowAutomationEngine.ts';
import { DynamicSchemaEngine } from '../services/DynamicSchemaEngine.ts';
import { SecurityAndRBACService } from '../services/SecurityAndRBACService.ts';
import { ReportingAndAnalyticsService } from '../services/ReportingAndAnalyticsService.ts';
import { IntegrationAndImportService } from '../services/IntegrationAndImportService.ts';
import { AuditAction, LeadStatus, LeadRating, DealStage, ForecastCategory, AccountType, AccountTier, IndustryClassification } from '../domain/enums.ts';
import type { Lead, Account, Opportunity } from '../domain/types.ts';

export function createCRMRouter(): Router {
  const router = Router();
  const db = CRMDatabase.getInstance();

  // Initialize seed data if empty
  if (db.accounts.size === 0) {
    seedCRMDatabase(db);
  }

  // Instantiate Domain Services
  const leadService = new LeadManagementService(db);
  const accountService = new Account360Service(db);
  const contactService = new ContactRelationshipService(db);
  const pipelineService = new PipelineForecastingService(db);
  const cpqEngine = new CPQAndPricingEngine(db);
  const billingService = new BillingAndContractService(db);
  const helpdeskService = new HelpdeskAndSLAService(db);
  const marketingService = new MarketingAutomationService(db);
  const workflowEngine = new WorkflowAutomationEngine(db);
  const schemaEngine = new DynamicSchemaEngine(db);
  const securityService = new SecurityAndRBACService(db);
  const analyticsService = new ReportingAndAnalyticsService(db);
  const importService = new IntegrationAndImportService(db);

  // --------------------------------------------------------------------------
  // 1. System Health & Seeding
  // --------------------------------------------------------------------------
  router.get('/health', (req, res) => {
    res.json({
      status: 'HEALTHY',
      service: 'ApexCore Enterprise CRM Platform',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      entities: {
        accounts: db.accounts.size,
        contacts: db.contacts.size,
        leads: db.leads.size,
        opportunities: db.opportunities.size,
        quotes: db.quotes.size,
        tickets: db.tickets.size,
        campaigns: db.campaigns.size,
        workflows: db.workflowRules.size,
        auditLogs: db.auditLogs.length
      }
    });
  });

  router.post('/seed', (req, res) => {
    seedCRMDatabase(db);
    res.json({ success: true, message: 'CRM database re-seeded successfully.' });
  });

  // --------------------------------------------------------------------------
  // 2. Executive Analytics & KPIs
  // --------------------------------------------------------------------------
  router.get('/analytics/kpis', crmAuthMiddleware(), (req: AuthenticatedCRMRequest, res: Response) => {
    const kpis = analyticsService.getExecutiveKPIs(req.tenantId!);
    res.json({ success: true, data: kpis });
  });

  router.get('/analytics/leaderboard', crmAuthMiddleware(), (req: AuthenticatedCRMRequest, res: Response) => {
    const leaderboard = analyticsService.getSalesQuotaAttainment(req.tenantId!);
    res.json({ success: true, data: leaderboard });
  });

  router.get('/analytics/arr-waterfall', crmAuthMiddleware(), (req: AuthenticatedCRMRequest, res: Response) => {
    const waterfall = billingService.generateARRWaterfall(req.tenantId!);
    res.json({ success: true, data: waterfall });
  });

  // --------------------------------------------------------------------------
  // 3. Leads & BANT Qualification
  // --------------------------------------------------------------------------
  router.get('/leads', crmAuthMiddleware('leads:read'), (req: AuthenticatedCRMRequest, res: Response) => {
    const list = Array.from(db.leads.values())
      .filter(l => l.tenantId === req.tenantId && !l.isDeleted)
      .sort((a, b) => b.score - a.score);
    res.json({ success: true, count: list.length, data: list });
  });

  router.post('/leads', crmAuthMiddleware('leads:write'), (req: AuthenticatedCRMRequest, res: Response) => {
    const body = req.body;
    const now = new Date().toISOString();
    const leadId = `ld_${Date.now()}`;

    const bant = leadService.evaluateBANT({
      budgetScore: body.budgetScore || 15,
      authorityScore: body.authorityScore || 15,
      needScore: body.needScore || 15,
      timelineScore: body.timelineScore || 15,
      qualificationSummary: body.qualificationSummary
    });

    const leadScore = leadService.calculateLeadScore({
      annualRevenue: body.annualRevenue,
      numberOfEmployees: body.numberOfEmployees,
      source: body.source || LeadSource.INBOUND_WEBSITE,
      bant
    });

    const lead: Lead = {
      id: leadId,
      tenantId: req.tenantId!,
      firstName: body.firstName || 'Lead',
      lastName: body.lastName || 'Contact',
      title: body.title || 'Decision Maker',
      companyName: body.companyName || 'Enterprise Corp',
      email: body.email,
      phone: body.phone || 'N/A',
      industry: body.industry || IndustryClassification.TECHNOLOGY_SOFTWARE,
      annualRevenue: body.annualRevenue,
      numberOfEmployees: body.numberOfEmployees,
      source: body.source || LeadSource.INBOUND_WEBSITE,
      status: LeadStatus.NEW,
      rating: leadScore.rating,
      score: leadScore.overallScore,
      bant,
      ownerId: req.crmUser!.id,
      ownerName: req.crmUser!.fullName,
      city: body.city,
      state: body.state,
      country: body.country || 'USA',
      notes: body.notes,
      createdAt: now,
      updatedAt: now,
      createdBy: req.crmUser!.id,
      updatedBy: req.crmUser!.id
    };

    db.indexLead(lead);

    securityService.recordAuditLog({
      tenantId: req.tenantId!,
      actor: req.crmUser!,
      action: AuditAction.CREATE,
      entityType: 'LEAD',
      entityId: lead.id,
      details: `Created new lead "${lead.firstName} ${lead.lastName}" (${lead.companyName}) with score ${lead.score}`
    });

    res.status(201).json({ success: true, data: lead });
  });

  router.post('/leads/:id/convert', crmAuthMiddleware('leads:write'), (req: AuthenticatedCRMRequest, res: Response) => {
    try {
      const result = leadService.convertLead({
        leadId: req.params.id,
        actorId: req.crmUser!.id,
        createAccount: req.body.createAccount !== false,
        newAccountName: req.body.newAccountName,
        createOpportunity: req.body.createOpportunity !== false,
        opportunityName: req.body.opportunityName,
        estimatedAmount: req.body.estimatedAmount,
        expectedCloseDate: req.body.expectedCloseDate
      });

      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // --------------------------------------------------------------------------
  // 4. Accounts & 360 Health
  // --------------------------------------------------------------------------
  router.get('/accounts', crmAuthMiddleware('accounts:read'), (req: AuthenticatedCRMRequest, res: Response) => {
    const list = Array.from(db.accounts.values())
      .filter(a => a.tenantId === req.tenantId && !a.isDeleted)
      .sort((a, b) => b.annualRevenue - a.annualRevenue);
    res.json({ success: true, count: list.length, data: list });
  });

  router.get('/accounts/:id', crmAuthMiddleware('accounts:read'), (req: AuthenticatedCRMRequest, res: Response) => {
    const account = db.accounts.get(req.params.id);
    if (!account || account.isDeleted) {
      res.status(404).json({ success: false, error: 'Account not found' });
      return;
    }

    const health = accountService.evaluateAccountHealth(account.id);
    const contacts = db.getContactsByAccountId(account.id);
    const opportunities = db.getOpportunitiesByAccountId(account.id);
    const hierarchy = accountService.getAccountHierarchyTree(account.id);
    const committee = contactService.analyzeBuyingCommittee(account.id);

    res.json({
      success: true,
      data: {
        account,
        health,
        contacts,
        opportunities,
        hierarchy,
        committee
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Opportunities & Pipelines (MEDDIC Gatekeeper)
  // --------------------------------------------------------------------------
  router.get('/opportunities', crmAuthMiddleware('opportunities:read'), (req: AuthenticatedCRMRequest, res: Response) => {
    const list = Array.from(db.opportunities.values())
      .filter(o => o.tenantId === req.tenantId && !o.isDeleted)
      .sort((a, b) => b.amount - a.amount);
    res.json({ success: true, count: list.length, data: list });
  });

  router.get('/pipelines/:id/forecast', crmAuthMiddleware('opportunities:read'), (req: AuthenticatedCRMRequest, res: Response) => {
    const forecast = pipelineService.generateForecast(req.params.id, req.tenantId!);
    res.json({ success: true, data: forecast });
  });

  router.post('/opportunities/:id/stage', crmAuthMiddleware('opportunities:*'), (req: AuthenticatedCRMRequest, res: Response) => {
    try {
      const { targetStage } = req.body;
      const result = pipelineService.validateStageTransition(req.params.id, targetStage, req.crmUser!.id);

      if (!result.allowed) {
        res.status(422).json({
          success: false,
          error: 'STAGE_GATE_RESTRICTION',
          blockers: result.blockers
        });
        return;
      }

      res.json({ success: true, data: result.opportunity });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // --------------------------------------------------------------------------
  // 6. CPQ & Dynamic Quotes
  // --------------------------------------------------------------------------
  router.get('/products', crmAuthMiddleware(), (req: AuthenticatedCRMRequest, res: Response) => {
    const list = Array.from(db.products.values()).filter(p => p.tenantId === req.tenantId);
    res.json({ success: true, data: list });
  });

  router.get('/pricebooks', crmAuthMiddleware(), (req: AuthenticatedCRMRequest, res: Response) => {
    const list = Array.from(db.priceBooks.values()).filter(pb => pb.tenantId === req.tenantId);
    res.json({ success: true, data: list });
  });

  router.post('/quotes', crmAuthMiddleware('quotes:*'), (req: AuthenticatedCRMRequest, res: Response) => {
    try {
      const result = cpqEngine.generateQuote({
        tenantId: req.tenantId!,
        opportunityId: req.body.opportunityId,
        priceBookId: req.body.priceBookId,
        items: req.body.items,
        paymentTerms: req.body.paymentTerms,
        taxRatePercentage: req.body.taxRatePercentage,
        actorId: req.crmUser!.id
      });

      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.post('/quotes/:id/review', crmAuthMiddleware('quotes:approve'), (req: AuthenticatedCRMRequest, res: Response) => {
    try {
      const { decision, rejectionReason } = req.body;
      const quote = cpqEngine.reviewQuote(req.params.id, decision, req.crmUser!.id, rejectionReason);
      res.json({ success: true, data: quote });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // --------------------------------------------------------------------------
  // 7. Customer Support & SLA Helpdesk
  // --------------------------------------------------------------------------
  router.get('/tickets', crmAuthMiddleware('tickets:read'), (req: AuthenticatedCRMRequest, res: Response) => {
    const list = Array.from(db.tickets.values()).filter(t => t.tenantId === req.tenantId);
    res.json({ success: true, count: list.length, data: list });
  });

  router.post('/tickets', crmAuthMiddleware('tickets:write'), (req: AuthenticatedCRMRequest, res: Response) => {
    const ticket = helpdeskService.ingestTicket({
      tenantId: req.tenantId!,
      subject: req.body.subject,
      description: req.body.description,
      priority: req.body.priority,
      channel: req.body.channel,
      accountId: req.body.accountId,
      contactId: req.body.contactId,
      contactEmail: req.body.contactEmail,
      tags: req.body.tags,
      actorId: req.crmUser!.id
    });
    res.status(201).json({ success: true, data: ticket });
  });

  router.post('/tickets/:id/comments', crmAuthMiddleware('tickets:write'), (req: AuthenticatedCRMRequest, res: Response) => {
    const ticket = helpdeskService.addAgentComment(
      req.params.id,
      req.crmUser!.id,
      req.crmUser!.fullName,
      req.crmUser!.role,
      req.body.content,
      req.body.isInternalOnly
    );
    res.json({ success: true, data: ticket });
  });

  // --------------------------------------------------------------------------
  // 8. Marketing Campaigns & Attribution
  // --------------------------------------------------------------------------
  router.get('/campaigns', crmAuthMiddleware(), (req: AuthenticatedCRMRequest, res: Response) => {
    const list = Array.from(db.campaigns.values()).filter(c => c.tenantId === req.tenantId);
    res.json({ success: true, data: list });
  });

  router.get('/attribution/:oppId', crmAuthMiddleware(), (req: AuthenticatedCRMRequest, res: Response) => {
    const model = (req.query.model as any) || 'LINEAR';
    const report = marketingService.calculateAttribution(req.params.oppId, model);
    res.json({ success: true, data: report });
  });

  // --------------------------------------------------------------------------
  // 9. Visual Workflows & Dynamic Schemas
  // --------------------------------------------------------------------------
  router.get('/workflows', crmAuthMiddleware(), (req: AuthenticatedCRMRequest, res: Response) => {
    const list = Array.from(db.workflowRules.values()).filter(w => w.tenantId === req.tenantId);
    res.json({ success: true, data: list });
  });

  router.get('/custom-fields', crmAuthMiddleware(), (req: AuthenticatedCRMRequest, res: Response) => {
    const list = Array.from(db.customFields.values()).filter(cf => cf.tenantId === req.tenantId);
    res.json({ success: true, data: list });
  });

  // --------------------------------------------------------------------------
  // 10. Audit Logs & Cryptographic Integrity
  // --------------------------------------------------------------------------
  router.get('/audit-logs', crmAuthMiddleware('*:read'), (req: AuthenticatedCRMRequest, res: Response) => {
    const logs = db.auditLogs.filter(a => a.tenantId === req.tenantId).slice(-100).reverse();
    const integrity = securityService.verifyAuditChainIntegrity();
    res.json({ success: true, integrity, count: logs.length, data: logs });
  });

  return router;
}
