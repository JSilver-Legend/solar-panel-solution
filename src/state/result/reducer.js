import {
  SET_RESULT_MOBILE_OPEN, FETCH_ESTIMATE_RESULT_SUCCESS, SET_INFO_MENU_OPEN, FETCH_ESTIMATE_RESULT_FAILURE, SET_INFO_MENU_OPTIONS,
  //-----harry potter-----
  SET_RESULT_BUILDING_DATA_INFO,
  UPDATE_RESULT_BUILDING_DATA_INFO,
  CAPTURED_TOTAL_CANVAS_IMAGES,
} from "./types";

export const initialState = {
  annualSavings: 0,
  annualProduction: 0,
  paybackTimeInYears: null,
  savingsPerMonth: null,
  solarPanelQuantity: 0,
  solarCellsArea: 0,
  structureCost: 0,
  solarPanelType: {
    name: "",
    wattsPerPanel: null,
    size: null,
    description: "",
    img: ""
  },
  resultMobileMenuOpen: false,
  resultInfoModalOpen: false,
  resultInfoModal: {
    title: "",
    text: ""
  },
  //-----harry potter-----
  resultBuildingDataInfo: {},
  autoCaptureImage: [],
};

export const result = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESULT_MOBILE_OPEN:
      return {
        ...state,
        resultMobileMenuOpen: action.payload
      };
    case SET_INFO_MENU_OPTIONS:
      return {
        ...state,
        resultInfoModal: action.payload
      };
    case SET_INFO_MENU_OPEN:
      return {
        ...state,
        resultInfoModalOpen: action.payload
      };
    case FETCH_ESTIMATE_RESULT_FAILURE:
      return {
        ...state,
        paybackTimeInYears: null
      };
    case FETCH_ESTIMATE_RESULT_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    //-----harry potter-----
    case SET_RESULT_BUILDING_DATA_INFO:
      return {
        ...state,
        resultBuildingDataInfo: action.payload
      }

    case UPDATE_RESULT_BUILDING_DATA_INFO:
      return {
        ...state,
        resultBuildingDataInfo: action.payload
      }

    case CAPTURED_TOTAL_CANVAS_IMAGES:
      return {
        ...state,
        autoCaptureImage: action.payload
      }

    default:
      return state;
  }
};

export default result;
