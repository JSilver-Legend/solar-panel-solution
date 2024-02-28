import {
  ADD_ROOF,
  REMOVE_ROOF,
  UPDATE_ROOF_SPACE,
  UPDATE_ROOF_DETAILS,
  SET_EDIT_ROOF_OPEN,
  SET_SELECTED_ROOF,
  SET_ROOF_MOBILE_MENU_OPEN,
  ADD_RESULT_ROOF,
  REMOVE_RESULT_ROOF,
  CLEAN_ROOFS,
  CREATE_ROOF_SQUARE,

  /**
   * <--- harrypotter --->
   */

  // ... builder component
  SET_SELECTED_SOLAR_OBJECT,
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
  SET_SHOW_ROOF_OPTION,
} from "./types";

import { utils } from "services";

export const initialState = {
  roofs: [],
  addRoofDialogOpen: false,
  selectedRoofId: null,
  roofMobileMenuOpen: false,
  /**
   * <--- harrypotter --->
  */
  domRenderState: false,
  controlPanelContent: '1',
  roofsData: [],
  obstacleData: [],
  currentBuildingId: null,
  selectedSolarObject: null,
  addSolarPanelState: false,
  orbit: '',
  googleMapImageURL: "",
  mapTextureShowState: true,
  solarPanelCountInfo: [],
  showModalState: false,
  isShowRoofOption: false,
  resultCaptureImage: "",
};

export const roofs = (state = initialState, action) => {
  switch (action.type) {

    /**
   * <--- harrypotter --->
   */

    // ... builder component

    case DOM_RENDER_STATE:
      return {
        ...state,
        domRenderState: action.payload
      }

    case SET_CONTROL_PANEL_CONTENT:
      return {
        ...state,
        controlPanelContent: action.payload
      }

    case SET_ROOFS_DATA:
      return {
        ...state,
        roofsData: action.payload
      }

    case UPDATE_ROOFS_DATA:
      const tempRoofsData = JSON.parse(JSON.stringify(state.roofsData));
      let changableIndex = state.roofsData.findIndex((item) => item.buildingIndex === state.currentBuildingId);
      tempRoofsData[changableIndex][action.payload.type] = action.payload.value;

      return {
        ...state,
        roofsData: tempRoofsData
      }
      
    case SET_CURRENT_BUILDING_ID:
      return {
        ...state,
        currentBuildingId: action.payload
      }

    case SET_ADD_SOLAR_PANEL_STATE:
      return {
        ...state,
        addSolarPanelState: action.payload
      }

    case SET_SELECTED_SOLAR_OBJECT:
      return {
        ...state,
        selectedSolarObject: action.payload
      }

    case HANDLE_ORBIT_CAMERA:
      return {
        ...state,
        orbit: action.payload
      }

    case GOOGLE_MAP_IMAGE_URL:
      return {
        ...state,
        googleMapImageURL: action.payload
      }

    case MAP_TEXTURE_SHOW_STATE:
      return {
        ...state,
        mapTextureShowState: action.payload
      }

    case SET_SHOW_ROOF_OPTION:
      return {
        ...state,
        isShowRoofOption: action.payload
      }

    case SET_SOLAR_PANEL_COUNT_INFO:
      return {
        ...state,
        solarPanelCountInfo: JSON.parse(JSON.stringify(action.payload))
      }

    case UPDATE_SOLAR_PANEL_COUNT_INFO:
      let tempSolarPanelCountInfo = JSON.parse(JSON.stringify(state.solarPanelCountInfo));

      const index = tempSolarPanelCountInfo.findIndex(((item) => item.buildingNumber === action.payload.buildingNumber));

      tempSolarPanelCountInfo[index] = {
        ...tempSolarPanelCountInfo[index],
        ...{
          eastLarge: 0,
          eastSmall: 0,
          westLarge: 0,
          westSmall: 0,
          southLarge: 0,
          southSmall: 0,
          northLarge: 0,
          northSmall: 0,
        },
        ...action.payload.panelInfo,
      };

      return {
        ...state,
        solarPanelCountInfo: tempSolarPanelCountInfo
      }

    case SET_SHOW_MODAL_STATE:
      return {
        ...state,
        showModalState: action.payload
      }

    case SET_RESULT_CAPTURE_IMAGE:
      return {
        ...state,
        resultCaptureImage: action.payload
      }
    //---------------------
    case ADD_ROOF:
      return {
        ...state,
        roofs: state.roofs.concat(action.roof),
        selectedRoofId: action.roof.id,
      };
    case CREATE_ROOF_SQUARE:
      let mapCenter = action.mapCenter;
      const pointDistance = 0.00005;
      let paths =
        [{ lat: mapCenter.lat - pointDistance, lng: mapCenter.lng - pointDistance },
        { lat: mapCenter.lat + pointDistance, lng: mapCenter.lng - pointDistance },
        { lat: mapCenter.lat + pointDistance, lng: mapCenter.lng + pointDistance },
        { lat: mapCenter.lat - pointDistance, lng: mapCenter.lng + pointDistance }];

      let newRoof = {
        id: utils.uuidv4(),
        name: "",
        space: paths,
        area: 63,
        southPosition: "0",
        obstacles: "0",
        roofType: "0"
      }

      return {
        ...state,
        roofs: state.roofs.concat(newRoof),
        selectedRoofId: newRoof.id
      };
    case REMOVE_ROOF:
      return {
        ...state,
        roofs: state.roofs.filter(roof => roof.id !== action.roofId),
        selectedRoofId: null
      };
    case UPDATE_ROOF_SPACE:
      return {
        ...state,
        roofs: state.roofs.map(roof => {
          if (roof.id === action.roofId) {
            return {
              ...roof,
              space: action.space,
              area: action.area
            };
          }
          return roof;
        })
      };
    case UPDATE_ROOF_DETAILS:
      return {
        ...state,
        addRoofDialogOpen: false,
        roofs: state.roofs.map(roof => {
          if (roof.id === action.roofId) {
            return {
              ...roof,
              ...action.details
            };
          }
          return roof;
        })
      };
    case SET_EDIT_ROOF_OPEN:
      return {
        ...state,
        addRoofDialogOpen: action.payload
      };
    case SET_SELECTED_ROOF:
      return {
        ...state,
        selectedRoofId: action.payload
      };
    case SET_ROOF_MOBILE_MENU_OPEN:
      return {
        ...state,
        roofMobileMenuOpen: action.payload
      };
    case ADD_RESULT_ROOF:
      return {
        ...state,
        selectedResultRoofIds: state.selectedResultRoofIds.concat(
          action.payload
        )
      };
    case REMOVE_RESULT_ROOF:
      return {
        ...state,
        selectedResultRoofIds: state.selectedResultRoofIds.filter(
          roofId => roofId !== action.payload
        )
      };
    case CLEAN_ROOFS:
      let tempRoofs = state.roofs.filter(roof => roof.name !== "");
      let roofCount = 0;

      if (tempRoofs.length === 1) {
        tempRoofs[0].name = "Tak"
      } else {
        for (var i = 0; i < tempRoofs.length; i++) {
          if (tempRoofs[i].roofType !== '5') {
            tempRoofs[i].name = "Tak " + (++roofCount);
          }
        }
      }
      return {
        ...state,
        roofs: tempRoofs
      };
    default:
      return state;
  }
};

export default roofs;
