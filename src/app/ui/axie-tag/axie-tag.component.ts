import { Component, OnInit, Input } from '@angular/core';
//import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-axie-tag',
  templateUrl: './axie-tag.component.html',
  styleUrls: ['./axie-tag.component.css'],
})
export class AxieTagComponent implements OnInit {

  @Input() color:string;

  constructor() { }

  ngOnInit() {
  }

}
