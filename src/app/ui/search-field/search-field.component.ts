import { Component, OnInit, Output, Input, EventEmitter  } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {


  searchstring:string;
  @Output() search:EventEmitter<string> = new EventEmitter<string>();
  @Input() placeholder:string;
  

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ){
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/general/search.svg'));
  }

  ngOnInit() {
  }

  /**
   * Click on search button
   * @event {Click}
   */
  clickSearch(){
    this.search.emit(this.searchstring);
  }

}
