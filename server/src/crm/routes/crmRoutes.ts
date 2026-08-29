/**
 * ApexCore Enterprise CRM - Unified REST API Router
 * Dispatches endpoints for User Authentication, 5-Role RBAC, Customer Management,
 * Customer 360, Interaction Timelines, Notes/Attachments, BANT Leads, MEDDIC Pipeline,
 * CPQ Pricing, SLA Helpdesk, Marketing Attribution, and Cryptographic Audit.
 */

import { Router } from 'express';
import { CRMDatabase } from '../database/crm_database.ts';
import { AuthService } from '../auth/auth.service.ts';
import { RBACService } from '../auth/rbac.service.ts';
import { CustomerService } from '../customers/customer.service.ts';
import { InteractionService } from '../customers/interaction.service.ts';
import { NotesAndAttachmentsService } from '../customers/notes_attachments.service.ts';
import { LeadManagementService } from '../services/LeadManagementService.ts';
import { PipelineForecastingService } from '../services/PipelineForecastingService.ts';
import { CPQAndPricingEngine } from '../services/CPQAndPricingEngine.ts';
import { HelpdeskAndSLAService } from '../services/HelpdeskAndSLAService.ts';
import { MarketingAutomationService } from '../services/MarketingAutomationService.ts';
import { WorkflowAutomationEngine } from '../services/WorkflowAutomationEngine.ts';
import { DynamicSchemaEngine } from '../services/DynamicSchemaEngine.ts';
import { SecurityAndRBACService } from '../services/SecurityAndRBACService.ts';
import { ReportingAndAnalyticsService } from '../services/ReportingAndAnalyticsService.ts';
import { IntegrationAndImportService } from '../services/IntegrationAndImportService.ts';
import { requireAuth, requirePermission } from '../controllers/authMiddleware.ts';
import { UserRole } from '../domain/enums.ts';

