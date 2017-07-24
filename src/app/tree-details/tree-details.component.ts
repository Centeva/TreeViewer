import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { FileDefinition } from '../tree-list/tree-list.component';
import { TreeService } from '../tree.service';

// tslint:disable-next-line:interface-over-type-literal
export type node<T> = { id: number, refId?: number, name: string, title: string, children?: node<T>[], parentId: number, model: T };

@Component({
  selector: 'app-tree-details',
  templateUrl: './tree-details.component.html',
  styleUrls: ['./tree-details.component.scss']
})
export class TreeDetailsComponent<T> implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: Http, private treeService: TreeService) { }
  tree: node<T>[] = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      this.http.get('../../assets/index.json').subscribe(i => {
        // tslint:disable-next-line:max-line-length
        this.http.get((i.json() as FileDefinition[]).find(d => d.id === +p['id']).path).subscribe(tree => this.treeService.next(tree.json()));
      });
    });
  }

}
