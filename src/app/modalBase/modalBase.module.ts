import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalBaseComponent } from './';
import { ModalModule } from '../Modal.module';

@NgModule({
  declarations: [ModalBaseComponent],
  exports: [ModalBaseComponent],
  imports: [BrowserModule, ModalModule],
})
export class ModalBaseModule {}
