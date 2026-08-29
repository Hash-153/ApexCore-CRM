import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Sidebar, type NavTab } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { PatientDirectory } from './components/patients/PatientDirectory';
import { PatientChart } from './components/clinical/PatientChart';
import { SoapEditor } from './components/clinical/SoapEditor';
import { TriageBoard } from './components/triage/TriageBoard';
import { BedBoard } from './components/inpatient/BedBoard';
import { EmarWorkbench } from './components/emar/EmarWorkbench';
import { DicomViewer } from './components/radiology/DicomViewer';
import { PharmacyWorkbench } from './components/pharmacy/PharmacyWorkbench';
import { LimsWorkbench } from './components/lims/LimsWorkbench';
import { TelehealthSuite } from './components/telehealth/TelehealthSuite';
import { BillingCenter } from './components/billing/BillingCenter';
import { AuditViewer } from './components/audit/AuditViewer';
import { ClinicalCalculatorsModal } from './components/clinical/ClinicalCalculatorsModal';
import { CRMApp } from './crm/CRMApp';
import type { PatientRecord } from './types/index';
import { api } from './services/api';
import { Briefcase, Activity } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const [platformMode, setPlatformMode] = useState<'CLINICAL_EHR' | 'ENTERPRISE_CRM'>('ENTERPRISE_CRM');
  const [activeTab, setActiveTab] = useState<NavTab>('DASHBOARD');
  const [activePatient, setActivePatient] = useState<PatientRecord | null>(null);
  const [showCalculators, setShowCalculators] = useState(false);
  const [badgeCounts, setBadgeCounts] = useState({ triageQueue: 0, pendingLabs: 0, activeRx: 0 });

  useEffect(() => {
    loadBadges();
    loadDefaultPatient();
  }, []);

  const loadBadges = async () => {
    try {
      const [queue, labs, rx] = await Promise.all([
        api.getTriageQueue(),
        api.getLabOrders(),
        api.getPrescriptions(),
      ]);
      setBadgeCounts({
        triageQueue: queue.length,
        pendingLabs: labs.filter((l) => l.status !== 'FINALIZED').length,
        activeRx: rx.filter((r) => r.status === 'ACTIVE').length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const loadDefaultPatient = async () => {
    try {
      const list = await api.getPatients();
      if (list.length > 0) {
        setActivePatient(list[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (platformMode === 'ENTERPRISE_CRM') {
    return (
      <div className="relative">
        <CRMApp />
        {/* Platform Mode Switcher Button */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setPlatformMode('CLINICAL_EHR')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold shadow-2xl hover:bg-slate-800 transition"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            Switch to Clinical HealthOS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative">
      <Header activePatient={activePatient} onOpenCalculators={() => setShowCalculators(true)} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} badgeCounts={badgeCounts} />

        <main className="flex-1 p-6 overflow-y-auto bg-slate-950">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'DASHBOARD' && (
              <Dashboard onNavigate={setActiveTab} onSelectPatient={setActivePatient} />
            )}
            {activeTab === 'PATIENTS' && (
              <PatientDirectory onSelectPatient={setActivePatient} onNavigate={setActiveTab} />
            )}
            {activeTab === 'EHR_CHART' && (
              <PatientChart patient={activePatient} onNavigate={setActiveTab} />
            )}
            {activeTab === 'SOAP_CHARTING' && (
              <SoapEditor activePatient={activePatient} onNavigate={setActiveTab} />
            )}
            {activeTab === 'TRIAGE' && (
              <TriageBoard onSelectPatient={setActivePatient} onNavigate={setActiveTab} />
            )}
            {activeTab === 'INPATIENT_BEDS' && <BedBoard activePatient={activePatient} />}
            {activeTab === 'EMAR' && <EmarWorkbench activePatient={activePatient} />}
            {activeTab === 'RADIOLOGY' && <DicomViewer activePatient={activePatient} />}
            {activeTab === 'PHARMACY' && <PharmacyWorkbench activePatient={activePatient} />}
            {activeTab === 'LIMS' && <LimsWorkbench activePatient={activePatient} />}
            {activeTab === 'TELEHEALTH' && <TelehealthSuite activePatient={activePatient} />}
            {activeTab === 'BILLING' && <BillingCenter activePatient={activePatient} />}
            {activeTab === 'HIPAA_AUDIT' && <AuditViewer />}
          </div>
        </main>
      </div>

      {/* Floating Toggle to Switch to ApexCore CRM */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setPlatformMode('ENTERPRISE_CRM')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-indigo-600 border border-indigo-500 text-white text-xs font-bold shadow-2xl hover:bg-indigo-500 transition"
        >
          <Briefcase className="w-4 h-4 text-white" />
          Switch to ApexCore CRM
        </button>
      </div>

      <ClinicalCalculatorsModal isOpen={showCalculators} onClose={() => setShowCalculators(false)} />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

export default App;
