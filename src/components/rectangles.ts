import { createStore } from 'redux';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomX() {
  return randomIntFromInterval(10, canvas.width - 10);
}

function randomY() {
  return randomIntFromInterval(10, canvas.height - 10);
}

function randomColor() {
  let red = randomIntFromInterval(10, 150);
  let green = randomIntFromInterval(10, 150);
  let blue = randomIntFromInterval(10, 150);
  return `rgb(${red},${green},${blue})`;
}

class RandomRectangle implements Shapes.Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: any;

  constructor() {
    this.x = randomX();
    this.y = randomY();
    this.width = 50;
    this.height = 50;
    this.color = randomColor();
  }
};

function createRectanglesArray(count: number) {
  let rects = [];
  for (let i = 0; i <= count; i++) {
    rects.push(new RandomRectangle());
  }
  return rects;
}

export function draw() {
  // Define the initial state
  let initialState: any;
  initialState = {
    rectangles: createRectanglesArray(5)
  };

  // Define how state changes
  function reducer(state: any, action: any) {
    switch (action.type) {
    case 'TRANSLATE':
      return {
        rectangles: state.rectangles.map(function(rect: any) {
          return {
            x: rect.x + action.x,
            y: rect.y + action.y,
            width: rect.width,
            height: rect.height,
            color: rect.color
          };
        })
      };
    default:
      return state;
    }
  }

  // Create the Redux store
  // (to manage state changes)
  let store = createStore(reducer, initialState);

  // Define how state is viewed
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let state = store.getState();

    state.rectangles.forEach(function(rect: any) {
      ctx.fillStyle = rect.color;
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
  }

  store.subscribe(function() {
    render();
  });

  // Draw the initial view
  render();

  // "Move" the rectangle
  setInterval(function() {
    store.dispatch({type: 'TRANSLATE', x: 20, y: 0});
  }, 1000);
}
