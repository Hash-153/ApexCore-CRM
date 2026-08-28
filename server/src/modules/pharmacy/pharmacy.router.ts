import { Router } from 'express';
import { PharmacyController } from './pharmacy.controller.ts';
import { authorize } from '../../security/authMiddleware.ts';

const router = Router();

router.get('/', authorize('PRESCRIPTIONS', 'READ'), PharmacyController.list);
router.post('/check-safety', authorize('PRESCRIPTIONS', 'READ'), PharmacyController.checkSafety);
router.post('/', authorize('PRESCRIPTIONS', 'CREATE'), PharmacyController.create);
router.put('/:id/dispense', authorize('PRESCRIPTIONS', 'UPDATE'), PharmacyController.dispense);

export default router;
