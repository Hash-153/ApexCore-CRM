import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { Users, Filter, Plus, ArrowRight, CheckCircle2, Flame, Sparkles, Building2, Mail, Phone } from 'lucide-react';

export const LeadManagementView: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [convertingLead, setConvertingLead] = useState<any>(null);
  const [estAmount, setEstAmount] = useState<number>(150000);
  const [filterRating, setFilterRating] = useState<string>('ALL');

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await CRMApiClient.getLeads();
      if (res.success) {
        setLeads(res.data || []);
      }
    } catch (e) {
      console.error('Failed to load leads:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleConvertLead = async () => {
    if (!convertingLead) return;
    try {
      const res = await CRMApiClient.convertLead(convertingLead.id, {
        createAccount: true,
        createOpportunity: true,
        estimatedAmount: estAmount
      });
      if (res.success) {
        setConvertingLead(null);
        await loadLeads();
      }
    } catch (e) {
      console.error('Convert failed:', e);
    }
  };

  const filteredLeads = leads.filter(l => {
    if (filterRating !== 'ALL' && l.rating !== filterRating) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" />
            Lead Intelligence & BANT Qualification Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Automated demographic scoring, BANT criteria gatekeeper, and 1-Click atomic conversion.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          {['ALL', 'HOT', 'WARM', 'COLD'].map(r => (
            <button
              key={r}
              onClick={() => setFilterRating(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterRating === r ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {r === 'HOT' && '🔥 '}
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/40 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Lead Name / Title</th>
                <th className="p-4">Company & Industry</th>
                <th className="p-4">Source</th>
                <th className="p-4">BANT Score</th>
                <th className="p-4">Status & Rating</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4">
                    <div className="font-bold text-white">
                      {lead.firstName} {lead.lastName}
                    </div>
                    <div className="text-xs text-slate-400">{lead.title}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {lead.email}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-indigo-400" />
                      {lead.companyName}
                    </div>
                    <div className="text-xs text-slate-400">{lead.industry}</div>
                    {lead.annualRevenue > 0 && (
                      <div className="text-xs text-emerald-400 font-medium mt-0.5">
                        Rev: ${(lead.annualRevenue / 1000000).toFixed(0)}M • {lead.numberOfEmployees?.toLocaleString()} Staff
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {lead.source}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold text-white">{lead.score}</span>
                      <span className="text-xs text-slate-400">/ 100</span>
                    </div>
                    <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full ${
                          lead.score >= 80 ? 'bg-rose-500' : lead.score >= 60 ? 'bg-amber-400' : 'bg-blue-400'
                        }`}
                        style={{ width: `${lead.score}%` }}
                      ></div>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      B:{lead.bant?.budgetScore || 0} A:{lead.bant?.authorityScore || 0} N:{lead.bant?.needScore || 0} T:{lead.bant?.timelineScore || 0}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col gap-1.5">
                      <span
                        className={`inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          lead.rating === 'HOT'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : lead.rating === 'WARM'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {lead.rating === 'HOT' && <Flame className="w-3 h-3 mr-1" />}
                        {lead.rating}
                      </span>
                      <span className="text-xs font-medium text-slate-400">{lead.status}</span>
                    </div>
                  </td>

                  <td className="p-4 text-right">
                    {lead.status === 'CONVERTED' ? (
                      <span className="inline-flex items-center text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Converted
                      </span>
                    ) : (
                      <button
                        onClick={() => setConvertingLead(lead)}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow"
                      >
                        1-Click Convert <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Convert Modal */}
      {convertingLead && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-lg w-full shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              1-Click Atomic Lead Conversion
            </h2>
            <p className="text-xs text-slate-400">
              Converting <strong>{convertingLead.firstName} {convertingLead.lastName}</strong> will atomically create a strategic Account, Primary Contact, and Deal Opportunity.
            </p>

            <div className="space-y-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Account:</span>
                <span className="font-bold text-white">{convertingLead.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Primary Contact:</span>
                <span className="font-bold text-white">{convertingLead.firstName} {convertingLead.lastName}</span>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Estimated Opportunity Deal Amount ($):</label>
                <input
                  type="number"
                  value={estAmount}
                  onChange={e => setEstAmount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setConvertingLead(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConvertLead}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow"
              >
                Confirm & Convert Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
