import React, { useState } from 'react';
import {
  VariantInterpreterEngine,
  type GenomicVariant,
  type VariantInterpretationResult,
} from '../../../../server/src/genomics/variantInterpreter';
import {
  ActionableBiomarkerService,
  ACTIONABLE_BIOMARKERS_CATALOG,
  type ActionableBiomarkerEntry,
} from '../../../../server/src/genomics/actionableBiomarkers';
import type { PatientRecord } from '../../types/index';
import {
  Dna,
  Search,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Zap,
  FileCode,
} from 'lucide-react';

interface GenomicsWorkbenchProps {
  activePatient: PatientRecord | null;
}

export const GenomicsWorkbench: React.FC<GenomicsWorkbenchProps> = ({ activePatient }) => {
  const [activeTab, setActiveTab] = useState<'VARIANT_CLASSIFIER' | 'ACTIONABLE_TARGETS'>('VARIANT_CLASSIFIER');

  // Variant Input State
  const [geneSymbol, setGeneSymbol] = useState('EGFR');
  const [chromosome, setChromosome] = useState('chr7');
  const [coordinate, setCoordinate] = useState(55191822);
  const [cdna, setCdna] = useState('c.2573T>G');
  const [protein, setProtein] = useState('p.Leu858Arg');
  const [variantEffect, setVariantEffect] = useState<'MISSENSE' | 'NONSENSE' | 'FRAMESHIFT' | 'SPLICE_SITE'>('MISSENSE');
  const [gnomadMaf, setGnomadMaf] = useState(0.000008);
  const [caddScore, setCaddScore] = useState(28.5);
  const [revelScore, setRevelScore] = useState(0.88);
  const [interpretationResult, setInterpretationResult] = useState<VariantInterpretationResult | null>(null);

  // Search Actionable Catalog
  const [searchQuery, setSearchQuery] = useState('');
  const [matchedEntry, setMatchedEntry] = useState<ActionableBiomarkerEntry | null>(null);

  const handleClassifyVariant = () => {
    const variant: GenomicVariant = {
      geneSymbol,
      chromosome,
      genomicCoordinateGrch38: coordinate,
      referenceAllele: 'T',
      alternateAllele: 'G',
      hgvsCdna: cdna,
      hgvsProtein: protein,
      variantEffect,
      gnomadAlleleFrequency: gnomadMaf,
      computationalPredictors: {
        caddPhredScore: caddScore,
        revelScore: revelScore,
        alphaMissenseScore: 0.82,
      },
    };

    const res = VariantInterpreterEngine.classifyVariant(variant);
    setInterpretationResult(res);
  };

  const handleSearchBiomarker = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = ActionableBiomarkerService.matchTherapies(searchQuery, searchQuery);
    setMatchedEntry(entry || null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Dna className="h-5 w-5 text-indigo-400" />
            <span>Clinical Genomics, ACMG/AMP Variant Interpreter & Precision Oncology</span>
          </h1>
          <p className="text-xs text-slate-400">
            Automated ACMG/AMP 2015 pathogenicity classifier (PVS1/PS/PM/PP) and FDA-approved targeted therapy matcher.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('VARIANT_CLASSIFIER')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'VARIANT_CLASSIFIER' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            ACMG Variant Interpreter
          </button>
          <button
            onClick={() => setActiveTab('ACTIONABLE_TARGETS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'ACTIONABLE_TARGETS' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Targeted Therapeutics Catalog
          </button>
        </div>
      </div>

      {activeTab === 'VARIANT_CLASSIFIER' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCode className="h-4 w-4 text-indigo-400" />
              <span>Variant Genomic Nomenclature & Allele Frequencies</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Gene Symbol</label>
                  <input
                    type="text"
                    value={geneSymbol}
                    onChange={(e) => setGeneSymbol(e.target.value)}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Chromosome</label>
                  <input
                    type="text"
                    value={chromosome}
                    onChange={(e) => setChromosome(e.target.value)}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">HGVS cDNA Syntax</label>
                  <input
                    type="text"
                    value={cdna}
                    onChange={(e) => setCdna(e.target.value)}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">HGVS Protein Syntax</label>
                  <input
                    type="text"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Variant Molecular Consequence</label>
                <select
                  value={variantEffect}
                  onChange={(e) => setVariantEffect(e.target.value as any)}
                  className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800"
                >
                  <option value="MISSENSE">Missense (Amino Acid Substitution)</option>
                  <option value="NONSENSE">Nonsense (Premature Stop Codon)</option>
                  <option value="FRAMESHIFT">Frameshift Indel</option>
                  <option value="SPLICE_SITE">Canonical Splice Site (+/- 1, 2)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">gnomAD MAF</label>
                  <input
                    type="number"
                    value={gnomadMaf}
                    onChange={(e) => setGnomadMaf(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">CADD Phred</label>
                  <input
                    type="number"
                    value={caddScore}
                    onChange={(e) => setCaddScore(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">REVEL Score</label>
                  <input
                    type="number"
                    value={revelScore}
                    onChange={(e) => setRevelScore(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 text-white p-2 rounded-xl border border-slate-800 font-mono"
                  />
                </div>
              </div>

              <button
                onClick={handleClassifyVariant}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-1.5"
              >
                <Zap className="h-4 w-4" />
                <span>Evaluate ACMG/AMP Pathogenicity</span>
              </button>
            </div>
          </div>

          {/* Results (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            {interpretationResult ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs text-indigo-400 font-mono font-bold block">
                      {interpretationResult.variant.geneSymbol} {interpretationResult.variant.hgvsCdna} ({interpretationResult.variant.hgvsProtein})
                    </span>
                    <h2 className={`text-xl font-extrabold font-mono ${
                      interpretationResult.classification === 'PATHOGENIC'
                        ? 'text-rose-400'
                        : interpretationResult.classification === 'LIKELY_PATHOGENIC'
                        ? 'text-amber-400'
                        : interpretationResult.classification === 'UNCERTAIN_SIGNIFICANCE_VUS'
                        ? 'text-purple-400'
                        : 'text-emerald-400'
                    }`}>
                      {interpretationResult.classification.replace('_', ' ')}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-mono">{interpretationResult.satisfiedAcmgCriteria.length} Satisfied Criteria</span>
                  </div>
                </div>

                {/* Criteria Breakdown */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Satisfied ACMG/AMP Criteria</h3>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {interpretationResult.satisfiedAcmgCriteria.map((c, i) => (
                      <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-indigo-400 font-mono">{c.code} ({c.strength})</span>
                        </div>
                        <p className="text-slate-300">{c.rationale}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/60 text-xs text-indigo-200">
                  <strong className="block text-indigo-300 mb-1">Clinical Significance Narrative:</strong>
                  {interpretationResult.clinicalSignificanceNarrative}
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">
                Enter genomic variant nomenclature and predictors to evaluate ACMG classification.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'ACTIONABLE_TARGETS' && (
        <div className="space-y-4">
          <form onSubmit={handleSearchBiomarker} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by gene symbol or alteration (e.g. EGFR, BRAF, L858R, V600E, KRAS)..."
              className="flex-1 bg-slate-900 text-white text-xs p-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <Search className="h-4 w-4" />
              <span>Search Catalog</span>
            </button>
          </form>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACTIONABLE_BIOMARKERS_CATALOG.map((entry, idx) => (
              <div key={idx} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 font-mono block">{entry.geneSymbol}</span>
                    <h3 className="text-base font-extrabold text-white">{entry.specificAlteration}</h3>
                  </div>
                  <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded text-[10px] font-mono">
                    {entry.alterationType}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 border-y border-slate-800 py-2.5">
                  <div className="text-slate-400">
                    <strong>FDA Approved Therapies:</strong>
                    <div className="mt-1 space-y-1">
                      {entry.fdaApprovedTherapies.map((t, i) => (
                        <div key={i} className="text-emerald-300 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>{t.drugName} ({t.lineOfTherapy.replace('_', ' ')})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-slate-400 text-[11px] pt-1">
                    <strong>Indications:</strong> {entry.cancerTypeIndications.join(', ')}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    <strong>Assay:</strong> {entry.companionDiagnosticAssay}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
