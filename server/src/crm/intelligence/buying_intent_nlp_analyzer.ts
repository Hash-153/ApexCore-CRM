/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Interaction Transcript Natural Language Intent & Sentiment Classification Engine
 *
 * Evaluates meeting transcripts, sales call notes, and customer support emails for
 * buying intent signals, competitor mentions, budget commitment cues, and deal friction keywords.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { CustomerInteraction } from '../domain/types.ts';

export interface InteractionNLPAnalysis {
  interactionId: string;
  sentimentScore: number; // -1.0 (Very Negative) to +1.0 (Very Positive)
  overallSentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'HIGH_FRICTION';
  buyingSignalsDetected: {
    phrase: string;
    category: 'BUDGET_ALLOCATION' | 'TIMELINE_URGENCY' | 'EXECUTIVE_SPONSORSHIP' | 'LEGAL_READINESS';
    confidence: number;
  }[];
  objectionsDetected: {
    phrase: string;
    objectionType: 'PRICING_CONCERN' | 'SECURITY_COMPLIANCE' | 'INTEGRATION_FEASIBILITY' | 'COMPETITOR_PREFERENCE';
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
  }[];
  extractedCompetitors: string[];
  recommendedFollowUpAction: string;
}

export class BuyingIntentNLPAnalyzer {
  private db: CRMDatabase;

  private positiveKeywords = [
    'budget approved', 'ready to sign', 'board approved', 'procurement review',
    'champion', 'moving forward', 'deploy in q1', 'great demo', 'replace existing tool',
    'roi justified', 'security approved', 'executive sponsor', 'legal agreed'
  ];

  private objectionKeywords = [
    'too expensive', 'over budget', 'competitor is cheaper', 'security concern',
    'data privacy question', 'missing feature', 'delayed to next year', 'hiring freeze',
    'contract dispute', 'not right now', 'legal rejected'
  ];

  private competitorKeywords = [
    'salesforce', 'hubspot', 'microsoft dynamics', 'sap crm', 'oracle cx', 'zendesk', 'zoho'
  ];

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Analyzes an interaction text payload using NLP pattern matching and heuristic sentiment dictionaries.
   */
  public analyzeInteraction(interactionId: string, textContent: string): InteractionNLPAnalysis {
    const norm = textContent.toLowerCase();

    // 1. Detect Buying Signals
    const buyingSignals: InteractionNLPAnalysis['buyingSignalsDetected'] = [];
    for (const kw of this.positiveKeywords) {
      if (norm.includes(kw)) {
        let cat: InteractionNLPAnalysis['buyingSignalsDetected'][0]['category'] = 'EXECUTIVE_SPONSORSHIP';
        if (kw.includes('budget') || kw.includes('roi')) cat = 'BUDGET_ALLOCATION';
        else if (kw.includes('q1') || kw.includes('ready to sign')) cat = 'TIMELINE_URGENCY';
        else if (kw.includes('security') || kw.includes('legal')) cat = 'LEGAL_READINESS';

        buyingSignals.push({
          phrase: kw,
          category: cat,
          confidence: 0.92
        });
      }
    }

    // 2. Detect Objections
    const objections: InteractionNLPAnalysis['objectionsDetected'] = [];
    for (const kw of this.objectionKeywords) {
      if (norm.includes(kw)) {
        let type: InteractionNLPAnalysis['objectionsDetected'][0]['objectionType'] = 'PRICING_CONCERN';
        if (kw.includes('security') || kw.includes('privacy')) type = 'SECURITY_COMPLIANCE';
        else if (kw.includes('feature')) type = 'INTEGRATION_FEASIBILITY';
        else if (kw.includes('competitor')) type = 'COMPETITOR_PREFERENCE';

        objections.push({
          phrase: kw,
          objectionType: type,
          severity: kw.includes('legal rejected') || kw.includes('hiring freeze') ? 'HIGH' : 'MEDIUM'
        });
      }
    }

    // 3. Extract Competitors
    const foundCompetitors: string[] = [];
    for (const comp of this.competitorKeywords) {
      if (norm.includes(comp)) {
        foundCompetitors.push(comp.toUpperCase());
      }
    }

    // 4. Calculate Sentiment Score
    const posCount = buyingSignals.length;
    const negCount = objections.length;
    const total = Math.max(1, posCount + negCount);
    const score = Math.round(((posCount - negCount) / total) * 100) / 100;

    let sentiment: InteractionNLPAnalysis['overallSentiment'] = 'NEUTRAL';
    if (score >= 0.3) sentiment = 'POSITIVE';
    else if (score <= -0.5) sentiment = 'HIGH_FRICTION';
    else if (score < 0) sentiment = 'NEGATIVE';

    let followUp = 'Standard cadence follow-up email.';
    if (sentiment === 'POSITIVE' && buyingSignals.some(s => s.category === 'TIMELINE_URGENCY')) {
      followUp = 'Dispatch Master Order Form and schedule Legal closing call immediately.';
    } else if (sentiment === 'HIGH_FRICTION' || objections.some(o => o.severity === 'HIGH')) {
      followUp = 'Schedule Executive Alignment Intervention with VP Sales and prepare Objection Battlecard.';
    }

    return {
      interactionId,
      sentimentScore: score,
      overallSentiment: sentiment,
      buyingSignalsDetected: buyingSignals,
      objectionsDetected: objections,
      extractedCompetitors: Array.from(new Set(foundCompetitors)),
      recommendedFollowUpAction: followUp
    };
  }
}
