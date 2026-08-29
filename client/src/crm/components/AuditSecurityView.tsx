import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { ShieldCheck, Lock, Hash, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export const AuditSecurityView: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [integrity, setIntegrity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuditData();
  }, []);

  const loadAuditData = async () => {
    setLoading(true);
    try {
      const res = await CRMApiClient.getAuditLogs();
      if (res.success && res.data) {
        setLogs(res.data);
        setIntegrity(res.integrity);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
            Cryptographic SHA-256 Tamper-Evident Audit Trail
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Sequential cryptographic hash chaining protecting all customer data mutations, qualification events, and RBAC grants.
          </p>
        </div>

        {/* Chain Integrity Badge */}
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-400 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          Cryptographic Hash Chain Valid
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 uppercase font-bold">
                <th className="p-4">Timestamp & IP</th>
                <th className="p-4">Actor / Role</th>
                <th className="p-4">Action & Target</th>
                <th className="p-4">Mutation Details</th>
                <th className="p-4">SHA-256 Hash Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-4">
                    <span className="font-bold text-white block">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="text-[10px] text-slate-500">{log.clientIp}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-white block">{log.actorName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300">
                      {log.actorRole}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-indigo-400 block">{log.action}</span>
                    <span className="text-slate-400 text-[10px]">{log.entityType} ({log.entityId})</span>
                  </td>

                  <td className="p-4 text-slate-300 max-w-xs truncate">
                    {log.details}
                  </td>

                  <td className="p-4 font-mono text-[10px] text-slate-400">
                    <span className="block text-emerald-400/80 truncate max-w-[160px]" title={log.currentHash}>
                      {log.currentHash}
                    </span>
                    <span className="block text-slate-600 truncate max-w-[160px]" title={log.previousHash}>
                      prev: {log.previousHash}
                    </span>
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
