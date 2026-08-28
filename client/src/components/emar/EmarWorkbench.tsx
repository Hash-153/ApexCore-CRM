import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { EmarDoseSlot, FiveRightsCheckResult, PatientRecord } from '../../types/index';
import {
  Pill,
  Barcode,
  CheckCircle2,
  AlertOctagon,
  Clock,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Activity,
  Heart,
  Search,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface EmarWorkbenchProps {
  activePatient: PatientRecord | null;
}

export const EmarWorkbench: React.FC<EmarWorkbenchProps> = ({ activePatient }) => {
  const { currentUser } = useAuth();
  const [slots, setSlots] = useState<EmarDoseSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<EmarDoseSlot | null>(null);

  // BCMA Scanning State
  const [scannedPatientBarcode, setScannedPatientBarcode] = useState('');
  const [scannedMedBarcode, setScannedMedBarcode] = useState('');
  const [verificationResult, setVerificationResult] = useState<FiveRightsCheckResult | null>(null);

  // High-Alert Co-Sign Modal State
  const [showCoSignModal, setShowCoSignModal] = useState(false);
  const [coSigningNurseName, setCoSigningNurseName] = useState('Maria Garcia, RN');
  const [preAdminBp, setPreAdminBp] = useState('124/82');
  const [preAdminHr, setPreAdminHr] = useState('76');
  const [preAdminGlucose, setPreAdminGlucose] = useState('118');
  const [siteOfAdmin, setSiteOfAdmin] = useState('Left Deltoid (SubQ)');
  const [nurseNotes, setNurseNotes] = useState('');

  useEffect(() => {
    if (activePatient) {
      loadSlots(activePatient.id);
    }
  }, [activePatient]);

  const loadSlots = async (patientId: string) => {
    try {
      const data = await api.getEmarSlots(patientId);
      setSlots(data);
      if (data.length > 0) {
        selectSlot(data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const selectSlot = (slot: EmarDoseSlot) => {
    setSelectedSlot(slot);
    setVerificationResult(null);
    setScannedPatientBarcode('');
    setScannedMedBarcode('');
  };

  const handleSimulateScanMatch = async () => {
    if (!selectedSlot || !activePatient) return;
    const patBarcode = activePatient.id;
    const medBarcode = selectedSlot.medicationName;
    setScannedPatientBarcode(patBarcode);
    setScannedMedBarcode(medBarcode);

    try {
      const result = await api.verifyEmarFiveRights({
        scannedPatientBarcode: patBarcode,
        expectedPatientId: activePatient.id,
        scannedMedicationBarcode: medBarcode,
        expectedMedicationName: selectedSlot.medicationName,
        doseSlot: selectedSlot,
      });
      setVerificationResult(result);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleAdministerMed = async (status: 'GIVEN' | 'HELD' | 'REFUSED') => {
    if (!selectedSlot) return;

    if (selectedSlot.highAlert.requiresDualSignOff && status === 'GIVEN' && !showCoSignModal) {
      setShowCoSignModal(true);
      return;
    }

    try {
      await api.administerEmarMedication({
        slotId: selectedSlot.id,
        status,
        coSigningNurseId: selectedSlot.highAlert.requiresDualSignOff ? 'NURSE-204' : undefined,
        coSigningNurseName: selectedSlot.highAlert.requiresDualSignOff ? coSigningNurseName : undefined,
        siteOfAdministration: siteOfAdmin,
        barcodeVerified: verificationResult?.passed || false,
        vitalsBeforeAdmin: {
          bloodPressure: preAdminBp,
          heartRate: parseInt(preAdminHr, 10),
          bloodGlucose: parseInt(preAdminGlucose, 10),
        },
        nurseNotes,
      });

      setShowCoSignModal(false);
      if (activePatient) loadSlots(activePatient.id);
      alert(`Medication recorded as ${status} in eMAR.`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Pill className="h-5 w-5 text-emerald-400" />
            <span>Electronic Medication Administration Record (eMAR & BCMA)</span>
          </h1>
          <p className="text-xs text-slate-400">
            5 Rights verification (Right Patient, Drug, Dose, Route, Time) and ISMP High-Alert Dual Sign-Off.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-xl font-mono">
            {slots.length} Scheduled Doses
          </span>
        </div>
      </div>

      {/* Main Grid: Schedule Slots + BCMA Verification HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scheduled Doses (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-400" />
            <span>24-Hour Medication Timeline</span>
          </h2>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {slots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => selectSlot(slot)}
                className={`p-4 rounded-xl border text-xs cursor-pointer transition ${
                  selectedSlot?.id === slot.id
                    ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400 font-bold">
                      {slot.scheduledTime.slice(11, 16)}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                      {slot.route}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      slot.status === 'GIVEN'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : slot.status === 'HELD'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {slot.status}
                  </span>
                </div>

                <div className="mt-2">
                  <strong className="text-sm font-bold block text-white">{slot.medicationName}</strong>
                  <span className="text-slate-400">Dose: {slot.dose}</span>
                </div>

                {slot.highAlert.isHighAlert && (
                  <div className="mt-2 flex items-center gap-1.5 text-rose-400 font-bold text-[10px]">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>HIGH-ALERT (Dual Nurse Co-Sign)</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* BCMA Verification & Administration HUD (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          {selectedSlot ? (
            <>
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-extrabold text-white">{selectedSlot.medicationName}</h2>
                  <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-xl font-mono">
                    {selectedSlot.dose} • {selectedSlot.route}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Scheduled for: {selectedSlot.scheduledTime.replace('T', ' ').slice(0, 16)}
                </p>
              </div>

              {/* Barcode Scanner Simulation */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Barcode className="h-4 w-4 text-emerald-400" />
                    <span>Barcode Medication Administration (BCMA)</span>
                  </span>

                  <button
                    onClick={handleSimulateScanMatch}
                    className="px-3 py-1 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-bold transition"
                  >
                    Simulate 2D Scans
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Patient Wristband Scan</label>
                    <input
                      type="text"
                      value={scannedPatientBarcode}
                      onChange={(e) => setScannedPatientBarcode(e.target.value)}
                      placeholder="Scan wristband..."
                      className="w-full bg-slate-900 text-white font-mono p-2 rounded-xl border border-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Medication Unit-Dose Scan</label>
                    <input
                      type="text"
                      value={scannedMedBarcode}
                      onChange={(e) => setScannedMedBarcode(e.target.value)}
                      placeholder="Scan vial/blister..."
                      className="w-full bg-slate-900 text-white font-mono p-2 rounded-xl border border-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* 5 Rights Verification Result */}
              {verificationResult && (
                <div
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    verificationResult.passed
                      ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                      : 'bg-rose-950/60 border-rose-800 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    {verificationResult.passed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <AlertOctagon className="h-5 w-5 text-rose-400" />
                    )}
                    <span>
                      {verificationResult.passed
                        ? '5 Rights Verified: Right Patient, Drug, Dose, Route, Time'
                        : '5 Rights Mismatch Detected — Medication Blocked'}
                    </span>
                  </div>

                  {verificationResult.errors.map((err, i) => (
                    <p key={i} className="text-rose-300 text-[11px]">
                      • {err}
                    </p>
                  ))}
                  {verificationResult.warnings.map((warn, i) => (
                    <p key={i} className="text-amber-300 text-[11px]">
                      • {warn}
                    </p>
                  ))}
                </div>
              )}

              {/* Pre-Administration Vitals Entry */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Pre-Administration Clinical Vitals Check
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500 block">Blood Pressure</label>
                    <input
                      type="text"
                      value={preAdminBp}
                      onChange={(e) => setPreAdminBp(e.target.value)}
                      className="w-full bg-slate-950 text-xs text-white p-2 rounded-xl border border-slate-800 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">Heart Rate (bpm)</label>
                    <input
                      type="text"
                      value={preAdminHr}
                      onChange={(e) => setPreAdminHr(e.target.value)}
                      className="w-full bg-slate-950 text-xs text-white p-2 rounded-xl border border-slate-800 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">Blood Glucose (mg/dL)</label>
                    <input
                      type="text"
                      value={preAdminGlucose}
                      onChange={(e) => setPreAdminGlucose(e.target.value)}
                      className="w-full bg-slate-950 text-xs text-white p-2 rounded-xl border border-slate-800 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Administration Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => handleAdministerMed('GIVEN')}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Administer Dose (Given)</span>
                </button>
                <button
                  onClick={() => handleAdministerMed('HELD')}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-semibold border border-slate-700 transition"
                >
                  Hold Dose
                </button>
                <button
                  onClick={() => handleAdministerMed('REFUSED')}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-xl text-xs font-semibold border border-slate-700 transition"
                >
                  Patient Refused
                </button>
              </div>
            </>
          ) : (
            <div className="text-slate-500 text-center py-16 text-xs">
              Select a scheduled medication dose from the timeline to begin administration.
            </div>
          )}
        </div>
      </div>

      {/* ISMP High-Alert Dual Sign-Off Modal */}
      {showCoSignModal && selectedSlot && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400 border-b border-slate-800 pb-3">
              <ShieldAlert className="h-6 w-6 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-white">ISMP High-Alert Medication Co-Signature</h3>
                <p className="text-xs text-rose-300">Independent double-check required prior to release.</p>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs space-y-1 text-slate-300">
              <p>
                <strong>Medication:</strong> {selectedSlot.medicationName}
              </p>
              <p>
                <strong>Dosage / Route:</strong> {selectedSlot.dose} ({selectedSlot.route})
              </p>
              <p>
                <strong>Administering Nurse:</strong> {currentUser.name}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Co-Signing Registered Nurse
              </label>
              <input
                type="text"
                value={coSigningNurseName}
                onChange={(e) => setCoSigningNurseName(e.target.value)}
                className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800 font-semibold"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowCoSignModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAdministerMed('GIVEN')}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
              >
                <UserCheck className="h-4 w-4" />
                <span>Verify & Complete Dual Sign-Off</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
