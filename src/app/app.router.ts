import { RouterModule, Routes } from '@angular/router';
import { TreeListComponent } from './tree-list/tree-list.component';
import { TreeDetailsComponent } from './tree-details/tree-details.component';

const routes: Routes = [
    { path: 'treeList', component: TreeListComponent },
    { path: 'treeDetails/:id', component: TreeDetailsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'treeList' }
];

export const appRouterProviders = RouterModule.forRoot(routes);

