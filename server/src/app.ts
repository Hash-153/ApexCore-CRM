/**
 * ApexCore Enterprise CRM - Express Application Server
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config/index.ts';
import { createCRMRouter } from './crm/routes/crmRoutes.ts';
import { CRMDatabase } from './crm/database/crm_database.ts';
import { seedCRMDatabase } from './crm/database/seed_data.ts';

// Initialize In-Memory Database & Enterprise Seed Data
const db = CRMDatabase.getInstance();
seedCRMDatabase(db);

export const app = express();

// Security & Parsing Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-tenant-id', 'x-user-id', 'X-Access-Reason'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health & System Info
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'HEALTHY',
    service: 'ApexCore Enterprise CRM API Platform',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    supportedStandards: ['ApexCore CRM 5-Role RBAC', 'BANT Lead Engine', 'MEDDIC Forecasting', 'CPQ Pricing', 'SLA Helpdesk'],
    entities: {
      users: db.users.size,
      customers: db.customers.size,
      contacts: db.contacts.size,
      leads: db.leads.size,
      opportunities: db.opportunities.size,
      quotes: db.quotes.size,
      tickets: db.tickets.size
    }
  });
});

app.get(`${config.apiPrefix}/health`, (req: Request, res: Response) => {
  res.json({
    status: 'HEALTHY',
    service: 'ApexCore Enterprise CRM API Platform',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Primary CRM Subsystem Router
const crmRouter = createCRMRouter();
app.use('/api', crmRouter);
app.use('/api/crm', crmRouter);
app.use(`${config.apiPrefix}/crm`, crmRouter);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || err.statusCode || 500;
  console.error(`[API ERROR] ${req.method} ${req.path}:`, err.message || err);

  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode,
      timestamp: new Date().toISOString(),
    },
  });
});

// 404 Route Catch-All
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: {
      message: `Resource not found: ${req.method} ${req.path}`,
      status: 404,
      timestamp: new Date().toISOString(),
    },
  });
});
