import type { Request, Response } from 'express';
import { NotificationsService } from './notifications.service';

export class NotificationsController {
  static async list(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const data = NotificationsService.getUserNotifications(userId);
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async markRead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updated = NotificationsService.markRead(id as string);
      res.status(200).json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
