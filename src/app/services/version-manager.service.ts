import { Injectable } from '@angular/core';
import { VERSION } from '@angular/core';

declare var web3:any;

@Injectable({
  providedIn: 'root'
})
export class VersionManagerService {

  versions = {
    app       : { name: "App",          v: "1.0" },
    module    : { name: "Module",       v: "-"},
    web3      : { name: "Web3",         v: "-"},
    angular   : { name: "Angular",      v: "-"}
  }
   
  constructor() {
    if(web3)    this.setVersion("web3", web3.version.api);
    if(VERSION) this.setVersion("angular", VERSION.full);
  }

  getVersions():any{
    return this.versions;
  }
  setVersion(name, version){
    this.versions[name].v = version;
  }
  setVersionName(name, val){
    this.versions[name].name = val;
  }


}
