import { SET_DETAILS, SET_PACKAGETYPE, SET_BOXTYPE, SET_BOXTABUNFOLDED } from "./types";

export const setDetails = details => ({ type: SET_DETAILS, payload: details });

export const setPackage = packageType => ({ type: SET_PACKAGETYPE, payload: packageType });

export const setBoxType = boxType => ({ type: SET_BOXTYPE, payload: boxType });

export const setBoxTabUnfolded = boxTabUnfolded => ({ type: SET_BOXTABUNFOLDED, payload: boxTabUnfolded });