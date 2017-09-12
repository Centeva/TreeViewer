import {
  Component,
  OnInit,
  OnDestroy,
  ReflectiveInjector,
  ViewContainerRef,
  Compiler,
  ModuleWithComponentFactories,
  ViewChild,
  trigger,
  style,
  state,
  transition,
  animate,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PromptModalComponent } from '../promptModal';
import { ModalData } from '../modalData';
import { ModalService } from '../modal.service';
import { ModalModule } from '../modal.module';

@Component({
  selector: 'modal-base',
  templateUrl: 'modalBase.component.html',
  styleUrls: ['modalBase.component.less'],
  animations: [
    trigger('fadeIn', [
      state('false', style({ opacity: '0' })),
      state('true', style({ opacity: '.5' })),
      transition('false <=> true', animate('400ms ease-in')),
    ]),
    trigger('slideDown', [
      state('false', style({ transform: 'translate(-50%, -500%)' })),
      state('true', style({ transform: 'translateX(-50%)' })),
      transition('false <=> true', animate('400ms ease-in-out')),
    ]),
  ],
})
export class ModalBaseComponent implements OnInit, OnDestroy {
  storeSubscription: Subscription;
  @ViewChild('body', { read: ViewContainerRef })
  body;
  modalData: ModalData = new ModalData();
  factory: ModuleWithComponentFactories<ModalModule>;
  state: string = undefined;

  constructor(private modalService: ModalService, private vcRef: ViewContainerRef, private compiler: Compiler) {}

  ngOnInit() {
    this.modalService.subscribe(s => {
      this.modalData = s;
      if (this.body.length) {
        this.body.remove();
      }
      if (this.modalData && this.modalData.component) {
        this.compiler
          .compileModuleAndAllComponentsAsync(ModalModule)
          .then((moduleWithComponentFactories: ModuleWithComponentFactories<ModalModule>) => {
            this.factory = moduleWithComponentFactories;
            this.add(this.modalData);
          });
      }
    });
  }

  ngOnDestroy() {}

  getState() {
    return (this.state = this.modalData && this.modalData.active ? 'true' : 'false');
  }

  add(data: ModalData) {
    const compFactory = this.factory.componentFactories.find(x => x.componentType === data.component);
    const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
    const cmpRef = this.body.createComponent(compFactory, this.body.length, injector, []);
    if (data.IO) {
      Object.keys(data.IO).forEach(i => (cmpRef.instance[i] = data.IO[i]));
    }
  }

  onClose() {
    if (this.modalData.canClose) {
      this.modalService.set(new ModalData({ active: false }));
    }
  }

  debug() {
    this.modalService.set(
      new ModalData({
        active: true,
        canClose: true,
        header: 'Cool Header!',
        component: PromptModalComponent,
        IO: {
          message: 'Are you sure you want a prompt?',
          actionName: 'Yes',
          actionFunction: () => {
            console.log('Yes');
          },
          utilName: 'No',
          utilIcon: 'fa fa-times',
          utilFunction: () => {
            console.log('No');
          },
        },
      })
    );
  }
}
