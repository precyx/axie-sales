import { BrowserModule }              from '@angular/platform-browser';
import { NgModule }                   from '@angular/core';
import { FormsModule }                from '@angular/forms';

import { AppComponent }               from './app.component';
import { AppRoutingModule }           from './/app-routing.module';
import { AxieSalesComponent }         from './axie-sales/axie-sales.component';
import { HeadbarComponent }           from './headbar/headbar.component';
import { FooterComponent }            from './footer/footer.component';
import { BlockExplorerComponent }     from './block-explorer/block-explorer.component';
import { HttpClientModule }           from '@angular/common/http';
import {MatIconModule}                from '@angular/material';

import { TimeagoService }             from './services/timeago.service';
import { OrderBy }                    from './pipes/orderBy-pipe';
import { AxieAdoptedComponent } from './axie-adopted/axie-adopted.component';


@NgModule({
  declarations: [
    AppComponent,
    AxieSalesComponent,
    HeadbarComponent,
    FooterComponent,
    BlockExplorerComponent,
    OrderBy,
    AxieAdoptedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
  ],
  exports: [
    MatIconModule,
  ],
  providers: [
    TimeagoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
