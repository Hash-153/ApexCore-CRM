import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { Kanban, ShieldAlert, ArrowRight, DollarSign, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

const STAGES = [
  { id: 'PROSPECTING', label: '1. Discovery', prob: 10 },
  { id: 'QUALIFICATION', label: '2. Qualification', prob: 25 },
  { id: 'NEEDS_ANALYSIS', label: '3. Needs Scoping', prob: 40 },
  { id: 'VALUE_PROPOSITION', label: '4. Demo / Pitch', prob: 60 },
  { id: 'DECISION_MAKERS_BOUGHT_IN', label: '5. Exec Buy-in', prob: 75 },
  { id: 'PROPOSAL_PRICE_QUOTE', label: '6. CPQ Proposal', prob: 85 },
  { id: 'NEGOTIATION_REVIEW', label: '7. Legal / Security', prob: 90 },
  { id: 'CLOSED_WON', label: '8. Closed Won', prob: 100 }
];

export const DealPipelineKanban: React.FC = () => {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stageError, setStageError] = useState<{ id: string; blockers: string[] } | null>(null);

  useEffect(() => {
    loadPipelineData();
  }, []);

  const loadPipelineData = async () => {
    setLoading(true);
    try {
      const [oppRes, fcRes] = await Promise.all([
        CRMApiClient.getOpportunities(),
        CRMApiClient.getPipelineForecast('pipe_enterprise_direct')
      ]);

      if (oppRes.success) setOpportunities(oppRes.data || []);
      if (fcRes.success) setForecast(fcRes.data);
    } catch (e) {
      console.error('Failed to load pipeline:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvanceStage = async (opp: any, currentStageIdx: number) => {
    if (currentStageIdx >= STAGES.length - 1) return;
    const nextStage = STAGES[currentStageIdx + 1].id;
    setStageError(null);

    try {
      const res = await CRMApiClient.transitionOpportunityStage(opp.id, nextStage);
      if (res.success) {
        await loadPipelineData();
      } else if (res.blockers) {
        setStageError({ id: opp.id, blockers: res.blockers });
      }
    } catch (e: any) {
      console.error('Stage transition error:', e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Forecast Rollup */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Kanban className="w-6 h-6 text-indigo-400" />
            Enterprise Sales Pipeline Kanban
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            MEDDIC gatekeeper compliance, weighted revenue probability forecasting, and stage velocity.
          </p>
        </div>

        {/* Forecast Summary Pill */}
        <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Pipeline</span>
            <p className="text-base font-extrabold text-white">
              ${forecast?.totalPipelineValue ? (forecast.totalPipelineValue / 1000).toFixed(0) : '1,210'}k
            </p>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-400">Weighted Forecast</span>
            <p className="text-base font-extrabold text-indigo-300">
              ${forecast?.weightedForecastValue ? (forecast.weightedForecastValue / 1000).toFixed(0) : '981'}k
            </p>
          </div>
        </div>
      </div>

      {/* Stage Error Alert */}
      {stageError && (
        <div className="bg-rose-950/40 border border-rose-500/50 p-4 rounded-xl flex items-start gap-3 text-rose-200">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold">MEDDIC Stage Gatekeeper Restriction:</p>
            {stageError.blockers.map((b, idx) => (
              <p key={idx} className="text-rose-300">• {b}</p>
            ))}
          </div>
        </div>
      )}

      {/* Kanban Multi-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage, sIdx) => {
          const stageOpps = opportunities.filter(o => o.stage === stage.id);
          const stageTotal = stageOpps.reduce((sum, o) => sum + (o.amount || 0), 0);

          return (
            <div
              key={stage.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col h-full min-w-[260px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-xs font-bold text-white">{stage.label}</h3>
                  <span className="text-[10px] text-slate-400">{stage.prob}% Probability</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-indigo-400">
                    ${(stageTotal / 1000).toFixed(0)}k
                  </span>
                  <span className="text-[10px] block text-slate-500">{stageOpps.length} deals</span>
                </div>
              </div>

              {/* Deal Cards */}
              <div className="space-y-3 flex-1">
                {stageOpps.map(opp => (
                  <div
                    key={opp.id}
                    className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-xl hover:border-indigo-500/60 transition shadow-sm space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-white leading-tight line-clamp-2">
                        {opp.name}
                      </h4>
                    </div>

                    <p className="text-[11px] text-slate-400 font-medium">{opp.accountName}</p>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="font-extrabold text-emerald-400">
                        ${opp.amount?.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {opp.closeDate}
                      </span>
                    </div>

                    {/* MEDDIC Compliance Indicator */}
                    <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          opp.meddic?.isComplete
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        MEDDIC: {opp.meddic?.isComplete ? 'Qualified' : 'Pending'}
                      </span>

                      {sIdx < STAGES.length - 1 && (
                        <button
                          onClick={() => handleAdvanceStage(opp, sIdx)}
                          className="p-1 rounded-lg bg-indigo-600/80 hover:bg-indigo-500 text-white transition"
                          title="Advance to Next Stage"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {stageOpps.length === 0 && (
                  <div className="h-28 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-600 font-medium">
                    No active deals
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
