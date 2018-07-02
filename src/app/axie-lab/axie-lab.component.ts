import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';

import {TimeagoService} from '../services/timeago.service';
import { BigNumber }         from "bignumber.js";

import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { VersionManagerService } from '../services/version-manager.service';

declare let web3:any;

@Component({
  selector: 'app-axie-lab',
  templateUrl: './axie-lab.component.html',
  styleUrls: ['./axie-lab.component.css']
})
export class AxieLabComponent implements OnInit {

  /* contract data */
  axie_eggshop:string = "0xeba02cfc36c01acbe10f6bcb909b76749e54956a";
  axie_eggshop_abi:Array<object> = [{"constant":true,"inputs":[],"name":"nextEggPricePercentage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_pawnPercentage","type":"uint256"},{"name":"_knightPercentage","type":"uint256"},{"name":"_bishopPercentage","type":"uint256"},{"name":"_rookPercentage","type":"uint256"},{"name":"_queenPercentage","type":"uint256"},{"name":"_kingPercentage","type":"uint256"}],"name":"setReferralPercentage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_minEggPrice","type":"uint256"}],"name":"setMinEggPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"affiliateRegistryContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"eggCoinContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_incubatorContract","type":"address"}],"name":"setIncubatorContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_nextEggPricePercentage","type":"uint256"}],"name":"setNextEggPercentage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_rank","type":"uint256"}],"name":"getReferralPercentage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"submittedForClose","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LOWEST_AFFILIATE_RANK","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NUM_EGG_COINS_PER_AXIEEGG","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"eggSale","outputs":[{"name":"startingPrice","type":"uint256"},{"name":"startDate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"AFFILIATE_RANK_KNIGHT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"AFFILIATE_RANK_KING","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_indices","type":"uint256[]"}],"name":"submitEggSalesForClose","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_affiliateRegistryContract","type":"address"}],"name":"setAffiliateRegistryContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"AFFILIATE_RANK_BISHOP","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getEggSale","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"","type":"uint256"},{"name":"_erc20Address","type":"address"},{"name":"","type":"bytes"}],"name":"receiveApproval","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"eggGenePoolContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getEggPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reclaimEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_index","type":"uint256"},{"name":"_referrer","type":"address"}],"name":"buyEgg","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"minEggPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"AFFILIATE_RANK_PAWN","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_eggGenePoolContract","type":"address"}],"name":"setEggGenePoolContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"AFFILIATE_RANK_ROOK","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_indices","type":"uint256[]"},{"name":"_startingPrice","type":"uint256"}],"name":"openEggSales","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"incubatorContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_eggCoinContract","type":"address"}],"name":"setEggCoinContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"HIGHEST_AFFILIATE_RANK","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"AFFILIATE_RANK_QUEEN","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_affiliateRegistryContract","type":"address"},{"name":"_incubatorContract","type":"address"},{"name":"_eggGenePoolContract","type":"address"},{"name":"_eggCoinContract","type":"address"},{"name":"_minEggPrice","type":"uint256"},{"name":"_nextEggPricePercentage","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_index","type":"uint256"},{"indexed":false,"name":"_startingPrice","type":"uint256"},{"indexed":false,"name":"_startDate","type":"uint256"}],"name":"EggReplenished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_index","type":"uint256"},{"indexed":true,"name":"_buyer","type":"address"},{"indexed":true,"name":"_referrer","type":"address"},{"indexed":false,"name":"_price","type":"uint256"}],"name":"EggBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_receiver","type":"address"}],"name":"EggRedeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_index","type":"uint256"}],"name":"EggSaleSubmittedForClose","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_index","type":"uint256"},{"indexed":false,"name":"_lastPrice","type":"uint256"}],"name":"EggSaleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_rank","type":"uint256"},{"indexed":false,"name":"_percentage","type":"uint256"}],"name":"ReferralPercentageUpdated","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"},{"indexed":true,"name":"_previousOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"}];

  /* blockdata */
  current_block:number;

  /* egg sales */
  egg_sales:any = [];
  unique_addresses:any = [];
  total_eth_volume:number = 0;

  /* loading */
  data_loading:boolean = true;

  /* Loading Spinner */
  spinnerColor = "primary";
  spinnerMode = "indeterminate";
  spinnerDiameter = 35;

  /* buyer stats */
  showBuyerStats:boolean;


  constructor(
    private _ngZone:NgZone,
    private timeAgoService:TimeagoService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private versionManager:VersionManagerService
  ) { 
    iconRegistry.addSvgIcon('purche', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/purche.svg'));
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/close.svg'));
    //
    this.versionManager.setVersionName("module", "Axie Lab");
    this.versionManager.setVersion("module", "1.1.0");
  }

  ngOnInit() {
    var that = this;
    if(!web3) throw "web3 Error";
    this.loadBlockData().then(function(){
      that.loadEggsales();
    });
  }

  /**
   * @care 
   * @danger
   * Contract write action so care
   */
  testBuyEgg(){
    console.log("K");
    var eggsale_contract = web3.eth.contract(this.axie_eggshop_abi);
    var eggshop_api = eggsale_contract.at(this.axie_eggshop);
    /*eggshop_api.buyEgg(4, "0xE293390d7651234c6DFB1f41a47358B9377C004F", {value: 200, gas: 20}, function(err, result){ 
      console.log("err", err);
      console.log("res", result);
    });*/
    /*var d = eggshop_api.buyEgg.getData(4, "0xE293390d7651234c6DFB1f41a47358B9377C004F");
    console.log("d",d);
    var e = web3.eth.estimateGas({data: d}, function(err,res){
      console.log("err",err);
      console.log("res",res);
    });*/
  }

  sortByProp(arr, prop, sort_mode){
    var sortFunc = function(a,b){
      if(a[prop] > b[prop]) return sort_mode ? -1 : 1;
      if(a[prop] < b[prop]) return sort_mode ? 1 : -1;
      return 0
    }
    arr.sort(sortFunc);
  }


  /**
   *  helpers
   */
  getTimeAgo(timestamp:any){
    return this.timeAgoService.getTimeAgo(timestamp);
  }
  round(val:any, digits:number){
    return parseFloat(val).toFixed(digits);
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }

  toggleBuyerStats(){
    this.showBuyerStats = !this.showBuyerStats; 
  }

  loadBlockData(){
    var that = this;
    return new Promise(function(resolve,reject){
      web3.eth.getBlockNumber(function(err,res){
        if(!err) { that.current_block = res; resolve(res);}
        if(err)  { reject("getBlockNumber Error: " + err); }
      });
    });
  }

  loadEggsales(){
    var that = this;
    var eggsale_contract = web3.eth.contract(this.axie_eggshop_abi);
    var eggshop_api = eggsale_contract.at(this.axie_eggshop);
    var EggBoughtEvent = eggshop_api.EggBought({}, {fromBlock: 0, toBlock: this.current_block} );
    //
    this.data_loading = true;
    //console.log("eg", EggBoughtEvent);
    //
    var start = new Promise(function(resolve,reject){
      EggBoughtEvent.get(function(err,res){
        console.log("evt", res);
        // push egg sale
        res.forEach(sale => {
          var newEggSale:any = {};
          newEggSale.price = new BigNumber(sale.args._price).toNumber() / 1000000000000000000;
          newEggSale.buyer = sale.args._buyer;
          newEggSale.index = new BigNumber(sale.args._index).toNumber();
          newEggSale.tx = sale.transactionHash;
          console.log(sale);
          that.egg_sales.push(newEggSale);
        });
        resolve(res);
      });
    }).then(function(res:any){ // getBlock
      //console.log("rr",res);
      var promises = [];
      res.forEach( (sale, i) => {
        var p = new Promise(function(resolve,reject){
          web3.eth.getBlock(sale.blockNumber, (err, block) => {
            //console.log("block",block);
            that.egg_sales[i].time = block.timestamp;
            that._ngZone.run(() => {});
            resolve(sale);
          });
        });
        promises.push(p);
      });
      console.log("final", res);
      return Promise.all(promises);
    }).then(function(){ // all data loaded
      that.egg_sales = that.egg_sales.reverse();
      that.data_loading = false;
      that.getUniqueAddresses();
    });
  }

  getUniqueAddresses(){
    var that = this;
    let _data = {};
    this.egg_sales.forEach(sale => {
      if(!_data[sale.buyer]) _data[sale.buyer] = {"num_eggs": 1, "total_eth": sale.price};
      else {
        _data[sale.buyer]["num_eggs"] ++;
        _data[sale.buyer]["total_eth"] += sale.price;
      } 
      that.total_eth_volume += sale.price;
    });
    for (var prop in _data) {
      if (_data.hasOwnProperty(prop)) {
          //console.log("p", prop, _data[prop]);
          that.unique_addresses.push({
            "address": prop, 
            "num_eggs": _data[prop]["num_eggs"], 
            "total_eth": _data[prop]["total_eth"], 
          });
      }
    }
    that._ngZone.run(() => {});
    console.log(this.unique_addresses);
  }

}
