import React, { useState } from 'react';
import { Campaign } from '../../types';

interface MarketingAttributionProps {
  campaigns?: Campaign[];
}

export const MarketingAttributionView: React.FC<MarketingAttributionProps> = ({
  campaigns = []
}) => {
  const [selectedModel, setSelectedModel] = useState<'W_SHAPED' | 'FIRST_TOUCH' | 'LAST_TOUCH' | 'LINEAR'>('W_SHAPED');

  const models = [
    { id: 'W_SHAPED', name: 'W-Shaped Attribution', desc: '40% First Touch, 40% Lead Creation, 20% Middle Nurture', badge: 'Recommended for B2B' },
    { id: 'FIRST_TOUCH', name: 'First-Touch Attribution', desc: '100% credit to the initial lead acquisition source', badge: 'Top of Funnel' },
    { id: 'LAST_TOUCH', name: 'Last-Touch Attribution', desc: '100% credit to the immediate touchpoint prior to deal creation', badge: 'Bottom of Funnel' },
    { id: 'LINEAR', name: 'Linear Equal Multi-Touch', desc: 'Equal fractional credit across all touchpoints in the buyer journey', badge: 'Multi-Touch' }
  ];

  const campaignMetrics = [
    {
      id: 'cmp_abm_cxo_2026',
      name: 'Global Enterprise ABM Campaign 2026',
      channel: 'Account-Based Marketing',
      spend: 18000,
      leads: 64,
      dealsWon: 4,
      revenueWon: 450000,
      roi: 2400,
      status: 'ACTIVE'
    },
    {
      id: 'cmp_webinar_cloud_q1',
      name: 'Modern Revenue Architecture Webinar Series',
      channel: 'Executive Webinar',
      spend: 12000,
      leads: 185,
      dealsWon: 3,
      revenueWon: 280000,
      roi: 2233,
      status: 'ACTIVE'
    },
    {
      id: 'cmp_sem_intent_2026',
      name: 'High-Intent Enterprise Search & Content',
      channel: 'Paid Search (SEM)',
      spend: 25000,
      leads: 320,
      dealsWon: 5,
      revenueWon: 390000,
      roi: 1460,
      status: 'ACTIVE'
    }
  ];

  const totalSpend = campaignMetrics.reduce((s, c) => s + c.spend, 0);
  const totalRevenue = campaignMetrics.reduce((s, c) => s + c.revenueWon, 0);
  const blendedROI = Math.round(((totalRevenue - totalSpend) / totalSpend) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Marketing Campaigns & Multi-Touch Attribution</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">REVENUE ATTRIBUTION</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Algorithmic attribution linking opportunity pipeline and Closed Won deals back to marketing touchpoints.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-right">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Attributed Revenue</span>
            <span className="text-lg font-black text-emerald-400 font-mono">${(totalRevenue / 1000).toFixed(0)}k</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-right">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Blended ROI</span>
            <span className="text-lg font-black text-indigo-400 font-mono">+{blendedROI}%</span>
          </div>
        </div>
      </div>

      {/* Attribution Model Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {models.map(m => (
          <button
            key={m.id}
            onClick={() => setSelectedModel(m.id as any)}
            className={`text-left p-4 rounded-2xl border transition space-y-1.5 ${
              selectedModel === m.id
                ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-600/20 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-xs text-white">{m.name}</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300">{m.badge}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">{m.desc}</p>
          </button>
        ))}
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
        <h3 className="text-sm font-bold text-white">📊 Multi-Channel Campaign ROI Performance</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">Campaign Name</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Budget Spend</th>
                <th className="py-3 px-4">Leads Acquired</th>
                <th className="py-3 px-4">Deals Won</th>
                <th className="py-3 px-4">Attributed Revenue</th>
                <th className="py-3 px-4 text-right">Campaign ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {campaignMetrics.map(cmp => (
                <tr key={cmp.id} className="hover:bg-slate-800/30">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white block">{cmp.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{cmp.id}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-medium">{cmp.channel}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">${cmp.spend.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono text-white font-bold">{cmp.leads}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">{cmp.dealsWon}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-black">${(cmp.revenueWon / 1000).toFixed(0)}k</td>
                  <td className="py-3.5 px-4 text-right font-mono text-indigo-300 font-bold">+{cmp.roi}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
