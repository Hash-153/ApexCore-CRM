import path from 'path';

// Load environment variables cleanly using Node native loader
try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile();
  }
} catch {
  // .env file is optional in test/dev with safe defaults
}

export interface AppConfig {
  env: 'development' | 'production' | 'test';
  port: number;
  clientPort: number;
  apiPrefix: string;
  corsOrigin: string;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  security: {
    phiEncryptionKey: string;
    phiSalt: string;
  };
  hipaa: {
    enableAuditLogging: boolean;
    auditLogLevel: 'info' | 'warn' | 'error' | 'debug';
    auditStoragePath: string;
    retentionDays: number;
  };
  clinical: {
    criticalVitalsAlerts: boolean;
    drugInteractionStrictCheck: boolean;
    defaultTriageSystem: 'ESI' | 'NEWS2' | 'MANCHESTER';
    limsCriticalAlertDispatch: boolean;
  };
  telehealth: {
    signalingEnabled: boolean;
    maxWaitingRoomCapacity: number;
    sessionTimeoutMinutes: number;
  };
}

export const config: AppConfig = {
  env: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  clientPort: parseInt(process.env.CLIENT_PORT || '3000', 10),
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  jwt: {
    secret: process.env.JWT_SECRET_KEY || 'default_medicore_secure_development_jwt_secret_key_32chars',
    expiresIn: process.env.JWT_EXPIRATION || '8h',
  },
  security: {
    phiEncryptionKey: process.env.PHI_ENCRYPTION_KEY || 'medicore_default_phi_encryption_token_key',
    phiSalt: process.env.PHI_DEIDENTIFICATION_SALT || 'hipaa_safe_harbor_default_salt_2026',
  },
  hipaa: {
    enableAuditLogging: process.env.ENABLE_AUDIT_LOGGING !== 'false',
    auditLogLevel: (process.env.AUDIT_LOG_LEVEL as 'info' | 'warn' | 'error') || 'info',
    auditStoragePath: process.env.AUDIT_STORAGE_PATH || path.resolve(process.cwd(), 'logs', 'hipaa_audit.log'),
    retentionDays: 2190, // 6 years standard HIPAA record retention rule
  },
  clinical: {
    criticalVitalsAlerts: true,
    drugInteractionStrictCheck: true,
    defaultTriageSystem: 'ESI',
    limsCriticalAlertDispatch: process.env.LIMS_CRITICAL_ALERT_DISPATCH !== 'false',
  },
  telehealth: {
    signalingEnabled: process.env.TELEHEALTH_SIGNALING_ENABLED !== 'false',
    maxWaitingRoomCapacity: parseInt(process.env.MAX_WAITING_ROOM_CAPACITY || '50', 10),
    sessionTimeoutMinutes: 45,
  },
};
