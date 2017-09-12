import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ModalService } from '../modal.service';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-create-definition',
  templateUrl: './create-definition.component.html',
  styleUrls: ['./create-definition.component.scss']
})
export class CreateDefinitionComponent implements OnInit {

  form: CreateDefinitionForm = new CreateDefinitionForm();
  constructor(private http: Http, private modalService: ModalService, private definitionService: DefinitionService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.definitionService.createDefinition(this.form);
    this.modalService.closeModal();
  }
}

class CreateDefinitionForm {

  constructor(public name: string = '', public desc: string = '', public path: string = '', public id: string = '') { }
}
