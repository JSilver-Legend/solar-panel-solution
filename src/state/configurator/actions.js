import {
  SET_BUILDING_INIT_DATA,
  SET_SELECTED_BUILDING_NUMBER,
  UPDATE_SELECTED_BUILDIING_TYPE,
  UPDATE_SELECTED_ROOF_TYPE,
  UPDATE_SELECTED_ROOF_ANGLE,
  UPDATE_SELECTED_ROOF_PITCH,
  UPDATE_SELECTED_RIDGE_DIRECTION,
  UPDATE_SELECTED_BUILDING_WIDTH,
  UPDATE_SELECTED_BUILDING_WIDTH1,
  UPDATE_SELECTED_BUILDING_WIDTH2,
  UPDATE_SELECTED_BUILDING_LENGTH,
  UPDATE_SELECTED_BUILDING_LENGTH1,
  UPDATE_SELECTED_BUILDING_HEIGHT,
  UPDATE_SELECTED_BUILDING_ROTATION,
  UPDATE_SELECTED_ROOF_MATERIAL,
  SET_IS_ROTATING_STATE,
  SET_GOOGLE_MAP_IMAGE_URL,
  SET_ORBITCAM_AZIMUTHANGLE,
  UPDATE_SELECTED_BUILDING_DEFAULT_SIZE,
  SET_IS_SHOW_GROUND,
} from "./types";

export const setIsRotatingState = value => ({
  type: SET_IS_ROTATING_STATE,
  value: value,
})

export const setOrbitCamAzimuthAngle = value => ({
  type: SET_ORBITCAM_AZIMUTHANGLE,
  value: value,
})

export const setGoogleMapImageURL = value => ({
  type: SET_GOOGLE_MAP_IMAGE_URL,
  value: value
})

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

export const updateSelectedBuildingWidth1 = value => ({
  type: UPDATE_SELECTED_BUILDING_WIDTH1,
  value: value
})

export const updateSelectedBuildingWidth2 = value =>({
  type: UPDATE_SELECTED_BUILDING_WIDTH2,
  value: value
})

export const updateSelectedBuildingLength = value => ({
  type: UPDATE_SELECTED_BUILDING_LENGTH,
  value: value
})

export const updateSelectedBuildingLength1 = value => ({
  type: UPDATE_SELECTED_BUILDING_LENGTH1,
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

export const updateSelectedBuildingDefaultSize = value => ({
  type: UPDATE_SELECTED_BUILDING_DEFAULT_SIZE,
  value: value
})

export const setIsShowGround = value => ({
  type: SET_IS_SHOW_GROUND,
  value: value
})