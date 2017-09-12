import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ModalService } from '../modal.service';
import { ModalData } from '../modalData';
import { CreateDefinitionComponent } from '../create-definition/create-definition.component';
import { DefinitionService } from '../definition.service';

export interface FileDefinition {id: string; name: string; desc: string; path: string; }

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss']
})
export class TreeListComponent implements OnInit {

  list: FileDefinition[] = [];
  displayedColumns: (keyof FileDefinition)[] = ['name', 'desc', 'path'];
  constructor(private http: Http, private modalService: ModalService, private definitionService: DefinitionService) { }

  ngOnInit() {
    this.definitionService.subscribe(d => this.list = d);
  }

  createNew() {
    this.modalService.set(new ModalData({
      active: true,
      canClose: true,
      component: CreateDefinitionComponent,
      header: 'Create new file definition'
    }));
  }

}
