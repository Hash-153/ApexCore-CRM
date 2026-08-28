import React, { useState } from 'react';
import { api } from '../../services/api';
import { Activity, X, Heart, Stethoscope, Baby, Calculator } from 'lucide-react';

interface ClinicalCalculatorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicalCalculatorsModal: React.FC<ClinicalCalculatorsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'NEWS2' | 'EGFR' | 'CHADS' | 'PED_DOSING'>('NEWS2');

  // NEWS2 State
  const [newsVitals, setNewsVitals] = useState({
    respiratoryRate: 18,
    spO2: 96,
    supplementalOxygen: false,
    systolicBP: 124,
    pulseRate: 78,
    consciousness: 'ALERT' as 'ALERT' | 'VOICE' | 'PAIN' | 'UNRESPONSIVE',
    temperature: 37.0,
  });
  const [news2Result, setNews2Result] = useState<any | null>(null);

  // eGFR State
  const [egfrInput, setEgfrInput] = useState({
    creatinine: 1.1,
    age: 65,
    gender: 'male',
  });
  const [egfrResult, setEgfrResult] = useState<any | null>(null);

  // CHA2DS2-VASc State
  const [chadsInput, setChadsInput] = useState({
    congestiveHeartFailure: false,
    hypertension: true,
    age: 72,
    diabetes: true,
    strokeOrTIAHistory: false,
    vascularDisease: true,
    gender: 'female',
  });
  const [chadsResult, setChadsResult] = useState<any | null>(null);

  // Pediatric Dosing State
  const [pedInput, setPedInput] = useState({
    weightKg: 16.5,
    doseMgPerKg: 20,
    dosingFrequencyPerDay: 2,
    maxSingleDoseMg: 500,
    maxDailyDoseMg: 1000,
  });
  const [pedResult, setPedResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleCalcNews2 = async () => {
    try {
      const res = await api.calculateNews2(newsVitals);
      setNews2Result(res);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCalcEgfr = async () => {
    try {
      const res = await api.calculateEgfr({
        creatinineMgDl: Number(egfrInput.creatinine),
        ageYears: Number(egfrInput.age),
        gender: egfrInput.gender,
      });
      setEgfrResult(res);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCalcChads = async () => {
    try {
      const res = await api.calculateChadsvasc({
        ...chadsInput,
        age: Number(chadsInput.age),
      });
      setChadsResult(res);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCalcPed = async () => {
    try {
      const res = await api.calculatePediatricDosing({
        weightKg: Number(pedInput.weightKg),
        doseMgPerKg: Number(pedInput.doseMgPerKg),
        dosingFrequencyPerDay: Number(pedInput.dosingFrequencyPerDay),
        maxSingleDoseMg: Number(pedInput.maxSingleDoseMg),
        maxDailyDoseMg: Number(pedInput.maxDailyDoseMg),
      });
      setPedResult(res);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-5 p-6 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Clinical Decision Support Calculators</h2>
              <p className="text-[11px] text-slate-400">Evidence-based standardized medical algorithms</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'NEWS2', label: 'NEWS2 Early Warning', icon: Activity },
            { id: 'EGFR', label: 'eGFR (CKD-EPI)', icon: Stethoscope },
            { id: 'CHADS', label: 'CHA2DS2-VASc', icon: Heart },
            { id: 'PED_DOSING', label: 'Pediatric Dosing', icon: Baby },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: NEWS2 */}
        {activeTab === 'NEWS2' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Resp Rate (/min)</label>
                <input
                  type="number"
                  value={newsVitals.respiratoryRate}
                  onChange={(e) => setNewsVitals({ ...newsVitals, respiratoryRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">SpO2 (%)</label>
                <input
                  type="number"
                  value={newsVitals.spO2}
                  onChange={(e) => setNewsVitals({ ...newsVitals, spO2: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Systolic BP (mmHg)</label>
                <input
                  type="number"
                  value={newsVitals.systolicBP}
                  onChange={(e) => setNewsVitals({ ...newsVitals, systolicBP: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Heart Rate (bpm)</label>
                <input
                  type="number"
                  value={newsVitals.pulseRate}
                  onChange={(e) => setNewsVitals({ ...newsVitals, pulseRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Temp (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newsVitals.temperature}
                  onChange={(e) => setNewsVitals({ ...newsVitals, temperature: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Consciousness (AVPU)</label>
                <select
                  value={newsVitals.consciousness}
                  onChange={(e) => setNewsVitals({ ...newsVitals, consciousness: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  <option value="ALERT">Alert</option>
                  <option value="VOICE">Voice</option>
                  <option value="PAIN">Pain</option>
                  <option value="UNRESPONSIVE">Unresponsive</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="suppO2"
                  checked={newsVitals.supplementalOxygen}
                  onChange={(e) => setNewsVitals({ ...newsVitals, supplementalOxygen: e.target.checked })}
                  className="rounded text-sky-500"
                />
                <label htmlFor="suppO2" className="text-slate-300">Supplemental O2</label>
              </div>
            </div>

            <button onClick={handleCalcNews2} className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold">
              Compute NEWS2 Score
            </button>

            {news2Result && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-sm">NEWS2 Score: {news2Result.score}</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${news2Result.riskLevel === 'HIGH' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {news2Result.riskLevel} RISK
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">{news2Result.clinicalAction}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: eGFR */}
        {activeTab === 'EGFR' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Serum Creatinine (mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={egfrInput.creatinine}
                  onChange={(e) => setEgfrInput({ ...egfrInput, creatinine: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Age (Years)</label>
                <input
                  type="number"
                  value={egfrInput.age}
                  onChange={(e) => setEgfrInput({ ...egfrInput, age: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Biological Sex</label>
                <select
                  value={egfrInput.gender}
                  onChange={(e) => setEgfrInput({ ...egfrInput, gender: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <button onClick={handleCalcEgfr} className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold">
              Compute 2021 CKD-EPI eGFR
            </button>

            {egfrResult && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-sm">eGFR: {egfrResult.egfr} mL/min/1.73m²</span>
                  <span className="text-amber-400 font-bold">{egfrResult.stage}</span>
                </div>
                <p className="text-slate-400 text-[11px]">{egfrResult.interpretation}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CHA2DS2-VASc */}
        {activeTab === 'CHADS' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chadsInput.congestiveHeartFailure}
                  onChange={(e) => setChadsInput({ ...chadsInput, congestiveHeartFailure: e.target.checked })}
                />
                <span>Congestive Heart Failure (+1)</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chadsInput.hypertension}
                  onChange={(e) => setChadsInput({ ...chadsInput, hypertension: e.target.checked })}
                />
                <span>Hypertension (+1)</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chadsInput.diabetes}
                  onChange={(e) => setChadsInput({ ...chadsInput, diabetes: e.target.checked })}
                />
                <span>Diabetes Mellitus (+1)</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chadsInput.strokeOrTIAHistory}
                  onChange={(e) => setChadsInput({ ...chadsInput, strokeOrTIAHistory: e.target.checked })}
                />
                <span>Prior Stroke / TIA / TE (+2)</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chadsInput.vascularDisease}
                  onChange={(e) => setChadsInput({ ...chadsInput, vascularDisease: e.target.checked })}
                />
                <span>Vascular Disease (MI, PAD) (+1)</span>
              </label>
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
                <span>Age:</span>
                <input
                  type="number"
                  value={chadsInput.age}
                  onChange={(e) => setChadsInput({ ...chadsInput, age: Number(e.target.value) })}
                  className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-white"
                />
              </div>
            </div>

            <button onClick={handleCalcChads} className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold">
              Compute CHA2DS2-VASc Stroke Risk
            </button>

            {chadsResult && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-sm">Score: {chadsResult.score}</span>
                  <span className="text-rose-400 font-bold">Annual Stroke Risk: {chadsResult.annualStrokeRiskPercent}%</span>
                </div>
                <p className="text-slate-400 text-[11px]">{chadsResult.anticoagulationRecommendation}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Pediatric Dosing */}
        {activeTab === 'PED_DOSING' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Child Weight (kg)</label>
                <input
                  type="number"
                  step="0.5"
                  value={pedInput.weightKg}
                  onChange={(e) => setPedInput({ ...pedInput, weightKg: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Dose (mg / kg)</label>
                <input
                  type="number"
                  value={pedInput.doseMgPerKg}
                  onChange={(e) => setPedInput({ ...pedInput, doseMgPerKg: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Frequency (times/day)</label>
                <input
                  type="number"
                  value={pedInput.dosingFrequencyPerDay}
                  onChange={(e) => setPedInput({ ...pedInput, dosingFrequencyPerDay: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
            </div>

            <button onClick={handleCalcPed} className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold">
              Calculate Safe Weight-Based Dose
            </button>

            {pedResult && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-sm">Single Dose: {pedResult.singleDoseMg} mg</span>
                  <span className="text-emerald-400 font-bold">Daily Total: {pedResult.dailyTotalMg} mg</span>
                </div>
                {pedResult.warningMessage && (
                  <p className="text-amber-400 font-semibold text-[11px]">{pedResult.warningMessage}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
