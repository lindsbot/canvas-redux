import * as paper from 'paper';
// import { Rectangles } from './components/rectangles';
import { Particle, MovingParticle } from './components/Particle'
import { weather$ } from './streams/weather-streams';
import { Point } from 'paper';

// weather$.subscribe();

let p;

function setupCanvas() {
  const canvas = document.querySelector('canvas');
  paper.setup(canvas);
  p = new MovingParticle(loc, vel, acc, 25);
}

let loc = new Point(25, 25);
let vel = new Point(0.01, 0.01);
let acc = new Point(0.001, 0.001);

function draw() {

  p.render();
}

window.onload = () => {
  setupCanvas();
  paper.view.onFrame = draw;
}

// Rectangles();
// let p = new Particle();

