import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { PatientRecord } from '../../types/index';
import { Flame, Activity, Plus, Heart, User, CheckCircle2 } from 'lucide-react';
import type { NavTab } from '../layout/Sidebar';

interface TriageBoardProps {
  onSelectPatient: (patient: PatientRecord) => void;
  onNavigate: (tab: NavTab) => void;
}

export const TriageBoard: React.FC<TriageBoardProps> = ({ onSelectPatient, onNavigate }) => {
  const [queue, setQueue] = useState<any[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('PAT-001');
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [showTriageModal, setShowTriageModal] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Vitals form
  const [vitals, setVitals] = useState({
    systolicBP: 130,
    diastolicBP: 85,
    heartRate: 76,
    respiratoryRate: 18,
    spO2: 97,
    temperatureCelsius: 37.0,
    bloodGlucoseMgDl: 110,
    painScale: 3,
    supplementalOxygen: false,
    consciousness: 'ALERT' as const,
  });

  // Triage assessment form
  const [triageForm, setTriageForm] = useState({
    chiefComplaint: 'Acute onset moderate chest discomfort and lightheadedness',
    requiresImmediateLifeSaving: false,
    isHighRiskSituation: true,
    isConfusedOrLethargic: false,
    severePainScore: 7,
    expectedResourceCount: 2,
    vitalsDangerZone: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [queueData, patientList] = await Promise.all([api.getTriageQueue(), api.getPatients()]);
      setQueue(queueData);
      setPatients(patientList);
      if (patientList.length > 0 && !selectedPatientId) {
        setSelectedPatientId(patientList[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecordVitals = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const rec = await api.recordVitals({
        patientId: selectedPatientId,
        ...vitals,
      });
      setShowVitalsModal(false);
      setSuccessBanner(`Vitals logged! Auto-calculated NEWS2 Score: ${rec.news2Score} (${rec.news2RiskLevel} RISK)`);
      setTimeout(() => setSuccessBanner(null), 5000);
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleAssessTriage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.assessTriage({
        patientId: selectedPatientId,
        chiefComplaint: triageForm.chiefComplaint,
        triageInput: {
          requiresImmediateLifeSaving: triageForm.requiresImmediateLifeSaving,
          isHighRiskSituation: triageForm.isHighRiskSituation,
          isConfusedOrLethargic: triageForm.isConfusedOrLethargic,
          severePainScore: triageForm.severePainScore,
          expectedResourceCount: triageForm.expectedResourceCount,
          vitalsDangerZone: triageForm.vitalsDangerZone,
        },
      });

      setShowTriageModal(false);
      setSuccessBanner(`Patient successfully triaged as ESI Level ${res.assessment.esiLevel}: ${res.assessment.categoryName}`);
      setTimeout(() => setSuccessBanner(null), 5000);
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
            <Flame className="h-5 w-5 text-rose-500" />
            <span>Emergency Department Triage & Vitals Station</span>
          </h1>
          <p className="text-xs text-slate-400">
            Automated Emergency Severity Index (ESI v4) prioritization and NEWS2 early warning score monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTriageModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-rose-600/30 transition"
          >
            <Flame className="h-4 w-4" />
            <span>Triage Inflow Assessment</span>
          </button>
          <button
            onClick={() => setShowVitalsModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-sky-600/30 transition"
          >
            <Activity className="h-4 w-4" />
            <span>Rapid Vitals Intake</span>
          </button>
        </div>
      </div>

      {successBanner && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Emergency Severity Index Reference Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
        <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl">
          <div className="font-extrabold text-rose-400 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            ESI 1: Resuscitation
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Immediate life-saving care (0 min target)</p>
        </div>
        <div className="p-3 bg-orange-950/40 border border-orange-800/60 rounded-xl">
          <div className="font-extrabold text-orange-400">ESI 2: Emergent</div>
          <p className="text-[10px] text-slate-400 mt-1">High risk / acute pain / confusion (10 min target)</p>
        </div>
        <div className="p-3 bg-yellow-950/40 border border-yellow-800/60 rounded-xl">
          <div className="font-extrabold text-yellow-400">ESI 3: Urgent</div>
          <p className="text-[10px] text-slate-400 mt-1">Stable, 2+ resources (30 min target)</p>
        </div>
        <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl">
          <div className="font-extrabold text-emerald-400">ESI 4: Less Urgent</div>
          <p className="text-[10px] text-slate-400 mt-1">Stable, 1 resource (60 min target)</p>
        </div>
        <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-xl">
          <div className="font-extrabold text-cyan-400">ESI 5: Non-Urgent</div>
          <p className="text-[10px] text-slate-400 mt-1">No resources needed (120 min target)</p>
        </div>
      </div>

      {/* Real-time Triage Queue Board */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h2 className="font-bold text-white text-sm">Active Emergency Department Waiting & In-Bed Queue ({queue.length})</h2>

        <div className="space-y-3">
          {queue.map((item) => (
            <div
              key={item.encounterId}
              className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`px-3 py-2 rounded-xl text-sm font-extrabold flex flex-col items-center justify-center min-w-[70px] ${
                    item.esiLevel === 1
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                      : item.esiLevel === 2
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                      : item.esiLevel === 3
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}
                >
                  <span className="text-[10px] uppercase font-semibold">Level</span>
                  <span>ESI {item.esiLevel}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm">{item.patientName}</h3>
                    <span className="text-xs text-slate-500 font-mono">({item.gender}, DOB: {item.dob})</span>
                    {item.admittedToRoom && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                        {item.admittedToRoom}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 font-medium">{item.chiefComplaint}</p>
                </div>
              </div>

              {/* Vitals HUD */}
              <div className="flex items-center gap-4 text-xs">
                {item.latestVitals ? (
                  <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 font-mono text-slate-300 space-y-0.5">
                    <div>
                      BP: <strong className="text-white">{item.latestVitals.systolicBP}/{item.latestVitals.diastolicBP}</strong> | HR: <strong className="text-white">{item.latestVitals.heartRate}</strong>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      SpO2: <strong className="text-emerald-400">{item.latestVitals.spO2}%</strong> | Temp: {item.latestVitals.temperatureCelsius}°C
                    </div>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-500 italic">No vitals recorded</span>
                )}

                <button
                  onClick={() => {
                    const match = patients.find((p) => p.id === item.patientId);
                    if (match) onSelectPatient(match);
                    onNavigate('EHR_CHART');
                  }}
                  className="px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold transition"
                >
                  Open Chart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Rapid Vitals Intake */}
      {showVitalsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Activity className="h-5 w-5 text-sky-400" />
                <span>Rapid Vitals Intake</span>
              </h3>
              <button onClick={() => setShowVitalsModal(false)} className="text-slate-400 hover:text-white font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleRecordVitals} className="space-y-4">
              <div>
                <label className="text-slate-400 block mb-1">Select Patient *</label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName} ({p.mrn})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Systolic BP (mmHg) *</label>
                  <input
                    type="number"
                    required
                    value={vitals.systolicBP}
                    onChange={(e) => setVitals({ ...vitals, systolicBP: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Diastolic BP (mmHg) *</label>
                  <input
                    type="number"
                    required
                    value={vitals.diastolicBP}
                    onChange={(e) => setVitals({ ...vitals, diastolicBP: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({ ...vitals, heartRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Resp Rate (/min)</label>
                  <input
                    type="number"
                    value={vitals.respiratoryRate}
                    onChange={(e) => setVitals({ ...vitals, respiratoryRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">SpO2 Oxygen (%)</label>
                  <input
                    type="number"
                    value={vitals.spO2}
                    onChange={(e) => setVitals({ ...vitals, spO2: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Temp (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={vitals.temperatureCelsius}
                    onChange={(e) => setVitals({ ...vitals, temperatureCelsius: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Blood Glucose (mg/dL)</label>
                  <input
                    type="number"
                    value={vitals.bloodGlucoseMgDl}
                    onChange={(e) => setVitals({ ...vitals, bloodGlucoseMgDl: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Pain Scale (0-10)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={vitals.painScale}
                    onChange={(e) => setVitals({ ...vitals, painScale: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-lg shadow-sky-600/30 transition"
              >
                Log Vitals & Compute NEWS2
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Triage Assessment */}
      {showTriageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Flame className="h-5 w-5 text-rose-500" />
                <span>Emergency Severity Index (ESI) Triage</span>
              </h3>
              <button onClick={() => setShowTriageModal(false)} className="text-slate-400 hover:text-white font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleAssessTriage} className="space-y-4">
              <div>
                <label className="text-slate-400 block mb-1">Patient *</label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName} ({p.mrn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Presenting Chief Complaint *</label>
                <textarea
                  rows={2}
                  required
                  value={triageForm.chiefComplaint}
                  onChange={(e) => setTriageForm({ ...triageForm, chiefComplaint: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              {/* Triage Decision Checks */}
              <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <label className="flex items-center gap-2 text-rose-400 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={triageForm.requiresImmediateLifeSaving}
                    onChange={(e) => setTriageForm({ ...triageForm, requiresImmediateLifeSaving: e.target.checked })}
                  />
                  <span>Requires immediate life-saving resuscitation? (ESI 1)</span>
                </label>

                <label className="flex items-center gap-2 text-orange-300 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={triageForm.isHighRiskSituation}
                    onChange={(e) => setTriageForm({ ...triageForm, isHighRiskSituation: e.target.checked })}
                  />
                  <span>High risk situation / Acute chest pain / Severe distress? (ESI 2)</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={triageForm.isConfusedOrLethargic}
                    onChange={(e) => setTriageForm({ ...triageForm, isConfusedOrLethargic: e.target.checked })}
                  />
                  <span>Confused, lethargic, or disoriented?</span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Expected Resources</label>
                  <select
                    value={triageForm.expectedResourceCount}
                    onChange={(e) => setTriageForm({ ...triageForm, expectedResourceCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value={0}>0 - None (ESI 5)</option>
                    <option value={1}>1 - Single resource (ESI 4)</option>
                    <option value={2}>2+ - Multiple resources (ESI 3)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Severe Pain (0-10)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={triageForm.severePainScore}
                    onChange={(e) => setTriageForm({ ...triageForm, severePainScore: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-600/30 transition"
              >
                Assess ESI Priority & Admit to Queue
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
