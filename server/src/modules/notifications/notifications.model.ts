import type { Notification } from '@divine/types';
import { db } from '../../config/db.config';

export class NotificationsModel {
  static getByUserId(userId: string): Notification[] {
    return Array.from(db.notifications.values()).filter((n) => n.userId === userId);
  }

  static create(notification: Notification): Notification {
    db.notifications.set(notification.id, notification);
    return notification;
  }

  static markAsRead(id: string): Notification | undefined {
    const notif = db.notifications.get(id);
    if (!notif) return undefined;
    notif.isRead = true;
    return notif;
  }
}
