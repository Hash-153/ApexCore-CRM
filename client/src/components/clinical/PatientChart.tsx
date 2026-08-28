import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { PatientRecord } from '../../types/index';
import {
  User,
  Heart,
  Activity,
  Pill,
  FlaskConical,
  FileText,
  AlertOctagon,
  Plus,
  Shield,
  Clock,
  Calendar,
} from 'lucide-react';
import type { NavTab } from '../layout/Sidebar';

interface PatientChartProps {
  patient: PatientRecord | null;
  onNavigate: (tab: NavTab) => void;
}

export const PatientChart: React.FC<PatientChartProps> = ({ patient: initialPatient, onNavigate }) => {
  const [patient, setPatient] = useState<PatientRecord | null>(initialPatient);
  const [loading, setLoading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'SUMMARY' | 'VITALS' | 'MEDS' | 'LABS' | 'ENCOUNTERS'>('SUMMARY');

  useEffect(() => {
    if (initialPatient) {
      loadDetailedPatient(initialPatient.id);
    }
  }, [initialPatient]);

  const loadDetailedPatient = async (id: string) => {
    try {
      setLoading(true);
      const detailed = await api.getPatientById(id);
      setPatient(detailed);
    } catch (err) {
      console.error('Failed to load detailed patient chart:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!patient) {
    return (
      <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
        <User className="h-10 w-10 text-slate-600 mx-auto" />
        <h3 className="text-base font-bold text-white">No Patient Selected</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Please select a patient from the Patient Directory or Executive Dashboard to view their longitudinal EHR chart.
        </p>
        <button
          onClick={() => onNavigate('PATIENTS')}
          className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold hover:bg-sky-500 transition shadow-lg shadow-sky-600/30"
        >
          Open Patient Directory
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patient Master Demographics Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-sky-600/20">
              {patient.fullName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-white">{patient.fullName}</h1>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-lg bg-sky-950 text-sky-400 border border-sky-800 font-semibold">
                  {patient.mrn}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-800 font-bold">
                  Blood: {patient.bloodType}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                DOB: <strong className="text-slate-300">{patient.dob}</strong> | Gender:{' '}
                <strong className="text-slate-300">{patient.gender}</strong> | Phone: {patient.phone}
              </p>
            </div>
          </div>

          {/* Quick Action Clinical Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('SOAP_CHARTING')}
              className="flex items-center gap-1.5 px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-sky-600/20 transition"
            >
              <FileText className="h-4 w-4" />
              <span>Author SOAP Note</span>
            </button>
            <button
              onClick={() => onNavigate('TRIAGE')}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-amber-600/20 transition"
            >
              <Activity className="h-4 w-4" />
              <span>Record Vitals</span>
            </button>
            <button
              onClick={() => onNavigate('PHARMACY')}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition"
            >
              <Pill className="h-4 w-4" />
              <span>e-Prescribe</span>
            </button>
            <button
              onClick={() => onNavigate('LIMS')}
              className="flex items-center gap-1.5 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-600/20 transition"
            >
              <FlaskConical className="h-4 w-4" />
              <span>Order Labs</span>
            </button>
          </div>
        </div>

        {/* Allergy Red Alert Banner */}
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="p-3 bg-rose-950/40 border border-rose-900/60 rounded-xl flex items-center gap-3">
            <AlertOctagon className="h-5 w-5 text-rose-400 shrink-0 animate-pulse" />
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-rose-300">DOCUMENTED ALLERGIES:</span>
              {patient.allergies.map((allergy) => (
                <span
                  key={allergy.id}
                  className="px-2.5 py-0.5 rounded-lg bg-rose-900/80 text-rose-200 border border-rose-700 font-semibold"
                >
                  {allergy.allergen} ({allergy.reaction}) - <strong className="uppercase">{allergy.severity}</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pt-2 text-xs font-semibold">
          {[
            { id: 'SUMMARY', label: 'EHR Summary' },
            { id: 'VITALS', label: 'Vitals & NEWS2' },
            { id: 'MEDS', label: 'Active Medications' },
            { id: 'LABS', label: 'LIMS Lab Results' },
            { id: 'ENCOUNTERS', label: 'Clinical Encounters & Notes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`pb-3 px-3 transition border-b-2 ${
                activeSubTab === tab.id
                  ? 'border-sky-500 text-sky-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-tab 1: Summary Overview */}
      {activeSubTab === 'SUMMARY' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Vitals Snapshot */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Activity className="h-4 w-4 text-sky-400" />
                <span>Latest Vital Signs & NEWS2</span>
              </h3>
              <span className="text-[11px] text-slate-500">Auto-calculated</span>
            </div>

            {patient.recentVitals && patient.recentVitals.length > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Blood Pressure</span>
                    <strong className="text-sm font-extrabold text-white">
                      {patient.recentVitals[0].systolicBP}/{patient.recentVitals[0].diastolicBP}
                    </strong>
                    <span className="text-[10px] text-slate-500 block">mmHg</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Heart Rate</span>
                    <strong className="text-sm font-extrabold text-white">
                      {patient.recentVitals[0].heartRate}
                    </strong>
                    <span className="text-[10px] text-slate-500 block">bpm</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">SpO2 Oxygen</span>
                    <strong className="text-sm font-extrabold text-emerald-400">
                      {patient.recentVitals[0].spO2}%
                    </strong>
                    <span className="text-[10px] text-slate-500 block">Room air</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">National Early Warning Score (NEWS2):</span>
                  <span
                    className={`font-extrabold px-2.5 py-0.5 rounded-lg ${
                      patient.recentVitals[0].news2Score >= 7
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}
                  >
                    Score: {patient.recentVitals[0].news2Score} ({patient.recentVitals[0].news2RiskLevel} RISK)
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-4">No vital signs recorded yet.</p>
            )}
          </div>

          {/* Active Medications */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Pill className="h-4 w-4 text-indigo-400" />
                <span>Active Prescriptions ({patient.activePrescriptions?.length || 0})</span>
              </h3>
              <button onClick={() => onNavigate('PHARMACY')} className="text-xs text-sky-400 hover:text-sky-300">
                Manage e-Rx
              </button>
            </div>

            <div className="space-y-2">
              {patient.activePrescriptions && patient.activePrescriptions.length > 0 ? (
                patient.activePrescriptions.map((rx) => (
                  <div key={rx.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                    <div>
                      <strong className="text-white text-sm">{rx.medicationName}</strong>
                      <span className="text-slate-400 block mt-0.5">{rx.dosage} - {rx.frequency} ({rx.route})</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                      Refills: {rx.refillsRemaining}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 py-4">No active prescriptions.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Vitals History */}
      {activeSubTab === 'VITALS' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <h3 className="font-bold text-white text-sm">Longitudinal Vital Signs Log</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">BP (mmHg)</th>
                  <th className="p-3">HR (bpm)</th>
                  <th className="p-3">RR (/min)</th>
                  <th className="p-3">SpO2</th>
                  <th className="p-3">Temp (°C)</th>
                  <th className="p-3">NEWS2 Score</th>
                  <th className="p-3">Recorded By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {patient.recentVitals?.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono text-[11px] text-slate-400">{v.recordedAt.replace('T', ' ').slice(0, 16)}</td>
                    <td className="p-3 font-bold text-white">{v.systolicBP}/{v.diastolicBP}</td>
                    <td className="p-3">{v.heartRate}</td>
                    <td className="p-3">{v.respiratoryRate}</td>
                    <td className="p-3 text-emerald-400 font-bold">{v.spO2}%</td>
                    <td className="p-3">{v.temperatureCelsius}°C</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${v.news2Score >= 7 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {v.news2Score} ({v.news2RiskLevel})
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{v.recordedByName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Encounters & SOAP Notes */}
      {activeSubTab === 'ENCOUNTERS' && (
        <div className="space-y-4">
          {patient.recentEncounters?.map((enc) => (
            <div key={enc.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-950 text-sky-400 border border-sky-800 text-xs font-bold font-mono">
                    {enc.encounterType}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{enc.chiefComplaint}</h4>
                    <span className="text-xs text-slate-400">Attending: {enc.physicianName}</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400">{enc.startedAt.slice(0, 10)}</span>
              </div>

              {enc.soapNote && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-sky-400 block">[SUBJECTIVE & OBJECTIVE]</span>
                    <p className="text-slate-300">{enc.soapNote.subjective}</p>
                    <p className="text-slate-400 text-[11px] mt-2 font-mono">{enc.soapNote.objective}</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-400 block">[ASSESSMENT & PLAN]</span>
                    <p className="text-slate-300 font-semibold">{enc.soapNote.assessment}</p>
                    <p className="text-slate-400 text-[11px] mt-2">{enc.soapNote.plan}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
