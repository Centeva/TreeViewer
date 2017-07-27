import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TreeService } from '../tree.service';
import { node } from '../tree-details/tree-details.component';

import * as d3 from 'd3';
import { hierarchy } from 'd3-hierarchy';
import { NodeService } from '../node.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent<T> implements OnInit {

  currentNodeId = 0;
  pending = false;
  currentTree: node<T>[] = [];
  root: node<T>;

  ngOnInit() {

    // this.margin = { top: 20, right: 120, bottom: 20, left: 120 };
    // this.width = 960 - this.margin.right - this.margin.left;
    // this.height = 800 - this.margin.top - this.margin.bottom;

    this.treeService.subscribe(tree => {
      if (!!tree && tree.length > 0) {
        console.log(this.buildChildren(tree));
        this.root = this.buildChildren(this.fillRefs(tree)).find(n => n.parentId === null);
        this.nodeService.next(this.root);
      }
    });

    this.nodeService.subscribe(n => void(n && this.update(this.root)));
  }

  constructor(private treeService: TreeService, private nodeService: NodeService) { }

  buildChildren(tree: node<T>[] = [], filteredTree: node<T>[] = tree): node<T>[] {
    // tslint:disable-next-line:max-line-length
    return _.sortBy(filteredTree.map(n => ({ ...n, children: this.buildChildren(tree, tree.filter(m => m.parentId === n.id)) })), n => n.name);
  }

  fillRefs(tree: node<T>[] = []): node<T>[] {
    return tree.map(n => ({ ...tree.find(map => map.id === +n.refId), ...n, refId: undefined }));
  }

  update(source: node<T>) {
    // set the dimensions and margins of the diagram
    const margin = { top: 20, right: 400, bottom: 30, left: 120 };
    const selection = (<any>d3.select('#tree-container'))._groups[0][0];
    const width = selection.clientWidth - margin.left - margin.right - 100;
    const height = selection.clientHeight - margin.top - margin.bottom - 100;

    // declares a tree layout and assigns the size
    const treemap = d3.tree()
      .size([height, width]);

    //  assigns the data to a hierarchy using parent-child relationships
    let nodes = d3.hierarchy(source, function (d) {
      return d.children;
    });

    // maps the node data to the tree layout
    nodes = <any>treemap(nodes);

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin

    d3.selectAll('svg').remove();
    const svg = d3.select('#tree-container').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g')
      .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')');

    // adds the links between the nodes
    const link = g.selectAll('.link')
      .data(nodes.descendants().slice(1))
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', function (d: any) {
        return 'M' + d.y + ',' + d.x
          + 'C' + (d.y + d.parent.y) / 2 + ',' + d.x
          + ' ' + (d.y + d.parent.y) / 2 + ',' + d.parent.x
          + ' ' + d.parent.y + ',' + d.parent.x;
      });

    const PointColors = ['white', 'steelblue'];

    // adds each node as a group
    const node = g.selectAll('.node')
      .data(nodes.descendants())
      .enter().append('g')
      .attr('class', d => {
        console.log(`${d.data.id}: ${this.nodeService.getValue().id}`);
        return 'node' +
          (d.children ? ' node--internal' : ' node--leaf') +
          (d.data.id === this.nodeService.getValue().id ? ' active' : '');
      })
      .attr('transform', function (d: any) {
        return 'translate(' + d.y + ',' + d.x + ')';
      })
      .on('click', this.click.bind(this));
    // adds the circle to the node
    node.append('circle')
      .attr('r', 10);

    // adds the text to the node
    node.append('text')
      .attr('dy', '.35em')
      .attr('x', function (d) { return d.children ? -13 : 13; })
      .style('text-anchor', function (d) {
        return d.children ? 'end' : 'start';
      })
      .text(function (d) { return d.data.name; });

  }

  // Toggle children on click.
  click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.nodeService.next(d.data);
  }
}
