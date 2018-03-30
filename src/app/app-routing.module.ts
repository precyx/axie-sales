import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { AxieSalesComponent }         from './axie-sales/axie-sales.component';
import { BlockExplorerComponent }     from './block-explorer/block-explorer.component';

const routes: Routes = [
  {path: '', component: AxieSalesComponent},
  {path: 'blockExplorer', component: BlockExplorerComponent},
];

@NgModule({
  imports : [ RouterModule.forRoot(routes) ],
  exports : [ RouterModule ]
})
export class AppRoutingModule { }
