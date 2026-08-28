import { LimsService, STANDARD_PANEL_TEMPLATES } from './lims.service.ts';

export class LimsController {
  public static listPanels(req: Request, res: Response): void {
    const panels = Object.keys(STANDARD_PANEL_TEMPLATES).map((name) => ({
      name,
      specimenType: STANDARD_PANEL_TEMPLATES[name].specimenType,
      testsCount: STANDARD_PANEL_TEMPLATES[name].tests.length,
      tests: STANDARD_PANEL_TEMPLATES[name].tests,
    }));
    res.json({ success: true, data: panels });
  }

  public static listOrders(req: Request, res: Response): void {
    const patientId = req.query.patientId as string;
    const status = req.query.status as string;
    const orders = LimsService.listOrders({ patientId, status });
    res.json({ success: true, count: orders.length, data: orders });
  }

  public static orderPanel(req: Request, res: Response): void {
    try {
      const orderedById = req.user?.id || 'DOC-101';
      const orderedByName = req.user?.name || 'Dr. Sarah Mitchell, MD';

      const order = LimsService.orderPanel({
        ...req.body,
        orderedById,
        orderedByName,
      });

      res.status(201).json({ success: true, data: order });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static updateStatus(req: Request, res: Response): void {
    try {
      const { status } = req.body;
      const updated = LimsService.updateSpecimenStatus(req.params.id, status);
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static enterResults(req: Request, res: Response): void {
    try {
      const { testResults, technicianNotes } = req.body;
      const finalized = LimsService.enterResults(req.params.id, testResults, technicianNotes);
      res.json({ success: true, data: finalized });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
