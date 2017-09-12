import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { NotificationModalComponent } from './notificationModal';
import { PromptModalComponent } from './promptModal';
import { CreateDefinitionComponent } from './create-definition/create-definition.component';
import { MdCoreModule, MdInputModule, MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MomentModule,
    MdButtonModule,
    MdCoreModule,
    MdInputModule,
  ],
  declarations: [
    NotificationModalComponent,
    PromptModalComponent,
    CreateDefinitionComponent,
  ],
})
export class ModalModule {}
