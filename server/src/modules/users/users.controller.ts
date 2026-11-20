import type { Request, Response } from 'express';
import { UsersService } from './users.service';

export class UsersController {
  static async listStudents(_req: Request, res: Response): Promise<void> {
    try {
      const students = UsersService.getAllStudents();
      res.status(200).json({ success: true, data: students });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async listAll(_req: Request, res: Response): Promise<void> {
    try {
      const users = UsersService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id || req.user?.id;
      if (!id) {
        res.status(400).json({ success: false, error: 'User ID missing' });
        return;
      }
      const profile = UsersService.getUserProfile(id);
      res.status(200).json({ success: true, data: profile });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  }

  static async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { isBlocked } = req.body;
      const user = UsersService.toggleBlockUser(id as string, isBlocked);
      res.status(200).json({ success: true, data: user });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async updateRole(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const user = UsersService.updateRole(id as string, role);
      res.status(200).json({ success: true, data: user });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
