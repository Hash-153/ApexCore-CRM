import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { SuperbillClaimRecord, PatientRecord } from '../../types/index';
import { Receipt, Search, Plus, DollarSign, FileCode, CheckCircle2 } from 'lucide-react';

interface BillingCenterProps {
  activePatient: PatientRecord | null;
}

export const BillingCenter: React.FC<BillingCenterProps> = ({ activePatient }) => {
  const [claims, setClaims] = useState<SuperbillClaimRecord[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(activePatient?.id || 'PAT-001');
  const [icdOptions, setIcdOptions] = useState<any[]>([]);
  const [cptOptions, setCptOptions] = useState<any[]>([]);
  const [showSuperbillModal, setShowSuperbillModal] = useState(false);
  const [cmsModalData, setCmsModalData] = useState<any | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  // Superbill Form State
  const [superbillForm, setSuperbillForm] = useState({
    encounterId: 'ENC-001',
    primaryDiagnosisCode: 'E11.22',
    secondaryDiagnosisCodes: 'I10',
    selectedCptCodes: ['99214', '80053'],
  });

  useEffect(() => {
    loadData();
  }, [selectedPatientId]);

  const loadData = async () => {
    try {
      const [claimList, patientList, icds, cpts] = await Promise.all([
        api.getClaims(selectedPatientId || undefined),
        api.getPatients(),
        api.getIcd10(),
        api.getCpt(),
      ]);
      setClaims(claimList);
      setPatients(patientList);
      setIcdOptions(icds);
      setCptOptions(cpts);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateSuperbill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.createSuperbill({
        encounterId: superbillForm.encounterId,
        patientId: selectedPatientId,
        providerNpi: '1942857291',
        providerName: 'Dr. Sarah Mitchell, MD',
        primaryDiagnosisCode: superbillForm.primaryDiagnosisCode,
        secondaryDiagnosisCodes: superbillForm.secondaryDiagnosisCodes
          ? superbillForm.secondaryDiagnosisCodes.split(',').map((s) => s.trim())
          : [],
        cptCodes: superbillForm.selectedCptCodes,
      });

      setShowSuperbillModal(false);
      setBanner(`Superbill & Claim ${res.claimNumber} generated! Total Billed: $${res.totalBilledUsd}`);
      setTimeout(() => setBanner(null), 5000);
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleViewCms1500 = async (claimId: string) => {
    try {
      const payload = await api.getCms1500Payload(claimId);
      setCmsModalData(payload);
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
            <Receipt className="h-5 w-5 text-rose-400" />
            <span>ICD-10 / CPT Medical Billing & Claims Hub</span>
          </h1>
          <p className="text-xs text-slate-400">
            Superbill generation, automated fee schedule calculations, CMS-1500 EDI-837 export, and insurance adjudication.
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
            onClick={() => setShowSuperbillModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-rose-600/30 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Generate Superbill</span>
          </button>
        </div>
      </div>

      {banner && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{banner}</span>
        </div>
      )}

      {/* Claims Records Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h2 className="font-bold text-white text-sm">Superbills & Insurance Claim Filings</h2>

        <div className="space-y-3">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-white">{claim.claimNumber}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800 font-mono">
                    DOS: {claim.dosDate}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      claim.claimStatus === 'ADJUDICATED' || claim.claimStatus === 'PAID'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {claim.claimStatus}
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  Patient: <strong className="text-white">{claim.patientName}</strong> | Provider:{' '}
                  {claim.providerName} (NPI: {claim.providerNpi})
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                    Dx: {claim.primaryDiagnosisCode}
                  </span>
                  {claim.secondaryDiagnosisCodes.map((sec, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                      Dx2: {sec}
                    </span>
                  ))}
                  {claim.lineItems.map((li, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                      CPT: {li.cptCode} (${li.unitPriceUsd})
                    </span>
                  ))}
                </div>
              </div>

              {/* Financial Adjudication Breakdown */}
              <div className="flex items-center gap-6 text-xs text-right">
                <div className="space-y-0.5">
                  <div className="text-slate-400 text-[11px]">Total Billed: <strong className="text-white font-mono text-xs">${claim.totalBilledUsd}</strong></div>
                  <div className="text-emerald-400 text-[11px]">Insurance Paid: <strong className="font-mono">${claim.insurancePaidUsd}</strong></div>
                  <div className="text-rose-400 text-[11px]">Patient Responsibility: <strong className="font-mono">${claim.patientBalanceDueUsd}</strong></div>
                </div>

                <button
                  onClick={() => handleViewCms1500(claim.id)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-xl border border-slate-700 text-xs flex items-center gap-1 font-semibold transition"
                  title="View CMS-1500 standard claim EDI-837 payload"
                >
                  <FileCode className="h-4 w-4" />
                  <span>CMS-1500</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: CMS-1500 Payload Viewer */}
      {cmsModalData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FileCode className="h-5 w-5 text-sky-400" />
                <span>CMS-1500 Claim Payload</span>
              </h3>
              <button onClick={() => setCmsModalData(null)} className="text-slate-400 hover:text-white font-bold">
                ✕
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-y-auto max-h-96 border border-slate-800">
              {JSON.stringify(cmsModalData, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Modal: Generate Superbill */}
      {showSuperbillModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Generate Superbill & Claim</h3>
              <button onClick={() => setShowSuperbillModal(false)} className="text-slate-400 hover:text-white font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSuperbill} className="space-y-4">
              <div>
                <label className="text-slate-400 block mb-1">Primary ICD-10 Diagnosis *</label>
                <select
                  value={superbillForm.primaryDiagnosisCode}
                  onChange={(e) => setSuperbillForm({ ...superbillForm, primaryDiagnosisCode: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono font-semibold"
                >
                  {icdOptions.map((icd) => (
                    <option key={icd.code} value={icd.code}>
                      [{icd.code}] {icd.shortDesc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Secondary ICD-10 Diagnoses (comma-separated)</label>
                <input
                  type="text"
                  value={superbillForm.secondaryDiagnosisCodes}
                  onChange={(e) => setSuperbillForm({ ...superbillForm, secondaryDiagnosisCodes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Select CPT-4 Procedures Billed</label>
                <div className="space-y-2 max-h-48 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
                  {cptOptions.map((cpt) => {
                    const isChecked = superbillForm.selectedCptCodes.includes(cpt.code);
                    return (
                      <label key={cpt.code} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSuperbillForm({
                                  ...superbillForm,
                                  selectedCptCodes: [...superbillForm.selectedCptCodes, cpt.code],
                                });
                              } else {
                                setSuperbillForm({
                                  ...superbillForm,
                                  selectedCptCodes: superbillForm.selectedCptCodes.filter((c) => c !== cpt.code),
                                });
                              }
                            }}
                          />
                          <span className="text-slate-200 font-medium">
                            [{cpt.code}] {cpt.description}
                          </span>
                        </div>
                        <span className="font-mono text-emerald-400 font-bold">${cpt.baseRateUsd}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-600/30 transition"
              >
                Compute Adjudication & File Claim
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
