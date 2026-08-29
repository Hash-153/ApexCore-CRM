import React, { useEffect, useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { Calculator, ShoppingCart, Plus, CheckCircle, AlertTriangle, FileText, Trash2 } from 'lucide-react';

export const CPQQuoteBuilder: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [priceBooks, setPriceBooks] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [selectedOppId, setSelectedOppId] = useState<string>('opp_horizon_ehr_expansion');
  const [selectedPbId, setSelectedPbId] = useState<string>('pb_standard_2026');

  // Selected line items
  const [quoteItems, setQuoteItems] = useState<any[]>([
    { productId: 'prd_crm_enterprise_seat', quantity: 150, discount: 15 }
  ]);

  const [generatedQuote, setGeneratedQuote] = useState<any>(null);
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [approvalReasons, setApprovalReasons] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCPQData();
  }, []);

  const loadCPQData = async () => {
    try {
      const [pRes, pbRes, oppRes] = await Promise.all([
        CRMApiClient.getProducts(),
        CRMApiClient.getPriceBooks(),
        CRMApiClient.getOpportunities()
      ]);

      if (pRes.success) setProducts(pRes.data || []);
      if (pbRes.success) setPriceBooks(pbRes.data || []);
      if (oppRes.success) setOpportunities(oppRes.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddItem = () => {
    if (products.length === 0) return;
    setQuoteItems([...quoteItems, { productId: products[0].id, quantity: 10, discount: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setQuoteItems(quoteItems.filter((_, idx) => idx !== index));
  };

  const handleGenerateQuote = async () => {
    setLoading(true);
    try {
      const formattedItems = quoteItems.map(item => ({
        productId: item.productId,
        quantity: Number(item.quantity),
        customDiscountType: 'PERCENTAGE',
        customDiscountValue: Number(item.discount || 0)
      }));

      const res = await CRMApiClient.createQuote({
        opportunityId: selectedOppId,
        priceBookId: selectedPbId,
        items: formattedItems,
        paymentTerms: 'Net 30 Days'
      });

      if (res.success && res.data) {
        setGeneratedQuote(res.data.quote);
        setRequiresApproval(res.data.requiresExecutiveApproval);
        setApprovalReasons(res.data.approvalReasons || []);
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
          <Calculator className="w-6 h-6 text-indigo-400" />
          CPQ (Configure, Price, Quote) & Pricing Engine
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Multi-tier volume discounts, margin floor price safeguards, and executive discount approval workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Quote Builder Form */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Target Deal Opportunity:</label>
              <select
                value={selectedOppId}
                onChange={e => setSelectedOppId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs font-semibold px-3 py-2 rounded-xl"
              >
                {opportunities.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.name} (${o.amount?.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Enterprise Price Book:</label>
              <select
                value={selectedPbId}
                onChange={e => setSelectedPbId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs font-semibold px-3 py-2 rounded-xl"
              >
                {priceBooks.map(pb => (
                  <option key={pb.id} value={pb.id}>
                    {pb.name} ({pb.currency})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Proposal Line Items</h3>
              <button
                onClick={handleAddItem}
                className="inline-flex items-center text-xs font-bold text-indigo-400 hover:text-indigo-300 gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Product Item
              </button>
            </div>

            <div className="space-y-2">
              {quoteItems.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-2 bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 items-center text-xs"
                >
                  <div className="col-span-5">
                    <select
                      value={item.productId}
                      onChange={e => {
                        const updated = [...quoteItems];
                        updated[idx].productId = e.target.value;
                        setQuoteItems(updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 text-white px-2.5 py-1.5 rounded-lg text-xs"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} (${p.unitPrice})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-3">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={e => {
                        const updated = [...quoteItems];
                        updated[idx].quantity = Number(e.target.value);
                        setQuoteItems(updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 text-white px-2.5 py-1.5 rounded-lg text-xs"
                    />
                  </div>

                  <div className="col-span-3">
                    <input
                      type="number"
                      placeholder="Disc %"
                      value={item.discount}
                      onChange={e => {
                        const updated = [...quoteItems];
                        updated[idx].discount = Number(e.target.value);
                        setQuoteItems(updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 text-white px-2.5 py-1.5 rounded-lg text-xs"
                    />
                  </div>

                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="text-slate-500 hover:text-rose-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleGenerateQuote}
              disabled={loading}
              className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow transition"
            >
              {loading ? 'Evaluating Price Book Rules...' : 'Calculate & Generate Proposal Quote'}
            </button>
          </div>
        </div>

        {/* Right Col: Quote Output */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" /> Formal CPQ Quote Preview
            </h3>

            {generatedQuote ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="flex justify-between font-bold text-white">
                    <span>{generatedQuote.quoteNumber}</span>
                    <span className="text-indigo-400">{generatedQuote.status}</span>
                  </div>
                  <div className="text-slate-400 mt-1">Opportunity: {generatedQuote.opportunityName}</div>
                </div>

                <div className="space-y-1.5 py-2 border-y border-slate-800">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal:</span>
                    <span className="text-white">${generatedQuote.subtotal?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Volume Discount:</span>
                    <span className="text-rose-400">-${generatedQuote.totalDiscountAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tax:</span>
                    <span className="text-white">${generatedQuote.taxAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-emerald-400 pt-1 border-t border-slate-800">
                    <span>Grand Total:</span>
                    <span>${generatedQuote.grandTotal?.toLocaleString()}</span>
                  </div>
                </div>

                {requiresApproval && (
                  <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl space-y-1">
                    <span className="font-bold text-amber-300 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> VP Approval Required
                    </span>
                    {approvalReasons.map((r, i) => (
                      <p key={i} className="text-[11px] text-amber-200">• {r}</p>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-slate-500 text-center py-12">
                Configure products and click calculate to generate formal quote.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
