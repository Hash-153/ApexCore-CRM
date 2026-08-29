import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { GitFork, Zap, Play, CheckCircle2, ArrowRight } from 'lucide-react';

export const WorkflowBuilderView: React.FC = () => {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    setLoading(true);
    try {
      const res = await CRMApiClient.getWorkflows();
      if (res.success && res.data) {
        setWorkflows(res.data);
      }
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
          <GitFork className="w-6 h-6 text-indigo-400" />
          Trigger-Condition-Action Visual Workflow Engine
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Automate rep assignment, follow-up task dispatching, stage alerts, and webhook triggers.
        </p>
      </div>

      <div className="space-y-4">
        {workflows.map(wf => (
          <div key={wf.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Zap className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{wf.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{wf.description}</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {wf.isActive ? 'Active' : 'Paused'}
              </span>
            </div>

            {/* Visual Workflow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              {/* Trigger */}
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400">1. Trigger Event</span>
                <p className="font-bold text-white">{wf.triggerType}</p>
                <p className="text-slate-400">Target: {wf.entityType}</p>
              </div>

              {/* Conditions */}
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-400">2. Evaluation Logic ({wf.conditionLogic})</span>
                <div className="space-y-0.5">
                  {wf.conditions?.map((cond: any, i: number) => (
                    <p key={i} className="text-slate-300 font-mono text-[11px]">
                      {cond.field} {cond.operator} {cond.value}
                    </p>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400">3. Automated Actions ({wf.actions?.length})</span>
                <div className="space-y-0.5 text-slate-300 text-[11px]">
                  {wf.actions?.map((act: any, i: number) => (
                    <p key={i}>• {act.type.replace(/_/g, ' ')}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-800">
              <span>Executions: <strong>{wf.executionCount}</strong> times</span>
              <span>Last Run: {wf.lastExecutedAt ? new Date(wf.lastExecutedAt).toLocaleString() : 'Recent'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
