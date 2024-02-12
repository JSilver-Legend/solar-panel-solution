/* eslint-disable no-unused-vars */
import { FETCH_ESTIMATE_RESULT } from "./types";

import {
  fetchEstimateResultSuccess,
  fetchEstimateResultFailure
} from "./actions";
import { detailsSelectors } from "../details";
import { of } from "rxjs";
import {
  map,
  switchMap,
  catchError,
  filter,
  withLatestFrom
} from "rxjs/operators";
import { ofType } from "redux-observable";

export const getEstimateResultEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(FETCH_ESTIMATE_RESULT),
    withLatestFrom(state$),
    map(([action, state]) => {
      let consumtion = detailsSelectors.getTotalConsumtion(state);
      let selectedRoofs = state.roofs.roofs.map(roof => ({
        roofType: parseInt(roof.roofType),
        area: roof.area,
        southPosition: roof.southPosition,
        obstacles: roof.obstacles
      }));
      let packageType = state.details.packageType;
      let boxType = state.details.boxType;
      return {
        consumtion: consumtion,
        roofs: selectedRoofs,
        packageType: packageType,
        boxType: boxType
      };
    }),
    switchMap(requestData =>
      api.getEstimateResult$(requestData.roofs, requestData.consumtion, requestData.packageType, requestData.boxType).pipe(
        map(result => fetchEstimateResultSuccess(result)),
        catchError(error => of(fetchEstimateResultFailure()))
      )
    )
  );
