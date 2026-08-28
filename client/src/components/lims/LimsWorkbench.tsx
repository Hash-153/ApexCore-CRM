import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { LabOrderRecord, PatientRecord } from '../../types/index';
import { FlaskConical, Barcode, AlertTriangle, CheckCircle2, Plus, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LimsWorkbenchProps {
  activePatient: PatientRecord | null;
}

export const LimsWorkbench: React.FC<LimsWorkbenchProps> = ({ activePatient }) => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<LabOrderRecord[]>([]);
  const [panels, setPanels] = useState<any[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(activePatient?.id || 'PAT-001');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedPanelName, setSelectedPanelName] = useState('Comprehensive Metabolic Panel (CMP)');
  const [editingOrder, setEditingOrder] = useState<LabOrderRecord | null>(null);
  const [resultsEntry, setResultsEntry] = useState<Record<string, number>>({});
  const [technicianNotes, setTechnicianNotes] = useState('');
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [selectedPatientId]);

  const loadData = async () => {
    try {
      const [orderList, panelList, patientList] = await Promise.all([
        api.getLabOrders(selectedPatientId || undefined),
        api.getLabPanels(),
        api.getPatients(),
      ]);
      setOrders(orderList);
      setPanels(panelList);
      setPatients(patientList);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOrderPanel = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.orderLabPanel({
        patientId: selectedPatientId,
        panelName: selectedPanelName,
      });

      setShowOrderModal(false);
      setBanner(`Lab panel "${res.panelName}" ordered! Accession Barcode: ${res.specimenBarcode}`);
      setTimeout(() => setBanner(null), 5000);
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await api.updateSpecimenStatus(orderId, status);
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSaveResults = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    try {
      const testResults = Object.entries(resultsEntry).map(([testCode, value]) => ({
        testCode,
        value: Number(value),
      }));

      await api.enterLabResults(editingOrder.id, testResults, technicianNotes);
      setEditingOrder(null);
      setBanner(`Lab results finalized for ${editingOrder.panelName}`);
      setTimeout(() => setBanner(null), 5000);
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-cyan-400" />
            <span>Laboratory Information Management System (LIMS)</span>
          </h1>
          <p className="text-xs text-slate-400">
            Specimen accessioning, automated analyzer result entry, reference ranges, and panic value flags.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="bg-slate-950 text-xs text-white px-3 py-2 rounded-xl border border-slate-700"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} ({p.mrn})
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowOrderModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-600/30 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Order Diagnostic Panel</span>
          </button>
        </div>
      </div>

      {banner && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{banner}</span>
        </div>
      )}

      {/* Lab Orders Specimen Board */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm">{order.panelName}</h3>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 flex items-center gap-1">
                      <Barcode className="h-3 w-3" />
                      {order.specimenBarcode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Patient: {order.patientName} | Specimen: {order.specimenType} | Ordered by: {order.orderedByName}
                  </p>
                </div>
              </div>

              {/* Status Badge & Actions */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    order.status === 'FINALIZED'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : order.status === 'IN_ANALYSIS'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {order.status}
                </span>

                {/* Workflow Transitions */}
                {currentUser.role === 'LAB_TECHNICIAN' && order.status === 'ORDERED' && (
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'COLLECTED')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs rounded-lg border border-slate-700 font-semibold"
                  >
                    Mark Collected
                  </button>
                )}
                {currentUser.role === 'LAB_TECHNICIAN' && order.status === 'COLLECTED' && (
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'RECEIVED')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs rounded-lg border border-slate-700 font-semibold"
                  >
                    Accession Specimen
                  </button>
                )}
                {currentUser.role === 'LAB_TECHNICIAN' && order.status !== 'FINALIZED' && (
                  <button
                    onClick={() => {
                      setEditingOrder(order);
                      const initial: Record<string, number> = {};
                      order.tests.forEach((t) => {
                        if (t.resultValue !== undefined) initial[t.testCode] = t.resultValue;
                      });
                      setResultsEntry(initial);
                      setTechnicianNotes(order.technicianNotes || '');
                    }}
                    className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs rounded-lg font-semibold transition"
                  >
                    Enter Results
                  </button>
                )}
              </div>
            </div>

            {/* Test Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">Test Name</th>
                    <th className="p-2.5">LOINC Code</th>
                    <th className="p-2.5">Result</th>
                    <th className="p-2.5">Reference Range</th>
                    <th className="p-2.5">Status & Flags</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {order.tests.map((test) => (
                    <tr key={test.testCode} className="hover:bg-slate-800/40">
                      <td className="p-2.5 font-semibold text-white">{test.testName}</td>
                      <td className="p-2.5 font-mono text-slate-500">{test.loincCode || 'N/A'}</td>
                      <td className="p-2.5">
                        {test.resultValue !== undefined ? (
                          <strong className="font-mono text-white text-sm">
                            {test.resultValue} {test.resultUnit}
                          </strong>
                        ) : (
                          <span className="text-slate-500 italic">Pending analysis</span>
                        )}
                      </td>
                      <td className="p-2.5 text-slate-400 font-mono text-[11px]">
                        {test.referenceRangeLow !== undefined && test.referenceRangeHigh !== undefined
                          ? `${test.referenceRangeLow} - ${test.referenceRangeHigh} ${test.resultUnit || ''}`
                          : 'Reference not established'}
                      </td>
                      <td className="p-2.5">
                        {test.interpretation && (
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              test.isCriticalAlert
                                ? 'bg-rose-500 text-white animate-pulse'
                                : test.interpretation === 'HIGH' || test.interpretation === 'LOW'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            }`}
                          >
                            {test.isCriticalAlert ? 'CRITICAL ALERT' : test.interpretation}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {order.technicianNotes && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-cyan-400 block mb-1">Pathologist / Tech Comments:</span>
                <p>{order.technicianNotes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal: Order Panel */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Order Laboratory Panel</h3>
              <button onClick={() => setShowOrderModal(false)} className="text-slate-400 hover:text-white font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleOrderPanel} className="space-y-4">
              <div>
                <label className="text-slate-400 block mb-1">Diagnostic Panel</label>
                <select
                  value={selectedPanelName}
                  onChange={(e) => setSelectedPanelName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                >
                  {panels.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name} ({p.testsCount} tests)
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-600/30 transition"
              >
                Transmit Order & Generate Specimen Barcode
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Enter Results */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Enter Analyzer Results: {editingOrder.panelName}</h3>
                <span className="font-mono text-cyan-400">{editingOrder.specimenBarcode}</span>
              </div>
              <button onClick={() => setEditingOrder(null)} className="text-slate-400 hover:text-white font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveResults} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="space-y-3">
                {editingOrder.tests.map((test) => (
                  <div key={test.testCode} className="grid grid-cols-2 gap-3 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <div>
                      <span className="font-bold text-white block">{test.testName}</span>
                      <span className="text-[10px] text-slate-500">
                        Ref: {test.referenceRangeLow} - {test.referenceRangeHigh} {test.resultUnit}
                      </span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      placeholder={`Enter ${test.resultUnit || 'val'}`}
                      value={resultsEntry[test.testCode] !== undefined ? resultsEntry[test.testCode] : ''}
                      onChange={(e) => setResultsEntry({ ...resultsEntry, [test.testCode]: Number(e.target.value) })}
                      className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono font-bold"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Pathologist / Technician Review Notes</label>
                <textarea
                  rows={2}
                  value={technicianNotes}
                  onChange={(e) => setTechnicianNotes(e.target.value)}
                  placeholder="Notes, critical panic alert verification..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-600/30 transition"
              >
                Validate & Finalize Results in EHR
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
