import { TelehealthService } from './telehealth.service.ts';

export class TelehealthController {
  public static list(req: Request, res: Response): void {
    const patientId = req.query.patientId as string;
    const physicianId = req.query.physicianId as string;
    const sessions = TelehealthService.listSessions({ patientId, physicianId });
    res.json({ success: true, count: sessions.length, data: sessions });
  }

  public static schedule(req: Request, res: Response): void {
    try {
      const physicianId = req.user?.id || 'DOC-101';
      const physicianName = req.user?.name || 'Dr. Sarah Mitchell, MD';

      const session = TelehealthService.scheduleSession({
        ...req.body,
        physicianId,
        physicianName,
      });

      res.status(201).json({ success: true, data: session });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static enterWaiting(req: Request, res: Response): void {
    try {
      const session = TelehealthService.enterWaitingRoom(req.params.id);
      res.json({ success: true, data: session });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static startCall(req: Request, res: Response): void {
    try {
      const session = TelehealthService.startCall(req.params.id);
      res.json({ success: true, data: session });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static complete(req: Request, res: Response): void {
    try {
      const { summary, followUpPlan } = req.body;
      const session = TelehealthService.completeSession(req.params.id, summary, followUpPlan);
      res.json({ success: true, data: session });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
