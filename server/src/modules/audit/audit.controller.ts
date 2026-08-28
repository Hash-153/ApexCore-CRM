import { AuditService } from './audit.service.ts';

export class AuditController {
  public static list(req: Request, res: Response): void {
    const actorId = req.query.actorId as string;
    const patientId = req.query.patientId as string;
    const resource = req.query.resource as any;
    const status = req.query.status as any;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 50;

    const events = AuditService.queryAuditLogs({
      actorId,
      patientId,
      resource,
      status,
      limit,
    });

    res.json({ success: true, count: events.length, data: events });
  }

  public static verifyIntegrity(req: Request, res: Response): void {
    const report = AuditService.verifyChainIntegrity();
    res.json({ success: true, data: report });
  }
}
