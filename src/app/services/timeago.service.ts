import { Injectable } from '@angular/core';

@Injectable()
export class TimeagoService {

  private templates:object = {
      prefix: "",
      suffix: " ago",
      seconds: "< 1 min.",
      minute: "1 min.",
      minutes: "%d minutes",
      hour: "1 hour",
      hours: "%d hours",
      day: "1 day",
      days: "%d days",
      month: "1 month",
      months: "%d months",
      year: "1 year",
      years: "%d years"
  };
  private template:Function = function(t, n) {
      return this.templates[t] && this.templates[t].replace(/%d/i, Math.abs(Math.round(n)));
  };

  getTimeAgo = function(time) {
    time = parseInt(time);
    if(time > 999999999999) time = time/1000;
    time = time.toString();
    if (!time)
        return;
    time = time.replace(/\.\d+/, ""); // remove milliseconds
    time = time.replace(/-/, "/").replace(/-/, "/");
    time = time.replace(/T/, " ").replace(/Z/, " UTC");
    time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
    time = new Date(time * 1000 || time);

    var now = new Date();
    var seconds = ((now.getTime() - time) * .001) >> 0;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var years = days / 365;

    return this.templates.prefix + (
            seconds < 45 && this.template('seconds', seconds) ||
            seconds < 90 && this.template('minute', 1) ||
            minutes < 45 && this.template('minutes', minutes) ||
            minutes < 90 && this.template('hour', 1) ||
            hours < 24 && this.template('hours', hours) ||
            hours < 42 && this.template('day', 1) ||
            days < 30 && this.template('days', days) ||
            days < 45 && this.template('month', 1) ||
            days < 365 && this.template('months', days / 30) ||
            years < 1.5 && this.template('year', 1) ||
            this.template('years', years)
          ) + this.templates.suffix;
    };


  constructor() { }

}
