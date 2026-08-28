import { Router } from 'express';
import { PatientController } from './patient.controller.ts';
import { authorize } from '../../security/authMiddleware.ts';

const router = Router();

// Routes protected by RBAC and HIPAA audit logging
router.get('/', authorize('PATIENT_DEMOGRAPHICS', 'READ'), PatientController.list);
router.get('/:id', authorize('PATIENT_DEMOGRAPHICS', 'READ'), PatientController.getById);
router.post('/', authorize('PATIENT_DEMOGRAPHICS', 'CREATE'), PatientController.create);
router.get('/:id/fhir', authorize('PATIENT_DEMOGRAPHICS', 'EXPORT'), PatientController.exportFhir);
router.get('/:id/deidentified', authorize('PATIENT_DEMOGRAPHICS', 'EXPORT'), PatientController.exportDeidentified);

export default router;
