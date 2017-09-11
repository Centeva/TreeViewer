import { Injectable } from '@angular/core';
import { ModalData } from './modalData';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Action } from './action';

@Injectable()
export class ModalService extends BehaviorSubject<ModalData> implements Action<ModalData> {
  constructor() {
    super(new ModalData({ active: false }));
  }

  get() {
    super.getValue();
  }

  set(data: ModalData) {
    super.next(data);
  }

  closeModal() {
    super.next(new ModalData({ active: false }));
  }
}
