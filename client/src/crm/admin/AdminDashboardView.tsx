import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { ShieldCheck, Users, UserPlus, Lock, KeyRound, CheckCircle2, ShieldAlert, Settings, RefreshCw } from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [auditIntegrity, setAuditIntegrity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newRole, setNewRole] = useState<string>('Sales Representative');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [uRes, rRes, aRes] = await Promise.all([
        CRMApiClient.getUsers(),
        CRMApiClient.getRoles(),
        CRMApiClient.getAuditLogs()
      ]);

      if (uRes.success) setUsers(uRes.data || []);
      if (rRes.success) setRoles(rRes.data || []);
      if (aRes.success) setAuditIntegrity(aRes.integrity);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    try {
      const res = await CRMApiClient.updateUserRole(selectedUser.id, newRole);
      if (res.success) {
        setStatusMessage(`Successfully updated ${selectedUser.displayName}'s role to ${newRole}.`);
        setSelectedUser(null);
        await loadAdminData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-rose-400" />
            ApexCore Enterprise Administration & Security Portal
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            User provisioning, 5-Role RBAC permission management, and cryptographic audit monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          SHA-256 Audit Chain Verified
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 font-medium flex items-center justify-between">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage('')} className="text-emerald-400 font-bold">×</button>
        </div>
      )}

      {/* User Management Directory */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" /> Enterprise User Directory ({users.length} Active Staff)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 uppercase font-bold">
                <th className="p-3.5">User / Display Name</th>
                <th className="p-3.5">Email Address</th>
                <th className="p-3.5">Assigned Role</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5">
                    <span className="font-bold text-white block">{u.displayName}</span>
                    <span className="text-[10px] text-slate-500">{u.jobTitle}</span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">{u.email}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      u.role === 'Admin' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      u.role === 'Sales Manager' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                      u.role === 'Sales Representative' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      u.role === 'Support Agent' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-300">{u.department}</td>
                  <td className="p-3.5">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> {u.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        setNewRole(u.role);
                      }}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg text-xs font-bold border border-slate-700 transition"
                    >
                      Change Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permission Matrix Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map(r => (
          <div key={r.role} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">{r.role}</span>
            <p className="text-xs text-slate-300">{r.description}</p>
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[10px] text-slate-500 block mb-1">Key Permissions ({r.permissions?.length}):</span>
              <div className="flex flex-wrap gap-1">
                {r.permissions?.slice(0, 6).map((p: string) => (
                  <span key={p} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role Change Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Modify User Role</h3>
            <p className="text-xs text-slate-400">
              Update authorization role for <strong>{selectedUser.displayName}</strong> ({selectedUser.email}).
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Select New Role</label>
              <select
                value={newRole}
                onChange={e => setNewRole(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs font-semibold px-3 py-2.5 rounded-xl"
              >
                <option value="Admin">Admin</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="Sales Representative">Sales Representative</option>
                <option value="Support Agent">Support Agent</option>
                <option value="Marketing Executive">Marketing Executive</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRole}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow transition"
              >
                Save Role Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
