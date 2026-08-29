import React, { useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { Building2, X, CheckCircle2 } from 'lucide-react';

interface CustomerEditModalProps {
  customer?: any;
  onClose: () => void;
  onSaved: () => void;
}

export const CustomerEditModal: React.FC<CustomerEditModalProps> = ({
  customer,
  onClose,
  onSaved
}) => {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    legalName: customer?.legalName || '',
    domain: customer?.domain || '',
    status: customer?.status || 'PROSPECT',
    tier: customer?.tier || 'TIER_3_STANDARD',
    industry: customer?.industry || 'Enterprise Software',
    annualRevenue: customer?.annualRevenue || 10000000,
    employeeCount: customer?.employeeCount || 100,
    phone: customer?.phone || '+1 (555) 000-0000',
    email: customer?.email || '',
    website: customer?.website || '',
    ownerName: customer?.ownerName || 'Marcus Vance',
    ownerId: customer?.ownerId || 'usr_marcus_vance',
    street: customer?.billingAddress?.street || '100 Enterprise Way',
    city: customer?.billingAddress?.city || 'San Francisco',
    state: customer?.billingAddress?.state || 'CA',
    postalCode: customer?.billingAddress?.postalCode || '94105',
    country: customer?.billingAddress?.country || 'United States'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name: formData.name,
      legalName: formData.legalName,
      domain: formData.domain,
      status: formData.status,
      tier: formData.tier,
      industry: formData.industry,
      annualRevenue: Number(formData.annualRevenue),
      employeeCount: Number(formData.employeeCount),
      phone: formData.phone,
      email: formData.email,
      website: formData.website,
      ownerName: formData.ownerName,
      ownerId: formData.ownerId,
      billingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country
      }
    };

    try {
      if (customer?.id) {
        const res = await CRMApiClient.updateCustomer(customer.id, payload);
        if (res.success) onSaved();
        else setError(res.error || 'Update failed.');
      } else {
        const res = await CRMApiClient.createCustomer(payload);
        if (res.success) onSaved();
        else setError(res.error || 'Creation failed.');
      }
    } catch (err: any) {
      setError(err.message || 'Error saving customer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full space-y-5 shadow-2xl my-8">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            {customer?.id ? 'Edit Customer Details' : 'Register New Customer Account'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Company / Customer Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Horizon Health Systems"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Corporate Domain</label>
              <input
                type="text"
                value={formData.domain}
                onChange={e => setFormData({ ...formData, domain: e.target.value })}
                placeholder="e.g. horizonhealth.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Account Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="PROSPECT">PROSPECT</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="SUSPENDED">SUSPENDED</option>
                <option value="CHURNED">CHURNED</option>
                <option value="ONBOARDING">ONBOARDING</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Customer Tier</label>
              <select
                value={formData.tier}
                onChange={e => setFormData({ ...formData, tier: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="TIER_1_STRATEGIC">TIER 1 (Strategic)</option>
                <option value="TIER_2_KEY">TIER 2 (Key)</option>
                <option value="TIER_3_STANDARD">TIER 3 (Standard)</option>
                <option value="TIER_4_EMERGING">TIER 4 (Emerging)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Industry Classification</label>
              <input
                type="text"
                value={formData.industry}
                onChange={e => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Annual Revenue (USD)</label>
              <input
                type="number"
                value={formData.annualRevenue}
                onChange={e => setFormData({ ...formData, annualRevenue: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Employee Headcount</label>
              <input
                type="number"
                value={formData.employeeCount}
                onChange={e => setFormData({ ...formData, employeeCount: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Primary Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Primary Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <span className="font-bold text-slate-400 block mb-2">Corporate Headquarters / Billing Address</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={e => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow transition"
            >
              {loading ? 'Saving...' : customer?.id ? 'Save Changes' : 'Register Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
