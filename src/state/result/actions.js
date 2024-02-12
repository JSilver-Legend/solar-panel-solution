import {
  SET_RESULT_MOBILE_OPEN,
  FETCH_ESTIMATE_RESULT,
  FETCH_ESTIMATE_RESULT_SUCCESS,
  FETCH_ESTIMATE_RESULT_FAILURE,
  SET_INFO_MENU_OPEN,
  SET_INFO_MENU_OPTIONS,
  //-----harry potter-----
  SET_RESULT_BUILDING_DATA_INFO,
  UPDATE_RESULT_BUILDING_DATA_INFO,
  CAPTURED_TOTAL_CANVAS_IMAGES,
} from "./types";

export const setResultMobileOpen = open => ({
  type: SET_RESULT_MOBILE_OPEN,
  payload: open
});

export const setInfoMenuOpen = open => ({
  type: SET_INFO_MENU_OPEN,
  payload: open
});

export const setInfoMenuOptions = options => ({
  type: SET_INFO_MENU_OPTIONS,
  payload: options
});

export const getEstimateResults = () => ({ type: FETCH_ESTIMATE_RESULT });

export const fetchEstimateResultSuccess = result => ({
  type: FETCH_ESTIMATE_RESULT_SUCCESS,
  payload: result
});

export const fetchEstimateResultFailure = () => ({
  type: FETCH_ESTIMATE_RESULT_FAILURE
});

//-----harry potter-----
export const setResultBuildingDataInfo = value => ({
  type: SET_RESULT_BUILDING_DATA_INFO,
  payload: value
});

export const updateResultBuildingDataInfo = value => ({
  type: UPDATE_RESULT_BUILDING_DATA_INFO,
  payload: value
})

export const capturedTotalCanvasImages = value => ({
  type: CAPTURED_TOTAL_CANVAS_IMAGES,
  payload: value
})