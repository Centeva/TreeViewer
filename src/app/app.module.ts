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

import { MdToolbarModule, MdTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { TreeListItemComponent } from './tree-list-item/tree-list-item.component';
import { NodeService } from './node.service';
import { TreeService } from './tree.service';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    InspectorComponent,
    TreeListComponent,
    TreeDetailsComponent,
    TreeListItemComponent
  ],
  imports: [
    BrowserModule,
    MdToolbarModule,
    MdTableModule,
    CdkTableModule,
    BrowserAnimationsModule,
    HttpModule,
    appRouterProviders
  ],
  providers: [
    NodeService,
    TreeService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
