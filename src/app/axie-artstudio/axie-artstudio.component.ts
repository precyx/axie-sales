import { Component, OnInit } from '@angular/core';

import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

// data
import {colors} from "./colordata";
import { VersionManagerService } from '../services/version-manager.service';

declare let jQuery:any;

@Component({
  selector: 'app-axie-artstudio',
  templateUrl: './axie-artstudio.component.html',
  styleUrls: ['./axie-artstudio.component.scss']
})
export class AxieArtstudioComponent implements OnInit {

  // settings 
  enableBodyGrid:boolean;

  /* colors */
  colors = colors;
  bodyFillColor:string;


  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private versionManager:VersionManagerService
  ) {
    iconRegistry.addSvgIcon('hand', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/hand.svg'));
    iconRegistry.addSvgIcon('paint-brush', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/paint-brush.svg'));
    //
    this.versionManager.setVersionName("module", "Art-Studio");
    this.versionManager.setVersion("module", "1.2.0");
  }

  ngOnInit() {
  }


  setColor(color){
    this.bodyFillColor = color.val;
    jQuery(".ai_axie_body_fill").css("fill", this.bodyFillColor);
  }

  toggleBodyGrid(){
    this.enableBodyGrid = !this.enableBodyGrid;
  }

}
