import { Component, OnInit, NgZone } from '@angular/core';

/* Standard */
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, retry  } from 'rxjs/operators';
import {BigNumber} from 'bignumber.js';
import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

/* Version Manager */
import { VersionManagerService } from '../services/version-manager.service';

/* data */
import {gene_map}           from '../data/gene-map';
import {class_colors}       from '../data/class-colors';

declare let web3:any;
@Component({
  selector: 'app-axie-inspector',
  templateUrl: './axie-inspector.component.html',
  styleUrls: ['./axie-inspector.component.scss']
})
export class AxieInspectorComponent implements OnInit {

  /* contract data */
  axie_core_address:string = "0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d";
  axie_core_abi:any = [{"constant":true,"inputs":[{"name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cfoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_approved","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"ceoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_axieId","type":"uint256"},{"name":"_genes","type":"uint256"}],"name":"rebirthAxie","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"whitelistSetterAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"marketplaceManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_manager","type":"address"}],"name":"setRetirementManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_geneScientist","type":"address"},{"name":"_whitelisted","type":"bool"}],"name":"setGeneScientist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newCEO","type":"address"}],"name":"setCEO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCOO","type":"address"}],"name":"setCOO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"_tokenId","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_manager","type":"address"}],"name":"setMarketplaceManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newCFO","type":"address"}],"name":"setCFO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"retirementManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newSetter","type":"address"}],"name":"setWhitelistSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_genes","type":"uint256"},{"name":"_owner","type":"address"}],"name":"spawnAxie","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_marketplace","type":"address"},{"name":"_whitelisted","type":"bool"}],"name":"setMarketplace","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"geneManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_byeSayer","type":"address"},{"name":"_whitelisted","type":"bool"}],"name":"setByeSayer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_manager","type":"address"}],"name":"setSpawningManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_manager","type":"address"}],"name":"setGeneManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelistedByeSayer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"spawningManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelistedGeneScientist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spawner","type":"address"},{"name":"_whitelisted","type":"bool"}],"name":"setSpawner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"},{"name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelistedMarketplace","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_axieId","type":"uint256"}],"name":"getAxie","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_axieId","type":"uint256"},{"name":"_newGenes","type":"uint256"}],"name":"evolveAxie","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cooAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"tokenURIPrefix","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelistedSpawner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_axieId","type":"uint256"},{"name":"_rip","type":"bool"}],"name":"retireAxie","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenURISuffix","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_prefix","type":"string"},{"name":"_suffix","type":"string"}],"name":"setTokenURIAffixes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_axieId","type":"uint256"},{"indexed":true,"name":"_owner","type":"address"},{"indexed":false,"name":"_genes","type":"uint256"}],"name":"AxieSpawned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_axieId","type":"uint256"},{"indexed":false,"name":"_genes","type":"uint256"}],"name":"AxieRebirthed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_axieId","type":"uint256"}],"name":"AxieRetired","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_axieId","type":"uint256"},{"indexed":false,"name":"_oldGenes","type":"uint256"},{"indexed":false,"name":"_newGenes","type":"uint256"}],"name":"AxieEvolved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_approved","type":"address"},{"indexed":false,"name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_operator","type":"address"},{"indexed":false,"name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}];;

  /* colors */
  class_colors:any;

  parts:any = [
    {"img_url" : "assets/icons/parts/white/eyes.png"},
    {"img_url" : "assets/icons/parts/white/mouth.png"},
    {"img_url" : "assets/icons/parts/white/ears.png"},
    {"img_url" : "assets/icons/parts/white/horn.png"},
    {"img_url" : "assets/icons/parts/white/back.png"},
    {"img_url" : "assets/icons/parts/white/tail.png"}
  ];

  /* apis */
  axie_core_API:any;
  axiedata_server_API:string = "https://axieinfinity.com/api/axies";
  axiedata_server_API_v1:string = "https://api.axieinfinity.com/v1/axies";

  /* search */
  searchstring:string;

  /* delimiter */
  gene_delimiter:number = 4;

  /* axie data */
  gene1:string;
  genes:Array<any> = [];

  /* comparator */
  axies_to_compare:Array<any> = [];
  compareResult:object;
  showComparator:boolean = false;
  gene_map:any;

  /* view mode */
  view_mode = "module";

  constructor(
    private _ngZone:NgZone,
    private _http:HttpClient,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private versionManager:VersionManagerService
  ) {
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/close.svg'));
    iconRegistry.addSvgIcon('add-to-stack', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/add_to_stack.svg'));
    iconRegistry.addSvgIcon('view-module', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/view_module.svg'));
    iconRegistry.addSvgIcon('view-stream', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/view_stream.svg'));
    //
    this.versionManager.setVersionName("module", "Inspector");
    this.versionManager.setVersion("module", "1.3.0");
  }

  ngOnInit() {
    this.axie_core_API = web3.eth.contract(this.axie_core_abi).at(this.axie_core_address);
    //
    this.assignData();
    this.configBigNumber();
    this.experimentWithAxieCore();
  }
  
  assignData(){
    this.gene_map = gene_map;
    this.class_colors = class_colors;
    //
    /*console.log("aaa",this.axie_core_abi);
    console.log("bbb",this.axie_core_address);
    console.log("ccc",this.gene_map);*/
  }

  /**
   * configures BigNumber behaviour
   */
  configBigNumber(){
    BigNumber.config({ EXPONENTIAL_AT: 1e+9 });
  }

  binaryToDecimal(binary){
    if(binary.indexOf("-") != -1) binary = 0;
    return parseInt(binary, 2);
  }

  /**
   * AxieCore experiments
   */
  experimentWithAxieCore(){
    console.log("API",this.axie_core_API);
    this.getAxies().then((axieData)=>{
      this.extendAxiesData(axieData);
      console.log("a1",this.genes);
    });
  }

  /*
  ***
  Utils
  ***
  */
 getClassColor(_class):string{
  return this.class_colors[_class];
}

  /*
  ***
  Search
  ***
  */

  searchAxie(){
    var id = parseInt(this.searchstring);
    this.getAxie(id).then((axie)=>{
      this.genes.unshift(axie);
      return this.extendAxieData(axie);
    }).then((data) => {
      console.log("axie data", data);
    });

  }


  /*
  ***
  Axies + Genes 
  ***
  */



  /**
   * gets axies by an id range e.g 1-100 or 5-20
   */
  getAxies(){
    var promises = [];
    for(let i = 5; i < 20; i++){
      let getAxie = this.getAxie(i);
      promises.push(getAxie);
      getAxie.then((gene)=>{
        this.saveAxie(i, gene);
      });
    }
    return Promise.all(promises);
  }


  saveAxie(id, genes){
    this.genes.push(genes);
  }

  extendAxiesData(axieData){
    var promises = [];
    axieData.forEach(elem => {
      promises.push(this.extendAxieData(elem));
    });
    return Promise.all(promises);
  }

  extendAxieData(axieData){
    var url = this.axiedata_server_API_v1 +"/"+ axieData.id + "/";
    return new Promise((resolve,reject)=>{
      this._http.get(url).pipe((v)=>{return v}, retry(20)).subscribe((data:any)=>{
        var promises = [];
        console.log("d",data);
        axieData["axieAPI"] = data;
        axieData["img"] = data.figure.static.idle;
        // convert object to array
        data.parts = Object.values(data.parts);
        // get atlas data
        /*promises.push(new Promise((resolve,rejct) => {
          this.getAtlasData(data.figure.atlas).then((atlasData)=>{
            axieData["atlasData"] = atlasData;
            resolve();
          });
        }));*/
        Promise.all(promises).then(()=>{
          resolve(axieData);
        });
        //console.log(data.figure.images[elem.id+".png"]);
      });
    });
  }

  getAtlasData(atlasURL){
    return new Promise(()=>{
      this._http.get(atlasURL, {responseType: 'text'}).subscribe((atlasData)=>{
        //console.log("atlas", atlasData);
        var arr = atlasData.split("\n");
        //console.log(arr);
      });
    });
  }

  /**
   * calls the getAxie() function on the AxieCore contract and returns axie genes.
   * @param i {Number} Axie ID
   */
  getAxie(axie_id){
    return new Promise((resolve, reject)=>{
      this.axie_core_API.getAxie(axie_id, (err,res)=> {
        if(err) reject(err);
        else {
          var data = this.parseGene(res[0]);
          data["id"] = axie_id;
          //
          this._ngZone.run(()=>{});
          resolve(data);
        }
      });
    });
  }

  /**
   * parses genes:
   * converts to binary, pads to 256 bit 
   * @param _gene 
   */
  parseGene(_gene){
    //this.gene1 = (new BigNumber(gene).toString();
    var gene:any = (new BigNumber(_gene)).toString();
    var binary = _gene.toString(2).padStart(256, "0");
    var splitgenes = this.calcSplitGenes(binary);
    //
    var newGene = {
      'decimal' : gene,
      'binary' : binary,
      'binaries' : splitgenes
    };
    return newGene;
  }
  
  calcSplitGenes(_genes_string){
    var genes_string = _genes_string;
    var split_genes = [];
    var num = this.gene_delimiter;
    /*for (var i = 0; i < _genes_string.length; i += num) {
      split_genes.push(_genes_string.substring(i, i+num));
    }*/
    this.gene_map.forEach(elem => {
      var splitgene = genes_string.slice(0, elem.bits);
      genes_string = genes_string.substr(elem.bits, genes_string.length);
      //console.log("ss",genes_string);
      split_genes.push({"bits" : splitgene, "name" : elem.name});
    });
    //console.log("s",split_genes);
    return split_genes;
  }


  removeAxie(id){
    this.genes.forEach((elem, i) => {
      if(elem.id == id) this.genes.splice(i,1);
    });
  }


  /*
   ***
   Comparator 
   ***
  */

 changeGeneDelimiter(){
  this.genes.forEach(elem => {
    elem.binaries = this.calcSplitGenes(elem.binary);
  });
  this.activateComparator();
  console.log(this.genes);
}
  
  addAxieToComparison(axie){
    this.axies_to_compare.push(axie);
    this.activateComparator();
  }

  removeAxieFromComparator(id){
    this.axies_to_compare.forEach((elem,i) => {
      if(elem.id == id) this.axies_to_compare.splice(i,1);
    });
    this.activateComparator();
  }

  activateComparator(){
   this.compareResult = {};
   // compare genes
   for(let i = 0; i < this.axies_to_compare.length-1; i++){
     var a1 = this.axies_to_compare[i]; 
     if(a3) a1 = a3;
     var a2 = this.axies_to_compare[i+1];
     var a3:any = {};
     // compare genes
     a3.binaries = [];
     for(var j = 0; j < a1.binaries.length; j++){
       var b1 = a1.binaries[j];
       var b2 = a2.binaries[j];
       var b3 = {"bits" : "", "name":b1.name};
       for(var k = 0; k < b1.bits.length; k++){
         var c1 = b1.bits.charAt(k);
         var c2 = b2.bits.charAt(k);
         if(c1 == c2) b3.bits += c1;
         else         b3.bits += "-";
       }
       a3.binaries.push(b3);
     }
     // compare classes
     a3.axieAPI = {};
     this.compareAttribute(a1.axieAPI, a2.axieAPI, a3.axieAPI, "class", {'noMatchVal' : '_NO_CLASS_MATCH'});
     this.compareAttribute(a1.axieAPI, a2.axieAPI, a3.axieAPI, "title", {'noMatchVal' : '_NO_TITLE_MATCH'});
     // compare parts
     a3.axieAPI.parts = [];
     for(let j = 0; j < a1.axieAPI.parts.length; j++){
       var m1 = a1.axieAPI.parts[j];
       var m2 = a2.axieAPI.parts[j];
       a3.axieAPI.parts[j] = {};
       this.compareAttribute(m1, m2, a3.axieAPI.parts[j], "class", {'noMatchVal' : '_NOMATCH'});
       this.compareAttribute(m1, m2, a3.axieAPI.parts[j], "id", {'noMatchVal' : '_NOMATCH'});
       this.compareAttribute(m1, m2, a3.axieAPI.parts[j], "mystic", {'noMatchVal' : '_NOMATCH'});
       this.compareAttribute(m1, m2, a3.axieAPI.parts[j], "name", {'noMatchVal' : '_NOMATCH'});
       this.compareAttribute(m1, m2, a3.axieAPI.parts[j], "region", {'noMatchVal' : '_NOMATCH'});
       this.compareAttribute(m1, m2, a3.axieAPI.parts[j], "type", {'noMatchVal' : '_NOMATCH'});
       this.compareAttribute(m1, m2, a3.axieAPI.parts[j], "stage", {'noMatchVal' : '_NOMATCH'});
     }
     /*a3.axieAPI.class = "";
     if(a1.axieAPI.class == a2.axieAPI.class) a3.axieAPI.class = a1.axieAPI.class;
     else a3.axieAPI.class = "-";*/
     console.log("a3", a3);
   }
   this.compareResult = a3;
   //
   // compare class
  }

  compareAttribute(e1, e2, e3, attr, compareOptions){
    var noMatchVal = compareOptions.noMatchVal ? compareOptions.noMatchVal : "-"; 
    //
    e3[attr] = "";
    if(e1[attr] == e2[attr]) e3[attr] = e1[attr];
    else e3[attr] = noMatchVal;
  }

  toggleComparator(){
    this.showComparator = !this.showComparator;
  }
  closeComparator(){
    this.showComparator = false;
  }



  getGeneStructure(gene){
    if(gene.indexOf('-') != -1) return "nomatch";
    if(this.binaryToDecimal(gene) == 0) return "zeroval";
    if(gene.indexOf('-') == -1) return "match";
    return "a";
  }


  setViewMode(mode){
    this.view_mode = mode;
  }

}
