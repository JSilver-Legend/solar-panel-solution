import {
  SET_SELECTED_BUILDING_NUMBER,
  UPDATE_SELECTED_BUILDIING_TYPE,
  UPDATE_SELECTED_ROOF_TYPE,
  UPDATE_SELECTED_ROOF_ANGLE,
  UPDATE_SELECTED_ROOF_PITCH,
  UPDATE_SELECTED_RIDGE_DIRECTION,
} from "./types";

export const setSelectedBuildingNumber = value => ({
  type: SET_SELECTED_BUILDING_NUMBER,
  value: value
});

export const updateSelectedBuildingType = value => ({
  type: UPDATE_SELECTED_BUILDIING_TYPE,
  value: value
})

export const updateSelectedRoofType = value => ({
  type: UPDATE_SELECTED_ROOF_TYPE,
  value: value
})

export const updateSelectedRoofAngle = value => ({
  type: UPDATE_SELECTED_ROOF_ANGLE,
  value: value
})

export const updateSelectedRoofPitch = value => ({
  type: UPDATE_SELECTED_ROOF_PITCH,
  value: value
})

export const updateSelectedRidgeDirection = value => ({
  type: UPDATE_SELECTED_RIDGE_DIRECTION,
  value: value
})
