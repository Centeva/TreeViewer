import { Component, OnInit } from '@angular/core';
import { NodeService } from '../node.service';
import { node } from '../tree-details/tree-details.component';
import { TreeService } from '../tree.service';
import * as Clipboard from 'clipboard';
import { MdSnackBar } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss']
})
export class InspectorComponent<T> implements OnInit {

  form: NodeForm = new NodeForm();
  modelPairs: { key: string, value: string }[] = [];

  constructor(private nodeService: NodeService, private treeService: TreeService, private snackBar: MdSnackBar) { }

  get show() {
    return JSON.stringify(this.currentNode) || 'None';
  }

  currentNode;

  ngOnInit() {
    this.nodeService.asObservable().subscribe(n => {
      if (n) {
        this.currentNode = n;
        this.form = this.currentNode;
        this.modelPairs = this.getModelPairs(this.form);
      }
    });
    const clip = new Clipboard('#copy-btn', {
      text: trigger => JSON.stringify(this.treeService.getValue().map(n => ({...n, children: undefined})))
    });
    const saveClip = new Clipboard('#saved-btn', {
      text: trigger => JSON.stringify(this.treeService.getValue().map(n => ({...n, children: undefined})))
    });
  }

  getModelPairs(form: NodeForm) {
    // tslint:disable-next-line:prefer-const
    let pairs: { key: string, value: string }[] = [];
    for (const key in form.model) {
      if (form.model.hasOwnProperty(key)) {
        pairs.push({ key: key, value: form.model[key] });
      }
    }
    return pairs;
  }

  addEmptyPair() {
    this.modelPairs.push({ key: '', value: '' });
  }

  onSubmit() {
    console.log('Submit!');
    // tslint:disable-next-line:prefer-const
    let form = this.form as node<any>;
    form.model = {};
    this.modelPairs.map(p => ({ [p.key]: p.value })).forEach(p => Object.assign(form.model, p));
    this.treeService.next([...this.treeService.getValue().filter(n => n.id !== form.id), form]);
    this.nodeService.next(form);
    this.snackBar.open('Saved node!', null, { duration: 1000 });
  }

  addChild(el) {
    const newNode = { id: this.treeService.getValue().length, parentId: this.currentNode.id } as node<any>;
    this.treeService.next([...this.treeService.getValue(), newNode]);
    this.nodeService.next(newNode);
    el.focus();
  }

  copyMessage() {
    this.snackBar.open('Copied to clipboard!', null, { duration: 1000 });
  }
  delete() {
    const form = this.form as node<any>;
    const tree: node<any>[] = this.treeService.getValue();

    console.log(tree);
    const deleted = tree.filter(n => !this.deleteFromTree(tree, [form]).some(c => c.id === n.id));
    console.log(deleted);

    this.nodeService.next(tree.find(n => n.parentId === null));
    this.treeService.next(deleted);
  }

  deleteFromTree(tree: node<any>[], children: node<any>[]) {
    const layer: node<any>[] = [];
    for (const child of tree) {
      if (children.some(c => c.id === child.parentId || c.id === child.id)) {
        layer.push(child);
      }
    }

    if (layer.length > 0) {
      layer.push(...this.deleteFromTree(tree.filter(n => !children.some(c => c.id === n.id)), layer));
    }
    return layer;
  }

}

class NodeForm {
  id: number;
  parentId: number;
  name: string;
  title: string;
  ordinal: number;
  model: any;
  refId: number;
}
