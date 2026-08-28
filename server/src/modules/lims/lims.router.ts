import { Router } from 'express';
import { LimsController } from './lims.controller.ts';
import { authorize } from '../../security/authMiddleware.ts';

const router = Router();

router.get('/panels', authorize('DIAGNOSTIC_LABS', 'READ'), LimsController.listPanels);
router.get('/orders', authorize('DIAGNOSTIC_LABS', 'READ'), LimsController.listOrders);
router.post('/orders', authorize('DIAGNOSTIC_LABS', 'CREATE'), LimsController.orderPanel);
router.patch('/orders/:id/status', authorize('DIAGNOSTIC_LABS', 'UPDATE'), LimsController.updateStatus);
router.post('/orders/:id/results', authorize('DIAGNOSTIC_LABS', 'UPDATE'), LimsController.enterResults);

export default router;
