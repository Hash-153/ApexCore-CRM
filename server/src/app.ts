/**
 * MediCore HealthOS - Core Express Application
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config/index.ts';
import { authenticate } from './security/authMiddleware.ts';

// Subsystem Routers
import patientRouter from './modules/patient/patient.router.ts';
import clinicalRouter from './modules/clinical/clinical.router.ts';
import triageRouter from './modules/triage/triage.router.ts';
import pharmacyRouter from './modules/pharmacy/pharmacy.router.ts';
import limsRouter from './modules/lims/lims.router.ts';
import telehealthRouter from './modules/telehealth/telehealth.router.ts';
import billingRouter from './modules/billing/billing.router.ts';
import analyticsRouter from './modules/analytics/analytics.router.ts';
import auditRouter from './modules/audit/audit.router.ts';
import radiologyRouter from './radiology/radiology.router.ts';
import inpatientRouter from './inpatient/inpatient.router.ts';
import emarRouter from './emar/emar.router.ts';

export const app = express();

// Security & Parsing Middleware
app.use(
  cors({
    origin: '*', // Allows seamless development between Vite client and API
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-MediCore-Role', 'X-Access-Reason'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Principal & Session Authentication Middleware
app.use(authenticate);

// Health & System Info
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'HEALTHY',
    service: 'MediCore HealthOS API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    standardsSupported: ['HL7 FHIR R4', 'HIPAA 45 CFR 164', 'ICD-10-CM', 'CPT-4', 'ESI v4', 'NEWS2'],
  });
});

app.get(`${config.apiPrefix}/health`, (req: Request, res: Response) => {
  res.json({
    status: 'HEALTHY',
    service: 'MediCore HealthOS API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use(`${config.apiPrefix}/patients`, patientRouter);
app.use(`${config.apiPrefix}/clinical`, clinicalRouter);
app.use(`${config.apiPrefix}/triage`, triageRouter);
app.use(`${config.apiPrefix}/pharmacy`, pharmacyRouter);
app.use(`${config.apiPrefix}/lims`, limsRouter);
app.use(`${config.apiPrefix}/telehealth`, telehealthRouter);
app.use(`${config.apiPrefix}/billing`, billingRouter);
app.use(`${config.apiPrefix}/analytics`, analyticsRouter);
app.use(`${config.apiPrefix}/audit`, auditRouter);
app.use(`${config.apiPrefix}/radiology`, radiologyRouter);
app.use(`${config.apiPrefix}/inpatient`, inpatientRouter);
app.use(`${config.apiPrefix}/emar`, emarRouter);

// 404 Route Catch-All
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler with PHI Protection
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[UNHANDLED ERROR]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    requestId: `REQ-${Date.now()}`,
  });
});
