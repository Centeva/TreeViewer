import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'prompt-modal',
  templateUrl: 'promptModal.component.html',
  styleUrls: ['promptModal.component.less'],
})
export class PromptModalComponent {
  @Input() message: string;
  @Input() actionName: string;
  @Input() actionFunction: Function;
  @Input() utilName: string;
  @Input() utilIcon: string;
  @Input() utilFunction: Function;

  storeSubscription: Subscription;

  constructor() {}
}
