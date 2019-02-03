import * as paper from 'paper';
// import { Rectangles } from './components/rectangles';
import { Particle } from './components/Particle'
import { weather$ } from './streams';

let { Point, Path } = paper;

weather$.subscribe();

function setupCanvas() {
  const canvas = document.querySelector('canvas');
  paper.setup(canvas);
}

function draw() {
  var path = new Path();

  path.strokeColor = 'black';
  var start = new Point(100, 100);
  var end = new Point(123, 145)

  path.moveTo(start);
  path.lineTo(end);
}

window.onload = () => {
  setupCanvas();
}

paper.view.onFrame = draw;

// Rectangles();
// let p = new Particle();

