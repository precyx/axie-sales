import { Component, OnInit } from '@angular/core';
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

import {MatProgressSpinnerModule} from '@angular/material';

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
  axie_sales_state:string = "boot-up";

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


  /* sorting */
  sorting_var:string = "timestamp";
  sorting_types:object = {"timestamp":"-"};

  /* search */
  search_query:string = "";

  /* DB */
  DB:FirebaseFirestore;

  /* Spinner */
  spinnerColor = "primary";
  spinnerMode = "indeterminate";
  spinnerDiameter = 35;


  constructor(
    private timeAgoService:TimeagoService,
    private _ngZone:NgZone,
    private http: HttpClient,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private db: AngularFirestore
  ){
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/search.svg'));
    this.DB = db.firestore;
  }

  ngOnInit() {
    var that = this;
   /* this.getCurrentBlock().then(function(blocknumber){
        that.getAxieSalesGradually(blocknumber);
    });*/
    this.getAxieSales();
  }

  /**
   * @return {Promise} returns a promise which yields the last scanned block
   */
  getSalesLastScannedBlock(){
    var that = this;
    var p = new Promise(function(resolve,reject){
      that.DB.collection("sales-metadata").doc("sales-last-scanned").get().then((doc) => {
        if (doc.exists) {
          resolve(doc.data().block);
        }
      });
    });
    return p;
  }

  readFirebase(){
    console.log(this.DB);
    // read all entries
    this.DB.collection("sales").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
  }

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

  searchAxieSales():void {
    var that = this;
    this.axie_sales = this.axie_sales_backup;
    //console.log(that.search_query);
    this.axie_sales = this.axie_sales.filter(
      elem => elem.buyer.indexOf(that.search_query) !== -1 ||
              elem.transactionHash.indexOf(that.search_query) !== -1
    );
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

  setSorting(e:any, val:string){
    var elem;
    if($(e.target).hasClass("header_cell")) elem = e.target;
    else elem = $(e.target).parents(".header_cell")[0];
    //
    this.sorting_var = val;
    if(!this.sorting_types[val]) this.sorting_types[val] = "";
    //
    $(".header_cell").attr("data-sorting","");
    if     (this.sorting_types[val] == "")  { $(elem).attr("data-sorting", "asc"); this.sorting_types[val] = "+"; }
    else if(this.sorting_types[val] == "+") { $(elem).attr("data-sorting", "desc"); this.sorting_types[val] = "-"; }
    else if(this.sorting_types[val] == "-") { $(elem).attr("data-sorting", "asc"); this.sorting_types[val] = "+"; }
    //
    //this._ngZone.run(()=>{});
  }

  getCurrentSorting():string{
    var sorting:string = this.sorting_types[this.sorting_var] + this.sorting_var;
    if(this.sorting_var == "type") sorting = this.sorting_types[this.sorting_var] + this.sorting_var + ", '+price'";
    return sorting;
  }

  getSorting(name:string):string{
    var sorting = this.sorting_types[name];
    if (sorting == "+") sorting = "asc";
    else if(sorting == "-") sorting = "desc";
    else sorting = "";
    return sorting;
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
    promises.push(new Promise(function(resolve,reject){
      that.getSalesLastScannedBlock().then(function(block:any){
        resolve({"lastScannedBlock": block});
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
   * Gets Axie Sales gradually by splitting the scan range in ~3000 blocks
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
    console.log("last-scanned-block", lastScannedBlock);
    console.log("current-block", currentBlock);
    console.log("startblock", startblock);
    console.log("endblock", endblock);
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
      //console.log("res",res);
      var newLastScannedBlock = lastScannedBlock + that.SCAN_BLOCKSTEP;
      newscan.status = "completed";
      if(newLastScannedBlock < currentBlock) {
        //window.setTimeout(function(){
          that.getAxieSalesGradually(newLastScannedBlock, currentBlock);
        //},3000)
      }
      else that.allAxiesSyncedEvent();
      newscan.expired = true;
    });
  }



  /**
   * [getAxieSalesFromTo] gets all the [AuctionSuccessfull] event transactions from the [AxieClockAuction] contract in a range
   * @param _fromblock {number} 
   * @param _toblock {number} 
   */
  getAxieSalesFromTo(_fromblock:number, _toblock:number):any {
    this.axie_sales_state = "db-syncying";
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
          //that.logs.push(that.parseData(null, events[i]));
          var p = new Promise(function(resolve,reject){
              web3.eth["getTransaction"](events[i].transactionHash, function(err,res){
                if(err) reject(err);
                if(res) {
                  //console.log(res);
                  events[i].seller = res.from;
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
      }).then(function(transactions){ // render elems
        /*that.axie_sales = that.axie_sales.concat(transactions);
        that.axie_sales_backup = that.axie_sales;
        that.axie_sales_state = "";*/
        //console.log("tx", transactions);
        return transactions;
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
                transactions[i].stage = elem.stage;
                transactions[i].class = elem.class || "unknown";
                transactions[i].className = elem.class || "-";
                if(elem.parts) {
                  var mysticcount = 0;
                  for(var j=0; j<elem.parts.length; j++){
                    if(elem.parts[j].mystic) mysticcount++;
                  }
                  transactions[i].mysticcount = mysticcount;
                  //console.log(transactions[i].mysticcount);
                }
                else transactions[i].mysticcount = 0;
                resolve(transactions[i]);
              }
            )
          });
          promises.push(p);
        }
        return Promise.all(promises);
      }).then(function(transactions){ // save sales in DB
        //console.log("txs", transactions);
        var promises = [];
        transactions.forEach(tx => {
          let p = new Promise(function(resolve, reject){
            // save sales
            //...
            /*that.saveSale(tx).then(function(res){
            });*/
            that.saveSale(tx).then(function(){
              that.saveSalesLastScannedBlock(tx.blockNumber).then(function(block){
                resolve(block);
              });
            });
            // save blocknumber
          });
          promises.push(p);
        });
        return Promise.all(promises);
      }).then(function(data){ // save last scanned block in DB
        return( new Promise(function(resolve,reject){
          that.saveSalesLastScannedBlock(_toblock).then(function(block){
            resolve(data);
          });
        }));
      }).then(function(data){ // all data processed and saved, resolve function
        resolveAxieSales(data);
      }).catch(function(err){
        that.axie_sales_state = "error";
        console.log("err",err);
      });

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
   * @return {Promise}  
   */
  saveSalesLastScannedBlock(block){
    var that = this;
    return new Promise(function(resolve, reject){
      that.DB.collection("sales-metadata").doc("sales-last-scanned").set({
        block: block,
      })
      .then(function(data:any) {
        resolve(data);
        console.log(block + " last scanned block UPDATED!");
      })
      .catch(function(error) {
        reject(error);
        console.error("Error writing document: ", error);
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
   * loads all Axies from Firebase DB
   */
  loadAxiesFromDB(){
    var that = this;
    this.axie_sales_state = "loading-from-db";
    this.DB.collection("sales").get().then((querySnapshot) => {
      //console.log("res", querySnapshot);
      querySnapshot.forEach((sale) => {
        var additionalProperties = {
          "detailview" : false
        };
        var mySale:any = {...sale.data(), ...additionalProperties};
        //console.log("sale", mySale);
        that.axie_sales.push(mySale);
        that.axie_sales_totalEth += mySale.price;
      });
      that.axie_sales_state = "";
      console.log("sl", that.axie_sales);
    });
  }


}
