import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-axie-stats',
  templateUrl: './axie-stats.component.html',
  styleUrls: ['./axie-stats.component.scss']
})
export class AxieStatsComponent implements OnInit {

  @Input() stats:any;
  stat_calc:any = {};
  stat_colors:any = {};
  colors:object = {
    "max"       : "#65bfe2", 
    "very-high" : "#67dccd", 
    "high"      : "#67dc97", 
    "mid"       : "#9ed674", 
    "low"       : "#ced47f",  
    "min"       : "#e8c47f", 
  };

  constructor() { }

  ngOnInit() {
    this.stat_calc.hp = this.stats.hp / 61 *100;
    this.stat_calc.morale = this.stats.morale / 61 *100;
    this.stat_calc.skill = this.stats.skill / 61 *100;
    this.stat_calc.speed = this.stats.speed / 61 *100;
    //
    this.stat_colors.hp = this.getColorFromStat(this.stat_calc.hp);
    this.stat_colors.morale = this.getColorFromStat(this.stat_calc.morale);
    this.stat_colors.skill = this.getColorFromStat(this.stat_calc.skill);
    this.stat_colors.speed = this.getColorFromStat(this.stat_calc.speed);
    //console.log("ss",this.stat_colors);
  }

  getColorFromStat(stat){
      if(stat >= 100) return this.colors["max"];
      else if(stat >= 85) return this.colors["high"];
      else if(stat >= 75) return this.colors["mid"];
      else if(stat >= 55) return this.colors["low"];
      else if(stat >= 45) return this.colors["min"];
  }

}
