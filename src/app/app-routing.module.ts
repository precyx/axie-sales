import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { AxieSalesComponent }         from './axie-sales/axie-sales.component';
import { BlockExplorerComponent }     from './block-explorer/block-explorer.component';

const routes: Routes = [
  {path: '', redirectTo: '/axieSales', pathMatch: 'full' },
  {path: 'blockExplorer', component: BlockExplorerComponent},
  {path: 'axieSales', component: AxieSalesComponent},
];

@NgModule({
  imports : [ RouterModule.forRoot(routes) ],
  exports : [ RouterModule ]
})
export class AppRoutingModule { }
