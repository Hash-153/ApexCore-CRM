import React, { useState } from 'react';
import {
  PediatricGrowthEngine,
  type PediatricPatientInput,
  type GrowthMetricsResult,
} from '../../../../server/src/clinical/pediatrics/growthCharts';
import {
  NeonatalCareEngine,
  type BhutaniBilirubinInput,
  type BhutaniBilirubinResult,
  type ApgarScoreInput,
} from '../../../../server/src/clinical/pediatrics/neonatalCare';
import type { PatientRecord } from '../../types/index';
import {
  Baby,
  Activity,
  Heart,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Sun,
  ShieldAlert,
} from 'lucide-react';

interface PediatricCenterProps {
  activePatient: PatientRecord | null;
}

export const PediatricCenter: React.FC<PediatricCenterProps> = ({ activePatient }) => {
  const [activeTab, setActiveTab] = useState<'GROWTH_CHARTS' | 'NEONATAL_BILIRUBIN' | 'APGAR_SCORE'>('GROWTH_CHARTS');

  // Growth Chart State
  const [ageMonths, setAgeMonths] = useState(12);
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [weightKg, setWeightKg] = useState(9.8);
  const [lengthCm, setLengthCm] = useState(76.0);
  const [headCm, setHeadCm] = useState(46.2);
  const [growthResult, setGrowthResult] = useState<GrowthMetricsResult | null>(null);

  // Bhutani Bilirubin State
  const [gestationalWeeks, setGestationalWeeks] = useState(39);
  const [postnatalHours, setPostnatalHours] = useState(48);
  const [serumBili, setSerumBili] = useState(13.8);
  const [hasNeuroRisk, setHasNeuroRisk] = useState(false);
  const [biliResult, setBiliResult] = useState<BhutaniBilirubinResult | null>(null);

  // APGAR State
  const [apgarColor, setApgarColor] = useState<0 | 1 | 2>(2);
  const [apgarHr, setApgarHr] = useState<0 | 1 | 2>(2);
  const [apgarGrimace, setApgarGrimace] = useState<0 | 1 | 2>(2);
  const [apgarTone, setApgarTone] = useState<0 | 1 | 2>(2);
  const [apgarResp, setApgarResp] = useState<0 | 1 | 2>(2);
  const [apgarResult, setApgarResult] = useState<any>(null);

  const handleCalculateGrowth = () => {
    const res = PediatricGrowthEngine.evaluateGrowth({
      ageMonths,
      gender,
      weightKg,
      lengthHeightCm: lengthCm,
      headCircumferenceCm: headCm,
    });
    setGrowthResult(res);
  };

  const handleEvaluateBili = () => {
    const res = NeonatalCareEngine.evaluateHyperbilirubinemia({
      gestationalAgeWeeks: gestationalWeeks,
      postnatalAgeHours: postnatalHours,
      totalSerumBilirubinMgDl: serumBili,
      hasNeurotoxicityRiskFactors: hasNeuroRisk,
    });
    setBiliResult(res);
  };

  const handleCalculateApgar = () => {
    const res = NeonatalCareEngine.calculateApgar({
      timeframe: 'ONE_MINUTE',
      appearanceColor: apgarColor,
      pulseHeartRate: apgarHr,
      grimaceReflex: apgarGrimace,
      activityMuscleTone: apgarTone,
      respirationEffort: apgarResp,
    });
    setApgarResult(res);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Baby className="h-5 w-5 text-amber-400" />
            <span>Pediatric Growth Curves, Neonatal Intensive Care & APGAR Engine</span>
          </h1>
          <p className="text-xs text-slate-400">
            WHO/CDC anthropometric LMS Z-scores, AAP 2022 Bhutani hyperbilirubinemia nomograms, and neonatal resuscitation protocols.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('GROWTH_CHARTS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'GROWTH_CHARTS' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            WHO/CDC Growth Z-Scores
          </button>
          <button
            onClick={() => setActiveTab('NEONATAL_BILIRUBIN')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'NEONATAL_BILIRUBIN' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Bhutani Phototherapy
          </button>
          <button
            onClick={() => setActiveTab('APGAR_SCORE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'APGAR_SCORE' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            APGAR Scoring
          </button>
        </div>
      </div>

      {activeTab === 'GROWTH_CHARTS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-amber-400" />
              <span>Anthropometric Measurements</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Age (Months)</label>
                  <input
                    type="number"
                    value={ageMonths}
                    onChange={(e) => setAgeMonths(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Biological Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-semibold"
                  >
                    <option value="MALE">Male (WHO Boys)</option>
                    <option value="FEMALE">Female (WHO Girls)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Length (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={lengthCm}
                    onChange={(e) => setLengthCm(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Head Circ (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={headCm}
                    onChange={(e) => setHeadCm(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculateGrowth}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-1.5"
              >
                <span>Calculate LMS Z-Scores & Percentiles</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            {growthResult ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Weight-for-Age</span>
                    <strong className="text-amber-400 font-mono text-base">{growthResult.weight.percentile}%</strong>
                    <span className="text-[10px] text-slate-500 block font-mono">Z: {growthResult.weight.zScore}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Length-for-Age</span>
                    <strong className="text-cyan-400 font-mono text-base">{growthResult.height.percentile}%</strong>
                    <span className="text-[10px] text-slate-500 block font-mono">Z: {growthResult.height.zScore}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">BMI Percentile</span>
                    <strong className="text-emerald-400 font-mono text-base">{growthResult.bmi.percentile}%</strong>
                    <span className="text-[10px] text-slate-500 block font-mono">{growthResult.bmi.category}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Head Circ</span>
                    <strong className="text-purple-400 font-mono text-base">{growthResult.headCircumference?.percentile}%</strong>
                    <span className="text-[10px] text-slate-500 block font-mono">Z: {growthResult.headCircumference?.zScore}</span>
                  </div>
                </div>

                {growthResult.clinicalFlags.length > 0 && (
                  <div className="bg-amber-950/40 border border-amber-800/60 p-3.5 rounded-xl text-xs text-amber-200 space-y-1">
                    <strong className="block text-amber-300 font-bold">Clinical Nutrition & Growth Alerts:</strong>
                    {growthResult.clinicalFlags.map((f, i) => (
                      <p key={i}>• {f}</p>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">
                Enter pediatric age and anthropometric measurements to plot LMS percentiles.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'NEONATAL_BILIRUBIN' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sun className="h-4 w-4 text-amber-400" />
              <span>Bhutani Hour-Specific Parameters</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Gestational Age (wks)</label>
                  <input
                    type="number"
                    value={gestationalWeeks}
                    onChange={(e) => setGestationalWeeks(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Postnatal Age (hours)</label>
                  <input
                    type="number"
                    value={postnatalHours}
                    onChange={(e) => setPostnatalHours(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Total Serum Bilirubin (TSB mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={serumBili}
                  onChange={(e) => setSerumBili(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                />
              </div>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={hasNeuroRisk}
                  onChange={(e) => setHasNeuroRisk(e.target.checked)}
                  className="rounded text-amber-600 bg-slate-950 border-slate-800"
                />
                <span>Neurotoxicity Risk Factors Present (Hemolysis, Alb &lt; 3.0, Sepsis)</span>
              </label>

              <button
                onClick={handleEvaluateBili}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-1.5"
              >
                <span>Evaluate AAP 2022 Thresholds</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            {biliResult ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Bhutani Risk Zone</span>
                    <h2 className={`text-xl font-extrabold font-mono ${
                      biliResult.isPhototherapyRecommended ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {biliResult.riskZone.replace(/_/g, ' ')}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-mono">Phototherapy Threshold</span>
                    <strong className="text-amber-400 font-mono text-base">{biliResult.phototherapyThresholdMgDl} mg/dL</strong>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p>{biliResult.clinicalActionPlan}</p>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">
                Enter infant gestational age, postnatal hours, and serum bilirubin to check phototherapy curve.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'APGAR_SCORE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-400" />
              <span>APGAR Parameters</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">A - Appearance (Color)</label>
                <select value={apgarColor} onChange={(e) => setApgarColor(parseInt(e.target.value, 10) as any)} className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800">
                  <option value={2}>2: Completely pink body & extremities</option>
                  <option value={1}>1: Pink body, blue extremities (acrocyanosis)</option>
                  <option value={0}>0: Completely blue or pale</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">P - Pulse (Heart Rate)</label>
                <select value={apgarHr} onChange={(e) => setApgarHr(parseInt(e.target.value, 10) as any)} className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800">
                  <option value={2}>2: Heart Rate &gt;= 100 bpm</option>
                  <option value={1}>1: Heart Rate &lt; 100 bpm</option>
                  <option value={0}>0: Absent pulse</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">G - Grimace (Reflex Irritability)</label>
                <select value={apgarGrimace} onChange={(e) => setApgarGrimace(parseInt(e.target.value, 10) as any)} className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800">
                  <option value={2}>2: Vigorous cry, sneeze, cough, pull away</option>
                  <option value={1}>1: Grimace or weak cry on stimulation</option>
                  <option value={0}>0: No response</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">A - Activity (Muscle Tone)</label>
                <select value={apgarTone} onChange={(e) => setApgarTone(parseInt(e.target.value, 10) as any)} className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800">
                  <option value={2}>2: Active, spontaneous motion</option>
                  <option value={1}>1: Some flexion of extremities</option>
                  <option value={0}>0: Flaccid / limp</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">R - Respiration (Breathing Effort)</label>
                <select value={apgarResp} onChange={(e) => setApgarResp(parseInt(e.target.value, 10) as any)} className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800">
                  <option value={2}>2: Strong, robust lusty cry</option>
                  <option value={1}>1: Slow, irregular breathing, weak cry</option>
                  <option value={0}>0: Absent respirations</option>
                </select>
              </div>

              <button
                onClick={handleCalculateApgar}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-1.5"
              >
                <span>Calculate APGAR Score</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            {apgarResult ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">1-Minute APGAR Score</span>
                    <h2 className="text-3xl font-extrabold text-amber-400 font-mono">{apgarResult.totalScore} / 10</h2>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold font-mono">
                    {apgarResult.category.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <p>{apgarResult.resuscitationGuidance}</p>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">
                Select 5 APGAR parameters on the left to evaluate newborn vitality.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
