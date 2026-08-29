import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { BarChart3, TrendingUp, PieChart, DollarSign, CheckCircle2, Award } from 'lucide-react';

export const AnalyticsBIView: React.FC = () => {
  const [kpis, setKpis] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [kRes, lRes] = await Promise.all([
        CRMApiClient.getKPIs(),
        CRMApiClient.getLeaderboard()
      ]);
      if (kRes.success) setKpis(kRes.data);
      if (lRes.success) setLeaderboard(lRes.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-400" />
          Revenue Operations & Funnel Analytics BI
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Full-funnel conversion analysis, sales cycle duration telemetry, and win-loss root cause intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Average Sales Cycle</span>
          <p className="text-3xl font-extrabold text-white">{kpis?.salesCycleAverageDays || 45} Days</p>
          <span className="text-xs text-emerald-400 font-medium">8 days faster than industry average</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Average Deal ACV</span>
          <p className="text-3xl font-extrabold text-white">${(kpis?.averageDealSize || 240000).toLocaleString()}</p>
          <span className="text-xs text-indigo-400 font-medium">Enterprise Tier 1 concentration</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Lead to Won Conversion</span>
          <p className="text-3xl font-extrabold text-emerald-400">{kpis?.leadConversionRatePercentage || 32}%</p>
          <span className="text-xs text-slate-400 font-medium">High intent inbound referrals</span>
        </div>
      </div>

      {/* Rep Leaderboard Details */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-400" /> Rep Quota Attainment & Pipeline Coverage
        </h3>

        <div className="space-y-3">
          {leaderboard.map(rep => (
            <div key={rep.repId} className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white text-sm">{rep.repName}</span>
                <div className="text-slate-400 mt-0.5">
                  Quota: ${rep.quotaARR?.toLocaleString()} • Won: ${rep.closedWonARR?.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold text-indigo-400">{rep.attainmentPercentage}%</span>
                <span className="block text-[10px] text-slate-500">{rep.dealsWonCount} deals closed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
