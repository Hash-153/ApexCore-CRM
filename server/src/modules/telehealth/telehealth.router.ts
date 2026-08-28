import { Router } from 'express';
import { TelehealthController } from './telehealth.controller.ts';
import { authorize } from '../../security/authMiddleware.ts';

const router = Router();

router.get('/', authorize('TELEHEALTH_SESSION', 'READ'), TelehealthController.list);
router.post('/schedule', authorize('TELEHEALTH_SESSION', 'CREATE'), TelehealthController.schedule);
router.post('/:id/waiting', authorize('TELEHEALTH_SESSION', 'UPDATE'), TelehealthController.enterWaiting);
router.post('/:id/start', authorize('TELEHEALTH_SESSION', 'UPDATE'), TelehealthController.startCall);
router.post('/:id/complete', authorize('TELEHEALTH_SESSION', 'UPDATE'), TelehealthController.complete);

export default router;
