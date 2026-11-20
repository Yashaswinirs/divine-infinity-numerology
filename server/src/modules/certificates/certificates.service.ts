import { CertificatesModel } from './certificates.model';
import { db } from '../../config/db.config';
import { ProgressService } from '../progress/progress.service';
import { CONSTANTS } from '../../config/constants';
import type { Certificate } from '@divine/types';

export class CertificatesService {
  static getStudentCertificates(studentId: string): Certificate[] {
    return CertificatesModel.getByStudentId(studentId);
  }

  static verifyCertificate(certNumber: string): Certificate {
    const cert = CertificatesModel.getByNumber(certNumber);
    if (!cert) throw new Error('Certificate not found or invalid');
    return cert;
  }

  static generateCertificate(studentId: string, courseId: string): Certificate {
    const existing = CertificatesModel.findStudentCourseCertificate(studentId, courseId);
    if (existing) return existing;

    const progress = ProgressService.getCourseProgressDetail(studentId, courseId);
    if (!progress.isCourseCompleted) {
      throw new Error('Course must be 100% completed to claim your certificate');
    }

    const student = db.users.get(studentId);
    const course = db.courses.get(courseId);
    if (!student || !course) throw new Error('User or course not found');

    const year = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const certificateNumber = `${CONSTANTS.CERTIFICATE_PREFIX}${year}-${randomSeq}`;

    const cert: Certificate = {
      id: `cert-${Date.now()}`,
      certificateNumber,
      studentId,
      studentName: student.fullName,
      courseId,
      courseTitle: course.title,
      issueDate: new Date().toISOString(),
      pdfUrl: `/certificates/${certificateNumber}.pdf`,
      verificationUrl: `http://localhost:3000/verify/${certificateNumber}`,
    };

    return CertificatesModel.create(cert);
  }
}
