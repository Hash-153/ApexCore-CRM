import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { LifeBuoy, Clock, ShieldCheck, AlertCircle, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const HelpdeskSLAView: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const res = await CRMApiClient.getTickets();
      if (res.success && res.data) {
        setTickets(res.data);
        if (res.data.length > 0 && !selectedTicket) {
          setSelectedTicket(res.data[0]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!selectedTicket || !replyText.trim()) return;
    try {
      const res = await CRMApiClient.addTicketComment(selectedTicket.id, replyText);
      if (res.success && res.data) {
        setSelectedTicket(res.data);
        setReplyText('');
        await loadTickets();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <LifeBuoy className="w-6 h-6 text-indigo-400" />
            Customer Support Helpdesk & SLA Monitor
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time resolution countdown timers, automated breach alerts, and omnichannel triage.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Active Support Tickets</h3>

          <div className="space-y-2">
            {tickets.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTicket(t)}
                className={`w-full text-left p-3.5 rounded-xl border transition ${
                  selectedTicket?.id === t.id
                    ? 'bg-indigo-950/40 border-indigo-500/50 shadow'
                    : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-white line-clamp-1">{t.ticketNumber}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      t.priority === 'P1_URGENT'
                        ? 'bg-rose-500/20 text-rose-400'
                        : t.priority === 'P2_HIGH'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-200 line-clamp-2">{t.subject}</h4>
                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
                  <span>{t.accountName || 'Direct'}</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Clock className="w-3 h-3" /> {t.sla?.minutesRemainingToResolution || 420}m SLA
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ticket Details & Conversation */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          {selectedTicket ? (
            <>
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-400">{selectedTicket.ticketNumber}</span>
                    <h2 className="text-lg font-bold text-white mt-1">{selectedTicket.subject}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Account: <strong>{selectedTicket.accountName}</strong> • Contact: {selectedTicket.contactName} ({selectedTicket.contactEmail})
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-lg">
                    {selectedTicket.status}
                  </span>
                </div>

                {/* Description */}
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                  {selectedTicket.description}
                </div>

                {/* Comments Thread */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversation Log</h4>
                  {selectedTicket.comments?.map((c: any) => (
                    <div key={c.id} className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>{c.authorName} ({c.authorRole})</span>
                        <span className="text-[10px] text-slate-500">{new Date(c.createdAt).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-slate-300">{c.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Box */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Type an official customer response (stops First Response SLA timer)..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none h-20"
                ></textarea>
                <div className="flex justify-end">
                  <button
                    onClick={handleSendReply}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow transition"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Agent Reply
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-500 text-xs">Select a ticket to inspect SLA timers.</div>
          )}
        </div>
      </div>
    </div>
  );
};
