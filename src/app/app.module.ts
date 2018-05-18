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

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';


import { TimeagoService }             from './services/timeago.service';
import { OrderBy }                    from './pipes/orderBy-pipe';
import { AxieAdoptedComponent }       from './axie-adopted/axie-adopted.component';

import { AngularFireModule }          from 'angularfire2';
import { AngularFirestoreModule }     from 'angularfire2/firestore';
import { AngularFireStorageModule }   from 'angularfire2/storage';
import { AngularFireAuthModule }      from 'angularfire2/auth';
import { environment }                from '../environments/environment';


@NgModule({
  exports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ]
})
export class MaterialModule { }

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
    AngularFireModule.initializeApp(environment.firebase, "axie-sales"),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialModule,
  ],
  exports: [
  ],
  providers: [
    TimeagoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
