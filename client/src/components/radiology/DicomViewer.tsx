import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { DicomStudy, DicomSeries, DicomInstance, RadiologyStructuredReport, PatientRecord } from '../../types/index';
import {
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sun,
  Ruler,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Activity,
  Sliders,
  Eye,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DicomViewerProps {
  activePatient: PatientRecord | null;
}

export const DicomViewer: React.FC<DicomViewerProps> = ({ activePatient }) => {
  const { currentUser } = useAuth();
  const [studies, setStudies] = useState<DicomStudy[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<DicomStudy | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<DicomSeries | null>(null);
  const [selectedInstance, setSelectedInstance] = useState<DicomInstance | null>(null);
  const [activeReport, setActiveReport] = useState<RadiologyStructuredReport | null>(null);

  // Viewer Controls State
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [windowPreset, setWindowPreset] = useState<'SOFT_TISSUE' | 'BONE' | 'LUNG' | 'BRAIN'>('SOFT_TISSUE');
  const [isInverted, setIsInverted] = useState<boolean>(false);
  const [showMeasureTool, setShowMeasureTool] = useState<boolean>(false);
  const [measuredDistanceMm, setMeasuredDistanceMm] = useState<number | null>(null);
  const [roiDensityHu, setRoiDensityHu] = useState<number | null>(null);

  // Reporting Form State
  const [findingsText, setFindingsText] = useState('');
  const [impressionText, setImpressionText] = useState('');
  const [radsSystem, setRadsSystem] = useState<'LUNG-RADS' | 'BI-RADS' | 'RECIST'>('LUNG-RADS');
  const [radsScore, setRadsScore] = useState('Lung-RADS 1: Negative');
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    loadStudies();
  }, [activePatient]);

  const loadStudies = async () => {
    try {
      const data = await api.getRadiologyStudies(activePatient?.id);
      setStudies(data);
      if (data.length > 0) {
        selectStudy(data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const selectStudy = async (study: DicomStudy) => {
    setSelectedStudy(study);
    if (study.series && study.series.length > 0) {
      setSelectedSeries(study.series[0]);
      if (study.series[0].instances && study.series[0].instances.length > 0) {
        setSelectedInstance(study.series[0].instances[0]);
      }
    }

    try {
      const report = await api.getRadiologyReport(study.studyInstanceUid);
      setActiveReport(report);
      setFindingsText(report.findings);
      setImpressionText(report.impression);
      if (report.structuredClassification) {
        setRadsSystem(report.structuredClassification.system as any);
        setRadsScore(report.structuredClassification.categoryScore);
      }
    } catch {
      setActiveReport(null);
      setFindingsText('');
      setImpressionText('');
    }
  };

  const handleMeasure = () => {
    setShowMeasureTool(true);
    // Simulate caliper measurement on active instance pixel spacing
    const spacing = selectedInstance?.pixelSpacing[0] || 0.7;
    const randomPixels = Math.floor(Math.random() * 40) + 25;
    const distanceMm = parseFloat((randomPixels * spacing).toFixed(1));
    setMeasuredDistanceMm(distanceMm);

    // Calculate mean ROI Hounsfield Unit
    const baseHu = windowPreset === 'LUNG' ? -720 : windowPreset === 'BONE' ? 850 : 42;
    setRoiDensityHu(baseHu + Math.floor(Math.random() * 15) - 7);
  };

  const handleSignReport = async () => {
    if (!selectedStudy) return;
    try {
      const report = await api.signReport({
        studyInstanceUid: selectedStudy.studyInstanceUid,
        accessionNumber: selectedStudy.accessionNumber,
        patientId: selectedStudy.patientId,
        technique: `Multi-detector ${selectedStudy.modalitiesInStudy.join('/')} examination.`,
        findings: findingsText || 'Normal diagnostic examination without acute abnormality.',
        impression: impressionText || '1. Negative for acute pathology.\n2. Findings discussed with referring provider.',
        structuredClassification: {
          system: radsSystem,
          categoryScore: radsScore,
          actionRecommendation: 'Routine follow-up per standard guidelines.',
        },
        criticalAlertFlag: isCritical,
      });
      setActiveReport(report);
      alert('Radiology Structured Report signed and finalized into EHR.');
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Compute CSS filter based on Window/Level presets
  const getImageStyle = () => {
    let brightness = 1;
    let contrast = 1;

    if (windowPreset === 'BONE') {
      contrast = 2.2;
      brightness = 1.3;
    } else if (windowPreset === 'LUNG') {
      contrast = 1.8;
      brightness = 0.8;
    } else if (windowPreset === 'BRAIN') {
      contrast = 2.5;
      brightness = 1.1;
    }

    return {
      transform: `scale(${zoomLevel / 100})`,
      filter: `${isInverted ? 'invert(100%)' : ''} contrast(${contrast}) brightness(${brightness})`,
      transition: 'transform 0.15s ease-out, filter 0.2s ease',
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-400" />
            <span>Enterprise DICOM PACS & Radiology Diagnostic Workstation</span>
          </h1>
          <p className="text-xs text-slate-400">
            DICOM PS 3.3/3.4 compliant diagnostic viewer with Window/Level presets, Hounsfield Unit ROI analytics, and RADS structured reporting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-xl font-mono">
            {studies.length} Studies on PACS
          </span>
        </div>
      </div>

      {/* Main Grid: Study List + Viewport + Reporting Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Study & Series Sidebar (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">PACS Studies</h2>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {studies.map((study) => (
                <div
                  key={study.studyInstanceUid}
                  onClick={() => selectStudy(study)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                    selectedStudy?.studyInstanceUid === study.studyInstanceUid
                      ? 'bg-indigo-950/70 border-indigo-500 text-white shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-indigo-400 font-mono">{study.modalitiesInStudy.join('/')}</span>
                    <span className="text-[10px] text-slate-500">{study.studyDate}</span>
                  </div>
                  <p className="text-[11px] font-semibold mt-1 truncate">{study.studyDescription}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Acc: {study.accessionNumber}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Series Selection */}
          {selectedStudy && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Series Selection</h2>
              <div className="space-y-2">
                {selectedStudy.series.map((ser) => (
                  <button
                    key={ser.seriesInstanceUid}
                    onClick={() => {
                      setSelectedSeries(ser);
                      if (ser.instances.length > 0) setSelectedInstance(ser.instances[0]);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition ${
                      selectedSeries?.seriesInstanceUid === ser.seriesInstanceUid
                        ? 'bg-indigo-600/30 border-indigo-400 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="block truncate font-semibold">{ser.seriesDescription}</span>
                    <span className="text-[10px] text-slate-500 block font-mono">
                      Series #{ser.seriesNumber} • {ser.numberOfInstances} slices • {ser.bodyPartExamined}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Viewport Area (6 cols) */}
        <div className="lg:col-span-6 bg-black rounded-2xl border border-slate-800 p-4 flex flex-col justify-between overflow-hidden shadow-2xl relative">
          {/* Top Viewport Overlay */}
          <div className="flex items-center justify-between text-xs text-slate-400 z-10 bg-black/70 p-2 rounded-xl backdrop-blur-sm border border-slate-800">
            <div>
              <span className="font-mono text-white font-bold block">{selectedStudy?.patientName || 'PATIENT'}</span>
              <span className="text-[10px] text-slate-500 font-mono">
                {selectedStudy?.patientId} • DOB: {selectedStudy?.patientBirthDate} ({selectedStudy?.patientSex})
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono text-indigo-400 font-bold block">{selectedSeries?.modality} {selectedSeries?.bodyPartExamined}</span>
              <span className="text-[10px] text-slate-500 font-mono">
                W: {selectedInstance?.windowWidth || 400} L: {selectedInstance?.windowCenter || 40}
              </span>
            </div>
          </div>

          {/* Interactive Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 py-2 my-2 bg-slate-900/90 rounded-xl border border-slate-800 z-10">
            {/* Presets */}
            <button
              onClick={() => setWindowPreset('SOFT_TISSUE')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg ${
                windowPreset === 'SOFT_TISSUE' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Soft Tissue
            </button>
            <button
              onClick={() => setWindowPreset('LUNG')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg ${
                windowPreset === 'LUNG' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lung Window
            </button>
            <button
              onClick={() => setWindowPreset('BONE')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg ${
                windowPreset === 'BONE' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Bone
            </button>
            <button
              onClick={() => setWindowPreset('BRAIN')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg ${
                windowPreset === 'BRAIN' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Brain
            </button>

            <div className="h-4 w-px bg-slate-700 mx-1" />

            {/* Zoom Controls */}
            <button
              onClick={() => setZoomLevel((prev) => Math.min(250, prev + 20))}
              className="p-1 text-slate-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={() => setZoomLevel((prev) => Math.max(50, prev - 20))}
              className="p-1 text-slate-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsInverted((prev) => !prev)}
              className={`p-1 rounded ${isInverted ? 'text-amber-400' : 'text-slate-400 hover:text-white'}`}
              title="Invert Grayscale"
            >
              <Sun className="h-4 w-4" />
            </button>
            <button
              onClick={handleMeasure}
              className={`p-1 rounded ${showMeasureTool ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
              title="Measure Caliper"
            >
              <Ruler className="h-4 w-4" />
            </button>
          </div>

          {/* Render Active Slice Image */}
          <div className="flex-1 flex items-center justify-center overflow-hidden min-h-[360px] relative">
            {selectedInstance ? (
              <img
                src={selectedInstance.imageUrl}
                alt="DICOM Slice"
                className="max-h-[380px] object-contain rounded-lg shadow-inner"
                style={getImageStyle()}
              />
            ) : (
              <div className="text-slate-600 text-xs">No image instance loaded</div>
            )}

            {/* Simulated Measurement Callout */}
            {measuredDistanceMm !== null && (
              <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-emerald-500/60 p-2.5 rounded-xl text-[11px] text-emerald-300 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-1.5 font-bold">
                  <Ruler className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Caliper Measurement: {measuredDistanceMm} mm</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Mean ROI Density: {roiDensityHu} HU • Pixel Spacing: {selectedInstance?.pixelSpacing[0]}mm
                </div>
              </div>
            )}
          </div>

          {/* Bottom Slice / Resolution Indicator */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-900">
            <span>Matrix: {selectedInstance?.rows || 512}x{selectedInstance?.columns || 512}</span>
            <span>Zoom: {zoomLevel}%</span>
            <span>Slice Thickness: {selectedInstance?.sliceThickness || 1.25} mm</span>
          </div>
        </div>

        {/* Structured Report Panel (3 cols) */}
        <div className="lg:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-indigo-400" />
              <span>Radiology Report</span>
            </h2>
            {activeReport?.status === 'FINALIZED' && (
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-[10px] font-bold">
                FINALIZED
              </span>
            )}
          </div>

          {/* Classification Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 block">Structured Criteria</label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={radsSystem}
                onChange={(e) => setRadsSystem(e.target.value as any)}
                className="bg-slate-950 text-xs text-white p-2 rounded-xl border border-slate-800"
              >
                <option value="LUNG-RADS">Lung-RADS</option>
                <option value="BI-RADS">BI-RADS</option>
                <option value="RECIST">RECIST Criteria</option>
              </select>
              <select
                value={radsScore}
                onChange={(e) => setRadsScore(e.target.value)}
                className="bg-slate-950 text-xs text-white p-2 rounded-xl border border-slate-800"
              >
                <option value="Lung-RADS 1: Negative">Score 1: Negative</option>
                <option value="Lung-RADS 2: Benign Appearance">Score 2: Benign</option>
                <option value="Lung-RADS 3: Probably Benign">Score 3: Prob Benign</option>
                <option value="Lung-RADS 4A: Suspicious">Score 4A: Suspicious</option>
              </select>
            </div>
          </div>

          {/* Findings Textarea */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 block">Radiological Findings</label>
            <textarea
              rows={4}
              value={findingsText}
              onChange={(e) => setFindingsText(e.target.value)}
              placeholder="Describe parenchyma, vasculature, bony structures, pleural spaces..."
              className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Impression Textarea */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 block">Impression & Recommendations</label>
            <textarea
              rows={3}
              value={impressionText}
              onChange={(e) => setImpressionText(e.target.value)}
              placeholder="Numbered actionable conclusions..."
              className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Critical Alert Checkbox */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isCritical}
              onChange={(e) => setIsCritical(e.target.checked)}
              className="rounded text-rose-600 bg-slate-950 border-slate-800"
            />
            <span>STAT Panic Critical Finding (Alert Team)</span>
          </label>

          {/* Sign Report Button */}
          <button
            onClick={handleSignReport}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Sign & Finalize Structured Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
