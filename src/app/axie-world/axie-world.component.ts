import { Component, OnInit } from '@angular/core';

import {AxielibService} from './axielib/axielib.service';
import { VersionManagerService } from '../services/version-manager.service';


@Component({
  selector: 'app-axie-world',
  templateUrl: './axie-world.component.html',
  styleUrls: ['./axie-world.component.css']
})
export class AxieWorldComponent implements OnInit {


  constructor(
    private axielib:AxielibService,
    private versionManager:VersionManagerService
  ) {
    this.versionManager.setVersionName("module", "Axie World");
    this.versionManager.setVersion("module", "1.0.0");
  }

  ngOnInit() {

    this.getAxieData();
  }


  getAxieData(){
    this.axielib.getAxie("45").subscribe(data =>{
      console.log("axie", data);
    })
  }

}
