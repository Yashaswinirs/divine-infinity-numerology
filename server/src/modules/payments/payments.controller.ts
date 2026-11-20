import type { Request, Response } from 'express';
import { PaymentsService } from './payments.service';

export class PaymentsController {
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.user!.id;
      const { courseId, gateway } = req.body;
      const result = PaymentsService.createOrder(studentId, courseId, gateway);
      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async verifyPayment(req: Request, res: Response): Promise<void> {
    try {
      const { orderId, gatewayOrderId, gatewayPaymentId, gatewaySignature } = req.body;
      const order = PaymentsService.verifyAndCompletePayment(
        orderId,
        gatewayOrderId,
        gatewayPaymentId,
        gatewaySignature
      );
      res.status(200).json({ success: true, data: order, message: 'Payment confirmed & course unlocked' });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getMyOrders(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.user!.id;
      const orders = PaymentsService.getStudentOrders(studentId);
      res.status(200).json({ success: true, data: orders });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getAllOrders(_req: Request, res: Response): Promise<void> {
    try {
      const orders = PaymentsService.getAllOrders();
      res.status(200).json({ success: true, data: orders });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
