/* tslint:disable:no-unused-variable */

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { async, inject } from '@angular/core/testing';
import { NotificationModalComponent } from '../../../component/modals/notificationModal';

/* end of imports */

describe('modals/notificationModal.component', () => {
  let component: NotificationModalComponent;

  beforeEach(() => {
    component = new NotificationModalComponent();
  });

  it('NotificationModalComponent', () => {
    expect(component).toBeTruthy('didnt create');
  });
});
