import React, { useState } from 'react';
import { Product, Quote } from '../../types';

interface CPQQuoteBuilderProps {
  products?: Product[];
  onGenerateQuote?: (quoteData: any) => void;
}

export const CPQQuoteBuilderView: React.FC<CPQQuoteBuilderProps> = ({
  products = [],
  onGenerateQuote
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('prd_crm_enterprise_seat');
  const [seatQuantity, setSeatQuantity] = useState<number>(150);
  const [customRepDiscount, setCustomRepDiscount] = useState<number>(5);
  const [contractTermYears, setContractTermYears] = useState<number>(3);
  const [includePremiumSupport, setIncludePremiumSupport] = useState<boolean>(true);

  // Pricing Model Logic
  const unitListPrice = selectedProductId === 'prd_crm_enterprise_seat' ? 1800 :
                        selectedProductId === 'prd_cpq_engine_addon' ? 12000 : 18000;

  // Volume Tier Discount Brackets
  let volumeTierDiscountPct = 0;
  if (seatQuantity >= 250) volumeTierDiscountPct = 20;
  else if (seatQuantity >= 100) volumeTierDiscountPct = 15;
  else if (seatQuantity >= 50) volumeTierDiscountPct = 10;
  else if (seatQuantity >= 10) volumeTierDiscountPct = 5;

  // Multi-Year Term Discount
  const termDiscountPct = contractTermYears === 3 ? 12 : contractTermYears === 2 ? 5 : 0;

  const totalDiscountPct = Math.min(volumeTierDiscountPct + termDiscountPct + customRepDiscount, 50);

  const baseAnnualAmount = (seatQuantity * unitListPrice) + (includePremiumSupport ? 18000 : 0);
  const annualDiscountAmount = Math.round(baseAnnualAmount * (totalDiscountPct / 100));
  const netAnnualAmount = baseAnnualAmount - annualDiscountAmount;
  const totalContractValue = netAnnualAmount * contractTermYears;

  const requiresSalesManagerApproval = customRepDiscount > 20;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-white tracking-tight">CPQ Dynamic Pricing & Margin Engine</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">DISCOUNT GOVERNANCE</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Automated multi-tier volume brackets, multi-year term discounts, line-item margin calculations, and executive approval routing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Parameters Configuration */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-xs shadow-xl">
          <h3 className="text-sm font-bold text-white">⚙️ Quote Parameters & Line Items</h3>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Core Product SKU</label>
            <select
              value={selectedProductId}
              onChange={e => setSelectedProductId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium"
            >
              <option value="prd_crm_enterprise_seat">ApexCore CRM Enterprise Workstation Seat ($1,800/yr)</option>
              <option value="prd_cpq_engine_addon">Advanced CPQ & Dynamic Pricing Engine ($12,000/yr)</option>
              <option value="prd_sla_helpdesk_suite">Omnichannel Support & SLA Helpdesk ($18,000/yr)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">User Seat Quantity</label>
              <input
                type="number"
                min="1"
                max="10000"
                value={seatQuantity}
                onChange={e => setSeatQuantity(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Contract Term</label>
              <select
                value={contractTermYears}
                onChange={e => setContractTermYears(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              >
                <option value={1}>1 Year Standard</option>
                <option value={2}>2 Year Commitment (5% discount)</option>
                <option value={3}>3 Year Strategic (12% discount)</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="font-bold text-slate-300">Custom Sales Rep Discretionary Discount (%)</label>
              <span className="font-mono text-emerald-400 font-bold">{customRepDiscount}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              value={customRepDiscount}
              onChange={e => setCustomRepDiscount(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              Discounts over 20% trigger mandatory Sales Manager approval escalation.
            </span>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includePremiumSupport}
                onChange={e => setIncludePremiumSupport(e.target.checked)}
                className="rounded accent-indigo-500 w-4 h-4"
              />
              <span className="text-slate-300 font-bold">Include 24/7 Platinum SLA Helpdesk Addon ($18,000/yr)</span>
            </label>
          </div>
        </div>

        {/* Live Calculation Output */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-xs shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-3">📋 Real-Time CPQ Pricing Breakdown</h3>

            <div className="space-y-2.5 divide-y divide-slate-800">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">List Unit Price:</span>
                <span className="font-mono text-white font-bold">${unitListPrice.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Volume Tier Bracket:</span>
                <span className="text-emerald-400 font-bold">{volumeTierDiscountPct}% Applied</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Multi-Year Term Incentive:</span>
                <span className="text-indigo-400 font-bold">{termDiscountPct}% Applied</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Total Effective Discount:</span>
                <span className="text-rose-400 font-mono font-bold">-{totalDiscountPct}% (-${annualDiscountAmount.toLocaleString()}/yr)</span>
              </div>
              <div className="flex justify-between py-2 border-t border-slate-700">
                <span className="font-bold text-white text-sm">Net Annual Recurring Revenue (ARR):</span>
                <span className="font-mono text-lg font-black text-emerald-400">${netAnnualAmount.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-bold text-white text-sm">Total Contract Value ({contractTermYears}Y TCV):</span>
                <span className="font-mono text-xl font-black text-white">${totalContractValue.toLocaleString()}.00</span>
              </div>
            </div>

            {requiresSalesManagerApproval && (
              <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-300 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>Custom discount exceeds 20% threshold. Requires Sales Manager approval before issuing Master Order Form.</span>
              </div>
            )}
          </div>

          <button
            onClick={() => onGenerateQuote && onGenerateQuote({ totalContractValue, netAnnualAmount, totalDiscountPct })}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/30 transition text-xs"
          >
            Generate Official Master Order Form PDF →
          </button>
        </div>
      </div>
    </div>
  );
};
