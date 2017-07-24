import { Component, OnInit } from '@angular/core';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss']
})
export class InspectorComponent<T> implements OnInit {

  constructor(private nodeService: NodeService) { }

  get show() {
    return JSON.stringify(this.currentNode) || 'None';
  }

  currentNode;

  ngOnInit() {
    this.nodeService.asObservable().subscribe(n => this.currentNode = n);
  }

}
