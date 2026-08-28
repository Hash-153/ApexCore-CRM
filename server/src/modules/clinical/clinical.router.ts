import { Router } from 'express';
import { ClinicalController } from './clinical.controller.ts';
import { authorize } from '../../security/authMiddleware.ts';

const router = Router();

// Encounter endpoints
router.get('/encounters', authorize('CLINICAL_NOTES', 'READ'), ClinicalController.listEncounters);
router.get('/encounters/:id', authorize('CLINICAL_NOTES', 'READ'), ClinicalController.getEncounter);
router.post('/encounters', authorize('CLINICAL_NOTES', 'CREATE'), ClinicalController.createEncounter);
router.post('/encounters/:id/soap', authorize('CLINICAL_NOTES', 'CREATE'), ClinicalController.saveSoapNote);

// Clinical Calculators (Accessible to all clinicians)
router.post('/calculators/news2', ClinicalController.calcNews2);
router.post('/calculators/egfr', ClinicalController.calcEgfr);
router.post('/calculators/chadsvasc', ClinicalController.calcChadsvasc);
router.post('/calculators/pediatric-dosing', ClinicalController.calcPediatricDosing);

export default router;
