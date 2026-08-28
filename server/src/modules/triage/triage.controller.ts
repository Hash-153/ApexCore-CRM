import { TriageService } from './triage.service.ts';

export class TriageController {
  public static recordVitals(req: Request, res: Response): void {
    try {
      const nurseId = req.user?.id || 'NURSE-202';
      const nurseName = req.user?.name || 'Robert Vance, RN';

      const vitals = TriageService.recordVitals({
        ...req.body,
        recordedById: nurseId,
        recordedByName: nurseName,
      });

      res.status(201).json({ success: true, data: vitals });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static assessTriage(req: Request, res: Response): void {
    try {
      const nurseId = req.user?.id || 'NURSE-202';
      const nurseName = req.user?.name || 'Robert Vance, RN';

      const result = TriageService.assessTriage({
        ...req.body,
        nurseId,
        nurseName,
      });

      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static getTriageQueue(req: Request, res: Response): void {
    const queue = TriageService.getTriageQueue();
    res.json({ success: true, count: queue.length, data: queue });
  }
}
