import { PharmacyService } from './pharmacy.service.ts';

export class PharmacyController {
  public static list(req: Request, res: Response): void {
    const patientId = req.query.patientId as string;
    const status = req.query.status as string;
    const prescriptions = PharmacyService.listPrescriptions({ patientId, status });
    res.json({ success: true, count: prescriptions.length, data: prescriptions });
  }

  public static checkSafety(req: Request, res: Response): void {
    try {
      const { patientId, proposedMedication } = req.body;
      const result = PharmacyService.checkSafety(patientId, proposedMedication);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static create(req: Request, res: Response): void {
    try {
      const prescribedById = req.user?.id || 'DOC-101';
      const prescribedByName = req.user?.name || 'Dr. Sarah Mitchell, MD';

      const result = PharmacyService.createPrescription({
        ...req.body,
        prescribedById,
        prescribedByName,
      });

      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static dispense(req: Request, res: Response): void {
    try {
      const pharmacistName = req.user?.name || 'Elena Rostova, PharmD';
      const result = PharmacyService.dispensePrescription(req.params.id, pharmacistName);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
