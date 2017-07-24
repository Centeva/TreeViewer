import { Injectable } from '@angular/core';
import { IActionable } from './iactionable';
import { node } from './tree-details/tree-details.component';

@Injectable()
export class NodeService extends IActionable<node<any>> {
  constructor() {
    super();
  }
}
