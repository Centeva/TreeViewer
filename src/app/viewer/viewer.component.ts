import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeService } from '../tree.service';
import { node } from '../tree-details/tree-details.component';

import * as d3 from 'd3';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent<T> implements OnInit {

  constructor(private treeService: TreeService) { }

  ngOnInit() {
    this.treeService.asObservable().subscribe(t => this.drawTree(t));
  }

  drawTree(tree: node<T>[]) {
    console.log('Begin draw!');
    console.log(tree);
    d3.select('#tree-container').selectAll('#node').data(tree).enter().insert('DIV').text(d => d.name);
  }
}
