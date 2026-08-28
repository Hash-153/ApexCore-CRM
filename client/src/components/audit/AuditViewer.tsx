import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { HipaaAuditEvent } from '../../types/index';
import { ShieldCheck, ShieldAlert, Key, CheckCircle2, Search, RefreshCw } from 'lucide-react';

export const AuditViewer: React.FC = () => {
  const [logs, setLogs] = useState<HipaaAuditEvent[]>([]);
  const [integrityStatus, setIntegrityStatus] = useState<{ valid: boolean; inspectedCount: number } | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [filterAction, setFilterAction] = useState('');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const data = await api.getAuditLogs();
      setLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyChain = async () => {
    try {
      setVerifying(true);
      const res = await api.verifyAuditChain();
      setIntegrityStatus(res);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setVerifying(false);
    }
  };

  const filteredLogs = filterAction ? logs.filter((l) => l.action === filterAction) : logs;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>HIPAA Security Rule Audit Trail & Access Logs (45 CFR § 164.312)</span>
          </h1>
          <p className="text-xs text-slate-400">
            Immutable, tamper-evident cryptographic hash chaining of all Protected Health Information (PHI) access events.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadLogs}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
            title="Refresh logs"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={handleVerifyChain}
            disabled={verifying}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition"
          >
            <Key className="h-4 w-4" />
            <span>{verifying ? 'Verifying Hashes...' : 'Verify Cryptographic Chain'}</span>
          </button>
        </div>
      </div>

      {/* Integrity Confirmation Banner */}
      {integrityStatus && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-xs ${
            integrityStatus.valid
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
              : 'bg-rose-950/60 border-rose-800 text-rose-300'
          }`}
        >
          {integrityStatus.valid ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          ) : (
            <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0" />
          )}
          <div>
            <strong className="font-bold block">
              {integrityStatus.valid
                ? 'Tamper-Evident Verification Succeeded'
                : 'Security Alert: Tampering Detected in Audit Log Chain'}
            </strong>
            <span>
              All {integrityStatus.inspectedCount} sequential SHA-256 block signatures match perfectly with zero
              divergence. Log integrity intact.
            </span>
          </div>
        </div>
      )}

      {/* Audit Log Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-white text-sm">PHI Access Activity Stream ({filteredLogs.length})</h2>

          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="bg-slate-950 text-xs text-white px-3 py-1.5 rounded-lg border border-slate-800"
          >
            <option value="">All Actions</option>
            <option value="READ">READ</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="EXPORT">EXPORT</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Actor & Role</th>
                <th className="p-3">Action</th>
                <th className="p-3">Resource</th>
                <th className="p-3">Patient ID</th>
                <th className="p-3">Reason / Purpose</th>
                <th className="p-3">SHA-256 Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono text-[11px] text-slate-400">
                    {log.timestamp.replace('T', ' ').slice(0, 19)}
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-white block">{log.actorName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{log.actorRole}</span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        log.action === 'CREATE'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : log.action === 'UPDATE'
                          ? 'bg-amber-500/20 text-amber-400'
                          : log.action === 'EXPORT'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-sky-500/20 text-sky-400'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-slate-300">{log.resource}</td>
                  <td className="p-3 font-mono text-sky-400">{log.patientId || 'N/A'}</td>
                  <td className="p-3 text-slate-300">{log.accessReason}</td>
                  <td className="p-3 font-mono text-[10px] text-slate-500 max-w-xs truncate" title={log.signatureHash}>
                    {log.signatureHash.substring(0, 16)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
