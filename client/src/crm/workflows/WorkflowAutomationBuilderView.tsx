import React, { useState } from 'react';
import { WorkflowRule } from '../../types';
import { WorkflowTrigger, WorkflowActionType } from '../../types';

interface WorkflowBuilderProps {
  workflows?: WorkflowRule[];
  onSaveWorkflow?: (workflow: any) => void;
}

export const WorkflowAutomationBuilderView: React.FC<WorkflowBuilderProps> = ({
  workflows = [],
  onSaveWorkflow
}) => {
  const [activeWorkflows, setActiveWorkflows] = useState<WorkflowRule[]>(workflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowRule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // New Workflow Form State
  const [name, setName] = useState<string>('Auto-Assign Major Enterprise Leads to Strategic AE');
  const [description, setDescription] = useState<string>('Triggers when an enterprise lead with >$50M ARR is submitted.');
  const [trigger, setTrigger] = useState<WorkflowTrigger>(WorkflowTrigger.LEAD_CREATED);
  const [conditionField, setConditionField] = useState<string>('annualRevenue');
  const [conditionOperator, setConditionOperator] = useState<string>('GREATER_THAN');
  const [conditionValue, setConditionValue] = useState<string>('50000000');
  const [actionType, setActionType] = useState<WorkflowActionType>(WorkflowActionType.ASSIGN_OWNER);
  const [actionValue, setActionValue] = useState<string>('usr_marcus_vance');

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    const newRule: any = {
      id: `wf_${Date.now()}`,
      tenantId: 'tenant_apex_global_001',
      name,
      description,
      trigger,
      conditions: [
        {
          field: conditionField,
          operator: conditionOperator as any,
          value: conditionValue
        }
      ],
      actions: [
        {
          type: actionType,
          targetValue: actionValue
        }
      ],
      isActive: true,
      executionCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setActiveWorkflows(prev => [newRule, ...prev]);
    if (onSaveWorkflow) onSaveWorkflow(newRule);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Visual Workflow Automation Engine</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">TRIGGER-CONDITION-ACTION</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Build event-driven revenue operations automations with declarative AST expressions, dynamic field transformations, and external webhooks.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
        >
          + Build New Automation Rule
        </button>
      </div>

      {/* Workflows List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeWorkflows.map(wf => (
          <div
            key={wf.id}
            className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-6 shadow-xl space-y-4 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-extrabold text-white text-sm">{wf.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{wf.description}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                wf.isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'
              }`}>
                {wf.isActive ? 'Active' : 'Disabled'}
              </span>
            </div>

            {/* Visual Node Chain */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">TRIGGER</span>
                <span className="font-mono text-slate-300">{wf.trigger}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">IF CONDITION</span>
                <span className="font-mono text-slate-300">
                  {wf.conditions && wf.conditions[0] ? `${wf.conditions[0].field} ${wf.conditions[0].operator} ${wf.conditions[0].value}` : 'Always True'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">THEN ACTION</span>
                <span className="font-mono text-slate-300">
                  {wf.actions && wf.actions[0] ? `${wf.actions[0].type} (${wf.actions[0].targetValue || 'Execute'})` : 'Execute Workflow'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
              <span>Executions: <strong className="text-white">{wf.executionCount || 0}</strong></span>
              <span>Updated: {new Date(wf.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Workflow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Create Automation Workflow</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateWorkflow} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Rule Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">1. Event Trigger</label>
                <select
                  value={trigger}
                  onChange={e => setTrigger(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value={WorkflowTrigger.LEAD_CREATED}>Lead Created</option>
                  <option value={WorkflowTrigger.OPPORTUNITY_STAGE_CHANGED}>Opportunity Stage Advanced</option>
                  <option value={WorkflowTrigger.TICKET_CREATED}>Support Ticket Ingested</option>
                  <option value={WorkflowTrigger.CUSTOMER_STATUS_CHANGED}>Customer Status Transitioned</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Condition Field</label>
                  <input
                    type="text"
                    value={conditionField}
                    onChange={e => setConditionField(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Operator</label>
                  <select
                    value={conditionOperator}
                    onChange={e => setConditionOperator(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  >
                    <option value="EQUALS">== EQUALS</option>
                    <option value="GREATER_THAN">&gt; GREATER THAN</option>
                    <option value="CONTAINS">CONTAINS</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Target Value</label>
                  <input
                    type="text"
                    value={conditionValue}
                    onChange={e => setConditionValue(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Action Type</label>
                  <select
                    value={actionType}
                    onChange={e => setActionType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  >
                    <option value={WorkflowActionType.ASSIGN_OWNER}>Assign Record Owner</option>
                    <option value={WorkflowActionType.UPDATE_FIELD}>Update Field Value</option>
                    <option value={WorkflowActionType.CREATE_TASK}>Create Automated Task</option>
                    <option value={WorkflowActionType.TRIGGER_WEBHOOK}>Trigger External Webhook</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Action Parameter / Value</label>
                  <input
                    type="text"
                    value={actionValue}
                    onChange={e => setActionValue(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30"
                >
                  Save & Activate Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
