import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { AxieSalesComponent }         from './axie-sales/axie-sales.component';

const routes: Routes = [
  {path: '', redirectTo: '/axieSales', pathMatch: 'full' },
  {path: 'axieSales', component: AxieSalesComponent},
];

@NgModule({
  imports : [ RouterModule.forRoot(routes) ],
  exports : [ RouterModule ]
})
export class AppRoutingModule { }
