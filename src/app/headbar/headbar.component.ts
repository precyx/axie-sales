import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {AppStatusService} from '../services/app-status.service';
declare var web3:any;
declare var $:any;

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.css']
})
export class HeadbarComponent implements OnInit {

  loading:boolean = false;
  currentAddress:string;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private appStatusService: AppStatusService,
  ){
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/menu.svg'));
    //
    this.appStatusService.changeEmitted$.subscribe(loading => {
      this.loading = loading;
    });
  }



  ngOnInit() {
  }

  toggleMenu(e):void{
    $(".menuicon").toggleClass("active");
  }

  clickNaviPoint(e){
    //$(".mainnav .linkgroup .elem").removeClass("active");
    //$(e.currentTarget).addClass("active");
  }

}
