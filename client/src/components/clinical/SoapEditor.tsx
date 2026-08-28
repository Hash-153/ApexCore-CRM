import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { PatientRecord, ClinicalEncounter } from '../../types/index';
import { FileText, Search, Save, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';
import type { NavTab } from '../layout/Sidebar';

interface SoapEditorProps {
  activePatient: PatientRecord | null;
  onNavigate: (tab: NavTab) => void;
}

export const SoapEditor: React.FC<SoapEditorProps> = ({ activePatient, onNavigate }) => {
  const [encounters, setEncounters] = useState<ClinicalEncounter[]>([]);
  const [selectedEncounterId, setSelectedEncounterId] = useState<string>('');
  const [icdSearch, setIcdSearch] = useState('');
  const [icdOptions, setIcdOptions] = useState<any[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // SOAP Form State
  const [subjective, setSubjective] = useState({
    chiefComplaint: '',
    historyOfPresentIllness: '',
  });

  const [objective, setObjective] = useState({
    vitalsSummary: '',
    physicalExamHeent: 'Normocephalic, atraumatic, moist mucous membranes.',
    physicalExamCvs: 'Regular rate and rhythm, no murmurs, rubs, or gallops.',
    physicalExamResp: 'Clear to auscultation bilaterally, no wheezes, rales, or rhonchi.',
    physicalExamAbd: 'Soft, non-tender, non-distended, normoactive bowel sounds.',
  });

  const [assessment, setAssessment] = useState({
    primaryCode: 'I10',
    primaryDesc: 'Essential (primary) hypertension',
    clinicalImpression: 'Patient presents with moderate symptom control; adjusting therapeutic regimen accordingly.',
  });

  const [plan, setPlan] = useState({
    medicationsOrdered: '',
    labsOrdered: '',
    instructions: 'Continue current medications as prescribed. Maintain low-sodium DASH diet. Monitor home blood pressure log.',
    followUpInDays: 30,
    disposition: 'DISCHARGED' as 'DISCHARGED' | 'ADMITTED' | 'TRANSFERRED' | 'PENDING_RESULTS',
  });

  useEffect(() => {
    if (activePatient) {
      loadEncounters();
    }
  }, [activePatient]);

  useEffect(() => {
    loadIcdOptions();
  }, [icdSearch]);

  const loadEncounters = async () => {
    if (!activePatient) return;
    try {
      const data = await api.getEncounters(activePatient.id);
      setEncounters(data);
      if (data.length > 0) {
        setSelectedEncounterId(data[0].id);
        if (data[0].chiefComplaint) {
          setSubjective((prev) => ({ ...prev, chiefComplaint: data[0].chiefComplaint }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadIcdOptions = async () => {
    try {
      const results = await api.getIcd10(icdSearch);
      setIcdOptions(results);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEncounterId) {
      alert('Please select or create an active clinical encounter first.');
      return;
    }

    try {
      setLoading(true);
      const soapPayload = {
        patientId: activePatient?.id,
        encounterId: selectedEncounterId,
        authorId: 'DOC-101',
        authorName: 'Dr. Sarah Mitchell, MD',
        subjective: {
          chiefComplaint: subjective.chiefComplaint,
          historyOfPresentIllness: subjective.historyOfPresentIllness,
          reviewOfSystems: { 'Constitutional': 'Negative for fever or chills' },
        },
        objective: {
          vitalSignsSummary: objective.vitalsSummary || 'BP 128/82, HR 72, RR 16, SpO2 98%, Temp 36.8°C',
          physicalExamination: {
            HEENT: objective.physicalExamHeent,
            Cardiovascular: objective.physicalExamCvs,
            Respiratory: objective.physicalExamResp,
            Abdomen: objective.physicalExamAbd,
          },
        },
        assessment: {
          primaryDiagnosis: {
            code: assessment.primaryCode,
            description: assessment.primaryDesc,
          },
          differentialDiagnoses: [],
          clinicalImpression: assessment.clinicalImpression,
        },
        plan: {
          medicationsOrdered: plan.medicationsOrdered ? plan.medicationsOrdered.split(',').map((s) => s.trim()) : [],
          labsOrdered: plan.labsOrdered ? plan.labsOrdered.split(',').map((s) => s.trim()) : [],
          imagingOrdered: [],
          patientInstructions: plan.instructions,
          followUpInDays: plan.followUpInDays,
          disposition: plan.disposition,
        },
      };

      await api.saveSoapNote(selectedEncounterId, soapPayload);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      alert(`Failed to save SOAP note: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!activePatient) {
    return (
      <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
        <FileText className="h-10 w-10 text-slate-600 mx-auto" />
        <h3 className="text-base font-bold text-white">Select a Patient to Chart</h3>
        <p className="text-xs text-slate-400">Please select a patient before opening the SOAP charting workstation.</p>
        <button onClick={() => onNavigate('PATIENTS')} className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold">
          Select Patient
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-sky-400" />
            <span>Physician Clinical Charting (SOAP Format)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Patient: <strong className="text-white">{activePatient.fullName}</strong> ({activePatient.mrn})
          </p>
        </div>

        {/* Encounter Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium">Encounter:</label>
          <select
            value={selectedEncounterId}
            onChange={(e) => setSelectedEncounterId(e.target.value)}
            className="bg-slate-950 text-xs text-white px-3 py-2 rounded-xl border border-slate-700 font-mono"
          >
            {encounters.map((enc) => (
              <option key={enc.id} value={enc.id}>
                {enc.id} - {enc.encounterType} ({enc.startedAt.slice(0, 10)})
              </option>
            ))}
          </select>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>SOAP Progress note successfully validated, immutably signed, and saved to EHR chart!</span>
        </div>
      )}

      {/* SOAP Form */}
      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* S - Subjective */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm border-b border-slate-800 pb-2">
            <span className="h-6 w-6 rounded-lg bg-sky-500/20 flex items-center justify-center text-xs">S</span>
            <span>SUBJECTIVE (History & Symptoms)</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Chief Complaint (CC) *</label>
              <input
                type="text"
                required
                value={subjective.chiefComplaint}
                onChange={(e) => setSubjective({ ...subjective, chiefComplaint: e.target.value })}
                placeholder="e.g. 3-day history of productive cough, fever, and mild shortness of breath"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-medium">History of Present Illness (HPI)</label>
              <textarea
                rows={3}
                value={subjective.historyOfPresentIllness}
                onChange={(e) => setSubjective({ ...subjective, historyOfPresentIllness: e.target.value })}
                placeholder="Onset, location, duration, character, aggravating/relieving factors, radiation, timing, severity (OLD CARTS)..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>
        </div>

        {/* O - Objective */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-slate-800 pb-2">
            <span className="h-6 w-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-xs">O</span>
            <span>OBJECTIVE (Vitals & Physical Examination)</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Vital Signs Summary</label>
              <input
                type="text"
                value={objective.vitalsSummary}
                onChange={(e) => setObjective({ ...objective, vitalsSummary: e.target.value })}
                placeholder="BP 132/84 mmHg | HR 74 bpm | RR 16 /min | SpO2 98% room air | Temp 36.9°C"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Cardiovascular Exam</label>
                <input
                  type="text"
                  value={objective.physicalExamCvs}
                  onChange={(e) => setObjective({ ...objective, physicalExamCvs: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Respiratory Exam</label>
                <input
                  type="text"
                  value={objective.physicalExamResp}
                  onChange={(e) => setObjective({ ...objective, physicalExamResp: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* A - Assessment */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-slate-800 pb-2">
            <span className="h-6 w-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-xs">A</span>
            <span>ASSESSMENT & ICD-10 DIAGNOSES</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Search & Link ICD-10 Code *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={icdSearch}
                  onChange={(e) => setIcdSearch(e.target.value)}
                  placeholder="Search ICD-10 diagnosis (e.g. Hypertension, Diabetes, Asthma)..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              {/* ICD Picker Chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {icdOptions.slice(0, 5).map((icd) => (
                  <button
                    key={icd.code}
                    type="button"
                    onClick={() => {
                      setAssessment({ ...assessment, primaryCode: icd.code, primaryDesc: icd.shortDesc });
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition ${
                      assessment.primaryCode === icd.code
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    [{icd.code}] {icd.shortDesc}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-medium">Clinical Impression & Synthesis</label>
              <textarea
                rows={2}
                value={assessment.clinicalImpression}
                onChange={(e) => setAssessment({ ...assessment, clinicalImpression: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>
        </div>

        {/* P - Plan */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm border-b border-slate-800 pb-2">
            <span className="h-6 w-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-xs">P</span>
            <span>PLAN & DISPOSITION</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Medications to Order (comma-separated)</label>
              <input
                type="text"
                value={plan.medicationsOrdered}
                onChange={(e) => setPlan({ ...plan, medicationsOrdered: e.target.value })}
                placeholder="e.g. Amoxicillin 500mg TID, Albuterol inhaler"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Labs & Diagnostics</label>
              <input
                type="text"
                value={plan.labsOrdered}
                onChange={(e) => setPlan({ ...plan, labsOrdered: e.target.value })}
                placeholder="e.g. CBC, Comprehensive Metabolic Panel, Chest X-ray"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-medium">Patient Instructions</label>
            <textarea
              rows={2}
              value={plan.instructions}
              onChange={(e) => setPlan({ ...plan, instructions: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Disposition</label>
              <select
                value={plan.disposition}
                onChange={(e) => setPlan({ ...plan, disposition: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              >
                <option value="DISCHARGED">Discharged Home</option>
                <option value="ADMITTED">Admitted to Inpatient Ward</option>
                <option value="PENDING_RESULTS">Pending Diagnostic Results</option>
                <option value="TRANSFERRED">Transferred to Tertiary Care</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Follow-Up (in days)</label>
              <input
                type="number"
                value={plan.followUpInDays}
                onChange={(e) => setPlan({ ...plan, followUpInDays: parseInt(e.target.value, 10) || 14 })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-lg shadow-sky-600/30 transition flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          <span>{loading ? 'Validating & Signing...' : 'Sign & Submit Clinical Progress Note'}</span>
        </button>
      </form>
    </div>
  );
};
