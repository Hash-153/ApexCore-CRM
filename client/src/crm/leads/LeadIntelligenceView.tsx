import React, { useState } from 'react';
import { Lead } from '../../types';
import { LeadRating, LeadStatus } from '../../types';

interface LeadIntelligenceProps {
  leads?: Lead[];
  onConvertLead?: (leadId: string) => void;
  onEvaluateBANT?: (leadId: string, bant: any) => void;
}

export const LeadIntelligenceView: React.FC<LeadIntelligenceProps> = ({
  leads = [],
  onConvertLead,
  onEvaluateBANT
}) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterRating, setFilterRating] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bantModalLead, setBantModalLead] = useState<Lead | null>(null);

  const [budgetScore, setBudgetScore] = useState<number>(85);
  const [authorityScore, setAuthorityScore] = useState<number>(90);
  const [needScore, setNeedScore] = useState<number>(80);
  const [timelineScore, setTimelineScore] = useState<number>(75);

  const filteredLeads = leads.filter(l => {
    const matchesSearch = !searchQuery || `${l.firstName} ${l.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) || l.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = !filterRating || l.rating === filterRating;
    return matchesSearch && matchesRating;
  });

  const handleOpenBANT = (lead: Lead) => {
    setBantModalLead(lead);
    if (lead.bant) {
      setBudgetScore(lead.bant.hasBudgetConfirmed ? 85 : 40);
      setAuthorityScore(lead.bant.isDecisionMakerIdentified ? 90 : 50);
      setNeedScore(lead.bant.isTechnicalNeedValidated ? 80 : 30);
      setTimelineScore(lead.bant.isTimeframeWithinQuarter ? 75 : 40);
    }
  };

  const handleSaveBANT = () => {
    if (!bantModalLead) return;
    const totalScore = Math.round((budgetScore + authorityScore + needScore + timelineScore) / 4);

    if (onEvaluateBANT) {
      onEvaluateBANT(bantModalLead.id, {
        score: totalScore,
        hasBudgetConfirmed: budgetScore >= 70,
        isDecisionMakerIdentified: authorityScore >= 70,
        isTechnicalNeedValidated: needScore >= 70,
        isTimeframeWithinQuarter: timelineScore >= 70,
        qualificationSummary: `Scored ${totalScore}/100 based on verified enterprise criteria.`
      });
    }

    setBantModalLead(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Lead Intelligence & BANT Scoring Engine</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">AI SCORING</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Algorithmic lead prioritization across Budget, Authority, Need, and Timeline with 1-Click atomic conversion to Account + Contact + Deal.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search leads by name, company, or email..."
          className="w-full sm:w-80 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <div className="flex gap-2">
          <select
            value={filterRating}
            onChange={e => setFilterRating(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-xl"
          >
            <option value="">All Ratings</option>
            <option value="HOT">HOT 🔥</option>
            <option value="WARM">WARM ⚡</option>
            <option value="COLD">COLD ❄️</option>
          </select>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.map(lead => (
          <div
            key={lead.id}
            className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 space-y-3.5 shadow-xl transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-extrabold text-white text-sm">{lead.firstName} {lead.lastName}</h3>
                <span className="text-[11px] text-slate-400">{lead.title} @ <strong className="text-white">{lead.companyName}</strong></span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                lead.rating === LeadRating.HOT ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                lead.rating === LeadRating.WARM ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-slate-800 text-slate-400'
              }`}>
                {lead.rating}
              </span>
            </div>

            {/* BANT Metrics Card */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-slate-400">BANT Score Index:</span>
                <span className="text-emerald-400 font-mono">{lead.score || 85}/100</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {lead.bant?.qualificationSummary || 'Confirmed budget and active executive sponsor identified.'}
              </p>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
              <span>Owner: {lead.ownerName || 'Marcus Vance'}</span>
              <span>Source: {lead.source}</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => handleOpenBANT(lead)}
                className="py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-xl text-xs font-bold transition"
              >
                Evaluate BANT
              </button>
              <button
                onClick={() => onConvertLead && onConvertLead(lead.id)}
                className="py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 transition"
              >
                1-Click Convert →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BANT Evaluation Modal */}
      {bantModalLead && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">BANT Qualification Matrix</h3>
                <p className="text-xs text-slate-400">{bantModalLead.firstName} {bantModalLead.lastName} ({bantModalLead.companyName})</p>
              </div>
              <button onClick={() => setBantModalLead(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-bold text-slate-300">Budget Verification (0-100)</label>
                  <span className="font-mono text-emerald-400">{budgetScore}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={budgetScore}
                  onChange={e => setBudgetScore(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-bold text-slate-300">Authority / Decision Maker (0-100)</label>
                  <span className="font-mono text-emerald-400">{authorityScore}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={authorityScore}
                  onChange={e => setAuthorityScore(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-bold text-slate-300">Technical & Business Need (0-100)</label>
                  <span className="font-mono text-emerald-400">{needScore}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={needScore}
                  onChange={e => setNeedScore(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-bold text-slate-300">Implementation Timeline (0-100)</label>
                  <span className="font-mono text-emerald-400">{timelineScore}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={timelineScore}
                  onChange={e => setTimelineScore(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setBantModalLead(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBANT}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs"
              >
                Save & Recalculate Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
