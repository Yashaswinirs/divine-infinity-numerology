import type { Request, Response, NextFunction } from 'express';
import type { Role } from '@divine/types';

export function authorize(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required',
        errorCode: 'UNAUTHORIZED',
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: 'You do not have permission to perform this action',
        errorCode: 'FORBIDDEN',
      });
      return;
    }

    next();
  };
}
