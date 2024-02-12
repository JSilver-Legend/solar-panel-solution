import {
  ADD_ROOF,
  REMOVE_ROOF,
  UPDATE_ROOF_SPACE,
  UPDATE_ROOF_DETAILS,
  SET_EDIT_ROOF_OPEN,
  SET_SELECTED_ROOF,
  SET_ROOF_MOBILE_MENU_OPEN,
  CLEAN_ROOFS,
  CREATE_ROOF_SQUARE,

  /**
   * <--- harrypotter --->
   */

  // ...builder component
  GET_SELECTED_SOLAR_OBJECT,
  HANDLE_ORBIT_CAMERA,
  SET_CONTROL_PANEL_CONTENT,
  SET_ROOFS_DATA,
  UPDATE_ROOFS_DATA,
  SET_CURRENT_BUILDING_ID,
  SET_ADD_SOLAR_PANEL_STATE,
  DOM_RENDER_STATE,
  GOOGLE_MAP_IMAGE_URL,
  MAP_TEXTURE_SHOW_STATE,
  SET_SOLAR_PANEL_COUNT_INFO,
  UPDATE_SOLAR_PANEL_COUNT_INFO,
  SET_SHOW_MODAL_STATE,
  SET_RESULT_CAPTURE_IMAGE,
  //---------------------
} from "./types";
import { utils } from "services";

export const addRoof = (roofCoords, area) => ({
  type: ADD_ROOF,
  roof: {
    id: utils.uuidv4(),
    name: "",
    space: roofCoords,
    area: area,
    southPosition: "0",
    obstacles: "0",
    roofType: "0"
  }
});

export const createRoofSquare = (mapCenter) => ({
  type: CREATE_ROOF_SQUARE,
  mapCenter: mapCenter
});

export const cleanRoofs = () => ({
  type: CLEAN_ROOFS
});

export const removeRoof = id => ({
  type: REMOVE_ROOF,
  roofId: id
});

export const updateRoof = (id, newRoofValues) => ({
  type: UPDATE_ROOF_DETAILS,
  details: newRoofValues,
  roofId: id
});

export const updateRoofSpace = (id, newSpace, area) => ({
  type: UPDATE_ROOF_SPACE,
  space: newSpace,
  area: area,
  roofId: id
});

export const setSeletedRoof = roofId => ({
  type: SET_SELECTED_ROOF,
  payload: roofId
});

export const setEditRoofOpen = open => ({
  type: SET_EDIT_ROOF_OPEN,
  payload: open
});

export const setRoofMenuOpen = open => ({
  type: SET_ROOF_MOBILE_MENU_OPEN,
  payload: open
});

/**
 * <--- harrypotter --->
 */

// ... builder component

export const setDomRenderState = value => ({
  type: DOM_RENDER_STATE,
  payload: value
})

export const setControlPanelContent = value => ({
  type: SET_CONTROL_PANEL_CONTENT,
  payload: value
})

export const setRoofsData = value => ({
  type: SET_ROOFS_DATA,
  payload: value
})

export const updateRoofsData = value => ({
  type: UPDATE_ROOFS_DATA,
  payload: value
})

export const setCurrentBuildingId = value => ({
  type: SET_CURRENT_BUILDING_ID,
  payload: value
})

export const setAddSolarPanelState = value => ({
  type: SET_ADD_SOLAR_PANEL_STATE,
  payload: value
})
export const getSelectedSolarObject = value => ({
  type: GET_SELECTED_SOLAR_OBJECT,
  payload: value
})

export const handleOrbitCamera = value => ({
  type: HANDLE_ORBIT_CAMERA,
  payload: value
})

export const setGoogleMapImageURL = value => ({
  type: GOOGLE_MAP_IMAGE_URL,
  payload: value
})

export const setMapTextureShowState = value => ({
  type: MAP_TEXTURE_SHOW_STATE,
  payload: value
})

export const setSolarPanelCountInfo = value => ({
  type: SET_SOLAR_PANEL_COUNT_INFO,
  payload: value
})

export const updateSolarPanelCountInfo = value => ({
  type: UPDATE_SOLAR_PANEL_COUNT_INFO,
  payload: value
})

export const setShowModalState = value => ({
  type: SET_SHOW_MODAL_STATE,
  payload: value
})

export const setResultCaptureImage = value => ({
  type: SET_RESULT_CAPTURE_IMAGE,
  payload: value
})
//----------------------