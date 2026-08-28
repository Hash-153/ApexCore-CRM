import { type UserPrincipal, type UserRole, type HealthcareResource, type AccessAction, AccessControlService } from './rbac.ts';
import { HipaaAuditLogger } from './hipaaAudit.ts';

// Extend Express Request interface to include principal
declare global {
  namespace Express {
    interface Request {
      user?: UserPrincipal;
      accessReason?: string;
    }
  }
}

export const DEMO_USERS: Record<UserRole, UserPrincipal> = {
  PHYSICIAN: {
    id: 'DOC-101',
    name: 'Dr. Sarah Mitchell, MD',
    email: 'dr.mitchell@medicore.health',
    role: 'PHYSICIAN',
    department: 'Internal Medicine & Cardiology',
    npiNumber: '1942857291',
  },
  TRIAGE_NURSE: {
    id: 'NURSE-202',
    name: 'Robert Vance, BSN, RN',
    email: 'r.vance@medicore.health',
    role: 'TRIAGE_NURSE',
    department: 'Emergency & Urgent Triage',
  },
  PHARMACIST: {
    id: 'PHARM-303',
    name: 'Elena Rostova, PharmD, BCPS',
    email: 'e.rostova@medicore.health',
    role: 'PHARMACIST',
    department: 'Clinical Pharmacy Services',
  },
  LAB_TECHNICIAN: {
    id: 'LAB-404',
    name: 'David Chen, MLS (ASCP)',
    email: 'd.chen@medicore.health',
    role: 'LAB_TECHNICIAN',
    department: 'Diagnostic Pathology & Hematology',
  },
  RADIOLOGIST: {
    id: 'RAD-505',
    name: 'Dr. Marcus Holloway, MD, FACR',
    email: 'm.holloway@medicore.health',
    role: 'RADIOLOGIST',
    department: 'Diagnostic Radiology & Imaging',
    npiNumber: '1839201948',
  },
  BILLING_SPECIALIST: {
    id: 'BILL-606',
    name: 'Karen Jenkins, CPB',
    email: 'k.jenkins@medicore.health',
    role: 'BILLING_SPECIALIST',
    department: 'Revenue Cycle & Claims Management',
  },
  SYSTEM_ADMIN: {
    id: 'ADMIN-001',
    name: 'Alexander Cross, CISSP',
    email: 'admin@medicore.health',
    role: 'SYSTEM_ADMIN',
    department: 'Health Informatics & Security',
  },
  PATIENT: {
    id: 'PAT-001-USER',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    role: 'PATIENT',
    patientId: 'PAT-001',
  },
};

/**
 * Authentication & Principal Injection Middleware
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  // Support custom role header for seamless clinical role switching in web UI & testing
  const customRole = req.headers['x-medicore-role'] as UserRole;
  const customReason = (req.headers['x-access-reason'] as string) || 'Standard Clinical Workflow';

  if (customRole && DEMO_USERS[customRole]) {
    req.user = DEMO_USERS[customRole];
    req.accessReason = customReason;
    return next();
  }

  // Default fallback user (Attending Physician)
  req.user = DEMO_USERS.PHYSICIAN;
  req.accessReason = customReason;
  next();
}

/**
 * Authorize middleware checking RBAC permissions and logging HIPAA PHI access
 */
export function authorize(resource: HealthcareResource, action: AccessAction) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Authentication required to access clinical resource.',
      });
    }

    const { allowed, reason } = AccessControlService.isAuthorized(user, resource, action);

    // Audit log every access attempt
    HipaaAuditLogger.log({
      actor: user,
      action,
      resource,
      patientId: req.params.patientId || (req.query.patientId as string) || req.body?.patientId,
      recordId: req.params.id,
      ipAddress: req.ip || req.socket.remoteAddress || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'API-Client',
      accessReason: req.accessReason || 'Clinical Operation',
      status: allowed ? 'SUCCESS' : 'DENIED',
    });

    if (!allowed) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: Insufficient privileges under HIPAA Security Standard.',
        details: reason,
      });
    }

    next();
  };
}
