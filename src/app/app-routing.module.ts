import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { AxieSalesComponent }         from './axie-sales/axie-sales.component';
import { AxieLabComponent }           from './axie-lab/axie-lab.component';
import { AxieAdoptedComponent }       from './axie-adopted/axie-adopted.component';
import { BlockExplorerComponent }     from './block-explorer/block-explorer.component';

const routes: Routes = [
  {path: '', redirectTo: '/axie-marketplace', pathMatch:"full"},
  {path: 'axie-marketplace', component: AxieSalesComponent},
  {path: 'axie-egglab', component: AxieLabComponent},
  {path: 'blockExplorer', component: BlockExplorerComponent},
  {path: 'axieAdopted', component: AxieAdoptedComponent},
];

@NgModule({
  imports : [ RouterModule.forRoot(routes) ],
  exports : [ RouterModule ]
})
export class AppRoutingModule { }
