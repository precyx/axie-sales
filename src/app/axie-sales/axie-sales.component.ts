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

  /* output */
  outputArray:any = [];

  /* api */
  tx_getTransaction:any = "0xd4466b1a45549ef138644520e8e58c7fe3c49e3b628dce30dde5f706418dd437";
  addr_getTransactionCount:any = "0x653cd961Ed568b49DfD86048cF54ccE163edb780";

  /* states */
  loading_state:string = "";

  constructor(private _ngZone:NgZone) {

  }

  ngOnInit() {

    //web3.
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

  callWeb3(fname:string, params:Array<any>, that:any):void {
    that.loading_state = "loading";
    var f:any = function(err, res){
      that.outputArray.push(that.parseResult(err,res));
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
