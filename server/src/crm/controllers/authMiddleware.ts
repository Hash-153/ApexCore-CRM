/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Authentication, Multi-Tenant Resolution & RBAC Middleware
 */

import { Request, Response, NextFunction } from 'express';
import { CRMDatabase } from '../database/crm_database.ts';
import { SecurityAndRBACService } from '../services/SecurityAndRBACService.ts';
import type { User } from '../domain/types.ts';

export interface AuthenticatedCRMRequest extends Request {
  crmUser?: User;
  tenantId?: string;
}

export function crmAuthMiddleware(requiredPermission?: string) {
  const db = CRMDatabase.getInstance();
  const rbacService = new SecurityAndRBACService(db);

  return (req: AuthenticatedCRMRequest, res: Response, next: NextFunction): void => {
    const tenantId = (req.headers['x-tenant-id'] as string) || 'tenant_apex_global_001';
    const userId = (req.headers['x-user-id'] as string) || 'usr_marcus_vance';

    req.tenantId = tenantId;

    let user = db.users.get(userId);
    if (!user) {
      user = Array.from(db.users.values())[0];
    }

    req.crmUser = user;

    if (requiredPermission && user) {
      const isAllowed = rbacService.hasPermission(user.role, requiredPermission);
      if (!isAllowed) {
        res.status(403).json({
          success: false,
          error: 'FORBIDDEN_PERMISSION_DENIED',
          message: `User role "${user.role}" does not have required permission "${requiredPermission}".`
        });
        return;
      }
    }

    next();
  };
}
