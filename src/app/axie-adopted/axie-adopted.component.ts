import { Component, OnInit } from '@angular/core';
import {NgZone} from'@angular/core';

declare let web3:any;

@Component({
  selector: 'app-axie-adopted',
  templateUrl: './axie-adopted.component.html',
  styleUrls: ['./axie-adopted.component.css']
})
export class AxieAdoptedComponent implements OnInit {


  /* AxiePresaleExtended */
  axie_infinity_presale_extended:Array<object> = [{constant:!0,inputs:[{name:"",type:"uint8"}],name:"priceIncrement",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"INITIAL_PRICE_INCREMENT",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"contractAddr",type:"address"}],name:"reclaimContract",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[],name:"unpause",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"CLASS_BEAST",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"redemptionAddress",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"numBountyCredits",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"paused",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"presaleContract",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"INITIAL_PRICE",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"CLASS_PLANT",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"",type:"uint8"}],name:"currentPrice",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"pause",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"owner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"PRESALE_END_TIMESTAMP",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"REF_CREDITS_PER_AXIE",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"MAX_TOTAL_ADOPTED_AXIES",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"CLASS_AQUATIC",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[],payable:!0,stateMutability:"payable",type:"constructor"},{payable:!0,stateMutability:"payable",type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"_adopter",type:"address"},{indexed:!0,name:"_class",type:"uint8"},{indexed:!1,name:"_quantity",type:"uint256"},{indexed:!0,name:"_referrer",type:"address"}],name:"AxiesAdopted",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_receiver",type:"address"},{indexed:!1,name:"_quantity",type:"uint256"}],name:"AxiesRewarded",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_receiver",type:"address"},{indexed:!0,name:"_class",type:"uint8"},{indexed:!1,name:"_quantity",type:"uint256"}],name:"AdoptedAxiesRedeemed",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_receiver",type:"address"},{indexed:!1,name:"_quantity",type:"uint256"}],name:"RewardedAxiesRedeemed",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_receiver",type:"address"},{indexed:!1,name:"_numMintedCredits",type:"uint256"}],name:"RefCreditsMinted",type:"event"},{anonymous:!1,inputs:[],name:"Pause",type:"event"},{anonymous:!1,inputs:[],name:"Unpause",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"previousOwner",type:"address"},{indexed:!0,name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{constant:!1,inputs:[],name:"reclaimEther",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_presaleAddress",type:"address"}],name:"initialize",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_redemptionAddress",type:"address"}],name:"setRedemptionAddress",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"_class",type:"uint8"},{name:"_deduction",type:"bool"}],name:"totalAdoptedAxies",outputs:[{name:"_number",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"},{name:"_class",type:"uint8"},{name:"_deduction",type:"bool"}],name:"numAdoptedAxies",outputs:[{name:"_number",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"},{name:"_deduction",type:"bool"}],name:"numRefCredits",outputs:[{name:"_number",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_deduction",type:"bool"}],name:"totalRewardedAxies",outputs:[{name:"_number",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"},{name:"_deduction",type:"bool"}],name:"numRewardedAxies",outputs:[{name:"_number",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_beastQuantity",type:"uint256"},{name:"_aquaticQuantity",type:"uint256"},{name:"_plantQuantity",type:"uint256"}],name:"axiesPrice",outputs:[{name:"_totalPrice",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_beastQuantity",type:"uint256"},{name:"_aquaticQuantity",type:"uint256"},{name:"_plantQuantity",type:"uint256"},{name:"_referrer",type:"address"}],name:"adoptAxies",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[{name:"_receiver",type:"address"},{name:"_numMintedCredits",type:"uint256"}],name:"mintRefCredits",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_receiver",type:"address"},{name:"_beastQuantity",type:"uint256"},{name:"_aquaticQuantity",type:"uint256"},{name:"_plantQuantity",type:"uint256"}],name:"redeemAdoptedAxies",outputs:[{name:"",type:"uint256"},{name:"",type:"uint256"},{name:"",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_receiver",type:"address"},{name:"_quantity",type:"uint256"}],name:"redeemRewardedAxies",outputs:[{name:"_remainingQuantity",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"function"}];

  /* AxiePresaleExtended Contract */
  axie_infinity_presale_extended_contract:string = "0x3d5be9a472d6b5c8d45b4b3a3bffb80e0c52ef15";



  /* AxieRedemption */
  axie_infinity_axie_redemption:Array<object> = [{constant:!0,inputs:[],name:"CLASS_REPTILE",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_receiver",type:"address"}],name:"redeemPlayersRewardedAxies",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"remaining",type:"uint256"}],name:"reclaimEther",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_oldClass",type:"uint256"}],name:"redeemAdoptedAxies",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"_receiver",type:"address"},{name:"_class",type:"uint256"}],name:"numBeingRedeemedAxies",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"contractAddr",type:"address"}],name:"reclaimContract",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"ownedRedemptionIndex",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_receiver",type:"address"},{name:"_oldClass",type:"uint256"}],name:"redeemPlayersAdoptedAxies",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"CLASS_BIRD",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"unpause",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"CLASS_BEAST",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"CLASS_BUG",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"paused",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"presaleContract",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"CLASS_PLANT",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"pause",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"owner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"redeemRewardedAxies",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"redemptionByQueryId",outputs:[{name:"receiver",type:"address"},{name:"clazz",type:"uint256"},{name:"redeemedAt",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"",type:"address"},{name:"",type:"uint256"},{name:"",type:"uint256"}],name:"ownedRedemptions",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_presaleAddress",type:"address"}],name:"setPresaleContract",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_oldQueryId",type:"uint256"},{name:"_gasLimit",type:"uint256"}],name:"retryRedemption",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"CLASS_AQUATIC",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_coreAddress",type:"address"}],name:"setCoreContract",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"coreContract",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{payable:!0,stateMutability:"payable",type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"_queryId",type:"uint256"}],name:"RedemptionStarted",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_queryId",type:"uint256"},{indexed:!0,name:"_oldQueryId",type:"uint256"}],name:"RedemptionRetried",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_queryId",type:"uint256"}],name:"RedemptionFinished",type:"event"},{anonymous:!1,inputs:[],name:"Pause",type:"event"},{anonymous:!1,inputs:[],name:"Unpause",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"previousOwner",type:"address"},{indexed:!0,name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{constant:!1,inputs:[{name:"_queryId",type:"bytes32"},{name:"_result",type:"string"}],name:"__callback",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"myid",type:"bytes32"},{name:"result",type:"string"},{name:"proof",type:"bytes"}],name:"__callback",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"}];

  /* AxieRedemption Contract */
  axie_infinity_axie_redemption_contract:string =  "0xf78dBC37A67018dB6F823Ec5090D7EEdD5bab6fD";



  /* SaleClockAuction */
  cryptokitties_sale_clock_auction:Array<object> = [{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"},{"name":"_seller","type":"address"}],"name":"createAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"bid","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lastGen0SalePrices","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getAuction","outputs":[{"name":"seller","type":"address"},{"name":"startingPrice","type":"uint256"},{"name":"endingPrice","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"startedAt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerCut","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isSaleClockAuction","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"cancelAuctionWhenPaused","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gen0SaleCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"cancelAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getCurrentPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nonFungibleContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"averageGen0SalePrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_nftAddr","type":"address"},{"name":"_cut","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"startingPrice","type":"uint256"},{"indexed":false,"name":"endingPrice","type":"uint256"},{"indexed":false,"name":"duration","type":"uint256"}],"name":"AuctionCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"totalPrice","type":"uint256"},{"indexed":false,"name":"winner","type":"address"}],"name":"AuctionSuccessful","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"AuctionCancelled","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];

  /* SaleClockAuction Contract */
  cryptokitties_sale_clock_auction_contract:string = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C";

  axies_adopted:Array<any> = [];


  scan_EARLIEST_BLOCK:number = 5400000;
  scan_BLOCK_STEP:number = 5000;



  constructor(private ngZone:NgZone) {}

  ngOnInit() {
    this.connectToContract();
  }

  connectToContract():void {
    var contract = web3.eth.contract(this.axie_infinity_presale_extended);
    var API = contract.at(this.axie_infinity_presale_extended_contract);
    var that = this;
    //
    web3.eth.getBlockNumber(function(err,res){
      that.getEventsGradually(API, "AxiesAdopted", res);
    });
  }

  getEventsGradually(API:any, _event:any, _currentBlock:number):void {
    var that = this;
    //
    var startblock = _currentBlock - this.scan_BLOCK_STEP;
    var endblock   = _currentBlock;
    //
    this.getEventData(API, _event, startblock, endblock).then(function(events){
      console.log("evt",events);
      that.axies_adopted = that.axies_adopted.concat(events);
      that.ngZone.run(()=>{});
      if(_currentBlock > that.scan_EARLIEST_BLOCK) {
        that.getEventsGradually(API, _event, _currentBlock);
      }
    });
  }

  getEventData(API:any, eventName:string, _fromBlock:any, _toBlock:any):any {
    return new Promise(function(resolve, reject){
      API[eventName]({}, {fromBlock:_fromBlock, toBlock:_toBlock}).get(function(err,res){
        if(err) reject(err);
        else resolve(res);
      });
    });
  }


  parseData(data:any):any {
    return JSON.stringify(data);
  }

}
