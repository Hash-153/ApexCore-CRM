import React, { useState, useEffect } from 'react';
import { Opportunity } from '../../types';
import { DealStage } from '../../types';

interface PipelineKanbanProps {
  opportunities?: Opportunity[];
  onOpportunityClick?: (opp: Opportunity) => void;
  onStageChange?: (oppId: string, newStage: DealStage) => void;
}

export const PipelineKanbanView: React.FC<PipelineKanbanProps> = ({
  opportunities = [],
  onOpportunityClick,
  onStageChange
}) => {
  const [deals, setDeals] = useState<Opportunity[]>(opportunities);
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('');
  const [selectedStageGateOpp, setSelectedStageGateOpp] = useState<Opportunity | null>(null);

  const STAGES: { stage: DealStage; label: string; minProb: number; color: string }[] = [
    { stage: DealStage.PROSPECTING, label: 'Prospecting', minProb: 10, color: 'border-slate-700 bg-slate-900/50' },
    { stage: DealStage.QUALIFICATION, label: 'Qualification', minProb: 25, color: 'border-blue-700/60 bg-blue-950/20' },
    { stage: DealStage.NEEDS_ANALYSIS, label: 'Needs Analysis', minProb: 40, color: 'border-indigo-700/60 bg-indigo-950/20' },
    { stage: DealStage.VALUE_PROPOSITION, label: 'Value Proposition', minProb: 60, color: 'border-cyan-700/60 bg-cyan-950/20' },
    { stage: DealStage.DECISION_MAKERS_BOUGHT_IN, label: 'Decision Makers', minProb: 75, color: 'border-purple-700/60 bg-purple-950/20' },
    { stage: DealStage.PROPOSAL_PRICE_QUOTE, label: 'Proposal & CPQ', minProb: 85, color: 'border-amber-700/60 bg-amber-950/20' },
    { stage: DealStage.NEGOTIATION_REVIEW, label: 'Negotiation', minProb: 90, color: 'border-orange-700/60 bg-orange-950/20' },
    { stage: DealStage.CLOSED_WON, label: 'Closed Won', minProb: 100, color: 'border-emerald-700/60 bg-emerald-950/20' }
  ];

  const totalWeightedPipeline = deals
    .filter(d => d.stage !== DealStage.CLOSED_LOST && d.stage !== DealStage.CLOSED_WON)
    .reduce((sum, d) => sum + (d.amount * (d.probabilityPercentage / 100)), 0);

  const totalClosedWon = deals
    .filter(d => d.stage === DealStage.CLOSED_WON)
    .reduce((sum, d) => sum + d.amount, 0);

  const filteredDeals = deals.filter(d => {
    const matchesQuery = !filterQuery || d.name.toLowerCase().includes(filterQuery.toLowerCase()) || d.accountName.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesOwner = !selectedOwner || d.ownerName.toLowerCase().includes(selectedOwner.toLowerCase());
    return matchesQuery && matchesOwner;
  });

  const handleDragStart = (e: React.DragEvent, oppId: string) => {
    e.dataTransfer.setData('text/plain', oppId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: DealStage) => {
    e.preventDefault();
    const oppId = e.dataTransfer.getData('text/plain');
    if (!oppId) return;

    const opp = deals.find(d => d.id === oppId);
    if (!opp) return;

    // Check MEDDIC Stage Gate requirements for advanced stages
    if (
      (targetStage === DealStage.PROPOSAL_PRICE_QUOTE || targetStage === DealStage.NEGOTIATION_REVIEW) &&
      (!opp.meddic || opp.meddic.scorePercentage < 70)
    ) {
      setSelectedStageGateOpp(opp);
      return;
    }

    setDeals(prev => prev.map(d => d.id === oppId ? { ...d, stage: targetStage } : d));
    if (onStageChange) onStageChange(oppId, targetStage);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Deal Pipeline & MEDDIC Forecasting</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">STAGE-GATED</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual revenue pipeline with drag-and-drop progression, automated MEDDIC verification gates, and weighted forecast rollups.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-right">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Weighted Pipeline Rollup</span>
            <span className="text-lg font-black text-emerald-400">${Math.round(totalWeightedPipeline).toLocaleString()}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-right">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Closed Won YTD</span>
            <span className="text-lg font-black text-indigo-400">${totalClosedWon.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          value={filterQuery}
          onChange={e => setFilterQuery(e.target.value)}
          placeholder="Filter deals by account or opportunity name..."
          className="w-full sm:w-80 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <div className="flex gap-2">
          <select
            value={selectedOwner}
            onChange={e => setSelectedOwner(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-xl"
          >
            <option value="">All Account Executives</option>
            <option value="Marcus Vance">Marcus Vance</option>
            <option value="Alexandra Sterling">Alexandra Sterling</option>
          </select>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-3 overflow-x-auto pb-4">
        {STAGES.map(col => {
          const colDeals = filteredDeals.filter(d => d.stage === col.stage);
          const colTotal = colDeals.reduce((sum, d) => sum + d.amount, 0);

          return (
            <div
              key={col.stage}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, col.stage)}
              className={`rounded-2xl border ${col.color} p-3 flex flex-col min-h-[520px] transition`}
            >
              {/* Column Header */}
              <div className="border-b border-slate-800 pb-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-white text-xs truncate">{col.label}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {colDeals.length}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold font-mono block mt-0.5">
                  ${colTotal > 0 ? (colTotal / 1000).toFixed(0) + 'k' : '$0'}
                </span>
              </div>

              {/* Deal Cards */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {colDeals.map(deal => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={e => handleDragStart(e, deal.id)}
                    onClick={() => onOpportunityClick && onOpportunityClick(deal)}
                    className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 p-3 rounded-xl shadow-md cursor-grab active:cursor-grabbing transition space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-white text-xs line-clamp-1">{deal.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block truncate">{deal.accountName}</span>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 text-[10px]">
                      <span className="font-extrabold text-emerald-400 font-mono">${(deal.amount || 0).toLocaleString()}</span>
                      <span className="text-slate-400">{deal.probabilityPercentage}%</span>
                    </div>

                    {deal.meddic && (
                      <div className="flex items-center justify-between text-[9px] pt-1 text-slate-500">
                        <span>MEDDIC:</span>
                        <span className={`font-bold ${deal.meddic.scorePercentage >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {deal.meddic.scorePercentage}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* MEDDIC Stage Gate Warning Modal */}
      {selectedStageGateOpp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">⚠️ MEDDIC Qualification Gatekeeper</h3>
              <button onClick={() => setSelectedStageGateOpp(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-xs text-slate-300">
              Opportunity <strong>{selectedStageGateOpp.name}</strong> cannot advance to Proposal/Negotiation stage because its MEDDIC qualification score ({selectedStageGateOpp.meddic?.scorePercentage || 40}%) is below the mandatory 70% threshold.
            </p>
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs space-y-1">
              <span className="font-bold block">Missing Criteria:</span>
              <ul className="list-disc list-inside text-[11px] space-y-0.5">
                <li>Economic Buyer confirmation pending</li>
                <li>Decision Criteria formal sign-off missing</li>
              </ul>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedStageGateOpp(null)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Close & Complete Discovery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
