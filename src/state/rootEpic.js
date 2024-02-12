import { addressEpics, addressTypes } from "./address";
import { mapEpics } from "./map";
import { resultEpics } from "./result";
import { combineEpics } from "redux-observable";
import { catchError, filter, mapTo } from "rxjs/operators";

const resetEpic = action$ =>
  action$.pipe(
    filter(action => action.type === addressTypes.SET_ADDRESS),
    mapTo({ type: "RESET" })
  );

export const rootEpic = (action$, store$, dependencies) =>
  combineEpics(
    mapEpics.polygonCompleteEpic,
    mapEpics.updateMapCenterOnAddress,
    addressEpics.getSearchAddressesEpic,
    addressEpics.setAddressByIdEpic,
    resultEpics.getEstimateResultEpic,
    resetEpic
  )(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );

export default rootEpic;
