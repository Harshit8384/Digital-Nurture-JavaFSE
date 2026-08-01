import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private instanceId = Math.floor(Math.random() * 10000);
  private notifications: string[] = ['Welcome to Student Course Portal!'];

  getNotifications(): string[] {
    return this.notifications;
  }

  addNotification(msg: string): void {
    this.notifications.push(msg);
  }

  getInstanceId(): number {
    return this.instanceId;
  }
}
