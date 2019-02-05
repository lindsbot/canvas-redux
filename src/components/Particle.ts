import { Path, Point, Shape } from "paper";

const canvas = document.querySelector('canvas');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

export class Particle {
  public location: Point;

  constructor(location:Point) {
    this.location = location;
  }

  render = () => {
    let shape = Shape.Circle(this.location, 5);
    shape.strokeColor = 'black';
    shape.position = this.location;
  }
}

export class MovingParticle extends Particle {
  public velocity: Point;
  public acceleration: Point;
  private shape: Shape;

  constructor(location:Point, velocity:Point, acceleration:Point, maxSpeed:number) {
    super(location);

    this.velocity = velocity;
    this.acceleration = acceleration;

    this.shape = Shape.Circle(this.location, 5);
    this.shape.strokeColor = 'black';
  }

  wrapAroundEdges() {
    if (this.location.x > canvasWidth) { this.location.x = 0; }
    if (this.location.x < 0) { this.location.x = canvasWidth; }
    if (this.location.y > canvasHeight) { this.location.y = 0; }
    if (this.location.y < 0) { this.location.y = canvasHeight; }
  }

  render = () => {
    this.wrapAroundEdges();

    this.velocity = this.velocity.add(this.acceleration);
    this.location = this.location.add(this.velocity);

    this.shape.position = this.location;
  }

}
