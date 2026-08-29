/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Workflow Automation Engine Automated Tests
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { CRMDatabase } from '../../src/crm/database/crm_database.ts';
import { seedCRMDatabase } from '../../src/crm/database/seed_data.ts';
import { WorkflowAutomationEngine } from '../../src/crm/services/WorkflowAutomationEngine.ts';
import { WorkflowTriggerType } from '../../src/crm/domain/enums.ts';

describe('WorkflowAutomationEngine', () => {
  let db: CRMDatabase;
  let workflowEngine: WorkflowAutomationEngine;

  beforeEach(() => {
    db = CRMDatabase.getInstance();
    seedCRMDatabase(db);
    workflowEngine = new WorkflowAutomationEngine(db);
  });

  it('should evaluate boolean conditions accurately', () => {
    const isMatched = workflowEngine.evaluateConditions(
      [
        { field: 'score', operator: 'GREATER_THAN', value: 75 },
        { field: 'industry', operator: 'EQUALS', value: 'HEALTHCARE_LIFE_SCIENCES' }
      ],
      'AND',
      {
        score: 88,
        industry: 'HEALTHCARE_LIFE_SCIENCES'
      }
    );

    assert.equal(isMatched, true);
  });

  it('should process trigger and execute automated actions when conditions are satisfied', () => {
    const leadData = {
      id: 'ld_test_workflow_01',
      companyName: 'Acme Health Systems',
      score: 85,
      status: 'QUALIFYING',
      ownerId: 'usr_elena_rostova',
      ownerName: 'Elena Rostova',
      entityType: 'LEAD'
    };

    const results = workflowEngine.processTrigger(
      WorkflowTriggerType.FIELD_VALUE_CHANGED,
      'LEAD',
      leadData,
      'tenant_apex_global_001',
      'usr_sarah_connor'
    );

    assert.ok(results.length > 0);
    assert.equal(results[0].conditionsMatched, true);
    assert.ok(results[0].executedActionsCount >= 2);
  });
});
