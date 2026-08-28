import { Router } from 'express';
import { TriageController } from './triage.controller.ts';
import { authorize } from '../../security/authMiddleware.ts';

const router = Router();

router.post('/vitals', authorize('VITALS_MEASUREMENTS', 'CREATE'), TriageController.recordVitals);
router.post('/assess', authorize('VITALS_MEASUREMENTS', 'CREATE'), TriageController.assessTriage);
router.get('/queue', authorize('VITALS_MEASUREMENTS', 'READ'), TriageController.getTriageQueue);

export default router;
