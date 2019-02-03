import { Group, Path, Point } from "paper";

export class Particle {
  private group: Group;
  private path: Path;
  private pathStyle: any;
  private location: Point;
  private velocity: Point;
  private acceleration: Point;
  private maxSpeed: number;

  constructor() {

    this.location = new Point(50, 50);
    this.velocity = new Point(0, 0);
    this.acceleration = new Point(0, 0);

    this.group = new Group();
    this.path = new Path.Circle(this.location, 25);
    this.pathStyle = {
      strokeWidth: 5,
      strokeColor: '#000',
      fillColor: 'yellow'
    }
  }
}
