import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-axie-parts',
  templateUrl: './axie-parts.component.html',
  styleUrls: ['./axie-parts.component.scss']
})
export class AxiePartsComponent implements OnInit {

  @Input() parts:Array<any>;
  consts:any = {
    "max_atk_avg" : 27.5,
    "max_def_avg" : 17.25
  };
  stats:any = {
    "avg_atk" : 0,
    "avg_def" : 0
  };
  percentages:any = {};
  /*tags:Array<any> = [
    {name:"tank, turtle", level: 5, key_stats: [hp,def]},
    {name:"high crit, attacker, assasin, fighter, ", level: 5, key_stats: [morale, attack]},
  ];*/

  constructor() { }

  ngOnInit() {
    this.parts.forEach(part => {
      if(!part.moves) return;
      part.moves.forEach(move => {
        this.stats.avg_atk += move.attack;
        this.stats.avg_def += move.defense;
      });
    });
    console.log(this.stats);
    this.stats.avg_atk =  Math.round(this.stats.avg_atk / 4);
    this.stats.avg_def = Math.round(this.stats.avg_def / 4);
    //
    this.percentages.avg_atk = this.stats.avg_atk / this.consts.max_atk_avg * 100;
    this.percentages.avg_def = this.stats.avg_def / this.consts.max_def_avg * 100;
    console.log("p", this.percentages);
  }

}
