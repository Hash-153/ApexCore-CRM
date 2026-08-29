/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Behavioral Lead Intent Scoring & Surge Telemetry Engine
 *
 * Implements exponential half-life decay of intent events, high-intent topic clustering,
 * and automated marketing-to-sales qualification threshold triggers.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import type { Lead } from '../domain/types.ts';
import { LeadRating } from '../domain/enums.ts';

export interface IntentSignalEvent {
  id: string;
  leadId: string;
  eventType: 'PRICING_PAGE_VIEW' | 'DOCUMENTATION_READ' | 'WHITEPAPER_DOWNLOAD' | 'WEBINAR_ATTENDED' | 'API_KEY_GENERATED';
  topic: string;
  weightScore: number;
  occurredAt: string;
}

export interface LeadIntentProfile {
  leadId: string;
  rawIntentScore: number;
  decayedIntentScore: number;
  intentSurgeDetected: boolean;
  highIntentTopics: string[];
  recommendedOutreachChannel: 'DIRECT_PHONE_CALL' | 'EXECUTIVE_EMAIL' | 'PRODUCT_DEMO_INVITE' | 'NURTURE_SEQUENCE';
  computedAt: string;
}

export class LeadIntentScoringMatrix {
  private db: CRMDatabase;
  private signalEvents: IntentSignalEvent[] = [];

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  public recordSignal(event: Omit<IntentSignalEvent, 'id'>): IntentSignalEvent {
    const id = `sig_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const fullEvent: IntentSignalEvent = {
      ...event,
      id
    };
    this.signalEvents.push(fullEvent);
    return fullEvent;
  }

  /**
   * Calculates time-decayed intent score for a lead (7-day half-life).
   */
  public evaluateLeadIntent(leadId: string): LeadIntentProfile {
    const events = this.signalEvents.filter(e => e.leadId === leadId);
    const now = Date.now();
    const halfLifeMs = 7 * 24 * 60 * 60 * 1000; // 7 days

    let rawScore = 0;
    let decayedScore = 0;
    const topicScores: Record<string, number> = {};

    for (const ev of events) {
      rawScore += ev.weightScore;

      const eventAgeMs = Math.max(0, now - new Date(ev.occurredAt).getTime());
      const decayFactor = Math.pow(0.5, eventAgeMs / halfLifeMs);
      const effectiveScore = ev.weightScore * decayFactor;

      decayedScore += effectiveScore;
      topicScores[ev.topic] = (topicScores[ev.topic] || 0) + effectiveScore;
    }

    // Default baseline score if no explicit signals logged
    if (events.length === 0) {
      const lead = this.db.leads.get(leadId);
      decayedScore = lead ? lead.score || 60 : 50;
      rawScore = decayedScore;
    }

    const highIntentTopics = Object.entries(topicScores)
      .filter(([_, score]) => score > 15)
      .map(([topic]) => topic);

    const surge = decayedScore >= 75;

    let outreach: LeadIntentProfile['recommendedOutreachChannel'] = 'NURTURE_SEQUENCE';
    if (decayedScore >= 85) outreach = 'DIRECT_PHONE_CALL';
    else if (decayedScore >= 70) outreach = 'PRODUCT_DEMO_INVITE';
    else if (decayedScore >= 50) outreach = 'EXECUTIVE_EMAIL';

    // Update lead rating in DB
    const lead = this.db.leads.get(leadId);
    if (lead) {
      if (decayedScore >= 80) lead.rating = LeadRating.HOT;
      else if (decayedScore >= 50) lead.rating = LeadRating.WARM;
      else lead.rating = LeadRating.COLD;
      lead.updatedAt = new Date().toISOString();
    }

    return {
      leadId,
      rawIntentScore: Math.round(rawScore),
      decayedIntentScore: Math.round(decayedScore),
      intentSurgeDetected: surge,
      highIntentTopics,
      recommendedOutreachChannel: outreach,
      computedAt: new Date().toISOString()
    };
  }
}
