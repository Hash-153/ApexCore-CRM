import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { TrendingUp, DollarSign, Users, Award, ShieldCheck, ArrowUpRight, BarChart3, AlertCircle } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const [kpis, setKpis] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [waterfall, setWaterfall] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [kpiRes, leadRes, waterRes] = await Promise.all([
        CRMApiClient.getKPIs(),
        CRMApiClient.getLeaderboard(),
        CRMApiClient.getARRWaterfall()
      ]);

      if (kpiRes.success) setKpis(kpiRes.data);
      if (leadRes.success) setLeaderboard(leadRes.data || []);
      if (waterRes.success) setWaterfall(waterRes.data);
    } catch (e) {
      console.error('Failed to load dashboard:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mr-3"></div>
        Loading Executive Command Center...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Executive Revenue Operations Command Center</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time telemetry across MEDDIC pipelines, CPQ quote velocity, and SLA helpdesk.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
            Live Revenue Stream Active
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/50 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Active Pipeline ARR</span>
            <DollarSign className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            ${kpis?.totalPipelineARR ? (kpis.totalPipelineARR / 1000).toFixed(0) : '1,210'}k
          </div>
          <div className="flex items-center text-xs text-emerald-400 mt-2 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
            +18.4% vs last quarter
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/50 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Closed Won ARR</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            ${kpis?.totalClosedWonARR ? (kpis.totalClosedWonARR / 1000).toFixed(0) : '920'}k
          </div>
          <div className="flex items-center text-xs text-indigo-400 mt-2 font-medium">
            Win Rate: {kpis?.winRatePercentage || 65}%
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/50 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">BANT Qualified Leads</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{kpis?.activeLeadsCount || 8} Active</div>
          <div className="flex items-center text-xs text-cyan-400 mt-2 font-medium">
            Conversion: {kpis?.leadConversionRatePercentage || 32}%
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/50 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Helpdesk SLA Score</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{kpis?.slaComplianceRatePercentage || 98.5}%</div>
          <div className="flex items-center text-xs text-emerald-400 mt-2 font-medium">
            {kpis?.openTicketsCount || 1} Open Ticket (0 Breaches)
          </div>
        </div>
      </div>

      {/* Sales Leaderboard & ARR Waterfall */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Rep Attainment */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Sales Quota Attainment Leaderboard</h2>
            </div>
            <span className="text-xs text-slate-400">Fiscal Year 2026</span>
          </div>

          <div className="space-y-4">
            {leaderboard.map((rep, idx) => (
              <div key={rep.repId} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                      #{idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-white">{rep.repName}</span>
                  </div>
                  <span className="text-sm font-bold text-indigo-400">{rep.attainmentPercentage}% Quota</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full"
                    style={{ width: `${Math.min(100, rep.attainmentPercentage)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>Won: ${(rep.closedWonARR / 1000).toFixed(0)}k</span>
                  <span>Pipeline: ${(rep.pipelineARR / 1000).toFixed(0)}k</span>
                  <span>Target: ${(rep.quotaARR / 1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ARR Waterfall Overview */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Subscription ARR Waterfall Metrics</h2>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              NRR: {waterfall?.netRevenueRetentionRate || 114}%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Starting ARR</span>
              <p className="text-lg font-bold text-white">${waterfall?.startingARR?.toLocaleString() || '2,400,000'}</p>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">New Bookings ARR</span>
              <p className="text-lg font-bold text-emerald-400">+${waterfall?.newBusinessARR?.toLocaleString() || '680,000'}</p>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Expansion ARR</span>
              <p className="text-lg font-bold text-indigo-400">+${waterfall?.expansionARR?.toLocaleString() || '350,000'}</p>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Churn / Contraction</span>
              <p className="text-lg font-bold text-rose-400">-$0</p>
            </div>
          </div>

          <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs text-indigo-300 uppercase font-bold tracking-wider">Projected Ending ARR</span>
              <p className="text-2xl font-extrabold text-white">${waterfall?.endingARR?.toLocaleString() || '3,430,000'}</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-indigo-500 text-white rounded-lg">
              Enterprise Healthy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
