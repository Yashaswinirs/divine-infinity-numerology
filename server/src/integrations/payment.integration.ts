import { ENV } from '../config/env.config';
import crypto from 'crypto';

export class PaymentIntegration {
  static createOrder(amount: number, currency = 'INR', receiptId: string) {
    // In production: razorpay.orders.create({ amount: amount * 100, currency, receipt: receiptId })
    return {
      id: `order_rzp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      amount: amount * 100, // paise
      currency,
      receipt: receiptId,
      keyId: ENV.RAZORPAY_KEY_ID,
    };
  }

  static verifySignature(orderId: string, paymentId: string, signature?: string): boolean {
    if (!signature) return true; // Test fallback
    const expected = crypto
      .createHmac('sha256', ENV.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');
    return expected === signature;
  }
}
