import { rand, randomX, randomY, randomHSL, intersectsRect } from '../../utils';

class RandomRectangle implements Shapes.Rectangle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor(id: number) {
    this.id = id;
    this.x = randomX();
    this.y = randomY();
    this.width = 30;
    this.height = 30;
    this.color = randomHSL();
  }
};

function createRectanglesArray(count: number) {
  let rects = [];
  for (let i = 1; i <= count; i++) {
    rects.push(new RandomRectangle(i));
  }
  return rects;
}

export function rectanglesReducer(state: any, action: any) {
  switch (action.type) {
    case 'SEED':
      return {
        rectangles: createRectanglesArray(50)
      }
    case 'CANVAS_CLICK':
      let hits = [];
      let mousePos = {
        x: action.evt.clientX,
        y: action.evt.clientY
      }
      state.rectangles.forEach((rect: Shapes.Rectangle) => {
        if (intersectsRect(mousePos, rect)) {
          hits.push(rect);
        };
      });

      console.log(hits);

      // todo: only randomize the rects in hits[]

      return {
        rectangles: state.rectangles.map((rect: Shapes.Rectangle) => {
          return {
            ...rect,
            x: randomX(),
            y: randomY()
          }
        })
      }
    case 'TRANSLATE':
      return {
        rectangles: state.rectangles.map((rect: Shapes.Rectangle) => {
          return {
            ...rect,
            x: rect.x + action.x,
            y: rect.y + action.y
          };
        })
      };
    case 'JUMBLE':
      return {
        rectangles: state.rectangles.map((rect: Shapes.Rectangle) => {
          return {
            ...rect,
            x: rect.x + rand(-5, 5),
            y: rect.y + rand(-5, 5)
          }
        })
      };
    default:
      return state;
  }
}
