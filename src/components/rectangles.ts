import { store } from '../store/store';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export function Rectangles() {

  canvas.addEventListener('click', (evt: MouseEvent) => {
    store.dispatch({type: 'CANVAS_CLICK', evt: evt});
  });

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let state = store.getState();
    console.log(state);
    state.rectangles.forEach(function(rect: any) {
      console.log(rect);
      ctx.fillStyle = rect.color;
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
  }

  store.dispatch({type: 'SEED'});

  store.subscribe(function() {
    render();
  });

  render();

  setInterval(() => {
    store.dispatch({type: 'JUMBLE'});
  }, 1000);

  // setInterval(() => {
  //   store.dispatch({type: 'TRANSLATE', x: 20, y: 10});
  // }, 1000)

}
