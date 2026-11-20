import type { Request, Response } from 'express';
import { CertificatesService } from './certificates.service';

export class CertificatesController {
  static async getMyCertificates(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.user!.id;
      const certs = CertificatesService.getStudentCertificates(studentId);
      res.status(200).json({ success: true, data: certs });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async claimCertificate(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.user!.id;
      const { courseId } = req.body;
      const cert = CertificatesService.generateCertificate(studentId, courseId);
      res.status(201).json({ success: true, data: cert });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async verify(req: Request, res: Response): Promise<void> {
    try {
      const { certNumber } = req.params;
      const cert = CertificatesService.verifyCertificate(certNumber as string);
      res.status(200).json({ success: true, data: cert });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  }
}
