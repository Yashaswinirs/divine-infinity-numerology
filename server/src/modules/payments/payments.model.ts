import type { Order } from '@divine/types';
import { db } from '../../config/db.config';

export class PaymentsModel {
  static getById(id: string): Order | undefined {
    return db.orders.get(id);
  }

  static getByStudentId(studentId: string): Order[] {
    return Array.from(db.orders.values()).filter((o) => o.studentId === studentId);
  }

  static getAll(): Order[] {
    return Array.from(db.orders.values());
  }

  static create(order: Order): Order {
    db.orders.set(order.id, order);
    return order;
  }

  static update(id: string, updates: Partial<Order>): Order | undefined {
    const order = db.orders.get(id);
    if (!order) return undefined;
    const updated = { ...order, ...updates, updatedAt: new Date().toISOString() };
    db.orders.set(id, updated);
    return updated;
  }
}
