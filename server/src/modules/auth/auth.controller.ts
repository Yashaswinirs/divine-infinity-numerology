import type { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const session = await AuthService.login(email, password);
      res.status(200).json({
        success: true,
        data: session,
        message: 'Login successful',
      });
    } catch (err: any) {
      res.status(401).json({
        success: false,
        error: err.message,
        errorCode: 'INVALID_CREDENTIALS',
      });
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, email, password, phoneNumber } = req.body;
      const session = await AuthService.register(fullName, email, password, phoneNumber);
      res.status(201).json({
        success: true,
        data: session,
        message: 'Account registered successfully',
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        error: err.message,
        errorCode: 'REGISTRATION_FAILED',
      });
    }
  }

  static async me(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
      }
      res.status(200).json({
        success: true,
        data: req.user,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async refresh(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({ success: false, error: 'Refresh token is required' });
        return;
      }
      const session = await AuthService.refresh(refreshToken);
      res.status(200).json({
        success: true,
        data: session,
      });
    } catch (err: any) {
      res.status(401).json({ success: false, error: err.message });
    }
  }
}
