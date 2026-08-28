/**
 * MediCore HealthOS - Server Entrypoint
 */

import { app } from './app.ts';
import { config } from './config/index.ts';

const server = app.listen(config.port, () => {
  console.log(`================================================================`);
  console.log(`  MediCore HealthOS - Enterprise Clinical Platform v1.0.0      `);
  console.log(`  Port: ${config.port} | Mode: ${config.env}                   `);
  console.log(`  API Prefix: ${config.apiPrefix}                              `);
  console.log(`  HIPAA Audit Logging: ${config.hipaa.enableAuditLogging ? 'ENABLED (Tamper-evident)' : 'DISABLED'} `);
  console.log(`  FHIR R4 Conformance: ACTIVE                                   `);
  console.log(`================================================================`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('[SYSTEM] SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('[SYSTEM] Server stopped.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[SYSTEM] SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('[SYSTEM] Server stopped.');
    process.exit(0);
  });
});
