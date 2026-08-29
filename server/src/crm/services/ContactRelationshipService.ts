/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Contact Relationship & Buying Committee Intelligence Service
 *
 * Maps stakeholder personas, influence scores, engagement sentiment,
 * and tracks compliance with GDPR / CCPA opt-in consent.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import { ContactPersona } from '../domain/enums.ts';
import type { Contact } from '../domain/types.ts';

export interface BuyingCommitteeMap {
  decisionMakers: Contact[];
  economicBuyers: Contact[];
  champions: Contact[];
  technicalEvaluators: Contact[];
  blockers: Contact[];
  influencers: Contact[];
  hasStrongCoverage: boolean;
  blockerRiskCount: number;
}

export class ContactRelationshipService {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Evaluates stakeholder coverage and power map for a target account.
   */
  public analyzeBuyingCommittee(accountId: string): BuyingCommitteeMap {
    const contacts = this.db.getContactsByAccountId(accountId);

    const decisionMakers: Contact[] = [];
    const economicBuyers: Contact[] = [];
    const champions: Contact[] = [];
    const technicalEvaluators: Contact[] = [];
    const blockers: Contact[] = [];
    const influencers: Contact[] = [];

    for (const c of contacts) {
      switch (c.persona) {
        case ContactPersona.DECISION_MAKER:
        case ContactPersona.EXECUTIVE_SPONSOR:
          decisionMakers.push(c);
          break;
        case ContactPersona.ECONOMIC_BUYER:
          economicBuyers.push(c);
          break;
        case ContactPersona.INTERNAL_CHAMPION:
          champions.push(c);
          break;
        case ContactPersona.TECHNICAL_EVALUATOR:
          technicalEvaluators.push(c);
          break;
        case ContactPersona.BLOCKER:
          blockers.push(c);
          break;
        default:
          influencers.push(c);
          break;
      }
    }

    const hasStrongCoverage = decisionMakers.length > 0 && (economicBuyers.length > 0 || champions.length > 0);

    return {
      decisionMakers,
      economicBuyers,
      champions,
      technicalEvaluators,
      blockers,
      influencers,
      hasStrongCoverage,
      blockerRiskCount: blockers.length
    };
  }

  /**
   * Updates GDPR / CCPA privacy consent state for a contact.
   */
  public recordConsent(contactId: string, consentGranted: boolean): Contact {
    const contact = this.db.contacts.get(contactId);
    if (!contact) {
      throw new Error(`Contact not found with ID: ${contactId}`);
    }

    contact.emailOptOut = !consentGranted;
    contact.doNotCall = !consentGranted;
    contact.gdprConsentDate = consentGranted ? new Date().toISOString() : undefined;
    contact.updatedAt = new Date().toISOString();

    return contact;
  }
}
