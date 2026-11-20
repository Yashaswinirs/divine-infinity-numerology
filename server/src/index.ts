import { createApp } from './app';
import { ENV } from './config/env.config';
import { seedDatabase } from './config/db.config';
import { CronJobs } from './jobs/cron.jobs';

async function bootstrap() {
  await seedDatabase();
  console.log('✓ In-memory database seeded with default Admin & Student accounts');

  CronJobs.init();

  const app = createApp();
  app.listen(ENV.PORT, () => {
    console.log(`🚀 Divine Infinity LMS API Server running on port ${ENV.PORT}`);
    console.log(`🔗 Health check available at http://localhost:${ENV.PORT}/health`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
