import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-axie-part-icon',
  templateUrl: './axie-part-icon.component.html',
  styleUrls: ['./axie-part-icon.component.scss']
})
export class AxiePartIconComponent implements OnInit {

  @Input() src:string;
  @Input() color:string;
  
  constructor() { }

  ngOnInit() {
  }

}
