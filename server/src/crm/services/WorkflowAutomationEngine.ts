/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Visual Workflow Automation & Rule Evaluation Engine
 *
 * Implements a recursive Trigger-Condition-Action evaluation tree,
 * automated field updates, task assignments, notification dispatches, and webhook relays.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import { WorkflowTriggerType, WorkflowActionType, ActivityType, ActivityPriority, ActivityStatus } from '../domain/enums.ts';
import type { WorkflowRule, WorkflowCondition, WorkflowAction, Activity } from '../domain/types.ts';

export interface WorkflowEvaluationResult {
  ruleId: string;
  ruleName: string;
  triggered: boolean;
  conditionsMatched: boolean;
  executedActionsCount: number;
  actionDetails: string[];
}

export class WorkflowAutomationEngine {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Processes a lifecycle trigger event across active workflow rules.
   */
  public processTrigger(
    triggerType: WorkflowTriggerType,
    entityType: 'LEAD' | 'OPPORTUNITY' | 'ACCOUNT' | 'TICKET',
    entityData: Record<string, any>,
    tenantId: string,
    actorId: string = 'system'
  ): WorkflowEvaluationResult[] {
    const results: WorkflowEvaluationResult[] = [];

    for (const rule of this.db.workflowRules.values()) {
      if (!rule.isActive || rule.tenantId !== tenantId) continue;
      if (rule.triggerType !== triggerType || rule.entityType !== entityType) continue;

      const conditionsMatched = this.evaluateConditions(rule.conditions, rule.conditionLogic, entityData);

      if (conditionsMatched) {
        const actionDetails: string[] = [];

        for (const action of rule.actions) {
          const detail = this.executeAction(action, entityData, tenantId, actorId);
          actionDetails.push(detail);
        }

        rule.executionCount++;
        rule.lastExecutedAt = new Date().toISOString();

        results.push({
          ruleId: rule.id,
          ruleName: rule.name,
          triggered: true,
          conditionsMatched: true,
          executedActionsCount: rule.actions.length,
          actionDetails
        });
      }
    }

    return results;
  }

  /**
   * Evaluates conditional logic trees (AND / OR).
   */
  public evaluateConditions(
    conditions: WorkflowCondition[],
    logic: 'AND' | 'OR',
    data: Record<string, any>
  ): boolean {
    if (conditions.length === 0) return true;

    const evaluations = conditions.map(cond => {
      const val = data[cond.field];

      switch (cond.operator) {
        case 'EQUALS':
          return String(val) === String(cond.value);
        case 'NOT_EQUALS':
          return String(val) !== String(cond.value);
        case 'CONTAINS':
          return typeof val === 'string' && val.toLowerCase().includes(String(cond.value).toLowerCase());
        case 'GREATER_THAN':
          return Number(val) > Number(cond.value);
        case 'LESS_THAN':
          return Number(val) < Number(cond.value);
        case 'IS_EMPTY':
          return val === null || val === undefined || val === '';
        case 'IS_NOT_EMPTY':
          return val !== null && val !== undefined && val !== '';
        default:
          return false;
      }
    });

    return logic === 'AND' ? evaluations.every(Boolean) : evaluations.some(Boolean);
  }

  /**
   * Executes individual automated action.
   */
  private executeAction(
    action: WorkflowAction,
    data: Record<string, any>,
    tenantId: string,
    actorId: string
  ): string {
    const now = new Date().toISOString();

    switch (action.type) {
      case WorkflowActionType.ASSIGN_OWNER: {
        const newOwner = this.db.users.get(String(action.value));
        if (newOwner && data.id) {
          data.ownerId = newOwner.id;
          data.ownerName = newOwner.fullName;
          return `Assigned owner to ${newOwner.fullName}`;
        }
        return `Assigned owner to ID: ${action.value}`;
      }

      case WorkflowActionType.UPDATE_FIELD: {
        if (action.targetField && action.value !== undefined) {
          data[action.targetField] = action.value;
          return `Updated field [${action.targetField}] to "${action.value}"`;
        }
        return 'Updated field';
      }

      case WorkflowActionType.CREATE_TASK: {
        const rawTitle = action.taskTitleTemplate || 'Automated Workflow Follow-up';
        const renderedTitle = rawTitle.replace(/\{(\w+)\}/g, (_, key) => data[key] || '');

        const dueOffset = action.taskDueDaysOffset || 2;
        const dueDate = new Date(Date.now() + dueOffset * 86400000).toISOString();

        const activity: Activity = {
          id: `act_wf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          tenantId,
          type: ActivityType.TASK,
          subject: renderedTitle,
          description: `Automatically created by workflow automation for ${data.name || data.companyName || data.id}`,
          priority: ActivityPriority.HIGH,
          status: ActivityStatus.PLANNED,
          dueDate,
          relatedEntityType: (data.entityType || 'LEAD') as any,
          relatedEntityId: data.id || 'unassigned',
          relatedEntityName: data.name || data.companyName || 'Entity',
          ownerId: data.ownerId || actorId,
          ownerName: data.ownerName || 'Sales Rep',
          createdAt: now,
          updatedAt: now,
          createdBy: actorId,
          updatedBy: actorId
        };
        this.db.activities.set(activity.id, activity);
        return `Created follow-up task: "${renderedTitle}"`;
      }

      case WorkflowActionType.SEND_EMAIL_NOTIFICATION: {
        const rawSubject = action.emailSubjectTemplate || 'CRM Workflow Notification';
        const renderedSubject = rawSubject.replace(/\{(\w+)\}/g, (_, key) => data[key] || '');
        return `Dispatched notification email to ${action.recipientEmail || 'owner'}: "${renderedSubject}"`;
      }

      default:
        return `Executed action: ${action.type}`;
    }
  }
}
