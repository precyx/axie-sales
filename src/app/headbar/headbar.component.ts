import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
declare var web3:any;
declare var $:any;

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.css']
})
export class HeadbarComponent implements OnInit {

  currentAddress:string;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ){
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/menu.svg'));
  }

  ngOnInit() {
  }

  toggleMenu(e):void{
    $(".menuicon").toggleClass("active");
  }

}
