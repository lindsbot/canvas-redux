import * as Redux from 'redux';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Define the initial state
let initialState: any;
initialState = {
  rectangles: [
    {
      x: 10,
      y: 10,
      width: 50,
      height: 50,
      color: 'red'
    }
  ]
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
let store = Redux.createStore(reducer, initialState);
store.subscribe(function() {
  render();
});

// Define how state is viewed
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var state = store.getState();
  state.rectangles.forEach(function(rect: any) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  });
}

// Draw the initial view
render();

// "Move" the rectangle
setInterval(function() {
  store.dispatch({type: 'TRANSLATE', x: 20, y: 0});
}, 1000);