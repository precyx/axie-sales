import { Component, OnInit } from '@angular/core';

import {paper} from 'paper/dist/paper-full.js';

@Component({
  selector: 'app-artboard',
  templateUrl: './artboard.component.html',
  styleUrls: ['./artboard.component.scss']
})
export class ArtboardComponent implements OnInit {

  /* path */
  paths:Array<any> = []; 

  /* mouse */
  mouseDown:boolean;

  /* paper project */
  currentProject:any;

  constructor() { }

  ngOnInit() {
    this.initCanvas();
  }

  initCanvas(){
    var canvas = document.getElementById("canvas");
    var p = paper.setup(canvas);
    this.currentProject = p.projects[p.projects.length-1];
    // Create a new path once, when the script is executed:
  }


  /**
   * Events
   */
  onMouseDown(e) {
    this.mouseDown = true;
    //
    if(this.getLastPath()) this.getLastPath().fullySelected = false; // deselect all previous paths
    //y
    let p = new paper.Path();
    p.strokeColor = '#8b3f35';
    p.strokeWidth = 3;
    //p.fullySelected = true;
    this.paths.push(p);
  }
  onMouseUp(e){
    this.mouseDown = false;
    //
    if(!this.getLastPath()) return;
    this.getLastPath().simplify(3);
    //this.getLastPath().fullySelected = true;
  }
  onFocusOut(e){
    this.mouseDown = false;
    //
    if(!this.getLastPath()) return;
    this.getLastPath().simplify();
  }
  onMouseMove(e){
    if(!this.mouseDown) return;
    if(!this.getLastPath()) return;
    this.getLastPath().add(new paper.Point(e.layerX, e.layerY));
  }



  getLastPath():any {
    if(!this.paths.length) return undefined; 
    return this.paths[this.paths.length -1];
  }

  clearCanvas(){
    this.paths = [];
    console.log(paper);
    this.currentProject.activeLayer.removeChildren();
  }

}
