import React, { useState } from 'react';
import {
  AnesthesiaAssessmentEngine,
  type AnesthesiaRiskInput,
  type AnesthesiaEvaluationResult,
} from '../../../../server/src/surgical/anesthesiaAssessment';
import {
  IntraoperativeService,
  type IntraopFluidBalance,
} from '../../../../server/src/surgical/intraoperativeRecord';
import type { PatientRecord } from '../../types/index';
import {
  ShieldAlert,
  Activity,
  CheckSquare,
  Droplets,
  Heart,
  AlertOctagon,
  FileText,
  Sparkles,
  ClipboardList,
} from 'lucide-react';

interface SurgicalSuiteProps {
  activePatient: PatientRecord | null;
}

export const SurgicalSuite: React.FC<SurgicalSuiteProps> = ({ activePatient }) => {
  const [activeTab, setActiveTab] = useState<'PREOP_ANESTHESIA' | 'WHO_CHECKLIST' | 'INTRAOP_FLUIDS'>('PREOP_ANESTHESIA');

  // Pre-Op Anesthesia Form
  const [mallampati, setMallampati] = useState<1 | 2 | 3 | 4>(2);
  const [thyromental, setThyromental] = useState(6.5);
  const [bmi, setBmi] = useState(28.4);
  const [isEmergency, setIsEmergency] = useState(false);
  const [anesthesiaResult, setAnesthesiaResult] = useState<AnesthesiaEvaluationResult | null>(null);

  // WHO Checklist State
  const [signIn1, setSignIn1] = useState(true);
  const [signIn2, setSignIn2] = useState(true);
  const [signIn3, setSignIn3] = useState(true);
  const [timeOut1, setTimeOut1] = useState(true);
  const [timeOut2, setTimeOut2] = useState(true);
  const [timeOut3, setTimeOut3] = useState(true);
  const [signOut1, setSignOut1] = useState(true);
  const [signOut2, setSignOut2] = useState(true);

  // Intraop Fluid Balance Form
  const [crystalloid, setCrystalloid] = useState(1500);
  const [colloid, setColloid] = useState(250);
  const [prbc, setPrbc] = useState(1);
  const [ebl, setEbl] = useState(450);
  const [urine, setUrine] = useState(300);
  const [fluidResult, setFluidResult] = useState<any>(null);

  const handleEvaluateAnesthesia = () => {
    const input: AnesthesiaRiskInput = {
      patientAge: 58,
      gender: 'MALE',
      bmi,
      plannedProcedure: 'Laparoscopic Colectomy',
      isEmergencyProcedure: isEmergency,
      mallampatiScore: mallampati,
      thyromentalDistanceCm: thyromental,
      cervicalSpineMobility: 'FULL',
      interIncisorGapCm: 4.2,
      hasKnownDentitionIssues: false,
      comorbidities: {
        hypertension: true,
        diabetesMellitus: true,
        copdOrAsthma: false,
        congestiveHeartFailure: false,
        cadPriorMi: false,
        ckdOrDialysis: false,
        obstructiveSleepApnea: true,
        refluxGerd: true,
      },
      stopBangCriteria: {
        snoringLoudly: true,
        tiredDuringDay: true,
        observedApnea: false,
        highBloodPressure: true,
        bmiOver35: false,
        ageOver50: true,
        neckCircumferenceOver40cm: true,
        isMale: true,
      },
      apfelPonvCriteria: {
        isFemale: false,
        nonSmoker: true,
        historyOfMotionSicknessOrPonv: true,
        postOpOpioidUsePlanned: true,
      },
    };

    const res = AnesthesiaAssessmentEngine.evaluateRisk(input);
    setAnesthesiaResult(res);
  };

  const handleCalculateFluids = () => {
    const fluid: IntraopFluidBalance = {
      crystalloidAdministeredMl: crystalloid,
      colloidAdministeredMl: colloid,
      packedRedBloodCellsUnits: prbc,
      freshFrozenPlasmaUnits: 0,
      plateletsUnits: 0,
      estimatedBloodLossMl: ebl,
      urineOutputMl: urine,
      irrigationFluidUsedMl: 1000,
      irrigationFluidSuctionedMl: 1000,
    };
    const res = IntraoperativeService.calculateNetFluidBalance(fluid);
    setFluidResult(res);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-cyan-400" />
            <span>Surgical Suite, Anesthesia Assessment & WHO Safety Protocols</span>
          </h1>
          <p className="text-xs text-slate-400">
            ASA physical status, Mallampati airway classification, WHO surgical safety checklist, and intraoperative fluid balance.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('PREOP_ANESTHESIA')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'PREOP_ANESTHESIA' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pre-Op Anesthesia
          </button>
          <button
            onClick={() => setActiveTab('WHO_CHECKLIST')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'WHO_CHECKLIST' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            WHO Safety Checklist
          </button>
          <button
            onClick={() => setActiveTab('INTRAOP_FLUIDS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'INTRAOP_FLUIDS' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Intra-Op Fluid Balance
          </button>
        </div>
      </div>

      {activeTab === 'PREOP_ANESTHESIA' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              <span>Anesthesia Risk & Airway Parameters</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Mallampati Airway View</label>
                <select
                  value={mallampati}
                  onChange={(e) => setMallampati(parseInt(e.target.value, 10) as any)}
                  className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-semibold"
                >
                  <option value={1}>Class I: Soft palate, fauces, uvula, pillars visible</option>
                  <option value={2}>Class II: Soft palate, fauces, portion of uvula visible</option>
                  <option value={3}>Class III: Soft palate, base of uvula visible</option>
                  <option value={4}>Class IV: Only hard palate visible (Difficult Airway)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Thyromental Dist (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={thyromental}
                    onChange={(e) => setThyromental(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Body Mass Index (BMI)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={bmi}
                    onChange={(e) => setBmi(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="rounded text-rose-600 bg-slate-950 border-slate-800"
                />
                <span>Emergency Surgical Procedure (E-Modifier)</span>
              </label>

              <button
                onClick={handleEvaluateAnesthesia}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-600/30 transition flex items-center justify-center gap-1.5"
              >
                <span>Evaluate Anesthesia Risk</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            {anesthesiaResult ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Assigned Physical Status</span>
                    <h2 className="text-xl font-extrabold text-white font-mono">{anesthesiaResult.assignedAsaStatus}</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Apfel PONV Risk</span>
                    <span className="text-lg font-extrabold text-amber-400 font-mono">{anesthesiaResult.ponvRiskPercent}</span>
                  </div>
                </div>

                {anesthesiaResult.isDifficultAirwayPredicted && (
                  <div className="bg-rose-950/40 border border-rose-800/60 p-3.5 rounded-xl text-xs text-rose-200 space-y-1">
                    <strong className="flex items-center gap-1.5 text-rose-300">
                      <AlertOctagon className="h-4 w-4 text-rose-400" />
                      <span>DIFFICULT AIRWAY PREDICTED</span>
                    </strong>
                    {anesthesiaResult.airwayManagementAlerts.map((a, i) => (
                      <p key={i}>• {a}</p>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Anesthetic Technique & Airway Plan</h3>
                  <div className="space-y-1.5">
                    {anesthesiaResult.anestheticTechniqueRecommendations.map((r, i) => (
                      <div key={i} className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">
                Configure patient airway and comorbidity inputs on the left to evaluate pre-op risk.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'WHO_CHECKLIST' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sign In */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs border-b border-slate-800 pb-2">
                <span>1. SIGN IN (Before Induction)</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <label className="flex items-start gap-2">
                  <input type="checkbox" checked={signIn1} onChange={(e) => setSignIn1(e.target.checked)} className="mt-0.5" />
                  <span>Patient identity, surgical site marked, procedure verified</span>
                </label>
                <label className="flex items-start gap-2">
                  <input type="checkbox" checked={signIn2} onChange={(e) => setSignIn2(e.target.checked)} className="mt-0.5" />
                  <span>Anesthesia machine and medication check complete</span>
                </label>
                <label className="flex items-start gap-2">
                  <input type="checkbox" checked={signIn3} onChange={(e) => setSignIn3(e.target.checked)} className="mt-0.5" />
                  <span>Known allergy check and difficult airway equipment ready</span>
                </label>
              </div>
            </div>

            {/* Time Out */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs border-b border-slate-800 pb-2">
                <span>2. TIME OUT (Before Incision)</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <label className="flex items-start gap-2">
                  <input type="checkbox" checked={timeOut1} onChange={(e) => setTimeOut1(e.target.checked)} className="mt-0.5" />
                  <span>Entire OR team introduces themselves by name and role</span>
                </label>
                <label className="flex items-start gap-2">
                  <input type="checkbox" checked={timeOut2} onChange={(e) => setTimeOut2(e.target.checked)} className="mt-0.5" />
                  <span>Surgeon, anesthesia, and nurse verbally confirm patient & incision site</span>
                </label>
                <label className="flex items-start gap-2">
                  <input type="checkbox" checked={timeOut3} onChange={(e) => setTimeOut3(e.target.checked)} className="mt-0.5" />
                  <span>Antibiotic prophylaxis administered within 60 minutes prior</span>
                </label>
              </div>
            </div>

            {/* Sign Out */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs border-b border-slate-800 pb-2">
                <span>3. SIGN OUT (Before Leaving OR)</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <label className="flex items-start gap-2">
                  <input type="checkbox" checked={signOut1} onChange={(e) => setSignOut1(e.target.checked)} className="mt-0.5" />
                  <span>Nurse verbally confirms instrument, sponge, and needle counts correct</span>
                </label>
                <label className="flex items-start gap-2">
                  <input type="checkbox" checked={signOut2} onChange={(e) => setSignOut2(e.target.checked)} className="mt-0.5" />
                  <span>Surgical pathology specimen labeled with patient name and MRN</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'INTRAOP_FLUIDS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Droplets className="h-4 w-4 text-cyan-400" />
              <span>Intraoperative Intake & Output</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Crystalloid Infused (mL)</label>
                <input
                  type="number"
                  value={crystalloid}
                  onChange={(e) => setCrystalloid(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Colloid Infused (mL)</label>
                  <input
                    type="number"
                    value={colloid}
                    onChange={(e) => setColloid(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Packed RBCs (Units)</label>
                  <input
                    type="number"
                    value={prbc}
                    onChange={(e) => setPrbc(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Estimated Blood Loss (mL)</label>
                  <input
                    type="number"
                    value={ebl}
                    onChange={(e) => setEbl(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Urine Output (mL)</label>
                  <input
                    type="number"
                    value={urine}
                    onChange={(e) => setUrine(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculateFluids}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-600/30 transition flex items-center justify-center gap-1.5"
              >
                <span>Calculate Net Fluid Balance</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            {fluidResult ? (
              <>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Total Intake</span>
                    <strong className="text-emerald-400 font-mono text-base">{fluidResult.totalIntakeMl} mL</strong>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Total Output</span>
                    <strong className="text-rose-400 font-mono text-base">{fluidResult.totalOutputMl} mL</strong>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Net Fluid Balance</span>
                    <strong className="text-cyan-300 font-mono text-base">{fluidResult.netBalanceMl > 0 ? '+' : ''}{fluidResult.netBalanceMl} mL</strong>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <p>
                    <strong>Estimated Blood Volume Lost:</strong> {fluidResult.estimatedBloodVolumeLostPercent}% of total EBV
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">
                Enter intraoperative intake and output values to calculate net fluid balance.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
