/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Helpdesk & SLA Engine Automated Tests
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { CRMDatabase } from '../../src/crm/database/crm_database.ts';
import { seedCRMDatabase } from '../../src/crm/database/seed_data.ts';
import { HelpdeskAndSLAService } from '../../src/crm/services/HelpdeskAndSLAService.ts';
import { TicketPriority, TicketChannel, TicketStatus } from '../../src/crm/domain/enums.ts';

describe('HelpdeskAndSLAService', () => {
  let db: CRMDatabase;
  let slaService: HelpdeskAndSLAService;

  beforeEach(() => {
    db = CRMDatabase.getInstance();
    seedCRMDatabase(db);
    slaService = new HelpdeskAndSLAService(db);
  });

  it('should ingest customer ticket and configure SLA timers according to priority policy', () => {
    const ticket = slaService.ingestTicket({
      tenantId: 'tenant_apex_global_001',
      subject: 'Critical Database Replication Lag',
      description: 'Secondary replica falling behind by 45 seconds during market open.',
      priority: TicketPriority.P1_URGENT,
      channel: TicketChannel.API,
      accountId: 'acc_apex_fintech',
      actorId: 'usr_david_chen'
    });

    assert.equal(ticket.status, TicketStatus.NEW);
    assert.equal(ticket.priority, TicketPriority.P1_URGENT);
    assert.ok(ticket.sla.firstResponseDueAt);
    assert.ok(ticket.sla.resolutionDueAt);
    assert.equal(ticket.sla.isFirstResponseBreached, false);
  });

  it('should stop First Response SLA timer upon first official agent reply', () => {
    const ticket = slaService.addAgentComment(
      'tkt_horizon_sso_issue',
      'usr_david_chen',
      'David Chen',
      'Support Specialist',
      'We have initiated the configuration check and verified the SAML cert.',
      false
    );

    assert.ok(ticket.sla.firstResponseMetAt);
    assert.equal(ticket.sla.isFirstResponseBreached, false);
    assert.equal(ticket.status, TicketStatus.PENDING_CUSTOMER);
  });
});
