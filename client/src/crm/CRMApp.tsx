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
  Sparkles
} from 'lucide-react';
import { DashboardOverview } from './components/DashboardOverview';
import { LeadManagementView } from './components/LeadManagementView';
import { DealPipelineKanban } from './components/DealPipelineKanban';
import { Account360View } from './components/Account360View';
import { CPQQuoteBuilder } from './components/CPQQuoteBuilder';
import { HelpdeskSLAView } from './components/HelpdeskSLAView';
import { MarketingCampaignsView } from './components/MarketingCampaignsView';
import { WorkflowBuilderView } from './components/WorkflowBuilderView';
import { CustomSchemaManager } from './components/CustomSchemaManager';
import { AnalyticsBIView } from './components/AnalyticsBIView';
import { AuditSecurityView } from './components/AuditSecurityView';

export const CRMApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const navigation = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart3 },
    { id: 'leads', label: 'Leads & BANT Engine', icon: Users },
    { id: 'deals', label: 'Pipeline & MEDDIC', icon: Kanban },
    { id: 'accounts', label: 'Accounts 360', icon: Building2 },
    { id: 'cpq', label: 'CPQ Quote Engine', icon: Calculator },
    { id: 'helpdesk', label: 'SLA Helpdesk', icon: LifeBuoy },
    { id: 'marketing', label: 'Campaigns & Attribution', icon: Megaphone },
    { id: 'workflows', label: 'Workflow Automation', icon: GitFork },
    { id: 'schema', label: 'Custom Schemas', icon: Database },
    { id: 'analytics', label: 'Revenue BI', icon: TrendingUp },
    { id: 'audit', label: 'Audit Security', icon: ShieldCheck }
  ];

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
            <p className="text-[10px] text-slate-400">Next-Gen Revenue Operations & Sales Orchestration</p>
          </div>
        </div>

        {/* Global Rep Indicator */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-white block">Marcus Vance</span>
            <span className="text-[10px] text-indigo-400 font-semibold">Strategic Account Executive</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow">
            MV
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-4 space-y-1 overflow-y-auto hidden md:block">
          <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            Revenue Operations Modules
          </div>
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
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
          {activeTab === 'dashboard' && <DashboardOverview />}
          {activeTab === 'leads' && <LeadManagementView />}
          {activeTab === 'deals' && <DealPipelineKanban />}
          {activeTab === 'accounts' && <Account360View />}
          {activeTab === 'cpq' && <CPQQuoteBuilder />}
          {activeTab === 'helpdesk' && <HelpdeskSLAView />}
          {activeTab === 'marketing' && <MarketingCampaignsView />}
          {activeTab === 'workflows' && <WorkflowBuilderView />}
          {activeTab === 'schema' && <CustomSchemaManager />}
          {activeTab === 'analytics' && <AnalyticsBIView />}
          {activeTab === 'audit' && <AuditSecurityView />}
        </main>
      </div>
    </div>
  );
};
