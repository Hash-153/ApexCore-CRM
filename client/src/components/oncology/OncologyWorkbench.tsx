import React, { useState } from 'react';
import {
  TnmStagingEngine,
  type CancerSite,
  type TnmInput,
  type StagingResult,
} from '../../../../server/src/clinical/oncology/tnmStaging';
import {
  ChemoProtocolService,
  MASTER_CHEMO_REGIMENS,
} from '../../../../server/src/clinical/oncology/chemoRegimens';
import {
  RecistEngine,
  type TumorLesion,
  type RecistEvaluationResult,
} from '../../../../server/src/clinical/oncology/recist';
import type { PatientRecord } from '../../types/index';
import {
  Activity,
  ShieldAlert,
  Dna,
  Calculator,
  TrendingDown,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Heart,
} from 'lucide-react';

interface OncologyWorkbenchProps {
  activePatient: PatientRecord | null;
}

export const OncologyWorkbench: React.FC<OncologyWorkbenchProps> = ({ activePatient }) => {
  const [activeSubTab, setActiveSubTab] = useState<'TNM_STAGING' | 'CHEMO_REGIMENS' | 'RECIST_RESPONSE'>('TNM_STAGING');

  // TNM Staging Form
  const [selectedSite, setSelectedSite] = useState<CancerSite>('BREAST');
  const [tCat, setTCat] = useState('T2');
  const [nCat, setNCat] = useState('N1');
  const [mCat, setMCat] = useState('M0');
  const [erStatus, setErStatus] = useState<'POSITIVE' | 'NEGATIVE'>('POSITIVE');
  const [her2Status, setHer2Status] = useState<'POSITIVE' | 'NEGATIVE'>('POSITIVE');
  const [stageOutput, setStageOutput] = useState<StagingResult | null>(null);

  // Chemo Protocol Form
  const [selectedRegimen, setSelectedRegimen] = useState('FOLFOX-6-MOD');
  const [heightCm, setHeightCm] = useState(172);
  const [weightKg, setWeightKg] = useState(74);
  const [scr, setScr] = useState(0.9);
  const [priorAnthra, setPriorAnthra] = useState(0);
  const [chemoResult, setChemoResult] = useState<any>(null);

  // RECIST Form
  const [baselineSld, setBaselineSld] = useState(65);
  const [lesion1Mm, setLesion1Mm] = useState(32);
  const [lesion2Mm, setLesion2Mm] = useState(18);
  const [hasNewLesions, setHasNewLesions] = useState(false);
  const [recistResult, setRecistResult] = useState<RecistEvaluationResult | null>(null);

  const handleCalculateStage = () => {
    const res = TnmStagingEngine.calculateStage({
      cancerSite: selectedSite,
      tCategory: tCat,
      nCategory: nCat,
      mCategory: mCat,
      biomarkers: {
        erStatus,
        her2Status,
      },
    });
    setStageOutput(res);
  };

  const handleCalculateChemo = () => {
    const res = ChemoProtocolService.calculatePatientChemoDoses({
      regimenCode: selectedRegimen,
      heightCm,
      weightKg,
      serumCreatinineMgDl: scr,
      ageYears: 54,
      gender: 'FEMALE',
      priorCumulativeDoxorubicinMgM2: priorAnthra,
    });
    setChemoResult(res);
  };

  const handleEvaluateRecist = () => {
    const lesions: TumorLesion[] = [
      { lesionId: 'L1', anatomicLocation: 'Primary Hepatic Mass', isTargetLesion: true, longestDiameterMm: lesion1Mm },
      { lesionId: 'L2', anatomicLocation: 'Pulmonary Metastasis', isTargetLesion: true, longestDiameterMm: lesion2Mm },
    ];
    const res = RecistEngine.evaluate({
      patientId: activePatient?.id || 'DEMO-PAT',
      evaluationDate: new Date().toISOString().slice(0, 10),
      timepoint: 'FOLLOW_UP_CYCLE_4',
      baselineSumLongestDiametersMm: baselineSld,
      currentLesions: lesions,
      hasUnequivocalNonTargetProgression: false,
      hasNewMetastaticLesions: hasNewLesions,
    });
    setRecistResult(res);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Dna className="h-5 w-5 text-rose-400" />
            <span>Clinical Oncology, TNM Staging & Precision Chemotherapy Workstation</span>
          </h1>
          <p className="text-xs text-slate-400">
            AJCC 8th Edition Prognostic Staging, NCCN-Aligned Chemotherapy Protocols, BSA/Calvert Dosing, and RECIST 1.1 Response Evaluation.
          </p>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('TNM_STAGING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'TNM_STAGING' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            TNM Cancer Staging
          </button>
          <button
            onClick={() => setActiveSubTab('CHEMO_REGIMENS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'CHEMO_REGIMENS' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Chemo Protocol Dosing
          </button>
          <button
            onClick={() => setActiveSubTab('RECIST_RESPONSE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'RECIST_RESPONSE' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            RECIST 1.1 Evaluation
          </button>
        </div>
      </div>

      {/* TNM Staging View */}
      {activeSubTab === 'TNM_STAGING' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Calculator className="h-4 w-4 text-rose-400" />
              <span>AJCC 8th Edition Anatomic & Prognostic Inputs</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Primary Malignancy Site</label>
                <select
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value as any)}
                  className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800"
                >
                  <option value="BREAST">Breast Carcinoma</option>
                  <option value="NON_SMALL_CELL_LUNG">Non-Small Cell Lung Cancer (NSCLC)</option>
                  <option value="COLORECTAL">Colorectal Adenocarcinoma</option>
                  <option value="PROSTATE">Prostate Carcinoma</option>
                  <option value="CUTANEOUS_MELANOMA">Cutaneous Melanoma</option>
                  <option value="PANCREATIC_ADENOCARCINOMA">Pancreatic Adenocarcinoma</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">T-Category</label>
                  <input
                    type="text"
                    value={tCat}
                    onChange={(e) => setTCat(e.target.value)}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                    placeholder="e.g. T2"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">N-Category</label>
                  <input
                    type="text"
                    value={nCat}
                    onChange={(e) => setNCat(e.target.value)}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                    placeholder="e.g. N1"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">M-Category</label>
                  <input
                    type="text"
                    value={mCat}
                    onChange={(e) => setMCat(e.target.value)}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                    placeholder="e.g. M0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">ER Status</label>
                  <select
                    value={erStatus}
                    onChange={(e) => setErStatus(e.target.value as any)}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800"
                  >
                    <option value="POSITIVE">Positive (+)</option>
                    <option value="NEGATIVE">Negative (-)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">HER2 Status</label>
                  <select
                    value={her2Status}
                    onChange={(e) => setHer2Status(e.target.value as any)}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800"
                  >
                    <option value="POSITIVE">Positive (3+ IHC / FISH Amplified)</option>
                    <option value="NEGATIVE">Negative (0-1+ IHC)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleCalculateStage}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-1.5"
              >
                <span>Calculate Prognostic Stage</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            {stageOutput ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs text-rose-400 font-mono font-bold block">{stageOutput.cancerSite}</span>
                    <h2 className="text-xl font-extrabold text-white">{stageOutput.anatomicStageGroup}</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">5-Year Overall Survival</span>
                    <span className="text-lg font-extrabold text-emerald-400 font-mono">{stageOutput.fiveYearOverallSurvivalPercent}</span>
                  </div>
                </div>

                {stageOutput.prognosticStageGroup && (
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    <strong className="text-rose-300">Pathological Prognostic Group:</strong>{' '}
                    <span className="text-white">{stageOutput.prognosticStageGroup}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recommended Standard-of-Care Modalities</h3>
                  <div className="space-y-1.5">
                    {stageOutput.recommendedTreatmentModality.map((t, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-800/60 text-xs text-indigo-200">
                  <strong className="block text-indigo-300 mb-1">Clinical Trial & Biomarker Guidance:</strong>
                  {stageOutput.clinicalTrialEligibilityNotes}
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">
                Enter TNM staging categories on the left and calculate stage group.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chemo Regimens View */}
      {activeSubTab === 'CHEMO_REGIMENS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Calculator className="h-4 w-4 text-rose-400" />
              <span>Chemotherapy Protocol & Patient Parameters</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Select NCCN Regimen</label>
                <select
                  value={selectedRegimen}
                  onChange={(e) => setSelectedRegimen(e.target.value)}
                  className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800"
                >
                  {MASTER_CHEMO_REGIMENS.map((r) => (
                    <option key={r.regimenCode} value={r.regimenCode}>
                      {r.regimenName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Serum Creatinine (mg/dL)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={scr}
                    onChange={(e) => setScr(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Prior Anthracycline (mg/m²)</label>
                  <input
                    type="number"
                    value={priorAnthra}
                    onChange={(e) => setPriorAnthra(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculateChemo}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-1.5"
              >
                <span>Calculate Individualized Drug Doses</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            {chemoResult ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h2 className="text-base font-extrabold text-white">{chemoResult.regimen.regimenName}</h2>
                    <span className="text-xs text-slate-400">{chemoResult.regimen.primaryIndication}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-mono">BSA: {chemoResult.bsaM2} m²</span>
                    <span className="text-xs text-slate-400 block font-mono">CrCl: {chemoResult.calculatedCrClMlMin} mL/min</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Calculated Drug Orders</h3>
                  {chemoResult.drugDoseCalculations.map((d: any, idx: number) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-white text-xs">{d.drugName}</strong>
                        <span className="text-rose-400 font-mono font-bold text-xs">{d.prescribedDoseFormatted}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Route: {d.route} • Days: {d.adminDays.join(', ')}
                      </div>
                      {d.lifetimeCumulativeWarning && (
                        <div className="text-amber-400 text-[11px] font-semibold mt-1">
                          ⚠️ {d.lifetimeCumulativeWarning}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">
                Select a chemotherapy regimen on the left and calculate doses.
              </div>
            )}
          </div>
        </div>
      )}

      {/* RECIST 1.1 View */}
      {activeSubTab === 'RECIST_RESPONSE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-rose-400" />
              <span>RECIST 1.1 Restaging Measurements</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Baseline Sum of Longest Diameters (mm)</label>
                <input
                  type="number"
                  value={baselineSld}
                  onChange={(e) => setBaselineSld(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Target Lesion 1 (mm)</label>
                  <input
                    type="number"
                    value={lesion1Mm}
                    onChange={(e) => setLesion1Mm(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Target Lesion 2 (mm)</label>
                  <input
                    type="number"
                    value={lesion2Mm}
                    onChange={(e) => setLesion2Mm(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={hasNewLesions}
                  onChange={(e) => setHasNewLesions(e.target.checked)}
                  className="rounded text-rose-600 bg-slate-950 border-slate-800"
                />
                <span>New Metastatic Lesions Detected on Restaging Scan</span>
              </label>

              <button
                onClick={handleEvaluateRecist}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-1.5"
              >
                <span>Evaluate RECIST Response</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            {recistResult ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">RECIST 1.1 Response</span>
                    <h2 className="text-2xl font-extrabold text-white font-mono">{recistResult.overallRecistResponse}</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Percent Change from Baseline</span>
                    <span className={`text-xl font-extrabold font-mono ${
                      (recistResult.percentChangeFromBaseline || 0) <= -30
                        ? 'text-emerald-400'
                        : (recistResult.percentChangeFromBaseline || 0) >= 20
                        ? 'text-rose-400'
                        : 'text-amber-400'
                    }`}>
                      {recistResult.percentChangeFromBaseline}%
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <p className="text-slate-300 font-semibold">{recistResult.clinicalInterpretation}</p>
                  <p className="text-slate-400">{recistResult.actionableRecommendation}</p>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">
                Enter target lesion measurements on the left to evaluate treatment response.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
