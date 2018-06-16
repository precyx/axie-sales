import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-copy-text',
  templateUrl: './copy-text.component.html',
  styleUrls: ['./copy-text.component.scss']
})
export class CopyTextComponent implements OnInit {

  @Input() copytext:string;
  msgVisible:boolean = false;

  constructor(
  ){ 
    
  }

  ngOnInit() {
  }

  copyToClipboard(){
    const el = document.createElement('textarea');
    el.value = this.copytext;
    console.log(this.copytext);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    //
    this.showMessage();
  }

  showMessage(){
    this.msgVisible = true;
    window.setTimeout(()=>{
     this.msgVisible = false;
    }, 1000);
  }

}
