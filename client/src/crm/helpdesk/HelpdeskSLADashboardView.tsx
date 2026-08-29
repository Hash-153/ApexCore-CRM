import React, { useState } from 'react';
import { Ticket } from '../../types';
import { TicketPriority, TicketStatus } from '../../types';

interface HelpdeskProps {
  tickets?: Ticket[];
  onReplyTicket?: (ticketId: string, replyText: string) => void;
  onAssignTicket?: (ticketId: string, assigneeId: string) => void;
}

export const HelpdeskSLADashboardView: React.FC<HelpdeskProps> = ({
  tickets = [],
  onReplyTicket,
  onAssignTicket
}) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [replyMessage, setReplyMessage] = useState<string>('');

  const filteredTickets = tickets.filter(t => {
    const matchesPriority = !filterPriority || t.priority === filterPriority;
    const matchesStatus = !filterStatus || t.status === filterStatus;
    return matchesPriority && matchesStatus;
  });

  const handleSendReply = () => {
    if (!selectedTicket || !replyMessage) return;
    if (onReplyTicket) onReplyTicket(selectedTicket.id, replyMessage);
    setReplyMessage('');
    setSelectedTicket(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">SLA Helpdesk & Omnichannel Support</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">24/7 SLA RADAR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise support ticketing with policy-driven SLA countdown timers, automated escalation routing, and customer CSAT surveys.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-xl"
          >
            <option value="">All Priorities</option>
            <option value="P1_URGENT">P1 Urgent 🔥</option>
            <option value="P2_HIGH">P2 High ⚡</option>
            <option value="P3_MEDIUM">P3 Medium</option>
            <option value="P4_LOW">P4 Low</option>
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-xl"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 uppercase font-bold">
                <th className="p-4">Ticket</th>
                <th className="p-4">Customer Account</th>
                <th className="p-4">Priority & SLA Window</th>
                <th className="p-4">Status</th>
                <th className="p-4">Assignee</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredTickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-4">
                    <span className="font-bold text-white block text-sm">{ticket.subject}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{ticket.ticketNumber} • {ticket.category}</span>
                  </td>
                  <td className="p-4 text-slate-300 font-medium">{ticket.accountName}</td>
                  <td className="p-4">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                      ticket.priority === TicketPriority.P1_URGENT ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      ticket.priority === TicketPriority.P2_HIGH ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {ticket.priority}
                    </span>
                    <div className="text-[10px] text-emerald-400 font-bold mt-1">
                      SLA: {ticket.sla ? `${ticket.sla.minutesRemainingToResolution}m remaining` : 'On Track'}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-emerald-400 font-bold">{ticket.status}</span>
                  </td>
                  <td className="p-4 text-slate-300">{ticket.assigneeName || 'Sarah Jenkins'}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-xl font-bold transition"
                    >
                      Respond →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Response Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{selectedTicket.subject}</h3>
                <p className="text-xs text-slate-400">{selectedTicket.accountName} ({selectedTicket.ticketNumber})</p>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Customer Inquiry:</span>
              <p>{selectedTicket.description}</p>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-300 block">Official Support Response</label>
              <textarea
                rows={4}
                value={replyMessage}
                onChange={e => setReplyMessage(e.target.value)}
                placeholder="Type response to customer... (SLA timer will halt upon dispatch)"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800 text-xs">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30"
              >
                Dispatch Reply & Fulfill SLA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
