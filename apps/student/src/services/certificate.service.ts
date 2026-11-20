import { apiFetch } from './api';
import type { Certificate } from '@divine/types';

export class CertificateService {
  static async getMyCertificates(): Promise<Certificate[]> {
    return apiFetch<Certificate[]>('/certificates/my');
  }

  static async claimCertificate(courseId: string): Promise<Certificate> {
    return apiFetch<Certificate>('/certificates/claim', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  }
}
