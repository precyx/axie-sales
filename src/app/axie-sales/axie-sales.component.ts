import { Component, OnInit, HostListener } from '@angular/core';
//
import { NgZone } from '@angular/core';
import { NgModel } from '@angular/forms';
import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable} from 'rxjs';

import {TimeagoService} from '../services/timeago.service';

import { BigNumber }         from "bignumber.js";

import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { QuerySnapshot, CollectionReference } from '@google-cloud/firestore';

import {VersionManagerService} from '../services/version-manager.service';

declare let web3:any;
declare var $:any;
declare var await:any;

@Component({
  selector: 'app-axie-sales',
  templateUrl: './axie-sales.component.html',
  styleUrls: ['./axie-sales.component.css']
})
export class AxieSalesComponent implements OnInit {

  /* contract data */
  axie_infinity_core_contract:string ="0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d";

  /* AxieCore */
  axie_infinity_core:Array<object> = [{"constant":true,"inputs":[{"name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cfoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_approved","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"ceoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"whitelistSetterAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_geneScientist","type":"address"},{"name":"_whitelisted","type":"bool"}],"name":"setGeneScientist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newCEO","type":"address"}],"name":"setCEO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCOO","type":"address"}],"name":"setCOO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"_tokenId","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newCFO","type":"address"}],"name":"setCFO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newSetter","type":"address"}],"name":"setWhitelistSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_marketplace","type":"address"},{"name":"_whitelisted","type":"bool"}],"name":"setMarketplace","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_byeSayer","type":"address"},{"name":"_whitelisted","type":"bool"}],"name":"setByeSayer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelistedByeSayer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelistedGeneScientist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spawner","type":"address"},{"name":"_whitelisted","type":"bool"}],"name":"setSpawner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"},{"name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelistedMarketplace","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cooAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"tokenURIPrefix","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelistedSpawner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenURISuffix","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_prefix","type":"string"},{"name":"_suffix","type":"string"}],"name":"setTokenURIAffixes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_axieId","type":"uint256"},{"indexed":false,"name":"_genes","type":"uint256"},{"indexed":true,"name":"_owner","type":"address"}],"name":"AxieSpawned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_axieId","type":"uint256"}],"name":"AxieRetired","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_axieId","type":"uint256"},{"indexed":false,"name":"_oldGenes","type":"uint256"},{"indexed":false,"name":"_newGenes","type":"uint256"}],"name":"AxieEvolved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_approved","type":"address"},{"indexed":false,"name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_operator","type":"address"},{"indexed":false,"name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"name":"_axieId","type":"uint256"}],"name":"getAxie","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_genes","type":"uint256"},{"name":"_owner","type":"address"}],"name":"spawnAxie","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_axieId","type":"uint256"}],"name":"retireAxie","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_axieId","type":"uint256"},{"name":"_newGenes","type":"uint256"}],"name":"evolveAxie","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

  /* ClockAuction Contract */
  axie_infinity_clock_auction_contract:string = "0xf4985070ce32b6b1994329df787d1acc9a2dd9e2";

  /* AxieClockAuction */
  axie_infinity_clock_auction:Array<object> = [{constant:!1,inputs:[],name:"unpause",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"",type:"address"},{name:"",type:"uint256"}],name:"auctions",outputs:[{name:"seller",type:"address"},{name:"startingPrice",type:"uint128"},{name:"endingPrice",type:"uint128"},{name:"duration",type:"uint64"},{name:"startedAt",type:"uint64"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"paused",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"ownerCut",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"pause",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"owner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"reclaimEther",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[{name:"_ownerCut",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},{payable:!1,stateMutability:"nonpayable",type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"_nftAddress",type:"address"},{indexed:!0,name:"_tokenId",type:"uint256"},{indexed:!1,name:"_startingPrice",type:"uint256"},{indexed:!1,name:"_endingPrice",type:"uint256"},{indexed:!1,name:"_duration",type:"uint256"}],name:"AuctionCreated",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_nftAddress",type:"address"},{indexed:!0,name:"_tokenId",type:"uint256"},{indexed:!1,name:"_totalPrice",type:"uint256"},{indexed:!1,name:"_winner",type:"address"}],name:"AuctionSuccessful",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_nftAddress",type:"address"},{indexed:!0,name:"_tokenId",type:"uint256"}],name:"AuctionCancelled",type:"event"},{anonymous:!1,inputs:[],name:"Pause",type:"event"},{anonymous:!1,inputs:[],name:"Unpause",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"previousOwner",type:"address"},{indexed:!0,name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{constant:!0,inputs:[{name:"_nftAddress",type:"address"},{name:"_tokenId",type:"uint256"}],name:"getAuction",outputs:[{name:"seller",type:"address"},{name:"startingPrice",type:"uint256"},{name:"endingPrice",type:"uint256"},{name:"duration",type:"uint256"},{name:"startedAt",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_nftAddress",type:"address"},{name:"_tokenId",type:"uint256"}],name:"getCurrentPrice",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_nftAddress",type:"address"},{name:"_tokenId",type:"uint256"},{name:"_startingPrice",type:"uint256"},{name:"_endingPrice",type:"uint256"},{name:"_duration",type:"uint256"}],name:"createAuction",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_nftAddress",type:"address"},{name:"_tokenId",type:"uint256"}],name:"bid",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[{name:"_nftAddress",type:"address"},{name:"_tokenId",type:"uint256"}],name:"cancelAuction",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_nftAddress",type:"address"},{name:"_tokenId",type:"uint256"}],name:"cancelAuctionWhenPaused",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"}];


  /* Axie Data */
  axie_classes = {
    "aquatic"   : "aquatic",
    "beast"     : "beast",
    "plant"     : "plant",
    "bird"      : "bird",
    "bug"       : "bug",
    "reptile"   : "reptile",
    "unknown"   : "???"
  }

  /* Axie Sales Data*/
  axie_sales:Array<any> = [];
  axie_sales_backup:Array<any> = [];
  APP_STATUS:any = {"phase" : "setup", "subphase" : "", "loading": ""};

  /* Axie Sales Stats */
  axie_sales_totalEth:number = 0;

  /* Axie Scan Data */
  /* 30s        = 1 block
     1min       = 2 blocks
     1h         = 120 blocks
     1d         = 2'880 blocks
     1w         = 20'160 blocks
     1m         = 86'400 blocks
     1y         = 1'036'800 blocks
  */
  SCAN_BLOCKSTEP:number = 50000; // 3day
  SCAN_MINBLOCK:number = 5321059; // 5y
  scans:Array<any> = [];
  // @depracted vars used for avoiding double sales write
  LAST_SCANNED_BLOCK:number;
  LAST_SCANNED_TX_INDEX:number;

  /* Pagination */
  pagination_sales_per_page:number = 15;
  axie_total_sales:number;
  pagination_pointer:number = 0;
  pagination_current_page:number = 1;
  pagination_total_pages:number;
  previous_first_sale:any;
  previous_last_sale:any;

  /* stats */
  sales_total_eth:number;

  /* sorting */
  sorting_var:string = "timestamp";
  current_ordering:object = {"prop": "timestamp", "mode": "desc"};
  disable_single_sortings:boolean;

  /* filtering */
  current_filtering:object = {};
  showFilterMaster:boolean;

  /* scrolling */
  scrolling_end_reached:boolean;

  /* Query Options*/
  queryOptions:any = {
    "limit"      : 15,
    "startAfter" : null,
    "orderBy"    : null,
    "where"      : null
  };

  /* DB */
  DB:FirebaseFirestore;

  /* web3 */
  web3Supported:boolean;
  metamaskUnlocked:boolean; //@todo


  /* Loading Spinner */
  spinnerColor = "primary";
  spinnerMode = "indeterminate";
  spinnerDiameter = 35;


  constructor(
    private timeAgoService:TimeagoService,
    private _ngZone:NgZone,
    private http: HttpClient,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private db: AngularFirestore,
    private versionManager: VersionManagerService
  ){
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/search.svg'));
    iconRegistry.addSvgIcon('arrow-left', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/arrow-left.svg'));
    iconRegistry.addSvgIcon('arrow-right', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/arrow-right.svg'));
    iconRegistry.addSvgIcon('first-page', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/first-page.svg'));
    iconRegistry.addSvgIcon('filter', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/filter.svg'));
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/close.svg'));
    iconRegistry.addSvgIcon('copy', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/copy.svg'));
    this.DB = db.firestore;
    //
    this.versionManager.setVersionName("module", "Axie Sales");
    this.versionManager.setVersion("module", "2.1.2");
  }

  ngOnInit() {
    var that = this;
    if (web3) this.web3Supported = true;
   /* this.getCurrentBlock().then(function(blocknumber){
        that.getAxieSalesGradually(blocknumber);
    });*/
    if(!web3) this.allAxiesSyncedEvent();
    else this.getAxieSales();
    //
    this.loadPaginationData();
    this.loadTotalVolume();
  }


  setAppStatus(_data:any){
    if("phase" in _data)      this.APP_STATUS["phase"]      = _data.phase;
    if("subphase" in _data)   this.APP_STATUS["subphase"]   = _data.subphase;
    if("loading" in _data)    this.APP_STATUS["loading"]    = _data.loading;
  }

  /**
   * gets pagination data from DB
   * @return {Promise} returns promise which 
   */
  loadPaginationData(){
    var that = this;
    return new Promise(function(resolve, reject){
      that.DB.doc("sales-metadata/sales-count").get().then((doc)=>{
        //console.log("count", doc.data().count);
        that.axie_total_sales = doc.data().count;
        that.pagination_total_pages = Math.ceil(that.axie_total_sales / that.pagination_sales_per_page);
        resolve();
      });
    });
  }

  loadTotalVolume(){
    var that = this;
    return new Promise(function(resolve, reject){
      that.DB.doc("sales-metadata/sales-total-eth").get().then((doc)=>{
        //console.log("count", doc.data().count);
        that.sales_total_eth = doc.data().value;
        resolve();
      });
    });
  }


   /**
   * @error broken logic: you have to reverse order to enable back pagination...
   * @jump1
   * @event {Click} click on previous pagination arrow
   */
  clickPrevPagination(){
    var that = this;
    // broken logic
    /*this.loadAxiesFromDB({"ordering":this.current_ordering, "startAfter":this.previous_first_sale, "reverseOrder": true}).then((res)=>{
      that.pagination_pointer -= that.pagination_sales_per_page;
      that.pagination_current_page --;
      //
      that.loadAxiesFromDB( {"ordering":this.current_ordering, "startAfter":this.previous_last_sale, "reverseOrder": true}).then((res)=>{

      });
    })*/
    // get first sales
    this.setQueryOptions({"startAfter": null});
    this.loadAxiesFromDB().then((res)=>{
      that.pagination_pointer = 0;
      that.pagination_current_page = 1;
    })
  }

  /**
   * @jump1
   * @event {Click} click on next pagination arrow
   */
  clickNextPagination(){
    var that = this;
    //this.pagination_pointer += this.pagination_sales_per_page;
    this.setQueryOptions({"startAfter": this.previous_last_sale});
    this.loadAxiesFromDB().then((res)=>{
      that.pagination_pointer += that.pagination_sales_per_page;
      that.pagination_current_page ++;
    })
  }

  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event) {
    var body = document.body;
    var html = document.documentElement;
    var a1 = Math.max(html.offsetHeight, body.offsetHeight, html.clientHeight);
    var a2 = Math.max(body.scrollHeight, html.scrollHeight);
    var a3 = 100 - window.innerHeight/20;
    var h = a2 - a1 - a3 -100;
    var scrollPosition = window.pageYOffset
    if(scrollPosition > h && !this.APP_STATUS.loading && !this.scrolling_end_reached){
      //let limit = this.queryOptions["limit"] + this.pagination_sales_per_page || 15;
      //this.setQueryOptions({"limit" : limit});
      this.setQueryOptions({"startAfter": this.previous_last_sale});
      this.loadAxiesFromDB("APPEND").then((sales)=>{
        if(sales.docs.length == 0) this.scrolling_end_reached = true;
      })
    }
  }

  /**
   * handles all filter buttons and sets appropriate query options
   * @event {Click} click on any filter
   * @param filter {String} filtername e.g. 'stage-egg', 'pureness-4', 'class-bug'
   */
  setFilter(filter:string){
    if(!this.current_filtering[filter]) {
      this.current_filtering = {};
      this.current_ordering = {};
      this.current_filtering[filter] = true;
      //
      this.disable_single_sortings = true;
      //
      var where:any;
      switch(filter){
        case "my-sales"       : where = {"prop" : "seller", "val" : web3.eth.defaultAccount};  break;
        case "my-purchases"   : where = {"prop" : "buyer", "val" : web3.eth.defaultAccount}; break;
        case "stage-adult"    : where = {"prop" : "stage", "val" : 4}; break;
        case "stage-petite"   : where = {"prop" : "stage", "val" : 3}; break;
        case "stage-larva"    : where = {"prop" : "stage", "val" : 2}; break;
        case "stage-egg"      : where = {"prop" : "stage", "val" : 1}; break;
        case "pureness-1"     : where = {"prop" : "pureness", "val" : 1}; break;
        case "pureness-2"     : where = {"prop" : "pureness", "val" : 2}; break;
        case "pureness-3"     : where = {"prop" : "pureness", "val" : 3}; break;
        case "pureness-4"     : where = {"prop" : "pureness", "val" : 4}; break;
        case "pureness-5"     : where = {"prop" : "pureness", "val" : 5}; break;
        case "pureness-6"     : where = {"prop" : "pureness", "val" : 6}; break;
        case "title-origin"   : where = {"prop" : "title", "val" : "Origin"}; break;
        case "title-meocorp"  : where = {"prop" : "title", "val" : "MEO Corp"}; break;
        case "class-beast"    : where = {"prop" : "class", "val" : "beast"}; break;
        case "class-aquatic"  : where = {"prop" : "class", "val" : "aquatic"}; break;
        case "class-plant"    : where = {"prop" : "class", "val" : "plant"}; break;
        case "class-reptile"  : where = {"prop" : "class", "val" : "reptile"}; break;
        case "class-bird"     : where = {"prop" : "class", "val" : "bird"}; break;
        case "class-bug"      : where = {"prop" : "class", "val" : "bug"}; break;
        case "class-nocturnal": where = {"prop" : "class", "val" : "nocturnal"}; break;
        case "class-arctic"   : where = {"prop" : "class", "val" : "arctic"}; break;
        case "class-robotic"  : where = {"prop" : "class", "val" : "robotic"}; break;
      }
      this.setQueryOptions({"sorting" : null, "where" : where, "startAfter": null, "orderBy" : null});
    }
    else {
      this.disable_single_sortings = false;
      this.current_filtering = {};
      this.current_ordering = {};
      this.setQueryOptions({"where" : null, "sorting":null, "startAfter": null, "orderBy": null});
    }
    this.loadAxiesFromDB();
  }

  /**
   * checks if the current filter equals the specific filter
   * @param filter filter name e.g. "buyer"
   */
  isFilterActive(filter:string):string{
    if(this.current_filtering)
      if(this.current_filtering[filter]) return "active";
    return "";
  }


  toggleFilterMaster(){
    this.showFilterMaster = !this.showFilterMaster;
  }


  /**
   * Search prop
   * @param prop {String} 
   * @param evt 
   */
  searchFor(prop:string, val:string){
    this.disable_single_sortings = true;
    if(prop && val){
      console.log(prop, val);
      var where = {"prop": prop, "val": val};
      this.setQueryOptions({"where":where, "sorting":null, "orderBy":null, "startAfter":null});
    }
    else this.resetQueryOptions();
    //
    this.loadAxiesFromDB();
  }

  /**
   * Copies string to clipboard
   * @param str {String} string to copy
   */
  copyToClipboard(str:string){
    console.log("copy", str);
    document.execCommand(str);
  }


  /**
   * @return {Promise} returns a promise which yields the [last scanned block] and [last scanned transaction index]
   */
  getSalesLastScannedBlockData(){
    var that = this;
    var p = new Promise(function(resolve,reject){
      that.DB.collection("sales-metadata").doc("sales-last-scanned").get().then((doc) => {
        if (doc.exists) {
          resolve({
            "block" : doc.data().block,
            "transactionIndex" : doc.data().transactionIndex
          });
        }
      });
    });
    return p;
  }

  /**
   * @ignore Test firebase read function
   */
  readFirebase(){
    console.log(this.DB);
    // read all entries
    this.DB.collection("sales").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
  }

  /**
   * @ignore Test firebase write function
   */
  addToFirebase(){
    console.log(this.DB);
    // Add a new document in collection "sales"
    this.DB.collection("sales").doc("01").set({
      price: 5,
      axie_id: 4000,
      img_url: "https://axieinfinity.com/api/axies/3715/a7386f57e95e1968861da6cac7b71864.png",
      class: "beast",
      mystics: 1,
      timestamp: 1526511669,
      buyer: "0xc454c4be786e8ad7610d6113c06e4a608af303cb",
      tx: "0x3dc8b2fc60d4bfc7038bb3e44696e749091d140a51455b59a7fdee796edcd758"
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }


  toggleRow(sale:any):void {
    if(!sale.detailview) sale.detailview = true;
    else sale.detailview = !sale.detailview;
  }


  getTimeAgo(timestamp:any){
    return this.timeAgoService.getTimeAgo(timestamp);
  }

  weiToEth(wei:number){
    return wei/1000000000000000000;
  }

  round(val:any, digits:number){
    return parseFloat(val).toFixed(digits);
  }

  /**
   * Sets sorting with a firebase DB call
   * @param e {ClickEvent}  
   * @param val {SortingProperty} property to sort by 
   */
  setSorting(e:any, val:string){
    var elem;
    if($(e.target).hasClass("header_cell")) elem = e.target;
    else elem = $(e.target).parents(".header_cell")[0];
    // set ordering
    var sorting;
    var s = $(elem).attr("data-sorting") || "";
    switch(s){
      case (""):     sorting = "desc"; break;
      case ("asc"):  sorting = "desc"; break;
      case ("desc"): sorting = "asc"; break;
    }
    this.setCurrentOrdering(val, sorting);
    // reset pagination to 0
    this.pagination_pointer = 0;
    this.pagination_current_page = 1;
    // reload from db
    var ordering = {"prop": val, "mode": sorting};
    this.setQueryOptions({"orderBy":ordering, "startAfter": null});
    this.loadAxiesFromDB();
  }


  /**
   * gets sorting by name
   * @param {string} name e.g. timestamp, price...
  */
  getSortingByName(name:string):string{
    if(this.current_ordering["prop"] == name) return this.current_ordering["mode"];
    else return "";
  }

  /**
   * Sets current ordering object
   * @param prop {string} property
   * @param mode {string} ordering mode e.g. "asc" or "desc"
   */
  setCurrentOrdering(prop:string, mode:string){
    this.current_ordering = {};
    this.current_ordering = {"prop":prop, "mode":mode};
  }



  /**
   * @return {Promise} returns a promise which yields the [current block]
   */
  getCurrentBlock():any{
    var that = this;
    return new Promise(function(resolve, reject){
      web3.eth.getBlockNumber(function(err,res){
        if(err) reject(err);
        else {
          resolve(res);
        }
      });
    })
  }


  /**
   * Gets all Axie Sales
   */
  getAxieSales(){
    var that = this;
    var promises = [];
    this.setAppStatus({"loading": "Loading most recent block..."});
    promises.push(new Promise(function(resolve,reject){
      that.getSalesLastScannedBlockData().then(function(blockData:any){
        that.LAST_SCANNED_BLOCK = blockData.block;
        that.LAST_SCANNED_TX_INDEX = blockData.transactionIndex;
        //
        resolve({
          "lastScannedBlock": blockData.block,
          "lastScannedTransactionIndex": blockData.transactionIndex
        });
      });
    }));
    promises.push(new Promise(function(resolve,reject){
      that.getCurrentBlock().then(function(block:any){
        resolve({"currentBlock": block});
      });
    }));
    Promise.all(promises).then((data) => {
      var d:any = {};
      Object.assign(d, ...data);
      this.getAxieSalesGradually(d.lastScannedBlock, d.currentBlock);
    })
  }

  /**
   * Gets Axie Sales gradually by splitting the scan range of ~3000 blocks
   * @param lastScannedBlock {number} [last scanned block] number
   * @param currentBlock {number} [most recent block] number of the blockchain
   */
  getAxieSalesGradually(lastScannedBlock:number, currentBlock:number){
    var that = this;
    var startblock:number = lastScannedBlock;
    var endblock:number = lastScannedBlock + this.SCAN_BLOCKSTEP;
    if(startblock > currentBlock) startblock = currentBlock; //
    if(endblock > currentBlock)   endblock   = currentBlock; //
    //
    //console.log("last-scanned-block", lastScannedBlock);
    //console.log("current-block", currentBlock);
    //console.log("startblock", startblock);
    //console.log("endblock", endblock);
    //
    var newscan:any = {
      "id"          : this.scans.length+1,
      "startblock"  : startblock,
      "endblock"    : endblock,
      "status"      :"processing"
    }
    this.scans.push(newscan);
    //console.log("scans", this.scans);
    //
    this.getAxieSalesFromTo(startblock, endblock).then(function(res){
      var newLastScannedBlock = lastScannedBlock + that.SCAN_BLOCKSTEP;
      newscan.status = "completed";
      if(newLastScannedBlock < currentBlock) that.getAxieSalesGradually(newLastScannedBlock, currentBlock);
      else that.allAxiesSyncedEvent();
      newscan.expired = true;
    }).catch(function(err:any){ // error handling
      if(err.code == "TRANSACTION_FAILED") {
        //newscan.expired = true;
        //that.getAxieSales();
      }
    });
  }



  /**
   * [getAxieSalesFromTo] gets all the [AuctionSuccessfull] event transactions from the [AxieClockAuction] contract in a range
   * @param _fromblock {number} 
   * @param _toblock {number} 
   */
  getAxieSalesFromTo(_fromblock:number, _toblock:number):any {
    this.setAppStatus({
      "phase"    : "setup",
      "subphase" : "db-syncing",
      "loading"  : "Scanning Block: " + _fromblock + " - " + _toblock
    });
    var that = this;
    var AxieClockAuctionContract = web3.eth.contract(this.axie_infinity_clock_auction);
    var AxieClockAuctionAPI = AxieClockAuctionContract.at(this.axie_infinity_clock_auction_contract); //console.log(AxieClockAuctionAPI);
    // Event listening
    var auctionSuccessfulEvent = AxieClockAuctionAPI.AuctionSuccessful({},{fromBlock: _fromblock, toBlock: _toblock});
    // Promise Chain
    return new Promise(function(resolveAxieSales, rejectAxieSales){
      var start = new Promise(function(resolve,reject){ // auctionSuccessfulEvent
        auctionSuccessfulEvent.get(function(err,res){
          if(err) reject(err);
          if(res) resolve(res);
        });
      }).then(function(events:any){ //getTransaction
        console.log("evt",events);
        var promises = [];
        for(let i = 0; i < events.length; i++){
          // skip event if equal to last scanned event
          if(events[i].blockNumber      == that.LAST_SCANNED_BLOCK &&
             events[i].transactionIndex == that.LAST_SCANNED_TX_INDEX) {
             console.log("eql found", that.LAST_SCANNED_BLOCK, that.LAST_SCANNED_TX_INDEX);
             continue;
          }
          //that.logs.push(that.parseData(null, events[i]));
          var p = new Promise(function(resolve,reject){
              web3.eth["getTransaction"](events[i].transactionHash, function(err, res){
                if(err) reject(err);
                if(res) {
                  //console.log("tx res", res);
                  events[i].buyer = events[i].args._winner;
                  events[i].tokenId = events[i].args._tokenId;
                  events[i].totalPrice = events[i].args._totalPrice;
                  events[i].detailview = false;
                  //that.axie_sales_totalEth += parseFloat(events[i].totalPrice);
                  resolve(events[i]);
                }
              });
          });
          promises.push(p);
        }
        return Promise.all(promises);
      }).then(function(transactions){ //getBlock
        var promises = [];
        for(let i = 0; i < transactions.length; i++){
          //that.logs.push(that.parseData(null, transactions[i]));
          var p = new Promise(function(resolve, reject){
            web3.eth.getBlock(transactions[i].blockNumber, function(err,res){
              if(err) reject(err);
              if(res){
                transactions[i].timestamp = res.timestamp;
                transactions[i].id = i+1;
                resolve(transactions[i]);
              }
            });
          });
          promises.push(p);
        }
        return Promise.all(promises);
      }).then(function(transactions){ // getAuction
        let promises = [];
        transactions.forEach(tx => {
          let p = new Promise((resolve, reject) => {
            let tokenAddress = tx.args._nftAddress;
            let tokenId = new BigNumber(tx.args._tokenId).toNumber();
            //console.log("d", tokenAddress, tokenId);
            AxieClockAuctionAPI.getAuction(tokenAddress, tokenId, tx.blockNumber - 1, function(error, result){
              if(error) reject("getAuction error.");
              else {
                tx.seller = result[0];
                resolve(tx);
              }
            });
          }); 
          promises.push(p);
        });
        return Promise.all(promises);
        //return transactions;
      }).then(function(transactions){ // axi web api
        //console.log(transactions);
        var promises = [];
        for(let i = 0; i < transactions.length; i++){
          var p = new Promise(function(resolve, reject){
            that.http.get("https://axieinfinity.com/api/axies/" + transactions[i].tokenId).subscribe(
              (elem:any) => {
                //console.log(elem);
                switch(elem.stage){
                  case    1 : transactions[i].img = "assets/img/egg.png"; break;  
                  case    2 : transactions[i].img = "assets/img/larva.png"; break;
                  default   : transactions[i].img = elem.figure.images[transactions[i].tokenId+".png"];
                }
                transactions[i].name        = elem.name;
                transactions[i].level       = elem.level;
                transactions[i].exp         = elem.exp;
                transactions[i].title       = elem.title;
                transactions[i].stage       = elem.stage;
                transactions[i].class       = elem.class || "unknown";
                transactions[i].className   = elem.class || "-";
                transactions[i].mysticcount = 0;
                transactions[i].pureness    = 0;
                if(elem.parts) {
                  var mysticcount = 0;
                  var pureness = 0;
                  for(var j=0; j<elem.parts.length; j++){
                    if(elem.parts[j].mystic) mysticcount++;
                    if(elem.parts[j].class == elem.class) pureness++;
                  }
                  transactions[i].mysticcount = mysticcount;
                  transactions[i].pureness = pureness;
                }
                resolve(transactions[i]);
              }
            )
          });
          promises.push(p);
        }
        return Promise.all(promises);
      }).then(async function(transactions){ // save sales in DB
        //console.log("txs", transactions);
        var promises = [];
        for(let i=0; i<transactions.length; i++){
          let tx = transactions[i];
          let p = new Promise(function(resolve, reject){
            // saves sale in DB with a transaction
            that.saveSaleWithTransaction(tx).then(function(data:any){
              resolve(data);
            }).catch(function(err:any){
              reject(err);
            });
          });
          promises.push(p);
          await p;
        }
        return Promise.all(promises);
      }).then(function(data){ // all data processed and saved, resolve function
        resolveAxieSales(data);
      }).catch(function(err){ // error handling
        that.setAppStatus({"loading"  : "Error. Try again please." });
        console.log("err", err);
        rejectAxieSales(err);
      });

    });
  }

  /**
   * Saves a new [sale] with the [transactionHash] as ID in the Firebase DB
   * Additionally saves [sales count] and [sales last scanned block]
   * @demo submit firebase transaction
   * @problem is slow and eats up a lot of daily db resources
   * @param tx 
   * @param block {number} last scanned block to save in db 
   * @return {Promise} 
   */
  saveSaleWithTransaction(_tx){
    var that = this;
    console.log("new tx", _tx);
    //
    var newSaleData:any = {
      "axie_id"         : new BigNumber(_tx.tokenId).toNumber(),
      "buyer"           : _tx.buyer,
      "seller"          : _tx.seller,
      "price"           : new BigNumber(_tx.totalPrice).toNumber(),
      "name"            : _tx.name,
      "title"           : _tx.title,
      "level"           : _tx.level,
      "exp"             : _tx.exp,
      "mystic_count"    : _tx.mysticcount,
      "pureness"        : _tx.pureness,
      "class"           : _tx.class,
      "class_name"      : _tx.className,
      "stage"           : _tx.stage,
      "img"             : _tx.img,
      "timestamp"       : _tx.timestamp,
      "tx"              : _tx.transactionHash,
      "tx_index"        : _tx.transactionIndex,
      "block_number"    : _tx.blockNumber,
      "block_hash"      : _tx.blockHash,
      "event"           : _tx.event,
      "contractAddress" : _tx.address,
      "tokenAddress"    : _tx.args._nftAddress
    };
    // db references
    var salesCountRef = that.DB.doc("sales-metadata/sales-count");
    var salesTotalEthRef = that.DB.doc("sales-metadata/sales-total-eth");
    var salesLastScannedRef = that.DB.collection("sales-metadata").doc("sales-last-scanned");
    var newSaleRef = that.DB.collection("sales").doc(_tx.transactionHash);
    // sale transaction
    return that.DB.runTransaction(function(transaction) {
      return transaction.get(salesCountRef).then(function(salesCountDoc) {
        return transaction.get(salesTotalEthRef).then(function(salesTotalEth) {
          return transaction.get(salesLastScannedRef).then(function(salesLastScanned){
            if (!salesCountDoc.exists) {
              throw "Sales Count does not exist!";
            }
            //console.log("block", _tx.blockNumber, salesLastScanned.data().block);
            //console.log("tx_index", _tx.transactionIndex, salesLastScanned.data().transactionIndex);
            
            // checking for concurrent sale writing by multiple users
            // check #1 if the [current block] is higher than the [last scanned block] 
            // check #2 if [current block] equals last scanned then check if [transaction index] is higher than [last scanned transaction index]
            if(_tx.blockNumber > salesLastScanned.data().block ||
              _tx.blockNumber == salesLastScanned.data().block &&
              _tx.tx_index != salesLastScanned.data().transactionIndex) {
              // data
              newSaleData.id = salesCountDoc.data().count + 1;
              console.log("sales count: " +salesCountDoc.data().count);
              // update db
              transaction.set(
                newSaleRef, newSaleData
              );
              transaction.update(
                salesCountRef, {
                count: salesCountDoc.data().count + 1 
              });
              transaction.update(
                salesTotalEthRef, {
                value: (salesTotalEth.data().value + newSaleData.price) || 0
              });
              transaction.update(
                salesLastScannedRef, { 
                block: _tx.blockNumber, 
                transactionIndex : _tx.transactionIndex 
              });
              return newSaleData.axie_id;
            }
            else {
              that.setAppStatus({"loading": "Concurrent Syncing Error: Retrying ..."});
              throw "error: concurrent syncing error.";
            }
          });
        });
      });
    }).then(function(data) {
      console.log("new sale ADDED ", data);
      that.setAppStatus({"loading": "Syncing Axie: #" + new BigNumber(_tx.tokenId).toNumber()});
    }).catch(function(error) {
      console.log("Transaction failed: ", error);
      throw {"error" : true, "code": "TRANSACTION_FAILED"};
    });

  }

  /**
   * Saves a new [sale] with the [transactionHash] as ID in the Firebase DB
   * @param tx {Sale-Object} [Sale] Transaction/Event/Object with price, buyer, tx, axie information
   */
  saveSale(tx){
    //console.log("tx", tx);
    var that = this;
    var newSale = {
      "axie_id"     : new BigNumber(tx.tokenId).toNumber(),
      "buyer"       : tx.buyer,
      "price"       : new BigNumber(tx.totalPrice).toNumber(),
      "mystic_count": tx.mysticcount,
      "class"       : tx.class,
      "class_name"  : tx.className,
      "stage"       : tx.stage,
      "img"         : tx.img,
      "timestamp"   : tx.timestamp,
      "tx"          : tx.transactionHash,
      "tx_index"    : tx.transactionIndex,
      "block_number": tx.blockNumber,
      "block_hash"  : tx.blockHash,
      "event"       : tx.event
    };
    return new Promise(function(resolve,reject){
      that.DB.collection("sales").doc(tx.transactionHash).set(newSale).then(function(data:any) {
        resolve(data);
        console.log(newSale + " new sale ADDED");
        that.setAppStatus({"loading" : "Axie syncing: #" + new BigNumber(tx.tokenId).toNumber()});
      })
      .catch(function(error) {
        reject(error);
        console.error("Error writing document: ", error);
      });
    });
  }

  /**
   * Saves the last scanned block in DB
   * @param block {number} last scanned block to save in db 
   * @param transactionIndex {number} last scanned transaction index
   * @return {Promise}  
   */
  saveSalesLastScannedBlock(_block, _transactionIndex){
    var that = this;
    return new Promise(function(resolve, reject){
      that.DB.collection("sales-metadata").doc("sales-last-scanned").set({
        block: _block,
        transactionIndex : _transactionIndex 
      })
      .then(function(data:any) {
        resolve(data);
        console.log(_block + " last scanned block UPDATED!");
      })
      .catch(function(error) {
        reject(error);
        console.error("Error writing document: ", error);
      });
    });
  }


  /**
   * Updates the [sales counter] in DB
   * @return {Promise}
   */
  updateSalesCounter(){
    var that = this;
    var salesCountRef = that.DB.doc("sales-metadata/sales-count");
    return new Promise((resolve, reject) => {
      salesCountRef.get().then(function(salesCountDoc){
        //
        that.DB.doc("sales-metadata/sales-count").update(
          "count", salesCountDoc.data().count + 1
        ).then((res) => {
          resolve(salesCountDoc.data().count + 1);
        })
      });
    });

  }

  /**
   * @event allAxiesSynced fired when all the unscanned blocks are checked for sale events and all data is saved in DB 
   */
  allAxiesSyncedEvent(){
    console.log("All Axies synced");
    this.loadAxiesFromDB();
  }


  /**
   * @todo
   * @param _params
   * @param orderBy {Object} ordering for example {"prop": "price", "mode": "asc"}
   * @param where {Object} {"prop": "pureness", "val": 3}
   * @param startAfter {Object} data cursor start 
   * @param limit {Number} limit records 
   */
  setQueryOptions(_params:any = {}){
    if('orderBy' in _params)      this.queryOptions.orderBy     = _params["orderBy"];
    if('where' in _params)        this.queryOptions.where       = _params["where"];
    if('startAfter' in _params)   this.queryOptions.startAfter  = _params["startAfter"];
    if('limit' in _params)        this.queryOptions.limit       = _params["limit"];
    //console.log(this.setQueryOptions);
  }

  /**
   * Resets query options by setting "where", "sorting", "orderBy" to NULL
   */
  resetQueryOptions(){
    this.disable_single_sortings = false;
    this.current_filtering = {};
    this.current_ordering = {};
    this.setQueryOptions({"where" : null, "sorting":null, "startAfter": null, "orderBy": null});
  }
  

  /**
   * loads all Axies from Firebase DB
   * @return {Promise} promise which yields DB result
   */ 
  loadAxiesFromDB(_loadMode:string = "RESET"){
    console.log("query options:", this.queryOptions);
    var that = this;
    that.setAppStatus({"loading": "."});
    let _o = this.queryOptions;
    // prepare data
    var orderBy:any = _o.orderBy || {"prop":"timestamp", "mode":"desc"};
    if(_o.reverseOrder) orderBy.mode = orderBy.mode == "desc" ? "asc" : "desc";
    var queryBase = this.DB.collection("sales");
    var query = queryBase.orderBy(orderBy.prop, orderBy.mode);
    if(_o.where)      query = query.where(_o.where.prop, "==", _o.where.val);
    if(_o.startAfter) query = query.startAfter(_o.startAfter);
    if(_o.limit)      query = query.limit(_o.limit);
    // load pagination and sales
    console.log(query);
    return this.loadPaginationData().then(function(data){
      return data;
    }).then(function(data){
      return query.get().then((salesSnap) => {
        that.previous_first_sale = salesSnap.docs[0];
        that.previous_last_sale = salesSnap.docs[salesSnap.docs.length-1];
        //console.log("res", querySnapshot);
        if(_loadMode == "RESET") that.axie_sales = [];
        that.axie_sales_totalEth = 0;
        salesSnap.forEach((sale) => {
          var additionalProperties = {
            "detailview" : false
          };
          var mySale:any = {...sale.data(), ...additionalProperties};
          //console.log("sale", mySale);
          that.axie_sales.push(mySale);
          that.axie_sales_totalEth += mySale.price;
        });
        that.axie_sales_backup = that.axie_sales;
        that.allAxiesLoadedEvent();
        console.log("axie sales", that.axie_sales);
        // end consequence handling
        if(!_o.startAfter) that.scrolling_end_reached = false; 
        //
        return salesSnap;
      });
    });
  }

  /**
   * @event allAxiesLoaded fired when all Axies have loaded from the Firebase DB
   */
  allAxiesLoadedEvent(){
    this.setAppStatus({"phase": "init", "loading" : ""});
    console.log("all axies loaded", this.APP_STATUS);
  }


}
