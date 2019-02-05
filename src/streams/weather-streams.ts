import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const weatherURL = 'http://api.wunderground.com/api/17b7007bbc2deb8b/conditions/q/CA/San_Francisco.json';

export const weather$ = from(fetch(weatherURL).then(res => res.json()))
.pipe(
  map((d:any) => d.current_observation),
  tap((a) => console.log(a))
);

export const wind$ = weather$.pipe(
  map((d) => {
    return {
      wind_degrees: d.wind_degrees,
      wind_dir: d.wind_dir,
      wind_gust_mph: d.wind_gust_mph,
      wind_mph: d.wind_mph
    }
  })
);

export const pressure$ = weather$.pipe(
  map((d) => {
    return {
      pressure_in: d.pressure_in,
      pressure_mb: d.pressure_mb
    }
  })
)
