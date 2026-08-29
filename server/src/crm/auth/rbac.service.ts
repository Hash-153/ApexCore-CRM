/**
 * ApexCore Enterprise CRM - Role-Based Access Control (RBAC) Service
 * Manages granular permission grants, action authorization, and security gates
 * for the 5 core enterprise roles: Admin, Sales Manager, Sales Representative,
 * Support Agent, and Marketing Executive.
 */

import { UserRole } from '../domain/enums.ts';
import type { RolePermissions } from '../domain/types.ts';

export class RBACService {
  private static permissionsMatrix: Record<UserRole, string[]> = {
    [UserRole.ADMIN]: [
      '*', // Superuser all permissions
      'users:create',
      'users:read',
      'users:update',
      'users:delete',
      'roles:assign',
      'customers:create',
      'customers:read',
      'customers:update',
      'customers:delete',
      'leads:create',
      'leads:read',
      'leads:update',
      'leads:delete',
      'deals:create',
      'deals:read',
      'deals:update',
      'deals:delete',
      'quotes:create',
      'quotes:approve',
      'tickets:manage',
      'campaigns:manage',
      'workflows:manage',
      'schemas:manage',
      'audit:read',
      'settings:manage'
    ],
    [UserRole.SALES_MANAGER]: [
      'users:read',
      'customers:create',
      'customers:read',
      'customers:update',
      'customers:delete',
      'leads:create',
      'leads:read',
      'leads:update',
      'leads:convert',
      'leads:assign',
      'deals:create',
      'deals:read',
      'deals:update',
      'deals:approve_discounts',
      'quotes:create',
      'quotes:approve',
      'analytics:read_team',
      'reports:export',
      'workflows:read'
    ],
    [UserRole.SALES_REPRESENTATIVE]: [
      'customers:create',
      'customers:read',
      'customers:update',
      'leads:create',
      'leads:read',
      'leads:update',
      'leads:convert',
      'deals:create',
      'deals:read',
      'deals:update',
      'quotes:create',
      'quotes:read',
      'interactions:create',
      'interactions:read',
      'notes:create',
      'notes:read',
      'attachments:upload',
      'attachments:read'
    ],
    [UserRole.SUPPORT_AGENT]: [
      'customers:read',
      'customers:update_notes',
      'tickets:create',
      'tickets:read',
      'tickets:update',
      'tickets:reply',
      'tickets:resolve',
      'tickets:escalate',
      'interactions:create',
      'interactions:read',
      'notes:create',
      'notes:read',
      'attachments:upload',
      'attachments:read'
    ],
    [UserRole.MARKETING_EXECUTIVE]: [
      'customers:read',
      'leads:create',
      'leads:read',
      'leads:update',
      'campaigns:create',
      'campaigns:read',
      'campaigns:update',
      'campaigns:delete',
      'campaigns:attribution',
      'analytics:marketing_roi',
      'workflows:read'
    ]
  };

  /**
   * Evaluates if a given role has the required permission.
   */
  public static hasPermission(role: UserRole, requiredPermission: string): boolean {
    const perms = this.permissionsMatrix[role] || [];
    if (perms.includes('*')) {
      return true;
    }
    return perms.includes(requiredPermission);
  }

  /**
   * Returns complete description and permissions list for all 5 roles.
   */
  public static getRoleDefinitions(): RolePermissions[] {
    return [
      {
        role: UserRole.ADMIN,
        description: 'Superuser with full administrative control over user provisioning, security policies, dynamic custom schemas, and audit logs.',
        permissions: this.permissionsMatrix[UserRole.ADMIN]
      },
      {
        role: UserRole.SALES_MANAGER,
        description: 'Team lead with pipeline oversight, deal discount approval authority, sales rep quota management, and revenue forecasting.',
        permissions: this.permissionsMatrix[UserRole.SALES_MANAGER]
      },
      {
        role: UserRole.SALES_REPRESENTATIVE,
        description: 'Direct sales executive responsible for BANT lead qualification, MEDDIC pipeline progression, customer meetings, and CPQ quotes.',
        permissions: this.permissionsMatrix[UserRole.SALES_REPRESENTATIVE]
      },
      {
        role: UserRole.SUPPORT_AGENT,
        description: 'Customer success specialist handling omnichannel support tickets, SLA resolution countdowns, customer notes, and issue triage.',
        permissions: this.permissionsMatrix[UserRole.SUPPORT_AGENT]
      },
      {
        role: UserRole.MARKETING_EXECUTIVE,
        description: 'Growth and demand generation specialist managing campaigns, lead attribution models, webinars, and ROI tracking.',
        permissions: this.permissionsMatrix[UserRole.MARKETING_EXECUTIVE]
      }
    ];
  }
}
