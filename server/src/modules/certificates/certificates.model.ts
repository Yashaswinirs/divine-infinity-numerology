import type { Certificate } from '@divine/types';
import { db } from '../../config/db.config';

export class CertificatesModel {
  static getById(id: string): Certificate | undefined {
    return db.certificates.get(id);
  }

  static getByNumber(certNumber: string): Certificate | undefined {
    for (const c of db.certificates.values()) {
      if (c.certificateNumber === certNumber) return c;
    }
    return undefined;
  }

  static getByStudentId(studentId: string): Certificate[] {
    return Array.from(db.certificates.values()).filter((c) => c.studentId === studentId);
  }

  static findStudentCourseCertificate(studentId: string, courseId: string): Certificate | undefined {
    for (const c of db.certificates.values()) {
      if (c.studentId === studentId && c.courseId === courseId) return c;
    }
    return undefined;
  }

  static create(certificate: Certificate): Certificate {
    db.certificates.set(certificate.id, certificate);
    return certificate;
  }
}
