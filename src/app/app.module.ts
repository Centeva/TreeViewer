import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';
import { InspectorComponent } from './inspector/inspector.component';
import { TreeListComponent } from './tree-list/tree-list.component';
import { TreeDetailsComponent } from './tree-details/tree-details.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { appRouterProviders } from './app.router';
import { HttpModule } from '@angular/http';

import { MdToolbarModule, MdTableModule, MdCardModule, MdButtonModule, MdInputModule, MdTooltipModule, MdSnackBarModule, MdCoreModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { TreeListItemComponent } from './tree-list-item/tree-list-item.component';
import { NodeService } from './node.service';
import { TreeService } from './tree.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalService } from './modal.service';
import { ModalBaseComponent } from './modalBase/modalBase.component';
import { DefinitionService } from './definition.service';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    InspectorComponent,
    TreeListComponent,
    TreeDetailsComponent,
    TreeListItemComponent,
    ModalBaseComponent
  ],
  imports: [
    MdToolbarModule,
    MdCardModule,
    MdCoreModule,
    MdSnackBarModule,
    MdTooltipModule,
    MdButtonModule,
    MdInputModule,
    MdTableModule,
    MdToolbarModule,
    CdkTableModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    appRouterProviders
  ],
  providers: [
    NodeService,
    TreeService,
    ModalService,
    DefinitionService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
