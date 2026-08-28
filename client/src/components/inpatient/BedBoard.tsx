import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { InpatientBed, SbarHandoff, PatientRecord } from '../../types/index';
import {
  Bed,
  Sparkles,
  UserPlus,
  LogOut,
  AlertTriangle,
  FileText,
  CheckCircle2,
  ShieldAlert,
  Activity,
  Heart,
  Plus,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface BedBoardProps {
  activePatient: PatientRecord | null;
}

export const BedBoard: React.FC<BedBoardProps> = ({ activePatient }) => {
  const { currentUser } = useAuth();
  const [beds, setBeds] = useState<InpatientBed[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>('ALL');
  const [showHandoffModal, setShowHandoffModal] = useState<boolean>(false);
  const [selectedBedForHandoff, setSelectedBedForHandoff] = useState<InpatientBed | null>(null);

  // SBAR Form
  const [situation, setSituation] = useState('');
  const [background, setBackground] = useState('');
  const [assessment, setAssessment] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [codeStatus, setCodeStatus] = useState<'FULL_CODE' | 'DNR' | 'DNI' | 'COMFORT_CARE'>('FULL_CODE');
  const [admitDiagnosis, setAdmitDiagnosis] = useState('');

  useEffect(() => {
    loadBeds();
  }, [selectedUnit]);

  const loadBeds = async () => {
    try {
      const data = await api.getInpatientBeds(selectedUnit === 'ALL' ? undefined : selectedUnit);
      setBeds(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignBed = async (bed: InpatientBed) => {
    if (!activePatient) {
      alert('Please select an active patient from the top patient banner first.');
      return;
    }
    try {
      await api.assignInpatientBed(bed.id, activePatient.id, activePatient.fullName);
      loadBeds();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDischargeBed = async (bedId: string) => {
    try {
      await api.dischargeInpatientBed(bedId);
      loadBeds();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCleanBed = async (bedId: string) => {
    try {
      await api.cleanInpatientBed(bedId);
      loadBeds();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCreateSbar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBedForHandoff?.currentPatientId) return;

    try {
      await api.createSbarHandoff({
        patientId: selectedBedForHandoff.currentPatientId,
        codeStatus,
        admitDiagnosis: admitDiagnosis || 'Inpatient Admission',
        situation,
        background,
        assessment,
        recommendation,
      });
      setShowHandoffModal(false);
      alert('SBAR Shift Handoff documented and stored in EHR.');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const occupiedCount = beds.filter((b) => b.status === 'OCCUPIED').length;
  const availableCount = beds.filter((b) => b.status === 'AVAILABLE').length;
  const cleaningCount = beds.filter((b) => b.status === 'CLEANING_REQUIRED').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Bed className="h-5 w-5 text-indigo-400" />
            <span>Inpatient Bed Management & SBAR Nurse Shift Handoff</span>
          </h1>
          <p className="text-xs text-slate-400">
            Real-time unit census tracking, isolation protocols (Airborne/Contact), and SBAR clinical handoffs.
          </p>
        </div>

        {/* Unit Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="bg-slate-950 text-xs text-white px-3 py-2 rounded-xl border border-slate-800 font-semibold"
          >
            <option value="ALL">All Hospital Wards</option>
            <option value="ICU-4N">ICU (4-North)</option>
            <option value="TEL-5E">Telemetry (5-East)</option>
            <option value="MED-3W">Med-Surg (3-West)</option>
          </select>
        </div>
      </div>

      {/* Bed Status Summary Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Occupied Beds</span>
            <span className="text-xl font-extrabold text-white font-mono">{occupiedCount}</span>
          </div>
          <span className="h-3 w-3 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Available Beds</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">{availableCount}</span>
          </div>
          <span className="h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Cleaning / Turnover</span>
            <span className="text-xl font-extrabold text-amber-400 font-mono">{cleaningCount}</span>
          </div>
          <span className="h-3 w-3 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
        </div>
      </div>

      {/* Bed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {beds.map((bed) => (
          <div
            key={bed.id}
            className={`p-5 rounded-2xl border transition shadow-lg ${
              bed.status === 'OCCUPIED'
                ? 'bg-slate-900 border-slate-800'
                : bed.status === 'AVAILABLE'
                ? 'bg-emerald-950/20 border-emerald-800/60'
                : 'bg-amber-950/20 border-amber-800/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 block font-mono">{bed.unitName}</span>
                <h3 className="text-base font-extrabold text-white">
                  Room {bed.roomNumber} - {bed.bedLabel}
                </h3>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold font-mono uppercase ${
                  bed.status === 'OCCUPIED'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : bed.status === 'AVAILABLE'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}
              >
                {bed.status.replace('_', ' ')}
              </span>
            </div>

            {/* Occupant Details or Empty State */}
            <div className="my-4 py-3 border-y border-slate-800/80 text-xs">
              {bed.status === 'OCCUPIED' ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Patient:</span>
                    <strong className="text-white">{bed.currentPatientName}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Assigned Nurse:</span>
                    <span className="text-sky-300 font-mono text-[11px]">{bed.assignedNurseName || 'Primary RN'}</span>
                  </div>
                  {bed.isolationRequired !== 'STANDARD' && (
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] mt-2">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      <span>{bed.isolationRequired} ISOLATION PROTOCOL</span>
                    </div>
                  )}
                </div>
              ) : bed.status === 'CLEANING_REQUIRED' ? (
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Terminal cleaning required before next admission</span>
                </div>
              ) : (
                <div className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Ready for admission / transfer</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              {bed.status === 'AVAILABLE' && (
                <button
                  onClick={() => handleAssignBed(bed)}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Assign Active Patient</span>
                </button>
              )}

              {bed.status === 'OCCUPIED' && (
                <>
                  <button
                    onClick={() => {
                      setSelectedBedForHandoff(bed);
                      setShowHandoffModal(true);
                    }}
                    className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>SBAR Handoff</span>
                  </button>
                  <button
                    onClick={() => handleDischargeBed(bed.id)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-xl border border-slate-700 transition"
                    title="Discharge Bed"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </>
              )}

              {bed.status === 'CLEANING_REQUIRED' && (
                <button
                  onClick={() => handleCleanBed(bed.id)}
                  className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Mark Cleaning Complete</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SBAR Handoff Modal */}
      {showHandoffModal && selectedBedForHandoff && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-400" />
                  <span>SBAR Nursing Shift Handoff Documentation</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedBedForHandoff.currentPatientName} (Room {selectedBedForHandoff.roomNumber})
                </p>
              </div>
              <button onClick={() => setShowHandoffModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSbar} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Code Status</label>
                  <select
                    value={codeStatus}
                    onChange={(e) => setCodeStatus(e.target.value as any)}
                    className="w-full bg-slate-950 text-xs text-white p-2 rounded-xl border border-slate-800"
                  >
                    <option value="FULL_CODE">FULL CODE (Resuscitate)</option>
                    <option value="DNR">DNR (Do Not Resuscitate)</option>
                    <option value="DNI">DNI (Do Not Intubate)</option>
                    <option value="COMFORT_CARE">Comfort Care Only</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Admit Diagnosis</label>
                  <input
                    type="text"
                    value={admitDiagnosis}
                    onChange={(e) => setAdmitDiagnosis(e.target.value)}
                    placeholder="e.g. Sepsis secondary to UTI"
                    className="w-full bg-slate-950 text-xs text-white p-2 rounded-xl border border-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-indigo-400 block mb-1">S - Situation</label>
                <textarea
                  rows={2}
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="Immediate clinical state, acute changes during shift..."
                  className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-indigo-400 block mb-1">B - Background</label>
                <textarea
                  rows={2}
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="Pertinent medical history, surgical procedures, allergies..."
                  className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-indigo-400 block mb-1">A - Assessment</label>
                <textarea
                  rows={2}
                  value={assessment}
                  onChange={(e) => setAssessment(e.target.value)}
                  placeholder="Vital trends, IV lines (site/gauge), telemetry rhythm, lab anomalies..."
                  className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-indigo-400 block mb-1">R - Recommendation</label>
                <textarea
                  rows={2}
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  placeholder="Pending morning labs, scheduled IV titrations, provider follow-up..."
                  className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowHandoffModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30"
                >
                  Save & Sign SBAR Handoff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
