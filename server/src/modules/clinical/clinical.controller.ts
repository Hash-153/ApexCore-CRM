import { ClinicalService } from './clinical.service.ts';

export class ClinicalController {
  public static listEncounters(req: Request, res: Response): void {
    const patientId = req.query.patientId as string;
    const status = req.query.status as string;
    const encounters = ClinicalService.listEncounters({ patientId, status });
    res.json({ success: true, count: encounters.length, data: encounters });
  }

  public static getEncounter(req: Request, res: Response): void {
    const encounter = ClinicalService.getEncounterById(req.params.id);
    if (!encounter) {
      res.status(404).json({ success: false, error: 'Encounter not found' });
      return;
    }
    res.json({ success: true, data: encounter });
  }

  public static createEncounter(req: Request, res: Response): void {
    try {
      const physicianId = req.user?.id || 'DOC-101';
      const physicianName = req.user?.name || 'Dr. Sarah Mitchell, MD';

      const encounter = ClinicalService.createEncounter({
        ...req.body,
        physicianId,
        physicianName,
      });
      res.status(201).json({ success: true, data: encounter });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static saveSoapNote(req: Request, res: Response): void {
    try {
      const result = ClinicalService.saveSoapNote(req.params.id, req.body);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static calcNews2(req: Request, res: Response): void {
    try {
      const result = ClinicalService.calculateNews2(req.body);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static calcEgfr(req: Request, res: Response): void {
    try {
      const { creatinineMgDl, ageYears, gender } = req.body;
      const result = ClinicalService.calculateEGFR(Number(creatinineMgDl), Number(ageYears), gender);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static calcChadsvasc(req: Request, res: Response): void {
    try {
      const result = ClinicalService.calculateCHA2DS2VASc(req.body);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public static calcPediatricDosing(req: Request, res: Response): void {
    try {
      const result = ClinicalService.calculatePediatricDosing(req.body);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
