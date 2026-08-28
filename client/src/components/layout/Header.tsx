import React from 'react';
import { useAuth, ROLE_PROFILES } from '../../context/AuthContext';
import type { UserRole, PatientRecord } from '../../types/index';
import { Shield, ShieldAlert, Activity, User, HeartPulse } from 'lucide-react';

interface HeaderProps {
  activePatient: PatientRecord | null;
  onOpenCalculators: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activePatient, onOpenCalculators }) => {
  const { currentUser, switchRole, accessReason, setAccessReason } = useAuth();

  const roleColors: Record<UserRole, string> = {
    PHYSICIAN: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    TRIAGE_NURSE: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    PHARMACIST: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    LAB_TECHNICIAN: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    RADIOLOGIST: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    BILLING_SPECIALIST: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    SYSTEM_ADMIN: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    PATIENT: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-4 flex items-center justify-between sticky top-0 z-30">
      {/* Brand & Platform Status */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <HeartPulse className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-white text-lg">MediCore</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
              HealthOS v1.0
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">FHIR R4 | HIPAA 45 CFR 164 Compliant</p>
        </div>
      </div>

      {/* Active Patient Banner (if selected) */}
      {activePatient && (
        <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-medium text-slate-400">ACTIVE CHART:</span>
            <span className="text-sm font-semibold text-white">{activePatient.fullName}</span>
          </div>
          <span className="text-xs font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
            {activePatient.mrn}
          </span>
          <span className="text-xs text-slate-400">DOB: {activePatient.dob} ({activePatient.gender})</span>
          <span className="text-xs font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
            {activePatient.bloodType}
          </span>
        </div>
      )}

      {/* Action Hub & Role Selector */}
      <div className="flex items-center gap-3">
        {/* Clinical Calculators Button */}
        <button
          onClick={onOpenCalculators}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-medium border border-slate-700 transition"
          title="Open Clinical Decision Support Calculators (NEWS2, eGFR, CHA2DS2-VASc)"
        >
          <Activity className="h-4 w-4 text-sky-400" />
          <span className="hidden md:inline">Calculators (CDSS)</span>
        </button>

        {/* Role Switcher Dropdown */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 px-2">
            <User className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Role:</span>
          </div>
          <select
            value={currentUser.role}
            onChange={(e) => switchRole(e.target.value as UserRole)}
            className="bg-slate-900 text-xs text-white rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium cursor-pointer"
          >
            {Object.keys(ROLE_PROFILES).map((role) => (
              <option key={role} value={role}>
                {role.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Active Role & User Pill */}
        <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${roleColors[currentUser.role]}`}>
          <Shield className="h-3.5 w-3.5" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </header>
  );
};
