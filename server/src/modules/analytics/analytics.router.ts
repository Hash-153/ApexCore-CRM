import { Router } from 'express';
import { AnalyticsController } from './analytics.controller.ts';

const router = Router();

// Hospital executive dashboard metrics
router.get('/kpis', AnalyticsController.getKPIs);

export default router;
