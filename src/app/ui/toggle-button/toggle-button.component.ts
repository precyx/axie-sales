import { Component, OnInit, Input } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-toggle-button',
  styleUrls: ['./toggle-button.component.scss'],
  template: `
     <div class="btn filter" [ngClass]="{'active':active}">
        <img *ngIf="!imgpathActive || (imgpathActive && !active)" class="img" src="{{imgpath}}"/>
        <img *ngIf="imgpathActive && active" class="img" src="{{imgpathActive}}"/>

        <div class="text">{{name}}</div>
     </div>
  `
})
export class ToggleButtonComponent implements OnInit {

  @Input() name: string;
  @Input() active: boolean;
  @Input() icon: string;
  @Input() imgpath: string;
  @Input() imgpathActive: string;


  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ){
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/close.svg'));
    iconRegistry.addSvgIcon(this.icon, sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/' + this.icon + ".svg"));
  }

  ngOnInit() {
  }

  clickButton(){

  }

}
