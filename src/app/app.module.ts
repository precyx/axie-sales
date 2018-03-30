import { BrowserModule }              from '@angular/platform-browser';
import { NgModule }                   from '@angular/core';
import { FormsModule }                from '@angular/forms';

import { AppComponent }               from './app.component';
import { AppRoutingModule }           from './/app-routing.module';
import { AxieSalesComponent }         from './axie-sales/axie-sales.component';
import { HeadbarComponent }           from './headbar/headbar.component';
import { FooterComponent }            from './footer/footer.component';
import { BlockExplorerComponent }     from './block-explorer/block-explorer.component';

import { TimeagoService }             from './services/timeago.service';
import { OrderBy }                    from './pipes/orderBy-pipe';


@NgModule({
  declarations: [
    AppComponent,
    AxieSalesComponent,
    HeadbarComponent,
    FooterComponent,
    BlockExplorerComponent,
    OrderBy
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    TimeagoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
