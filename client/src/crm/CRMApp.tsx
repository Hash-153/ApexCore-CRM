import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  Kanban,
  Building2,
  Calculator,
  LifeBuoy,
  Megaphone,
  GitFork,
  Database,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Layers,
  LogOut,
  UserCheck
} from 'lucide-react';
import { DashboardOverview } from './components/DashboardOverview';
import { LeadManagementView } from './components/LeadManagementView';
import { DealPipelineKanban } from './components/DealPipelineKanban';
import { CustomerDirectoryView } from './customers/CustomerDirectoryView';
import { CustomerProfileView } from './customers/CustomerProfileView';
import { CPQQuoteBuilder } from './components/CPQQuoteBuilder';
import { HelpdeskSLAView } from './components/HelpdeskSLAView';
import { MarketingCampaignsView } from './components/MarketingCampaignsView';
import { WorkflowBuilderView } from './components/WorkflowBuilderView';
import { CustomSchemaManager } from './components/CustomSchemaManager';
import { AnalyticsBIView } from './components/AnalyticsBIView';
import { AuditSecurityView } from './components/AuditSecurityView';
import { AdminDashboardView } from './admin/AdminDashboardView';
import { CRMApiClient } from './services/crmApiClient';

interface CRMAppProps {
  currentUser: any;
  onLogout: () => void;
}

export const CRMApp: React.FC<CRMAppProps> = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('customers');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const navigation = [
    { id: 'customers', label: 'Customer Management', icon: Building2, roles: ['Admin', 'Sales Manager', 'Sales Representative', 'Support Agent', 'Marketing Executive'] },
    { id: 'leads', label: 'Leads & BANT Engine', icon: Users, roles: ['Admin', 'Sales Manager', 'Sales Representative', 'Marketing Executive'] },
    { id: 'deals', label: 'Pipeline & MEDDIC', icon: Kanban, roles: ['Admin', 'Sales Manager', 'Sales Representative'] },
    { id: 'cpq', label: 'CPQ Quote Engine', icon: Calculator, roles: ['Admin', 'Sales Manager', 'Sales Representative'] },
    { id: 'helpdesk', label: 'SLA Helpdesk', icon: LifeBuoy, roles: ['Admin', 'Sales Manager', 'Support Agent'] },
    { id: 'marketing', label: 'Campaigns & ROI', icon: Megaphone, roles: ['Admin', 'Marketing Executive', 'Sales Manager'] },
    { id: 'workflows', label: 'Visual Automation', icon: GitFork, roles: ['Admin', 'Sales Manager'] },
    { id: 'analytics', label: 'Revenue BI', icon: TrendingUp, roles: ['Admin', 'Sales Manager', 'Marketing Executive', 'Sales Representative'] },
    { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck, roles: ['Admin', 'Sales Manager'] },
    { id: 'schema', label: 'Custom Schemas', icon: Database, roles: ['Admin'] }
  ];

  const userRole = currentUser?.role || 'Sales Representative';
  const allowedNav = navigation.filter(n => n.roles.includes(userRole));

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
  };

  const handleBackToCustomerDirectory = () => {
    setSelectedCustomerId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
              ApexCore CRM <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">ENTERPRISE OS</span>
            </span>
            <p className="text-[10px] text-slate-400">Enterprise Revenue Operations, Customer 360 & Sales Automation</p>
          </div>
        </div>

        {/* Global User Session Card */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-white block">{currentUser?.displayName || 'Marcus Vance'}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
              {userRole}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition"
            title="Sign Out / Switch Role"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-4 space-y-1 overflow-y-auto hidden md:block">
          <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            Workspace Modules
          </div>
          {allowedNav.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'customers') {
                    setSelectedCustomerId(null);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'customers' && (
            selectedCustomerId ? (
              <CustomerProfileView
                customerId={selectedCustomerId}
                onBack={handleBackToCustomerDirectory}
              />
            ) : (
              <CustomerDirectoryView
                onSelectCustomer={handleSelectCustomer}
              />
            )
          )}
          {activeTab === 'leads' && <LeadManagementView />}
          {activeTab === 'deals' && <DealPipelineKanban />}
          {activeTab === 'cpq' && <CPQQuoteBuilder />}
          {activeTab === 'helpdesk' && <HelpdeskSLAView />}
          {activeTab === 'marketing' && <MarketingCampaignsView />}
          {activeTab === 'workflows' && <WorkflowBuilderView />}
          {activeTab === 'schema' && <CustomSchemaManager />}
          {activeTab === 'analytics' && <AnalyticsBIView />}
          {activeTab === 'admin' && <AdminDashboardView />}
        </main>
      </div>
    </div>
  );
};
