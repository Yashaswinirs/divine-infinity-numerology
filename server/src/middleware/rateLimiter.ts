import type { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipMap = new Map<string, RateLimitRecord>();

export function rateLimiter(limit = 100, windowMs = 60000) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const record = ipMap.get(ip);

    if (!record || now > record.resetAt) {
      ipMap.set(ip, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }

    if (record.count >= limit) {
      res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again later.',
        errorCode: 'RATE_LIMIT_EXCEEDED',
      });
      return;
    }

    record.count += 1;
    next();
  };
}
