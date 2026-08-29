import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { Database, Plus, CheckCircle, ShieldCheck } from 'lucide-react';

export const CustomSchemaManager: React.FC = () => {
  const [customFields, setCustomFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFields();
  }, []);

  const loadFields = async () => {
    setLoading(true);
    try {
      const res = await CRMApiClient.getCustomFields();
      if (res.success && res.data) {
        setCustomFields(res.data);
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
          <Database className="w-6 h-6 text-indigo-400" />
          Dynamic Custom Schema & Entity Customizer
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Add runtime custom fields, picklists, and validation rules without database schema migrations.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 uppercase font-bold">
              <th className="p-4">Target Entity</th>
              <th className="p-4">Field Name / Key</th>
              <th className="p-4">Data Type</th>
              <th className="p-4">Required</th>
              <th className="p-4">Options / Constraints</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {customFields.map(cf => (
              <tr key={cf.id} className="hover:bg-slate-800/30 transition">
                <td className="p-4">
                  <span className="font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                    {cf.targetEntity}
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-bold text-white block">{cf.fieldName}</span>
                  <span className="font-mono text-slate-400 text-[10px]">{cf.fieldKey}</span>
                </td>
                <td className="p-4">
                  <span className="font-semibold text-slate-300">{cf.dataType}</span>
                </td>
                <td className="p-4">
                  <span className={cf.isRequired ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                    {cf.isRequired ? 'Yes' : 'Optional'}
                  </span>
                </td>
                <td className="p-4 text-slate-400">
                  {cf.dropdownOptions?.length > 0 ? (
                    <span className="text-[11px] text-slate-300">{cf.dropdownOptions.join(', ')}</span>
                  ) : (
                    'Default text input'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
