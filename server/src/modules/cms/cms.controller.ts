import type { Request, Response } from 'express';
import { CmsService } from './cms.service';

export class CmsController {
  static async submitEnquiry(req: Request, res: Response): Promise<void> {
    try {
      const data = CmsService.submitEnquiry(req.body);
      res.status(201).json({ success: true, data, message: 'Enquiry received. Our team will contact you soon.' });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async listEnquiries(_req: Request, res: Response): Promise<void> {
    try {
      const data = CmsService.listEnquiries();
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = CmsService.updateStatus(id as string, status);
      res.status(200).json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
