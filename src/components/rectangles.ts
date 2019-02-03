import { store } from '../store/store';
import { fromEvent, from, interval, zip, Observable, timer }from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators'

import { wind$ } from '../streams/weather-streams';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export function Rectangles() {

  const click$ = fromEvent(canvas, 'click');

  const radius$ = from([50, 60, 70, 80, 90, 100]);
  const timer$ = interval(1000);
  const radiusTimer$ = zip(radius$, timer$);

  let windTimer$ = timer$.pipe(
    withLatestFrom(wind$),
    map(([, wind]) => wind),
  );

  windTimer$.subscribe((data:any) => {
    store.dispatch({
      type: 'TRANSLATE',
      vector: {
        x: data.wind_mph
      }
    });
  });

  // click$.subscribe((evt) => {
  //   store.dispatch({type: 'CANVAS_CLICK', evt: evt});
  // });

  // radiusTimer$
  //   .subscribe((r) => {
  //     store.dispatch({type: 'UPDATE_RADIUS', radius: r[0]});
  //   });

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

}
