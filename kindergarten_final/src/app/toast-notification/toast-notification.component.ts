import { Component } from '@angular/core';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss'],
})
export class ToastNotificationComponent {
  show = false;

  public showToast() {
    this.show = true;
    setTimeout(() => (this.show = false), 3000);
  }

  public close() {
    this.show = false;
  }
}
