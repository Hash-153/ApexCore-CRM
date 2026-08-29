import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import {
  Building2,
  ArrowLeft,
  HeartPulse,
  DollarSign,
  Users,
  Clock,
  FileText,
  Paperclip,
  Plus,
  Send,
  Pin,
  Trash2,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Kanban
} from 'lucide-react';
import { CustomerEditModal } from './CustomerEditModal';

interface CustomerProfileViewProps {
  customerId: string;
  onBack: () => void;
}

export const CustomerProfileView: React.FC<CustomerProfileViewProps> = ({ customerId, onBack }) => {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'INTERACTIONS' | 'NOTES_ATTACHMENTS' | 'DEALS' | 'TICKETS'>('OVERVIEW');
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Interaction Form state
  const [interactionForm, setInteractionForm] = useState({
    type: 'CALL',
    subject: '',
    description: '',
    durationMinutes: 30,
    sentiment: 'POSITIVE',
    nextSteps: ''
  });
  const [showInteractionForm, setShowInteractionForm] = useState(false);

  // Note Form state
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);

  // Attachment Form state
  const [attFileName, setAttFileName] = useState('');
  const [attCategory, setAttCategory] = useState('CONTRACT');
  const [showAttForm, setShowAttForm] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [customerId]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await CRMApiClient.getCustomerProfile(customerId);
      if (res.success) {
        setProfile(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await CRMApiClient.setCustomerStatus(customerId, newStatus);
      await loadProfile();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogInteraction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await CRMApiClient.logInteraction(customerId, {
        ...interactionForm,
        userId: 'usr_marcus_vance',
        userName: 'Marcus Vance'
      });
      if (res.success) {
        setInteractionForm({
          type: 'CALL',
          subject: '',
          description: '',
          durationMinutes: 30,
          sentiment: 'POSITIVE',
          nextSteps: ''
        });
        setShowInteractionForm(false);
        await loadProfile();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await CRMApiClient.addNote(customerId, {
        title: noteTitle,
        content: noteContent,
        userId: 'usr_marcus_vance',
        authorName: 'Marcus Vance'
      });
      if (res.success) {
        setNoteTitle('');
        setNoteContent('');
        setShowNoteForm(false);
        await loadProfile();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTogglePin = async (noteId: string) => {
    try {
      await CRMApiClient.togglePinNote(customerId, noteId);
      await loadProfile();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (confirm('Delete this customer note?')) {
      try {
        await CRMApiClient.deleteNote(customerId, noteId);
        await loadProfile();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleAddAttachment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await CRMApiClient.addAttachment(customerId, {
        fileName: attFileName,
        fileSize: 1540000,
        mimeType: 'application/pdf',
        category: attCategory,
        uploadedBy: 'usr_marcus_vance',
        uploaderName: 'Marcus Vance'
      });
      if (res.success) {
        setAttFileName('');
        setShowAttForm(false);
        await loadProfile();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAttachment = async (attId: string) => {
    if (confirm('Delete this document attachment?')) {
      try {
        await CRMApiClient.deleteAttachment(customerId, attId);
        await loadProfile();
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (loading || !profile) {
    return <div className="p-12 text-center text-slate-400 text-xs">Loading Customer 360 profile...</div>;
  }

  const { customer, contacts, opportunities, interactions, notes, attachments, activeTickets } = profile;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Back to Directory"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{customer.name}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {customer.tier?.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {customer.customerNumber} • {customer.industry} • Owner: <strong>{customer.ownerName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Selector Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Status:</span>
              <select
                value={customer.status}
                onChange={e => handleStatusChange(e.target.value)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                  customer.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                  customer.status === 'PROSPECT' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' :
                  customer.status === 'SUSPENDED' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                  'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="PROSPECT">PROSPECT</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="SUSPENDED">SUSPENDED</option>
                <option value="CHURNED">CHURNED</option>
                <option value="ONBOARDING">ONBOARDING</option>
              </select>
            </div>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition"
            >
              Edit Details
            </button>
          </div>
        </div>

        {/* Health & Revenue KPI Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Account Health Index</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-emerald-400">{customer.healthScore}/100</span>
              <HeartPulse className="w-4 h-4 text-rose-400" />
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Active ARR</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-white">${(customer.activeARR || 0).toLocaleString()}</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Churn Risk Index</span>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-sm font-extrabold ${customer.churnRisk === 'LOW' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {customer.churnRisk}
              </span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Expansion Probability</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-indigo-400">{customer.expansionProbability}%</span>
              <span className="text-[10px] text-slate-500">Pipeline</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs">
        {[
          { id: 'OVERVIEW', label: 'Company Overview & Contacts', icon: Building2 },
          { id: 'INTERACTIONS', label: `Interaction Timeline (${interactions.length})`, icon: Clock },
          { id: 'NOTES_ATTACHMENTS', label: `Notes (${notes.length}) & Attachments (${attachments.length})`, icon: FileText },
          { id: 'DEALS', label: `Deals & Pipeline (${opportunities.length})`, icon: Kanban },
          { id: 'TICKETS', label: `SLA Support Tickets (${activeTickets.length})`, icon: AlertTriangle }
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-400" /> Corporate Details & Firmographics
            </h3>

            <div className="space-y-2 text-xs divide-y divide-slate-800">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Legal Entity:</span>
                <span className="font-semibold text-white">{customer.legalName}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Domain:</span>
                <span className="font-mono text-indigo-300">{customer.domain || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Annual Revenue:</span>
                <span className="font-semibold text-emerald-400">${(customer.annualRevenue / 1000000).toFixed(1)}M USD</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Headcount:</span>
                <span className="font-semibold text-white">{customer.employeeCount?.toLocaleString()} Employees</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Phone:</span>
                <span className="font-semibold text-white">{customer.phone}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Email:</span>
                <span className="font-semibold text-white">{customer.email}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Headquarters:</span>
                <span className="font-semibold text-white text-right">
                  {customer.billingAddress?.city}, {customer.billingAddress?.state} ({customer.billingAddress?.country})
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" /> Stakeholder Buying Committee ({contacts.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contacts.map((contact: any) => (
                <div key={contact.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 space-y-1.5 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-white text-sm">{contact.firstName} {contact.lastName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                      {contact.persona}
                    </span>
                  </div>
                  <p className="text-slate-400">{contact.title}</p>
                  <p className="text-slate-500 text-[11px]">{contact.department}</p>
                  <div className="flex justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-700/50">
                    <span>Influence: {contact.decisionInfluenceScore}/10</span>
                    <span className="font-mono text-indigo-300">{contact.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIONS TIMELINE */}
      {activeTab === 'INTERACTIONS' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Chronological Customer Interactions</h3>
              <p className="text-xs text-slate-400 mt-0.5">Calls, Emails, Meetings, Demos, and Milestone Stage Changes.</p>
            </div>
            <button
              onClick={() => setShowInteractionForm(!showInteractionForm)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5" /> Log Interaction
            </button>
          </div>

          {/* New Interaction Form */}
          {showInteractionForm && (
            <form onSubmit={handleLogInteraction} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Interaction Type</label>
                  <select
                    value={interactionForm.type}
                    onChange={e => setInteractionForm({ ...interactionForm, type: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                  >
                    <option value="CALL">Phone Call</option>
                    <option value="EMAIL">Email Exchange</option>
                    <option value="MEETING">Executive Meeting</option>
                    <option value="DEMO">Product Demo</option>
                    <option value="NOTE">Internal Note</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-bold mb-1">Subject / Summary</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Q3 Executive Architecture Review"
                    value={interactionForm.subject}
                    onChange={e => setInteractionForm({ ...interactionForm, subject: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Meeting Notes & Outcomes</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Details discussed with customer..."
                  value={interactionForm.description}
                  onChange={e => setInteractionForm({ ...interactionForm, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInteractionForm(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold"
                >
                  Save Log Entry
                </button>
              </div>
            </form>
          )}

          {/* Timeline Stream */}
          <div className="space-y-4 pt-2">
            {interactions.map((int: any) => (
              <div key={int.id} className="relative pl-6 border-l-2 border-slate-800 space-y-1 pb-4 last:pb-0">
                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-indigo-500"></div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-white">{int.subject}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono">
                      {int.type}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">{new Date(int.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-slate-300">{int.description}</p>
                {int.outcome && (
                  <div className="text-[11px] text-emerald-400 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                    <strong>Outcome:</strong> {int.outcome}
                  </div>
                )}
                <div className="text-[10px] text-slate-500 pt-1">
                  Logged by {int.userName} ({int.userRole})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: NOTES & ATTACHMENTS */}
      {activeTab === 'NOTES_ATTACHMENTS' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notes Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" /> Customer Notes ({notes.length})
              </h3>
              <button
                onClick={() => setShowNoteForm(!showNoteForm)}
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300"
              >
                <Plus className="w-3.5 h-3.5" /> Add Note
              </button>
            </div>

            {showNoteForm && (
              <form onSubmit={handleAddNote} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2.5 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Note Title"
                  value={noteTitle}
                  onChange={e => setNoteTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Type customer memo in markdown..."
                  value={noteContent}
                  onChange={e => setNoteContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white resize-none"
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowNoteForm(false)} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg">Cancel</button>
                  <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-bold">Save Note</button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {notes.map((n: any) => (
                <div key={n.id} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/60 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      {n.isPinned && <Pin className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                      {n.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleTogglePin(n.id)} className="text-slate-400 hover:text-amber-400">
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteNote(n.id)} className="text-slate-400 hover:text-rose-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-300">{n.content}</p>
                  <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-700/50">
                    By {n.authorName} • {new Date(n.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-emerald-400" /> Document Attachments ({attachments.length})
              </h3>
              <button
                onClick={() => setShowAttForm(!showAttForm)}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                <Plus className="w-3.5 h-3.5" /> Upload Document
              </button>
            </div>

            {showAttForm && (
              <form onSubmit={handleAddAttachment} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2.5 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Document File Name (e.g. Master_Agreement.pdf)"
                  value={attFileName}
                  onChange={e => setAttFileName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                />
                <select
                  value={attCategory}
                  onChange={e => setAttCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                >
                  <option value="CONTRACT">Contract / Agreement</option>
                  <option value="PROPOSAL">Pricing Proposal</option>
                  <option value="SECURITY_REVIEW">Security & Compliance Review</option>
                  <option value="NDA">Non-Disclosure Agreement</option>
                  <option value="TECHNICAL_SPEC">Technical Architecture Spec</option>
                </select>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAttForm(false)} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg">Cancel</button>
                  <button type="submit" className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold">Register Document</button>
                </div>
              </form>
            )}

            <div className="space-y-2.5">
              {attachments.map((a: any) => (
                <div key={a.id} className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{a.fileName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Category: {a.category} • {(a.fileSize / 1000000).toFixed(2)} MB
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => alert(`Simulating download of ${a.fileName}`)}
                      className="px-2.5 py-1 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 rounded-lg font-bold"
                    >
                      Download
                    </button>
                    <button onClick={() => handleDeleteAttachment(a.id)} className="text-slate-500 hover:text-rose-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DEALS & REVENUE */}
      {activeTab === 'DEALS' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Kanban className="w-4 h-4 text-indigo-400" /> Associated Deal Pipeline Opportunities ({opportunities.length})
          </h3>

          <div className="space-y-3">
            {opportunities.map((opp: any) => (
              <div key={opp.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-white text-sm">{opp.name}</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Stage: <strong className="text-indigo-400">{opp.stage}</strong> • Close Date: {opp.closeDate}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-emerald-400">${opp.amount?.toLocaleString()}</span>
                  <span className="block text-[10px] text-slate-500">Prob: {opp.probabilityPercentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: TICKETS */}
      {activeTab === 'TICKETS' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Active Support Tickets & SLA Status ({activeTickets.length})
          </h3>

          <div className="space-y-3">
            {activeTickets.map((t: any) => (
              <div key={t.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 flex justify-between items-center text-xs">
                <div>
                  <span className="font-mono text-[10px] text-indigo-400">{t.ticketNumber}</span>
                  <h4 className="font-bold text-white text-sm">{t.subject}</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">Priority: <strong>{t.priority}</strong> • Status: {t.status}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400">{t.sla?.minutesRemainingToResolution || 420}m SLA</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <CustomerEditModal
          customer={customer}
          onClose={() => setIsEditModalOpen(false)}
          onSaved={async () => {
            setIsEditModalOpen(false);
            await loadProfile();
          }}
        />
      )}
    </div>
  );
};
