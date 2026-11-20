export class EmailIntegration {
  static async sendWelcomeEmail(to: string, name: string) {
    console.log(`[EMAIL] Welcome sent to ${to} (${name})`);
    return true;
  }

  static async sendEnrollmentConfirmation(to: string, courseTitle: string) {
    console.log(`[EMAIL] Enrollment confirmed for ${to}: ${courseTitle}`);
    return true;
  }

  static async sendCertificateIssued(to: string, certNumber: string, certUrl: string) {
    console.log(`[EMAIL] Certificate ${certNumber} sent to ${to}: ${certUrl}`);
    return true;
  }
}
