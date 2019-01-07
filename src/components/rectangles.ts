import { store } from '../store/store';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export function draw() {
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let state = store.getState();
    state.rectangles.forEach(function(rect: any) {
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
  }, 100);

  // setInterval(() => {
  //   store.dispatch({type: 'TRANSLATE', x: 20, y: 10});
  // }, 1000)

}
