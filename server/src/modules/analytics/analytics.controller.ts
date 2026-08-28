import { AnalyticsService } from './analytics.service.ts';

export class AnalyticsController {
  public static getKPIs(req: Request, res: Response): void {
    const kpis = AnalyticsService.getExecutiveKPIs();
    res.json({ success: true, data: kpis });
  }
}
