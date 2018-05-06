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

import { BigNumber }         from "big-number";

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
  axie_sales_state:string = "";

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


  constructor(
    private timeAgoService:TimeagoService,
    private _ngZone:NgZone,
    private http: HttpClient,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ){
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/search.svg'));
  }

  ngOnInit() {
    var that = this;
    this.getBlockData().then(function(blocknumber){
        that.getAxieSalesGradually(blocknumber);
    })
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


  getBlockData():any{
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


  getAxieSalesGradually(blocknumber:number){
    var that = this;
    var startblock:number = blocknumber - this.SCAN_BLOCKSTEP;
    var endblock:number = blocknumber;
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
    this.getAxieSales(startblock, endblock).then(function(elem){
      //console.log("res",elem);
      var newblocknumber = blocknumber - that.SCAN_BLOCKSTEP;
      newscan.status = "completed";
      if(blocknumber > that.SCAN_MINBLOCK) {
          window.setTimeout(function(){
          that.getAxieSalesGradually(newblocknumber);
          },3000)
      }
      newscan.expired = true;
    });
  }

  scanForNewAxieSales():void {

  }


  /**
   * [getAxieSales] gets all the [AuctionSuccessfull] event transactions from the [AxieClockAuction] contract
   */
  getAxieSales(fromblock:number, toblock:number):any {
    this.axie_sales_state = "loading";
    var that = this;
    var AxieClockAuctionContract = web3.eth.contract(this.axie_infinity_clock_auction);
    var AxieClockAuctionAPI = AxieClockAuctionContract.at(this.axie_infinity_clock_auction_contract);
    //console.log(AxieClockAuctionAPI);
    // Event listening
    var auctionSuccessfulEvent = AxieClockAuctionAPI.AuctionSuccessful({},{fromBlock: fromblock, toBlock: toblock});
    // Promise Chain
    return new Promise(function(resolve,reject){ // auctionSuccessfulEvent
      auctionSuccessfulEvent.get(function(err,res){
        if(err) reject(err);
        if(res) resolve(res);
      });
    }).then(function(events:any){ //getTransaction
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
                that.axie_sales_totalEth += parseFloat(events[i].totalPrice);
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
      that.axie_sales = that.axie_sales.concat(transactions);
      that.axie_sales_backup = that.axie_sales;
      that.axie_sales_state = "";
      that.scanForNewAxieSales();
      //console.log("tx", transactions);
      return transactions;
    }).then(function(transactions){ // axi web api
      //console.log(transactions);
      for(let i = 0; i < transactions.length; i++){
          that.http.get("https://axieinfinity.com/api/axies/" + transactions[i].tokenId).subscribe(
            (elem:any) => {
              console.log(elem);
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
                console.log(transactions[i].mysticcount);
              }
              else transactions[i].mysticcount = 0;
            }
          )
      }
    }).catch(function(err){
      that.axie_sales_state = "error";
      console.log("err",err);
    });
  }


}
