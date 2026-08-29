import React, { useState } from 'react';

export const RevenueAnalyticsDashboardView: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'Q1_2026' | 'Q2_2026' | 'FY2026'>('Q1_2026');

  // Executive RevOps KPIs
  const kpis = {
    totalARR: 4850000,
    netNewARR: 620000,
    nrrPercentage: 118,
    grrPercentage: 96,
    ltvCacRatio: 4.4,
    cacPaybackMonths: 10.8,
    averageContractValue: 145000,
    pipelineCoverageRatio: 3.6
  };

  const cohortData = [
    { month: '2025-09', initialARR: 450000, currentARR: 531000, grr: 96, nrr: 118, count: 10 },
    { month: '2025-10', initialARR: 495000, currentARR: 574000, grr: 95, nrr: 116, count: 11 },
    { month: '2025-11', initialARR: 540000, currentARR: 615000, grr: 96, nrr: 114, count: 12 },
    { month: '2025-12', initialARR: 630000, currentARR: 705000, grr: 97, nrr: 112, count: 14 },
    { month: '2026-01', initialARR: 585000, currentARR: 643000, grr: 98, nrr: 110, count: 13 },
    { month: '2026-02', initialARR: 675000, currentARR: 729000, grr: 99, nrr: 108, count: 15 }
  ];

  const repLeaderboard = [
    { rank: 1, name: 'Marcus Vance', quota: 1800000, closedWon: 2160000, attainment: 120, dealsWon: 9, commission: 259200 },
    { rank: 2, name: 'Alexandra Sterling', quota: 2500000, closedWon: 2750000, attainment: 110, dealsWon: 7, commission: 302500 },
    { rank: 3, name: 'Jonathan Holloway', quota: 1500000, closedWon: 1425000, attainment: 95, dealsWon: 5, commission: 142500 }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Revenue Operations & Cohort Intelligence</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">REVOPS EXECUTIVE BI</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Longitudinal Net Revenue Retention (NRR), LTV:CAC Unit Economics, Pipeline Velocity, and Sales Rep Quota Pacing.
          </p>
        </div>

        <div className="flex gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setSelectedTimeframe('Q1_2026')}
            className={`px-3 py-1.5 rounded-xl transition ${selectedTimeframe === 'Q1_2026' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Q1 2026
          </button>
          <button
            onClick={() => setSelectedTimeframe('Q2_2026')}
            className={`px-3 py-1.5 rounded-xl transition ${selectedTimeframe === 'Q2_2026' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Q2 2026
          </button>
          <button
            onClick={() => setSelectedTimeframe('FY2026')}
            className={`px-3 py-1.5 rounded-xl transition ${selectedTimeframe === 'FY2026' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            FY2026
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">Total Active ARR</span>
          <span className="text-2xl font-black text-white font-mono block">${(kpis.totalARR / 1000000).toFixed(2)}M</span>
          <span className="text-[10px] text-emerald-400 font-bold">+18.4% YoY Growth</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">Net Retention (NRR)</span>
          <span className="text-2xl font-black text-emerald-400 font-mono block">{kpis.nrrPercentage}%</span>
          <span className="text-[10px] text-slate-500">Gross Retention: {kpis.grrPercentage}%</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">LTV : CAC Ratio</span>
          <span className="text-2xl font-black text-indigo-400 font-mono block">{kpis.ltvCacRatio}x</span>
          <span className="text-[10px] text-slate-400">Payback: {kpis.cacPaybackMonths} mo</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">Pipeline Coverage</span>
          <span className="text-2xl font-black text-cyan-400 font-mono block">{kpis.pipelineCoverageRatio}x</span>
          <span className="text-[10px] text-emerald-400 font-bold">Target: 3.0x (Healthy)</span>
        </div>
      </div>

      {/* Cohort Retention Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white">Longitudinal Cohort Retention (ASC 606 / NRR Waterfall)</h3>
            <p className="text-[11px] text-slate-400">Tracks account cohort expansion and gross revenue preservation over time.</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">NRR Expansion Zone</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">Cohort Month</th>
                <th className="py-3 px-4">Initial ARR</th>
                <th className="py-3 px-4">Current ARR</th>
                <th className="py-3 px-4">Gross Retention (GRR)</th>
                <th className="py-3 px-4">Net Retention (NRR)</th>
                <th className="py-3 px-4 text-right">Expansion Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {cohortData.map(c => (
                <tr key={c.month} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-mono text-white font-bold">{c.month} ({c.count} accounts)</td>
                  <td className="py-3 px-4 font-mono text-slate-300">${(c.initialARR / 1000).toFixed(0)}k</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">${(c.currentARR / 1000).toFixed(0)}k</td>
                  <td className="py-3 px-4 font-bold text-slate-300">{c.grr}%</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold font-mono">
                      {c.nrr}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-emerald-400 font-bold">
                    +${((c.currentARR - c.initialARR) / 1000).toFixed(0)}k
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rep Leaderboard */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white">Sales Representative Quota Attainment & Accelerators</h3>
            <p className="text-[11px] text-slate-400">Live pacing against FY2026 targets with tiered commission calculation.</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">President Club Tier Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Account Executive</th>
                <th className="py-3 px-4">Annual Quota</th>
                <th className="py-3 px-4">Closed Won YTD</th>
                <th className="py-3 px-4">Attainment %</th>
                <th className="py-3 px-4 text-right">Commission Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {repLeaderboard.map(rep => (
                <tr key={rep.rank} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-indigo-400">#{rep.rank}</td>
                  <td className="py-3 px-4 font-bold text-white">{rep.name}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">${(rep.quota / 1000).toFixed(0)}k</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">${(rep.closedWon / 1000).toFixed(0)}k</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold font-mono ${
                      rep.attainment >= 100 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {rep.attainment}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-white font-bold">
                    ${rep.commission.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
