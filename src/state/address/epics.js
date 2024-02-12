import { SEARCH_ADDRESS, SET_ADDRESS_BY_ID } from "./types";
import {
  map,
  switchMap,
  debounceTime,
  catchError,
  filter,
  withLatestFrom
} from "rxjs/operators";
import { ofType } from "redux-observable";
import { searchAddressSuccess, setAddress } from "./actions";
import { from, of } from "rxjs";

export const getSearchAddressesEpic = (action$, state$, { googleApiService }) =>
  action$.pipe(
    ofType(SEARCH_ADDRESS),
    filter(action => action.payload !== "" && action.payload),
    debounceTime(500),
    switchMap(action =>
      from(googleApiService.searchAddress(action.payload)).pipe(
        catchError(error => of([])), // Return empty array on promise rejection
        map(addresses => searchAddressSuccess(addresses))
      )
    )
  );

export const setAddressByIdEpic = (action$, state$, { googleApiService }) =>
  action$.pipe(
    ofType(SET_ADDRESS_BY_ID),
    filter(action => action.payload),
    withLatestFrom(state$),
    map(([action, state]) => {
      return state.address.searchAddressResults.find(
        address => address.place_id === action.payload
      );
    }),
    filter(address => address !== undefined),
    switchMap(address =>
      from(googleApiService.getPlaceDetails(address.place_id)).pipe(
        map(apiPlaceDetails => {
          let details = {
            lat: apiPlaceDetails.geometry.location.lat(),
            lng: apiPlaceDetails.geometry.location.lng(),
            name: apiPlaceDetails.name
          };
          return details;
        }),
        map(placeDetails => setAddress(placeDetails))
      )
    )
  );
