import { Component, Input } from '@angular/core';

@Component({
  selector: 'notification-modal',
  templateUrl: 'notificationModal.component.html',
  styleUrls: ['notificationModal.component.less'],
})
export class NotificationModalComponent {
  @Input() message: string;

  constructor() {}
}
