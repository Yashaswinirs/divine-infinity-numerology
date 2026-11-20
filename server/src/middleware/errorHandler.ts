import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[SERVER ERROR]:', err);

  const status = (err as unknown as { status?: number }).status || 500;
  res.status(status).json({
    success: false,
    error: err.message || 'Internal Server Error',
    errorCode: 'INTERNAL_SERVER_ERROR',
  });
}
