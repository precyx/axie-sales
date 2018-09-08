import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { AxieSalesComponent }         from './axie-sales/axie-sales.component';
import { AxieLabComponent }           from './axie-lab/axie-lab.component';
import { AxieAdoptedComponent }       from './axie-adopted/axie-adopted.component';
import { BlockExplorerComponent }     from './block-explorer/block-explorer.component';
import { AxieArtstudioComponent }     from './axie-artstudio/axie-artstudio.component';
import { AxieInspectorComponent }     from './axie-inspector/axie-inspector.component';
import { AxieWorldComponent }         from './axie-world/axie-world.component';

const routes: Routes = [
  {path: '', redirectTo: '/axie-marketplace', pathMatch:"full"},
  {path: 'axie-marketplace', component: AxieSalesComponent},
  {path: 'axie-egglab', component: AxieLabComponent},
  {path: 'axie-artstudio', component: AxieArtstudioComponent},
  {path: 'axie-inspector', component: AxieInspectorComponent},
  {path: 'axie-world', component: AxieWorldComponent},
  {path: 'blockExplorer', component: BlockExplorerComponent},
  {path: 'axieAdopted', component: AxieAdoptedComponent},
];

@NgModule({
  imports : [ RouterModule.forRoot(routes) ],
  exports : [ RouterModule ]
})
export class AppRoutingModule { }
