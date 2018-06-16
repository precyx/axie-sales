import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sortable-header',
  templateUrl: './sortable-header.component.html',
  styleUrls: ['./sortable-header.component.scss']
})
export class SortableHeaderComponent implements OnInit {

  toggler:boolean;
  state:string = "unset";

  @Output() toggle: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  toggleState = function(){
    this.toggler = !this.toggler;
    switch(this.toggler){
      case true  : this.state = "off"; break;
      case false : this.state = "on";  break;
    }
    this.toggle.emit(this.toggler);
  }


}
