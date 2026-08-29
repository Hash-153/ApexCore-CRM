import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { Building2, Activity, Users, ShieldAlert, HeartPulse, DollarSign, ChevronRight, CheckCircle2 } from 'lucide-react';

export const Account360View: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('acc_horizon_health');
  const [accountDetails, setAccountDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    if (selectedAccountId) {
      loadAccountDetails(selectedAccountId);
    }
  }, [selectedAccountId]);

  const loadAccounts = async () => {
    try {
      const res = await CRMApiClient.getAccounts();
      if (res.success && res.data) {
        setAccounts(res.data);
        if (res.data.length > 0 && !selectedAccountId) {
          setSelectedAccountId(res.data[0].id);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadAccountDetails = async (id: string) => {
    setLoading(true);
    try {
      const res = await CRMApiClient.getAccountDetails(id);
      if (res.success) {
        setAccountDetails(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const account = accountDetails?.account;
  const health = accountDetails?.health;
  const contacts = accountDetails?.contacts || [];
  const opps = accountDetails?.opportunities || [];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-400" />
            Account 360 & Relationship Intelligence
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Parent-child corporate hierarchies, dynamic Churn Risk index, and stakeholder influence power maps.
          </p>
        </div>

        {/* Account Switcher */}
        <select
          value={selectedAccountId}
          onChange={e => setSelectedAccountId(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
        >
          {accounts.map(a => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.tier})
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading Account 360 profile...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Account Health & Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {account?.tier}
              </span>
              <h2 className="text-xl font-extrabold text-white mt-2">{account?.name}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{account?.industry}</p>
            </div>

            {/* Health Score Gauge */}
            <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-rose-400" /> Account Health Index
                </span>
                <span className="text-lg font-black text-emerald-400">{health?.healthScore || 94}/100</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full"
                  style={{ width: `${health?.healthScore || 94}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Churn Risk: <strong className="text-emerald-400">{health?.churnRisk || 'LOW'}</strong></span>
                <span>Expansion Prob: <strong className="text-indigo-400">{health?.expansionProbability || 85}%</strong></span>
              </div>
            </div>

            {/* Account Financials */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Annual Revenue:</span>
                <span className="font-bold text-white">${(account?.annualRevenue / 1000000).toFixed(0)}M</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Headcount:</span>
                <span className="font-bold text-white">{account?.employeeCount?.toLocaleString()} employees</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Total Won Value:</span>
                <span className="font-bold text-emerald-400">${health?.totalWonDealsValue?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Active Pipeline:</span>
                <span className="font-bold text-indigo-400">${health?.activeOpportunitiesValue?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Stakeholder Buying Committee */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" /> Buying Committee Power Map
              </h3>
              <span className="text-xs text-slate-400">{contacts.length} Contacts</span>
            </div>

            <div className="space-y-3">
              {contacts.map((contact: any) => (
                <div key={contact.id} className="bg-slate-800/50 border border-slate-700/60 p-3.5 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-white">
                      {contact.firstName} {contact.lastName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                      {contact.persona}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{contact.title}</p>
                  <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                    <span>Influence: {contact.decisionInfluenceScore}/10</span>
                    <span>{contact.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Active Deals & Hierarchy */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Active Deals & Revenue History
            </h3>

            <div className="space-y-3">
              {opps.map((opp: any) => (
                <div key={opp.id} className="bg-slate-800/50 border border-slate-700/60 p-3.5 rounded-xl space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-white">{opp.name}</h4>
                    <span className="text-xs font-extrabold text-emerald-400">${opp.amount?.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-indigo-400 font-medium">Stage: {opp.stage}</p>
                  <p className="text-[10px] text-slate-400">Target Close: {opp.closeDate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
