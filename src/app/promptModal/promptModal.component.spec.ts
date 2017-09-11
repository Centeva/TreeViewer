/* tslint:disable:no-unused-variable */

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { async, inject } from '@angular/core/testing';
import { PromptModalComponent } from '../../../component/modals/promptModal';

/* end of imports */

describe('modals/prompt.component', () => {
  let component: PromptModalComponent;

  beforeEach(() => {
    component = new PromptModalComponent();
  });

  it('PromptComponent', () => {
    expect(component).toBeTruthy('didnt create');
  });
});
