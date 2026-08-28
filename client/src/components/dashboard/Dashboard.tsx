import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import type { HospitalExecutiveKPIs, PatientRecord } from '../../types/index';
import {
  Users,
  Activity,
  Bed,
  Flame,
  Pill,
  FlaskConical,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  Plus,
} from 'lucide-react';
import type { NavTab } from '../layout/Sidebar';

interface DashboardProps {
  onNavigate: (tab: NavTab) => void;
  onSelectPatient: (patient: PatientRecord) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onSelectPatient }) => {
  const [kpis, setKpis] = useState<HospitalExecutiveKPIs | null>(null);
  const [triageQueue, setTriageQueue] = useState<any[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [kpiData, queueData, patientList] = await Promise.all([
        api.getKPIs(),
        api.getTriageQueue(),
        api.getPatients(),
      ]);
      setKpis(kpiData);
      setTriageQueue(queueData);
      setPatients(patientList);
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !kpis) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <Activity className="h-6 w-6 animate-spin text-sky-500 mr-2" />
        Loading HealthOS Clinical Operations Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-sky-900/40 via-slate-900 to-slate-900 p-6 rounded-2xl border border-sky-900/30">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Hospital Clinical Operations & Census</h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time monitoring of acute care beds, emergency triage queue, LIMS panic alerts, and clinical workflows.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('TRIAGE')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition"
          >
            <Flame className="h-4 w-4" />
            <span>Emergency Triage</span>
          </button>
          <button
            onClick={() => onNavigate('PATIENTS')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-lg shadow-sky-600/30 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Register Patient</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Bed Occupancy */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Inpatient Bed Occupancy</span>
            <Bed className="h-5 w-5 text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{kpis.patientCensus.bedOccupancyPercent}%</span>
            <span className="text-xs text-slate-400">of 150 beds</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                kpis.patientCensus.bedOccupancyPercent > 85 ? 'bg-rose-500' : 'bg-sky-500'
              }`}
              style={{ width: `${kpis.patientCensus.bedOccupancyPercent}%` }}
            />
          </div>
        </div>

        {/* Emergency Triage Queue */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Active ED Triage Queue</span>
            <Flame className="h-5 w-5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{kpis.emergencyDepartment.activeTriageQueue}</span>
            <span className="text-xs text-amber-400">patients waiting</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>ESI 1 (Resus): <strong className="text-rose-400">{kpis.emergencyDepartment.esi1Count}</strong></span>
            <span>ESI 2 (Emergent): <strong className="text-amber-400">{kpis.emergencyDepartment.esi2Count}</strong></span>
          </div>
        </div>

        {/* Diagnostic LIMS & Critical Alerts */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">LIMS Diagnostic Labs</span>
            <FlaskConical className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{kpis.diagnosticsAndPharmacy.pendingLabOrders}</span>
            <span className="text-xs text-cyan-400">pending orders</span>
          </div>
          <div className="text-[11px] flex items-center justify-between">
            <span className="text-slate-400">Finalized today: {kpis.diagnosticsAndPharmacy.finalizedLabOrders}</span>
            {kpis.diagnosticsAndPharmacy.criticalAlertsActive > 0 && (
              <span className="text-rose-400 font-bold flex items-center gap-1 animate-pulse">
                <AlertTriangle className="h-3 w-3" />
                {kpis.diagnosticsAndPharmacy.criticalAlertsActive} Critical
              </span>
            )}
          </div>
        </div>

        {/* Revenue Cycle & Billed */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Billed Claims (ICD-10/CPT)</span>
            <DollarSign className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              ${kpis.revenueCycle.totalBilledUsd.toLocaleString()}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Paid: ${kpis.revenueCycle.insurancePaidUsd.toLocaleString()}</span>
            <span className="text-emerald-400 font-semibold">{kpis.revenueCycle.collectionRatePercent}% Adjudicated</span>
          </div>
        </div>
      </div>

      {/* Main Dual Grid: ED Triage Queue & Active Patient List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-Time Triage Waiting Queue */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-rose-500" />
              <h2 className="font-bold text-white text-base">Emergency Room Triage Queue (ESI Ranked)</h2>
            </div>
            <button
              onClick={() => onNavigate('TRIAGE')}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1"
            >
              View Full Triage Board <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {triageQueue.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No patients currently in triage queue.</p>
            ) : (
              triageQueue.map((item) => (
                <div
                  key={item.encounterId}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition cursor-pointer"
                  onClick={() => {
                    const match = patients.find((p) => p.id === item.patientId);
                    if (match) onSelectPatient(match);
                    onNavigate('EHR_CHART');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
                        item.esiLevel === 1
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : item.esiLevel === 2
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                      }`}
                    >
                      ESI {item.esiLevel}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.patientName}</h4>
                      <p className="text-xs text-slate-400">{item.chiefComplaint}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    {item.latestVitals && (
                      <span className="text-xs font-mono text-slate-300 block">
                        BP {item.latestVitals.systolicBP}/{item.latestVitals.diastolicBP} | SpO2 {item.latestVitals.spO2}%
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500">
                      NEWS2: <strong className="text-sky-400">{item.latestVitals?.news2Score || 0}</strong>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Patient Select & Demographics */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-sky-500" />
              <h2 className="font-bold text-white text-base">Quick Access Patient Roster</h2>
            </div>
            <button
              onClick={() => onNavigate('PATIENTS')}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1"
            >
              All Patients <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {patients.slice(0, 4).map((patient) => (
              <div
                key={patient.id}
                onClick={() => {
                  onSelectPatient(patient);
                  onNavigate('EHR_CHART');
                }}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-sky-500/50 transition cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-slate-800 text-sky-400 font-bold flex items-center justify-center text-xs group-hover:bg-sky-600 group-hover:text-white transition">
                    {patient.fullName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition">
                      {patient.fullName}
                    </h4>
                    <p className="text-xs text-slate-400">
                      MRN: <span className="font-mono text-slate-300">{patient.mrn}</span> | DOB: {patient.dob}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      patient.status === 'ADMITTED'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {patient.status}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">{patient.bloodType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
