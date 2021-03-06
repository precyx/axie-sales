import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/core';

import {VersionManagerService} from '../services/version-manager.service';

declare var web3:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  web3jsversion:string;
  angularversion:string;

  versions:any;

  constructor(
    private versionManager:VersionManagerService
  ) {
    this.versions = versionManager.getVersions();
    console.log(this.versions.module);
  }

  ngOnInit() {
    if(web3) this.web3jsversion = web3.version.api
    else this.web3jsversion = "-";
    //
    if(VERSION) this.angularversion = VERSION.full;
    else this.angularversion = "-";
  }

}
