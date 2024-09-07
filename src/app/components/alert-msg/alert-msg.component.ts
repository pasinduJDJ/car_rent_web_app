import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert-msg',
  templateUrl: './alert-msg.component.html',
  styleUrl: './alert-msg.component.css'
})
export class AlertMsgComponent {
  @Input() message: string | null = null;
  @Input() alertType: 'success' | 'danger' | 'warning' | 'info' = 'success';

  closeAlert() {
    this.message = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && this.message) {
      this.autoDismiss();
    }
  }
  autoDismiss() {
    setTimeout(() => {
      this.message = null;
    }, 2500); // 4 seconds
  }
}
