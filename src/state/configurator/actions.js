import {
  SET_BUILDING_INIT_DATA,
  SET_SELECTED_BUILDING_NUMBER,
  UPDATE_SELECTED_BUILDIING_TYPE,
  UPDATE_SELECTED_ROOF_TYPE,
  UPDATE_SELECTED_ROOF_ANGLE,
  UPDATE_SELECTED_ROOF_PITCH,
  UPDATE_SELECTED_RIDGE_DIRECTION,
  UPDATE_SELECTED_BUILDING_WIDTH,
  UPDATE_SELECTED_BUILDING_LENGTH,
  UPDATE_SELECTED_BUILDING_HEIGHT,
  UPDATE_SELECTED_BUILDING_ROTATION,
  UPDATE_SELECTED_ROOF_MATERIAL,
} from "./types";

export const setBuildingInitData = value => ({
  type: SET_BUILDING_INIT_DATA,
  value: value
});
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

export const updateSelectedBuildingWidth = value => ({
  type: UPDATE_SELECTED_BUILDING_WIDTH,
  value: value
})

export const updateSelectedBuildingLength = value => ({
  type: UPDATE_SELECTED_BUILDING_LENGTH,
  value: value
})

export const updateSelectedBuildingHeight = value => ({
  type: UPDATE_SELECTED_BUILDING_HEIGHT,
  value: value
})

export const updateSelectedBuildingRotation = value => ({
  type: UPDATE_SELECTED_BUILDING_ROTATION,
  value: value
})

export const updateSelectedRoofMaterial = value => ({
  type: UPDATE_SELECTED_ROOF_MATERIAL,
  value: value
})