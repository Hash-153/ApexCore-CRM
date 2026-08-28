import { PatientService } from './patient.service.ts';

export class PatientController {
  public static list(req: Request, res: Response): void {
    const query = req.query.q as string;
    const patients = PatientService.listPatients(query);
    res.json({ success: true, count: patients.length, data: patients });
  }

  public static getById(req: Request, res: Response): void {
    const patient = PatientService.getPatientById(req.params.id);
    if (!patient) {
      res.status(404).json({ success: false, error: 'Patient not found' });
      return;
    }
    res.json({ success: true, data: patient });
  }

  public static create(req: Request, res: Response): void {
    try {
      const patient = PatientService.createPatient(req.body);
      res.status(201).json({ success: true, data: patient });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || 'Failed to create patient' });
    }
  }

  public static exportFhir(req: Request, res: Response): void {
    const fhir = PatientService.exportAsFhir(req.params.id);
    if (!fhir) {
      res.status(404).json({ success: false, error: 'Patient not found' });
      return;
    }
    res.json(fhir);
  }

  public static exportDeidentified(req: Request, res: Response): void {
    const deidentified = PatientService.exportDeidentified(req.params.id);
    if (!deidentified) {
      res.status(404).json({ success: false, error: 'Patient not found' });
      return;
    }
    res.json({ success: true, data: deidentified });
  }
}
