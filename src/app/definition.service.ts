import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import { FileDefinition } from './tree-list/tree-list.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DefinitionService extends BehaviorSubject<FileDefinition[]> {

  constructor(private http: Http) {
    super([]);
    this.getData();
  }

  get() {
    return super.getValue();
  }

  getData() {
    this.http.get('/api/getDefinitions').subscribe(r => this.set(r.json()));
  }

  createDefinition(data: FileDefinition) {
    this.http.post('/api/createDefinition', data).subscribe(d => this.getData());
  }

  set(val: FileDefinition[]) {
    super.next(val);
  }

}
