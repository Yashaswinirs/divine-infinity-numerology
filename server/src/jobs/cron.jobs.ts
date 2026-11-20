import { db } from '../config/db.config';

export class CronJobs {
  static init() {
    // Run maintenance every hour (demo log)
    setInterval(() => {
      this.checkExpiredEnrollments();
    }, 3600000);
  }

  static checkExpiredEnrollments() {
    const now = new Date().toISOString();
    for (const [id, enr] of db.enrollments.entries()) {
      if (enr.expiresAt && enr.expiresAt < now && enr.status === 'active') {
        enr.status = 'expired';
        db.enrollments.set(id, enr);
        console.log(`[JOB] Expired enrollment: ${id}`);
      }
    }
  }
}
