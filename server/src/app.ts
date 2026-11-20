import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.config';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';

import { authRoutes } from './modules/auth/auth.routes';
import { usersRoutes } from './modules/users/users.routes';
import { coursesRoutes } from './modules/courses/courses.routes';
import { lessonsRoutes } from './modules/lessons/lessons.routes';
import { enrollmentsRoutes } from './modules/enrollments/enrollments.routes';
import { progressRoutes } from './modules/progress/progress.routes';
import { assessmentsRoutes } from './modules/assessments/assessments.routes';
import { certificatesRoutes } from './modules/certificates/certificates.routes';
import { paymentsRoutes } from './modules/payments/payments.routes';
import { notificationsRoutes } from './modules/notifications/notifications.routes';
import { cmsRoutes } from './modules/cms/cms.routes';

export function createApp() {
  const app = express();

  // CORS
  const origins = ENV.CORS_ORIGIN.split(',').map((o) => o.trim());
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || origins.includes(origin) || origin.startsWith('http://localhost:')) {
          callback(null, true);
        } else {
          callback(null, true); // Permissive for local development
        }
      },
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(rateLimiter(200, 60000));

  // Health check
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', service: 'Divine Infinity LMS API', timestamp: new Date().toISOString() });
  });

  // Mount API Modules
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/users', usersRoutes);
  app.use('/api/v1/courses', coursesRoutes);
  app.use('/api/v1/lessons', lessonsRoutes);
  app.use('/api/v1/enrollments', enrollmentsRoutes);
  app.use('/api/v1/progress', progressRoutes);
  app.use('/api/v1/assessments', assessmentsRoutes);
  app.use('/api/v1/certificates', certificatesRoutes);
  app.use('/api/v1/payments', paymentsRoutes);
  app.use('/api/v1/notifications', notificationsRoutes);
  app.use('/api/v1/cms', cmsRoutes);

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
