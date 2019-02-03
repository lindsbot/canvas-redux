import { Path, Point, Shape } from "paper";

export class Particle {
  public location: Point;

  constructor(location:Point) {
    this.location = location;
    this.render();
  }

  render = () => {
    let shape = Shape.Circle(this.location, 5);
    shape.strokeColor = 'black';
    shape.view.draw();
  }
}

export class MovingParticle extends Particle {
  public velocity: Point;
  public acceleration: Point;
  // private shape: Shape;

  constructor(location:Point, velocity:Point, acceleration:Point, maxSpeed:number) {
    super(location);

    this.velocity = velocity;
    this.acceleration = acceleration;


  }

  update = () => {
    this.velocity = this.velocity.add(this.acceleration);
    this.location = this.location.add(this.velocity);
    // console.log(this.location);
  }

  render = () => {
    this.update();

    let shape = Shape.Circle(this.location, 5);
    shape.strokeColor = 'black';
    shape.view.draw();
  }
}
