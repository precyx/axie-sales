import { Component, OnInit } from '@angular/core';
//import { BigNumber }         from "bignumber.js";
//
import { NgZone } from '@angular/core';
import { NgModel } from '@angular/forms';

declare let web3:any;

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


  axie_infinity_clock_auction_contract:string = "0xf4985070ce32b6b1994329df787d1acc9a2dd9e2";

  /* AxieClockAuction */
  axie_infinity_clock_auction:Array<object> = [{constant:!1,inputs:[],name:"unpause",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"",type:"address"},{name:"",type:"uint256"}],name:"auctions",outputs:[{name:"seller",type:"address"},{name:"startingPrice",type:"uint128"},{name:"endingPrice",type:"uint128"},{name:"duration",type:"uint64"},{name:"startedAt",type:"uint64"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"paused",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"ownerCut",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"pause",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"owner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"reclaimEther",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[{name:"_ownerCut",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},{payable:!1,stateMutability:"nonpayable",type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"_nftAddress",type:"address"},{indexed:!0,name:"_tokenId",type:"uint256"},{indexed:!1,name:"_startingPrice",type:"uint256"},{indexed:!1,name:"_endingPrice",type:"uint256"},{indexed:!1,name:"_duration",type:"uint256"}],name:"AuctionCreated",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_nftAddress",type:"address"},{indexed:!0,name:"_tokenId",type:"uint256"},{indexed:!1,name:"_totalPrice",type:"uint256"},{indexed:!1,name:"_winner",type:"address"}],name:"AuctionSuccessful",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_nftAddress",type:"address"},{indexed:!0,name:"_tokenId",type:"uint256"}],name:"AuctionCancelled",type:"event"},{anonymous:!1,inputs:[],name:"Pause",type:"event"},{anonymous:!1,inputs:[],name:"Unpause",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"previousOwner",type:"address"},{indexed:!0,name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{constant:!0,inputs:[{name:"_nftAddress",type:"address"},{name:"_tokenId",type:"uint256"}],name:"getAuction",outputs:[{name:"seller",type:"address"},{name:"startingPrice",type:"uint256"},{name:"endingPrice",type:"uint256"},{name:"duration",type:"uint256"},{name:"startedAt",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_nftAddress",type:"address"},{name:"_tokenId",type:"uint256"}],name:"getCurrentPrice",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_nftAddress",type:"address"},{name:"_tokenId",type:"uint256"},{name:"_startingPrice",type:"uint256"},{name:"_endingPrice",type:"uint256"},{name:"_duration",type:"uint256"}],name:"createAuction",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_nftAddress",type:"address"},{name:"_tokenId",type:"uint256"}],name:"bid",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[{name:"_nftAddress",type:"address"},{name:"_tokenId",type:"uint256"}],name:"cancelAuction",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_nftAddress",type:"address"},{name:"_tokenId",type:"uint256"}],name:"cancelAuctionWhenPaused",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"}];


  /* output logs */
  logs:any = [];

  /* web3 input data */
  tx_getTransaction:any            = "0xd4466b1a45549ef138644520e8e58c7fe3c49e3b628dce30dde5f706418dd437";
  addr_getTransactionCount:any     = "0x653cd961Ed568b49DfD86048cF54ccE163edb780";
  addr_getcode:string              = "0xc6689eb9a6d724b8d7b1d923ffd65b7005da1b62";
  tx_getTransactionReceipt:string  = "0xd4466b1a45549ef138644520e8e58c7fe3c49e3b628dce30dde5f706418dd437";

  /* states */
  loading_state:string = "";

  /* Axie Sales Data*/
  axie_sales:Array<any> = [];

  /* Detail Log */
  detailLogViewFlag:boolean = false;
  currentLog:Array<any> = [];
  currentLogId:any;

  constructor(private _ngZone:NgZone) {

  }

  ngOnInit() {
    var that = this;
    //
    var AxieClockAuctionContract = web3.eth.contract(this.axie_infinity_clock_auction);
    var AxieClockAuctionAPI = AxieClockAuctionContract.at(this.axie_infinity_clock_auction_contract);
    console.log(AxieClockAuctionAPI);
    // Event listening
    var auctionSuccessfulEvent = AxieClockAuctionAPI.AuctionSuccessful({},{fromBlock: 5008826, toBlock: 'latest'});
    auctionSuccessfulEvent.get(function(err,res){
      if(!err) {
        that.axie_sales = res;
      }
      console.log("axie sales", that.axie_sales);
    });
    /*auctionSuccessfulEvent.watch(function(err,res){
      console.log("watch", that.parseResult(err,res) );
    });*/
  }

  closeLogDetailView():void {
    this.detailLogViewFlag = false;
  }

  viewLog(id:any, log:any):void {
    this.detailLogViewFlag = true;
    var logObject = JSON.parse(log);
    this.currentLog = Object.keys(logObject).map(key => ({ key, value: logObject[key] }));
    console.log("log",this.currentLog);
    this.currentLogId = id;
  }

  getTransaction():void {
    this.callWeb3("getTransaction", [this.tx_getTransaction], this);
  }

  getTransactionCount():void {
    this.callWeb3("getTransactionCount", [this.addr_getTransactionCount], this);
  }

  getBlockNumber():void {
    this.callWeb3("getBlockNumber", [], this);
  }

  getCode():void {
    this.callWeb3("getCode", [this.addr_getcode], this);
  }

  getTransactionReceipt():void {
    this.callWeb3("getTransactionReceipt", [this.tx_getTransactionReceipt], this);
  }



  web3Filter():void {
    web3.eth.filter({
      "address": "0xE293390d7651234c6DFB1f41a47358B9377C004F",
      "topics" : ["0xafab0050c4e891a377c049f2e95ae7dd9009e7ec00f0b5b85550f7507b950695"]
    }, function(err,res){
      console.log("x");
      console.log(err,res);
    });

    /*var filter = web3.eth.filter('pending');
    filter.watch(function (error, log) {
      console.log(log); //  {"address":"0x0000000000000000000000000000000000000000","data":"0x0000000000000000000000000000000000000000000000000000000000000000", ...}
    });*/
  }




  callWeb3(fname:string, params:Array<any>, that:any):void {
    that.loading_state = "loading";
    var f:any = function(err, res){
      that.logs.push(that.parseResult(err,res));
      that.loading_state = "";
      that._ngZone.run(()=>{});
    };
    var p = params;
    p.push(f);
    web3.eth[fname].apply(that, p);
  }



  parseResult(err, res):any {
    console.log(err,res);
    if(err) return "Error";
    var out = res;
    if(!out) out = "empty";
    //if(BigNumber.isBigNumber(out)) out.toNumber();
    if(out.constructor === Array) out = JSON.stringify(out);
    if(out != null && typeof out === 'object') out = JSON.stringify(out);
    //
    return out;
  }

}
