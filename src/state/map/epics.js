import { map, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ON_POLYGON_COMPLETE } from './types';
import { updateCenter } from './actions';

import { SET_ADDRESS } from '../address/types';
import { roofsActions } from '../roofs';

export const polygonCompleteEpic = action$ => action$.pipe(
  ofType(ON_POLYGON_COMPLETE),
  filter(action => action.area > 1),
  map(action => roofsActions.addRoof(action.coords, action.area))
);

export const updateMapCenterOnAddress = action$ => action$.pipe(
  ofType(SET_ADDRESS),
  filter(action => action.payload),
  map(action => {
    let location = action.payload;
    return updateCenter({
      lat:location.lat,
      lng:location.lng
    })
  })
);
