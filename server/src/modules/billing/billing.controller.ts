import { BillingService } from './billing.service.ts';

export class BillingController {
  public static getIcd10(req: Request, res: Response): void {
    const q = req.query.q as string;
    const results = BillingService.getIcd10Catalog(q);
    res.json({ success: true, count: results.length, data: results });
  }

  public static getCpt(req: Request, res: Response): void {
    const q = req.query.q as string;
    const results = BillingService.getCptCatalog(q);
    res.json({ success: true, count: results.length, data: results });
  }

  public static listClaims(req: Request, res: Response): void {
    const patientId = req.query.patientId as string;
    const status = req.query.status as string;
    const claims = BillingService.listClaims({ patientId, status });
    res.json({ success: true, count: claims.length, data: claims });
  }

  public static createSuperbill(req: Request, res: Response): void {
    try {
      const providerNpi = req.user?.npiNumber || '1942857291';
      const providerName = req.user?.name || 'Dr. Sarah Mitchell, MD';

      const claim = BillingService.createSuperbill({
        ...req.body,
        providerNpi,
        providerName,
      });

      res.status(201).json({ success: true, data: claim });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static getCms1500(req: Request, res: Response): void {
    try {
      const payload = BillingService.generateCms1500Payload(req.params.id);
      res.json({ success: true, data: payload });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  }
}
