import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

// Hands-On 6 Task 2 Step 67: Demonstrating Component-Level Providers.
// Explanatory comment: Providing NotificationService in the @Component decorator's 'providers' array creates
// a brand new, isolated service instance scoped exclusively to this component and its child subtree.
// Unlike root singleton providers, component-level providers do not share state with other instances of the component.
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService], // Component-level DI provider
  template: `
    <div class="notification-box">
      <h5>Component Notifications (Instance ID: {{ instanceId }})</h5>
      <ul>
        <li *ngFor="let note of notifications">{{ note }}</li>
      </ul>
    </div>
  `,
  styles: [`
    .notification-box {
      background-color: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 0.75rem 1rem;
      margin: 1rem 0;
      border-radius: 4px;
    }
    h5 { margin: 0 0 0.5rem 0; color: #1e40af; }
    ul { margin: 0; padding-left: 1.25rem; font-size: 0.875rem; color: #1e3a8a; }
  `]
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);
  public instanceId = 0;
  public notifications: string[] = [];

  ngOnInit(): void {
    this.instanceId = this.notificationService.getInstanceId();
    this.notifications = this.notificationService.getNotifications();
  }
}
