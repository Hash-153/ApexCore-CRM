import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { Megaphone, PieChart, TrendingUp, DollarSign, Target, CheckCircle2 } from 'lucide-react';

export const MarketingCampaignsView: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [attribution, setAttribution] = useState<any>(null);
  const [model, setModel] = useState<string>('LINEAR');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarketingData();
  }, [model]);

  const loadMarketingData = async () => {
    setLoading(true);
    try {
      const [cRes, aRes] = await Promise.all([
        CRMApiClient.getCampaigns(),
        CRMApiClient.getAttribution('opp_horizon_ehr_expansion', model)
      ]);

      if (cRes.success) setCampaigns(cRes.data || []);
      if (aRes.success) setAttribution(aRes.data);
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
          <Megaphone className="w-6 h-6 text-indigo-400" />
          Marketing Automation & Multi-Touch Revenue Attribution
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Evaluate true ROI across webinars, drip nurturing, ABM campaigns, and algorithmic revenue attribution models.
        </p>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map(c => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {c.type}
              </span>
              <span className="text-xs font-bold text-emerald-400">ROI: {c.roiPercentage}%</span>
            </div>

            <h3 className="text-sm font-bold text-white line-clamp-2">{c.name}</h3>

            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-800">
              <div>
                <span className="text-slate-500 text-[10px]">Actual Cost</span>
                <p className="font-bold text-white">${c.actualCost?.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">Revenue Won</span>
                <p className="font-bold text-emerald-400">${c.actualRevenueWon?.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Audience: {c.membersCount}</span>
              <span>Converted: <strong>{c.convertedCount}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Attribution Model Analyzer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Multi-Touch Revenue Attribution Modeling</h3>
          </div>

          <div className="flex gap-2">
            {['FIRST_TOUCH', 'LAST_TOUCH', 'LINEAR', 'TIME_DECAY'].map(m => (
              <button
                key={m}
                onClick={() => setModel(m)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  model === m ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {m.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {attribution && (
          <div className="space-y-3 bg-slate-800/40 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold text-slate-300 pb-2 border-b border-slate-700">
              <span>Target Deal: {attribution.dealName}</span>
              <span className="text-emerald-400 text-sm">${attribution.totalDealAmount?.toLocaleString()}</span>
            </div>

            <div className="space-y-2 pt-1">
              {attribution.attributedCampaigns?.map((ac: any) => (
                <div key={ac.campaignId} className="flex justify-between items-center text-xs bg-slate-800 p-2.5 rounded-lg">
                  <span className="text-white font-medium">{ac.campaignName}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400">Weight: {(ac.touchpointWeight * 100).toFixed(1)}%</span>
                    <span className="font-bold text-emerald-400">${ac.attributedRevenue?.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
