import { Component, OnInit, Input } from '@angular/core';
import { FileDefinition } from '../tree-list/tree-list.component';

@Component({
  selector: 'app-tree-list-item',
  templateUrl: './tree-list-item.component.html',
  styleUrls: ['./tree-list-item.component.scss']
})
export class TreeListItemComponent implements OnInit {

  @Input() definition: FileDefinition;
  constructor() { }

  ngOnInit() {
  }

}
