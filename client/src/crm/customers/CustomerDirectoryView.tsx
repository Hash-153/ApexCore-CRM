import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { Building2, Plus, Search, Filter, ChevronRight, HeartPulse, DollarSign, ShieldAlert, ArrowUpDown, Trash2 } from 'lucide-react';
import { CustomerEditModal } from './CustomerEditModal';

interface CustomerDirectoryViewProps {
  onSelectCustomer: (customerId: string) => void;
}

export const CustomerDirectoryView: React.FC<CustomerDirectoryViewProps> = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tierFilter, setTierFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForEdit, setSelectedForEdit] = useState<any>(null);

  useEffect(() => {
    loadCustomers();
  }, [statusFilter, tierFilter]);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const res = await CRMApiClient.getCustomers({
        search: search || undefined,
        status: statusFilter || undefined,
        tier: tierFilter || undefined
      });
      if (res.success && res.data) {
        setCustomers(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadCustomers();
  };

  const handleDelete = async (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to deactivate customer account: "${name}"?`)) {
      try {
        await CRMApiClient.deleteCustomer(id);
        await loadCustomers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-400" />
            Customer Management & Directory
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Enterprise customer accounts, lifecycle status management, Account 360, and relationship intelligence.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedForEdit(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition"
        >
          <Plus className="w-4 h-4" /> Add New Customer
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by company name, domain, customer number..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </form>

        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-xl"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="PROSPECT">PROSPECT</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="SUSPENDED">SUSPENDED</option>
            <option value="CHURNED">CHURNED</option>
          </select>

          <select
            value={tierFilter}
            onChange={e => setTierFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-xl"
          >
            <option value="">All Tiers</option>
            <option value="TIER_1_STRATEGIC">TIER 1 (Strategic)</option>
            <option value="TIER_2_KEY">TIER 2 (Key)</option>
            <option value="TIER_3_STANDARD">TIER 3 (Standard)</option>
            <option value="TIER_4_EMERGING">TIER 4 (Emerging)</option>
          </select>
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 uppercase font-bold">
                <th className="p-4">Customer / Company</th>
                <th className="p-4">Status & Tier</th>
                <th className="p-4">Industry & Size</th>
                <th className="p-4">Health & ARR</th>
                <th className="p-4">Account Owner</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {customers.map(c => (
                <tr
                  key={c.id}
                  onClick={() => onSelectCustomer(c.id)}
                  className="hover:bg-slate-800/40 cursor-pointer transition"
                >
                  <td className="p-4">
                    <span className="font-extrabold text-white text-sm block">{c.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {c.customerNumber} • {c.domain || 'example.com'}
                    </span>
                  </td>

                  <td className="p-4 space-y-1">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                      c.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      c.status === 'PROSPECT' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                      c.status === 'SUSPENDED' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {c.status}
                    </span>
                    <span className="block text-[10px] text-slate-500 font-medium">
                      {c.tier?.replace(/_/g, ' ')}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="text-slate-200 font-medium block">{c.industry}</span>
                    <span className="text-slate-500 text-[10px]">{c.employeeCount?.toLocaleString()} employees</span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span className="text-emerald-400">${(c.activeARR || 0).toLocaleString()}</span>
                      <span className="text-[10px] text-slate-500">ARR</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] mt-0.5">
                      <HeartPulse className="w-3 h-3 text-rose-400" />
                      <span className="text-slate-400">Health: <strong className="text-white">{c.healthScore || 85}/100</strong></span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="text-slate-300 font-semibold block">{c.ownerName}</span>
                    <span className="text-[10px] text-slate-500">{c.email}</span>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedForEdit(c);
                        setIsModalOpen(true);
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(c.id, c.name, e)}
                      className="px-2 py-1 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition"
                      title="Deactivate Customer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <CustomerEditModal
          customer={selectedForEdit}
          onClose={() => setIsModalOpen(false)}
          onSaved={async () => {
            setIsModalOpen(false);
            await loadCustomers();
          }}
        />
      )}
    </div>
  );
};
