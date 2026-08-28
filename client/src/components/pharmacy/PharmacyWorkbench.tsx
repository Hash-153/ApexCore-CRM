import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { PatientRecord, PrescriptionRecord } from '../../types/index';
import { Pill, ShieldAlert, AlertOctagon, CheckCircle2, Search, Plus, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface PharmacyWorkbenchProps {
  activePatient: PatientRecord | null;
}

export const PharmacyWorkbench: React.FC<PharmacyWorkbenchProps> = ({ activePatient }) => {
  const { currentUser } = useAuth();
  const [prescriptions, setPrescriptions] = useState<PrescriptionRecord[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(activePatient?.id || 'PAT-001');
  const [showNewRxModal, setShowNewRxModal] = useState(false);
  const [safetyCheckResult, setSafetyCheckResult] = useState<any | null>(null);
  const [checkingSafety, setCheckingSafety] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);

  // New Rx form
  const [rxForm, setRxForm] = useState({
    medicationName: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Three times daily with meals',
    route: 'Oral',
    quantity: 30,
    refillsRemaining: 1,
    instructions: 'Take 1 capsule by mouth every 8 hours for 10 days for bacterial infection.',
    overrideJustification: '',
    overrideWarningConsent: false,
  });

  useEffect(() => {
    loadData();
  }, [selectedPatientId]);

  const loadData = async () => {
    try {
      const [rxList, patientList] = await Promise.all([
        api.getPrescriptions(selectedPatientId || undefined),
        api.getPatients(),
      ]);
      setPrescriptions(rxList);
      setPatients(patientList);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTestSafety = async (medName: string) => {
    if (!selectedPatientId || !medName) return;
    try {
      setCheckingSafety(true);
      const res = await api.checkPrescriptionSafety(selectedPatientId, medName);
      setSafetyCheckResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingSafety(false);
    }
  };

  const handleCreatePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.createPrescription({
        patientId: selectedPatientId,
        ...rxForm,
      });

      setShowNewRxModal(false);
      setSafetyCheckResult(null);
      setBanner(`Prescription for ${res.prescription.medicationName} successfully submitted!`);
      setTimeout(() => setBanner(null), 5000);
      loadData();
    } catch (err: any) {
      alert(`Prescription Blocked: ${err.message}`);
    }
  };

  const handleDispense = async (rxId: string) => {
    try {
      const res = await api.dispensePrescription(rxId);
      setBanner(`Prescription ${res.medicationName} marked as DISPENSED.`);
      setTimeout(() => setBanner(null), 5000);
      loadData();
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
            <Pill className="h-5 w-5 text-indigo-400" />
            <span>e-Prescriptions & Pharmacy Management</span>
          </h1>
          <p className="text-xs text-slate-400">
            Real-time drug-drug contraindication matrix, allergy cross-reactivity checks, and dispensing verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="bg-slate-950 text-xs text-white px-3 py-2 rounded-xl border border-slate-700"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} ({p.mrn})
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setShowNewRxModal(true);
              handleTestSafety(rxForm.medicationName);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
          >
            <Plus className="h-4 w-4" />
            <span>New e-Prescription</span>
          </button>
        </div>
      </div>

      {banner && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{banner}</span>
        </div>
      )}

      {/* Prescriptions List */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h2 className="font-bold text-white text-sm">Active & Historic Prescriptions</h2>

        <div className="space-y-3">
          {prescriptions.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No prescriptions found for this patient.</p>
          ) : (
            prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-white text-sm">{rx.medicationName}</h3>
                    <span className="font-mono text-xs text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                      {rx.dosage}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rx.status === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : rx.status === 'DISPENSED'
                          ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {rx.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{rx.instructions}</p>
                  <div className="text-[11px] text-slate-500 flex items-center gap-4">
                    <span>Route: {rx.route}</span>
                    <span>Qty: {rx.quantity}</span>
                    <span>Refills remaining: {rx.refillsRemaining}</span>
                    <span>Prescriber: {rx.prescribedByName}</span>
                  </div>

                  {rx.warningFlags && rx.warningFlags.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1">
                      {rx.warningFlags.map((flag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950/60 text-amber-300 border border-amber-800"
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pharmacist Action Button */}
                {currentUser.role === 'PHARMACIST' && rx.status === 'ACTIVE' && (
                  <button
                    onClick={() => handleDispense(rx.id)}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shrink-0 self-start md:self-auto"
                  >
                    <Check className="h-4 w-4" />
                    <span>Verify & Dispense</span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal: New e-Prescription with Real-Time Clinical Safety Check */}
      {showNewRxModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl p-6 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Pill className="h-5 w-5 text-indigo-400" />
                <span>Author e-Prescription with CDSS Safety Check</span>
              </h3>
              <button onClick={() => setShowNewRxModal(false)} className="text-slate-400 hover:text-white font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePrescription} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Medication Name *</label>
                  <input
                    type="text"
                    required
                    value={rxForm.medicationName}
                    onChange={(e) => {
                      setRxForm({ ...rxForm, medicationName: e.target.value });
                      handleTestSafety(e.target.value);
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Dosage / Strength *</label>
                  <input
                    type="text"
                    required
                    value={rxForm.dosage}
                    onChange={(e) => setRxForm({ ...rxForm, dosage: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                  />
                </div>
              </div>

              {/* Real-time Safety Check HUD */}
              {safetyCheckResult && (
                <div
                  className={`p-3.5 rounded-xl border space-y-2 ${
                    safetyCheckResult.safeToPrescribe
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                      : 'bg-rose-950/50 border-rose-800 text-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      {safetyCheckResult.safeToPrescribe ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <AlertOctagon className="h-4 w-4 text-rose-400 animate-pulse" />
                      )}
                      {safetyCheckResult.safeToPrescribe ? 'Passed Clinical Safety Checks' : 'CRITICAL SAFETY ALERT'}
                    </span>
                  </div>

                  {safetyCheckResult.drugInteractions?.map((ddi: any, i: number) => (
                    <div key={i} className="text-[11px] bg-slate-950/80 p-2 rounded-lg border border-rose-900/60">
                      <strong className="text-rose-400 font-bold">[{ddi.severity}] {ddi.title}</strong>
                      <p className="text-slate-400 mt-0.5">{ddi.clinicalEffect}</p>
                      <p className="text-slate-300 font-medium mt-0.5">{ddi.recommendation}</p>
                    </div>
                  ))}

                  {safetyCheckResult.allergyConflicts?.map((all: any, i: number) => (
                    <div key={i} className="text-[11px] bg-slate-950/80 p-2 rounded-lg border border-rose-900/60">
                      <strong className="text-rose-400 font-bold">[ALLERGY CONFLICT] {all.allergen} ({all.severity})</strong>
                      <p className="text-slate-300 font-medium mt-0.5">{all.recommendation}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Route</label>
                  <input
                    type="text"
                    value={rxForm.route}
                    onChange={(e) => setRxForm({ ...rxForm, route: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Quantity</label>
                  <input
                    type="number"
                    value={rxForm.quantity}
                    onChange={(e) => setRxForm({ ...rxForm, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Refills</label>
                  <input
                    type="number"
                    value={rxForm.refillsRemaining}
                    onChange={(e) => setRxForm({ ...rxForm, refillsRemaining: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Sig / Patient Instructions</label>
                <textarea
                  rows={2}
                  value={rxForm.instructions}
                  onChange={(e) => setRxForm({ ...rxForm, instructions: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              {/* Doctor override if blocked */}
              {safetyCheckResult && !safetyCheckResult.safeToPrescribe && (
                <div className="p-3 bg-amber-950/40 border border-amber-800 rounded-xl space-y-2">
                  <label className="flex items-center gap-2 text-amber-300 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rxForm.overrideWarningConsent}
                      onChange={(e) => setRxForm({ ...rxForm, overrideWarningConsent: e.target.checked })}
                    />
                    <span>Physician Override: Acknowledge high-risk interaction & accept clinical responsibility</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Clinical justification for override (e.g. inpatient cardiac monitor on standby)..."
                    value={rxForm.overrideJustification}
                    onChange={(e) => setRxForm({ ...rxForm, overrideJustification: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-amber-900 rounded-lg text-white"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 transition"
              >
                Sign & Transmit e-Prescription to Pharmacy
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
