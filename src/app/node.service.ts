import { Injectable } from '@angular/core';
import { IActionable } from './iactionable';
import { node } from './tree-details/tree-details.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TreeService } from './tree.service';

@Injectable()
export class NodeService extends BehaviorSubject<node<any>> {
  constructor(private treeService: TreeService) {
    super(null);
  }

  get() {
    return super.getValue();
  }

  set<T>(val: node<T>) {
    super.next(val);
  }
}
