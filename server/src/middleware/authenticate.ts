import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.config';
import type { JwtPayload, Role } from '@divine/types';
import { db } from '../config/db.config';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: Role;
      };
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'Authentication token missing or invalid',
      errorCode: 'UNAUTHORIZED',
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token as string, ENV.JWT_SECRET) as JwtPayload;
    const user = db.users.get(decoded.sub);
    if (!user) {
      res.status(401).json({
        success: false,
        error: 'User associated with this token does not exist',
        errorCode: 'USER_NOT_FOUND',
      });
      return;
    }

    if (user.isBlocked) {
      res.status(403).json({
        success: false,
        error: 'Your account has been deactivated. Please contact support.',
        errorCode: 'ACCOUNT_BLOCKED',
      });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch {
    res.status(401).json({
      success: false,
      error: 'Invalid or expired token',
      errorCode: 'TOKEN_EXPIRED',
    });
  }
}
