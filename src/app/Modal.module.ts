import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { NotificationModalComponent } from './notificationModal';
import { PromptModalComponent } from './promptModal';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MomentModule,
  ],
  declarations: [
    NotificationModalComponent,
    PromptModalComponent,
  ],
})
export class ModalModule {}
