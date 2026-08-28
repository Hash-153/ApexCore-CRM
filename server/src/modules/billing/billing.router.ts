import { Router } from 'express';
import { BillingController } from './billing.controller.ts';
import { authorize } from '../../security/authMiddleware.ts';

const router = Router();

router.get('/icd10', authorize('BILLING_CLAIMS', 'READ'), BillingController.getIcd10);
router.get('/cpt', authorize('BILLING_CLAIMS', 'READ'), BillingController.getCpt);
router.get('/claims', authorize('BILLING_CLAIMS', 'READ'), BillingController.listClaims);
router.post('/superbills', authorize('BILLING_CLAIMS', 'CREATE'), BillingController.createSuperbill);
router.get('/claims/:id/cms1500', authorize('BILLING_CLAIMS', 'EXPORT'), BillingController.getCms1500);

export default router;