export function createCRMRouter(): Router {
  const router = Router();
  const db = CRMDatabase.getInstance();

  const authService = new AuthService(db);
  const customerService = new CustomerService(db);
  const interactionService = new InteractionService(db);
  const notesAttachmentsService = new NotesAndAttachmentsService(db);
  const leadService = new LeadManagementService(db);
  const pipelineService = new PipelineForecastingService(db);
  const cpqEngine = new CPQAndPricingEngine(db);
  const helpdeskService = new HelpdeskAndSLAService(db);
  const marketingService = new MarketingAutomationService(db);
  const workflowEngine = new WorkflowAutomationEngine(db);
  const schemaEngine = new DynamicSchemaEngine(db);
  const securityService = new SecurityAndRBACService(db);
  const analyticsService = new ReportingAndAnalyticsService(db);
  const importService = new IntegrationAndImportService(db);

  // ==========================================================================
  // 1. User Authentication & 5 Core Roles
  // ==========================================================================
  router.post('/auth/login', (req, res) => {
    try {
      const { email, password } = req.body;
      const result = authService.login(email, password, req.ip);
      res.json({ success: true, ...result });
    } catch (err: any) {
      res.status(401).json({ success: false, error: err.message });
    }
  });

  router.post('/auth/register', (req, res) => {
    try {
      const result = authService.register(req.body);
      res.status(201).json({ success: true, ...result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.post('/auth/forgot-password', (req, res) => {
    try {
      const { email } = req.body;
      const result = authService.forgotPassword(email);
      res.json({ success: true, ...result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.post('/auth/reset-password', (req, res) => {
    try {
      const { token, newPassword } = req.body;
      const result = authService.resetPassword(token, newPassword);
      res.json({ success: true, message: 'Password updated successfully.' });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.get('/auth/me', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.replace('Bearer ', '') : '';
    const session = authService.validateSession(token);
    if (!session) {
      return res.status(401).json({ success: false, error: 'Unauthorized session.' });
    }
    res.json({ success: true, user: session.user });
  });

  router.post('/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.replace('Bearer ', '') : '';
    authService.logout(token);
    res.json({ success: true, message: 'Logged out successfully.' });
  });

  router.get('/auth/users', (req, res) => {
    const users = authService.listUsers();
    res.json({ success: true, count: users.length, data: users });
  });

  router.put('/auth/users/:id/role', (req, res) => {
    try {
      const { role } = req.body;
      const updated = authService.updateUserRole(req.params.id, role, 'usr_admin_root');
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.get('/auth/roles', (req, res) => {
    const roles = RBACService.getRoleDefinitions();
    res.json({ success: true, data: roles });
  });

  // ==========================================================================
  // 2. Customer Management & Customer 360
  // ==========================================================================
  router.get('/customers', (req, res) => {
    try {
      const { search, status, tier, industry, ownerId } = req.query;
      const customers = customerService.listCustomers({
        search: search as string,
        status: status as any,
        tier: tier as any,
        industry: industry as string,
        ownerId: ownerId as string
      });
      res.json({ success: true, count: customers.length, data: customers });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  router.post('/customers', (req, res) => {
    try {
      const customer = customerService.createCustomer(req.body, 'usr_marcus_vance');
      res.status(201).json({ success: true, data: customer });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.get('/customers/:id', (req, res) => {
    try {
      const profile = customerService.getCustomerProfile(req.params.id);
      res.json({ success: true, data: profile });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  });

  router.put('/customers/:id', (req, res) => {
    try {
      const updated = customerService.updateCustomer(req.params.id, req.body, 'usr_marcus_vance');
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.delete('/customers/:id', (req, res) => {
    try {
      customerService.deleteCustomer(req.params.id, 'usr_admin_root');
      res.json({ success: true, message: 'Customer account deactivated successfully.' });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  });

  router.put('/customers/:id/status', (req, res) => {
    try {
      const { status } = req.body;
      const updated = customerService.setCustomerStatus(req.params.id, status, 'usr_admin_root');
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // Customer Interactions
  router.get('/customers/:id/interactions', (req, res) => {
    const list = interactionService.getCustomerInteractions(req.params.id);
    res.json({ success: true, count: list.length, data: list });
  });

  router.post('/customers/:id/interactions', (req, res) => {
    try {
      const interaction = interactionService.logInteraction(
        { ...req.body, customerId: req.params.id },
        'usr_marcus_vance'
      );
      res.status(201).json({ success: true, data: interaction });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // Customer Notes
  router.get('/customers/:id/notes', (req, res) => {
    const notes = db.getNotesForCustomer(req.params.id);
    res.json({ success: true, count: notes.length, data: notes });
  });

  router.post('/customers/:id/notes', (req, res) => {
    try {
      const note = notesAttachmentsService.addNote(req.params.id, req.body, 'usr_marcus_vance');
      res.status(201).json({ success: true, data: note });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.put('/customers/:id/notes/:noteId/pin', (req, res) => {
    try {
      const note = notesAttachmentsService.togglePinNote(req.params.noteId, 'usr_marcus_vance');
      res.json({ success: true, data: note });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  });

  router.delete('/customers/:id/notes/:noteId', (req, res) => {
    try {
      notesAttachmentsService.deleteNote(req.params.noteId, 'usr_marcus_vance');
      res.json({ success: true, message: 'Note deleted successfully.' });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  });

  // Customer Attachments
  router.get('/customers/:id/attachments', (req, res) => {
    const atts = db.getAttachmentsForCustomer(req.params.id);
    res.json({ success: true, count: atts.length, data: atts });
  });

  router.post('/customers/:id/attachments', (req, res) => {
    try {
      const att = notesAttachmentsService.addAttachment(req.params.id, req.body, 'usr_marcus_vance');
      res.status(201).json({ success: true, data: att });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.delete('/customers/:id/attachments/:attId', (req, res) => {
    try {
      notesAttachmentsService.deleteAttachment(req.params.attId, 'usr_marcus_vance');
      res.json({ success: true, message: 'Attachment removed successfully.' });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  });

  // ==========================================================================
  // 3. Leads & Pipeline
  // ==========================================================================
  router.get('/leads', (req, res) => {
    const leads = Array.from(db.leads.values()).filter(l => !l.isDeleted);
    res.json({ success: true, count: leads.length, data: leads });
  });

  router.post('/leads/:id/evaluate-bant', (req, res) => {
    try {
      const scoredLead = leadService.scoreAndQualifyLead(req.params.id, req.body, 'usr_marcus_vance');
      res.json({ success: true, data: scoredLead });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.post('/leads/:id/convert', (req, res) => {
    try {
      const result = leadService.convertLead(req.params.id, req.body, 'usr_marcus_vance');
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.get('/opportunities', (req, res) => {
    const opps = Array.from(db.opportunities.values()).filter(o => !o.isDeleted);
    res.json({ success: true, count: opps.length, data: opps });
  });

  router.get('/opportunities/pipeline-forecast', (req, res) => {
    const forecast = pipelineService.generatePipelineForecast('pipe_enterprise_direct');
    res.json({ success: true, data: forecast });
  });

  router.post('/opportunities/:id/transition-gate', (req, res) => {
    try {
      const { targetStage } = req.body;
      const check = pipelineService.validateStageTransition(req.params.id, targetStage, 'usr_marcus_vance');
      res.json({ success: true, data: check });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // CPQ & Pricing
  router.get('/cpq/products', (req, res) => {
    const products = Array.from(db.products.values());
    res.json({ success: true, count: products.length, data: products });
  });

  router.get('/cpq/price-books', (req, res) => {
    const pbs = Array.from(db.priceBooks.values());
    res.json({ success: true, count: pbs.length, data: pbs });
  });

  router.post('/cpq/quotes/calculate', (req, res) => {
    try {
      const quoteResult = cpqEngine.generateQuote(req.body, 'usr_marcus_vance');
      res.json({ success: true, data: quoteResult });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // Helpdesk Tickets
  router.get('/helpdesk/tickets', (req, res) => {
    const tickets = Array.from(db.tickets.values());
    res.json({ success: true, count: tickets.length, data: tickets });
  });

  router.post('/helpdesk/tickets/:id/comments', (req, res) => {
    try {
      const { content } = req.body;
      const updated = helpdeskService.addAgentComment(
        req.params.id,
        'usr_support_agent',
        'Sarah Jenkins',
        'Senior Escalation Engineer',
        content,
        false
      );
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // Marketing & Campaigns
  router.get('/marketing/campaigns', (req, res) => {
    const campaigns = Array.from(db.campaigns.values());
    res.json({ success: true, count: campaigns.length, data: campaigns });
  });

  router.get('/marketing/attribution', (req, res) => {
    const { opportunityId, model } = req.query;
    const oppId = (opportunityId as string) || 'opp_horizon_ehr_expansion';
    const attrModel = (model as any) || 'LINEAR';
    const attr = marketingService.calculateOpportunityAttribution(oppId, attrModel);
    res.json({ success: true, data: attr });
  });

  // Workflows & Custom Schemas
  router.get('/workflows', (req, res) => {
    const wfs = Array.from(db.workflowRules.values());
    res.json({ success: true, count: wfs.length, data: wfs });
  });

  router.get('/schemas/custom-fields', (req, res) => {
    const fields = Array.from(db.customFields.values());
    res.json({ success: true, count: fields.length, data: fields });
  });

  // Analytics BI & Leaderboard
  router.get('/analytics/kpis', (req, res) => {
    const kpis = analyticsService.getExecutiveKPIs('tenant_apex_global_001');
    res.json({ success: true, data: kpis });
  });

  router.get('/analytics/leaderboard', (req, res) => {
    const leaderboard = analyticsService.getSalesQuotaAttainment('tenant_apex_global_001');
    res.json({ success: true, data: leaderboard });
  });

  // Security Audit Logs
  router.get('/audit/logs', (req, res) => {
    const logs = db.auditLogs.slice(-100).reverse();
    const integrity = securityService.verifyAuditChainIntegrity();
    res.json({ success: true, integrity, count: logs.length, data: logs });
  });

  // System Health
  router.get('/health', (req, res) => {
    res.json({
      status: 'HEALTHY',
      service: 'ApexCore Enterprise CRM Platform',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      entities: {
        users: db.users.size,
        customers: db.customers.size,
        contacts: db.contacts.size,
        leads: db.leads.size,
        opportunities: db.opportunities.size,
        quotes: db.quotes.size,
        tickets: db.tickets.size,
        campaigns: db.campaigns.size,
        workflows: db.workflowRules.size
      }
    });
  });

  return router;
}
