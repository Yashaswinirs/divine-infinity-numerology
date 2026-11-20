import { NotificationsModel } from './notifications.model';
import type { Notification, NotificationType } from '@divine/types';

export class NotificationsService {
  static getUserNotifications(userId: string): Notification[] {
    return NotificationsModel.getByUserId(userId);
  }

  static createNotification(userId: string, title: string, message: string, type: NotificationType, linkUrl?: string): Notification {
    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId,
      title,
      message,
      type,
      isRead: false,
      linkUrl,
      createdAt: new Date().toISOString(),
    };
    return NotificationsModel.create(notif);
  }

  static markRead(id: string) {
    return NotificationsModel.markAsRead(id);
  }
}
