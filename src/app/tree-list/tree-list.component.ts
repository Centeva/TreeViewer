import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

export interface FileDefinition {id: number; name: string; desc: string; path: string; }

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss']
})
export class TreeListComponent implements OnInit {

  list: FileDefinition[] = [];
  displayedColumns: (keyof FileDefinition)[] = ['name', 'desc', 'path'];
  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('../../assets/index.json').subscribe(d => this.list = d.json());
  }

}
