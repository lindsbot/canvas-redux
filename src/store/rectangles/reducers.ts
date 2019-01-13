import { rand, randomX, randomY, randomHSL, intersectsRect } from '../../utils';

class RandomRectangle implements Shapes.Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: any;

  constructor() {
    this.x = randomX();
    this.y = randomY();
    this.width = 30;
    this.height = 30;
    this.color = randomHSL();
  }
};

function createRectanglesArray(count: number) {
  let rects = [];
  for (let i = 0; i < count; i++) {
    rects.push(new RandomRectangle());
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
      let mousePos = {
        x: action.evt.clientX,
        y: action.evt.clientY
      }
      state.rectangles.forEach((rect: Shapes.Rectangle) => {
        intersectsRect(mousePos, rect);
      });

      return {
        rectangles: state.rectangles
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
