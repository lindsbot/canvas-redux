import { Path, Point, Shape } from "paper";

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

  render = () => {
    this.velocity = this.velocity.add(this.acceleration);
    this.location = this.location.add(this.velocity);

    this.shape.position = this.location;
  }

}
