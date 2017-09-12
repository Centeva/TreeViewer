import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { FileDefinition } from '../tree-list/tree-list.component';
import { TreeService } from '../tree.service';
import { DefinitionService } from '../definition.service';

export interface node<T> { id: number; refId?: number; name: string; title: string; children?: node<T>[]; parentId: number; model: T; ordinal?: number; }

@Component({
  selector: 'app-tree-details',
  templateUrl: './tree-details.component.html',
  styleUrls: ['./tree-details.component.scss']
})
export class TreeDetailsComponent<T> implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: Http, private definitionService: DefinitionService, private treeService: TreeService) { }
  tree: node<T>[] = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      this.definitionService.filter(i => i.length > 0).subscribe(i => {
        this.http.get('/api/getFile/' + encodeURIComponent(`${(i).find(d => d.id === p['id']).path}`)).subscribe(tree => this.treeService.next(tree.json()));
      });
    });
  }

}
