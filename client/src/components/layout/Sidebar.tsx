import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  FileText,
  Flame,
  Pill,
  FlaskConical,
  Video,
  Receipt,
  ShieldCheck,
  Layers,
  Bed,
  ClipboardCheck,
} from 'lucide-react';

export type NavTab =
  | 'DASHBOARD'
  | 'PATIENTS'
  | 'EHR_CHART'
  | 'SOAP_CHARTING'
  | 'TRIAGE'
  | 'INPATIENT_BEDS'
  | 'EMAR'
  | 'RADIOLOGY'
  | 'PHARMACY'
  | 'LIMS'
  | 'TELEHEALTH'
  | 'BILLING'
  | 'HIPAA_AUDIT';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  badgeCounts?: {
    triageQueue?: number;
    pendingLabs?: number;
    activeRx?: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, badgeCounts }) => {
  const { currentUser } = useAuth();

  const navItems = [
    {
      id: 'DASHBOARD' as NavTab,
      label: 'Executive Dashboard',
      icon: LayoutDashboard,
      roles: ['PHYSICIAN', 'TRIAGE_NURSE', 'PHARMACIST', 'LAB_TECHNICIAN', 'BILLING_SPECIALIST', 'SYSTEM_ADMIN'],
    },
    {
      id: 'PATIENTS' as NavTab,
      label: 'Patient Directory',
      icon: Users,
      roles: ['PHYSICIAN', 'TRIAGE_NURSE', 'PHARMACIST', 'LAB_TECHNICIAN', 'BILLING_SPECIALIST', 'SYSTEM_ADMIN'],
    },
    {
      id: 'EHR_CHART' as NavTab,
      label: 'EHR Patient Chart',
      icon: FileText,
      roles: ['PHYSICIAN', 'TRIAGE_NURSE', 'PHARMACIST', 'PATIENT', 'SYSTEM_ADMIN'],
    },
    {
      id: 'SOAP_CHARTING' as NavTab,
      label: 'Physician SOAP Charting',
      icon: FileText,
      roles: ['PHYSICIAN', 'SYSTEM_ADMIN'],
    },
    {
      id: 'TRIAGE' as NavTab,
      label: 'Emergency Triage & Vitals',
      icon: Flame,
      badge: badgeCounts?.triageQueue,
      badgeColor: 'bg-rose-500 text-white',
      roles: ['PHYSICIAN', 'TRIAGE_NURSE', 'SYSTEM_ADMIN'],
    },
    {
      id: 'INPATIENT_BEDS' as NavTab,
      label: 'Inpatient Beds & SBAR',
      icon: Bed,
      roles: ['PHYSICIAN', 'TRIAGE_NURSE', 'SYSTEM_ADMIN'],
    },
    {
      id: 'EMAR' as NavTab,
      label: 'eMAR & Med Admin (BCMA)',
      icon: ClipboardCheck,
      roles: ['PHYSICIAN', 'TRIAGE_NURSE', 'PHARMACIST', 'SYSTEM_ADMIN'],
    },
    {
      id: 'RADIOLOGY' as NavTab,
      label: 'DICOM PACS & Radiology',
      icon: Layers,
      roles: ['PHYSICIAN', 'RADIOLOGIST', 'SYSTEM_ADMIN', 'PATIENT'],
    },
    {
      id: 'PHARMACY' as NavTab,
      label: 'e-Prescriptions & Pharmacy',
      icon: Pill,
      badge: badgeCounts?.activeRx,
      badgeColor: 'bg-indigo-500 text-white',
      roles: ['PHYSICIAN', 'PHARMACIST', 'SYSTEM_ADMIN', 'PATIENT'],
    },
    {
      id: 'LIMS' as NavTab,
      label: 'LIMS Diagnostic Lab',
      icon: FlaskConical,
      badge: badgeCounts?.pendingLabs,
      badgeColor: 'bg-cyan-500 text-white',
      roles: ['PHYSICIAN', 'LAB_TECHNICIAN', 'SYSTEM_ADMIN', 'PATIENT'],
    },
    {
      id: 'TELEHEALTH' as NavTab,
      label: 'Telehealth Virtual Clinic',
      icon: Video,
      roles: ['PHYSICIAN', 'TRIAGE_NURSE', 'PATIENT', 'SYSTEM_ADMIN'],
    },
    {
      id: 'BILLING' as NavTab,
      label: 'ICD-10 / CPT Billing Hub',
      icon: Receipt,
      roles: ['PHYSICIAN', 'BILLING_SPECIALIST', 'SYSTEM_ADMIN', 'PATIENT'],
    },
    {
      id: 'HIPAA_AUDIT' as NavTab,
      label: 'HIPAA Audit Trail & Logs',
      icon: ShieldCheck,
      roles: ['SYSTEM_ADMIN', 'BILLING_SPECIALIST'],
    },
  ];

  const visibleItems = navItems.filter((item) => item.roles.includes(currentUser.role));

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-3 select-none">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Clinical Navigation
        </div>

        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && item.badge > 0 && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-700 text-slate-300'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Security Compliance Seal */}
      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <ShieldCheck className="h-4 w-4" />
          <span>HIPAA Compliance Active</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Access is monitored and immutably signed. PHI is restricted per role.
        </p>
      </div>
    </aside>
  );
};
