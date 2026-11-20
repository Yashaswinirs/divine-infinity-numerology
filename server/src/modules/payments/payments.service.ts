import { PaymentsModel } from './payments.model';
import { db } from '../../config/db.config';
import { PaymentIntegration } from '../../integrations/payment.integration';
import { EnrollmentsService } from '../enrollments/enrollments.service';
import type { Order, PaymentGateway } from '@divine/types';

export class PaymentsService {
  static createOrder(studentId: string, courseId: string, gateway: PaymentGateway = 'razorpay') {
    const course = db.courses.get(courseId);
    if (!course) throw new Error('Course not found');

    const orderId = `ord-${Date.now()}`;
    const gatewayOrder = PaymentIntegration.createOrder(course.price, course.currency, orderId);

    const order: Order = {
      id: orderId,
      studentId,
      courseId,
      amount: course.price,
      currency: course.currency,
      status: 'pending',
      gateway,
      gatewayOrderId: gatewayOrder.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    PaymentsModel.create(order);

    return {
      order,
      gatewayPayload: gatewayOrder,
    };
  }

  static verifyAndCompletePayment(
    orderId: string,
    gatewayOrderId: string,
    gatewayPaymentId: string,
    gatewaySignature?: string
  ): Order {
    const order = PaymentsModel.getById(orderId);
    if (!order) throw new Error('Order not found');

    const isValid = PaymentIntegration.verifySignature(gatewayOrderId, gatewayPaymentId, gatewaySignature);
    if (!isValid) {
      PaymentsModel.update(orderId, { status: 'failed' });
      throw new Error('Payment verification signature mismatch');
    }

    const updated = PaymentsModel.update(orderId, {
      status: 'completed',
      gatewayPaymentId,
    });

    // Auto enroll student
    EnrollmentsService.enrollStudent(order.studentId, order.courseId);

    return updated!;
  }

  static getStudentOrders(studentId: string): Order[] {
    return PaymentsModel.getByStudentId(studentId);
  }

  static getAllOrders() {
    return PaymentsModel.getAll().map((o) => {
      const student = db.users.get(o.studentId);
      const course = db.courses.get(o.courseId);
      return {
        ...o,
        studentName: student?.fullName || 'Unknown Student',
        studentEmail: student?.email || 'unknown',
        courseTitle: course?.title || 'Unknown Course',
      };
    });
  }
}
