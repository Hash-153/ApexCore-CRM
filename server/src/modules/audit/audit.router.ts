import { Router } from 'express';
import { AuditController } from './audit.controller.ts';
import { authorize } from '../../security/authMiddleware.ts';

const router = Router();

// Only SYSTEM_ADMIN or authorized auditors can access HIPAA logs
router.get('/', authorize('HIPAA_AUDIT_LOGS', 'READ'), AuditController.list);
router.get('/verify', authorize('HIPAA_AUDIT_LOGS', 'ADMIN'), AuditController.verifyIntegrity);

export default router;
