import { BrowserModule }              from '@angular/platform-browser';
import { NgModule }                   from '@angular/core';
import { FormsModule }                from '@angular/forms';

import { AppComponent }               from './app.component';
import { AppRoutingModule }           from './/app-routing.module';
import { AxieSalesComponent }         from './axie-sales/axie-sales.component';
import { AxieLabComponent }           from './axie-lab/axie-lab.component';
import { HeadbarComponent }           from './headbar/headbar.component';
import { FooterComponent }            from './footer/footer.component';
import { ToggleButtonComponent }      from './ui/toggle-button/toggle-button.component';
import { BlockExplorerComponent }     from './block-explorer/block-explorer.component';
import { HttpClientModule }           from '@angular/common/http';
import { InlineSVGModule }            from 'ng-inline-svg';

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
import { SortableHeaderComponent } from './ui/sortable-header/sortable-header.component';
import { SearchFieldComponent } from './ui/search-field/search-field.component';
import { CopyTextComponent } from './ui/copy-text/copy-text.component';
import { AxieArtstudioComponent } from './axie-artstudio/axie-artstudio.component';
import { CheckboxComponent } from './ui/checkbox/checkbox.component';
import { ArtboardComponent } from './axie-artstudio/artboard/artboard.component';
import { AxieInspectorComponent } from './axie-inspector/axie-inspector.component';
import { AxieTagComponent } from './ui/axie-tag/axie-tag.component';
import { AxiePartIconComponent } from './ui/axie-part-icon/axie-part-icon.component';


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
  ],
})
export class MaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    AxieSalesComponent,
    AxieLabComponent,
    HeadbarComponent,
    FooterComponent,
    ToggleButtonComponent,
    BlockExplorerComponent,
    OrderBy,
    AxieAdoptedComponent,
    SortableHeaderComponent,
    SearchFieldComponent,
    CopyTextComponent,
    AxieArtstudioComponent,
    CheckboxComponent,
    ArtboardComponent,
    AxieInspectorComponent,
    AxieTagComponent,
    AxiePartIconComponent,
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
    InlineSVGModule.forRoot(),
    
  ],
  exports: [
  ],
  providers: [
    TimeagoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
