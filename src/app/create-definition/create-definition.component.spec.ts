import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDefinitionComponent } from './create-definition.component';

describe('CreateDefinitionComponent', () => {
  let component: CreateDefinitionComponent;
  let fixture: ComponentFixture<CreateDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
