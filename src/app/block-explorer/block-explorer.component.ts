import { Component, OnInit } from '@angular/core';

//import { BigNumber }         from "bignumber.js";
//
import { NgZone } from '@angular/core';
import { NgModel } from '@angular/forms';

declare let web3:any;

@Component({
  selector: 'app-block-explorer',
  templateUrl: './block-explorer.component.html',
  styleUrls: ['./block-explorer.component.css']
})
export class BlockExplorerComponent implements OnInit {

    /* output logs */
    logs:any = [];
    outputFullscreenFlag:boolean = false;

    /* web3 input data */
    tx_getTransaction:any            = "0xd4466b1a45549ef138644520e8e58c7fe3c49e3b628dce30dde5f706418dd437";
    addr_getTransactionCount:any     = "0x653cd961Ed568b49DfD86048cF54ccE163edb780";
    addr_getcode:string              = "0xc6689eb9a6d724b8d7b1d923ffd65b7005da1b62";
    tx_getTransactionReceipt:string  = "0xd4466b1a45549ef138644520e8e58c7fe3c49e3b628dce30dde5f706418dd437";

    /* states */
    loading_state:string = "";

    /* Detail Log */
    detailLogViewFlag:boolean = false;
    currentLog:Array<any> = [];
    currentLogId:any;

    constructor(private _ngZone:NgZone) {

    }

    ngOnInit() {
    }

    closeLogDetailView():void {
      this.detailLogViewFlag = false;
    }

    /**
     * [viewLog] display a specific log in a popup window
     * @param {any} id  log id
     * @param {any} log log object
     */
    viewLog(id:any, log:any):void {
      this.detailLogViewFlag = true;
      var logObject = JSON.parse(log);
      this.currentLog = Object.keys(logObject).map(key => ({ key, value: logObject[key] }));
      console.log("log",this.currentLog);
      this.currentLogId = id;
    }

    outputToggleFullscreen():void {
      this.outputFullscreenFlag = !this.outputFullscreenFlag;
    }

    /* web3 wrapper functions */
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
    }

    /**
     * [callWeb3] Calls a function of the current contract
     * @param {string}     fname  function name
     * @param {Array<any>} params function params
     * @param {any}        that   this context
     */
    callWeb3(fname:string, params:Array<any>, that:any):void {
      that.loading_state = "loading";
      var f:any = function(err, res){
        that.logs.push(that.parseData(err,res));
        that.loading_state = "";
        that._ngZone.run(()=>{});
      };
      var p = params;
      p.push(f);
      web3.eth[fname].apply(that, p);
    }


    /**
     * [parseData] parses and formats data (array,object)
     * @param  {any} err [description]
     * @param  {any} res [description]
     * @return {any}        [description]
     */
    parseData(err:any, res:any):any {
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
