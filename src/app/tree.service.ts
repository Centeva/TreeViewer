import { Injectable } from '@angular/core';
import { IActionable } from './iactionable';
import { node } from './tree-details/tree-details.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';

@Injectable()
export class TreeService extends BehaviorSubject<node<any>[]> {

  constructor(private http: Http) {
    super([]);
  }

  get() {
    return super.getValue();
  }

  set<T>(val: node<T>[]) {
    super.next(val);
  }

}
