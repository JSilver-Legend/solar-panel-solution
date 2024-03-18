import {
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
  SET_BUILDING_INIT_DATA,
  UPDATE_SELECTED_ROOF_MATERIAL,
  SET_ORBITCAM,
  SET_GOOGLE_MAP_IMAGE_URL,
} from "./types";

export const initialState = {
  selectedBuildingNumber: null,
  buildingData: [],
  orbitCam: null,
  googleMapImageURL: "",
};

export const configurator = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORBITCAM:
      return {
        ...state,
        orbitCam: action.value
      }

    case SET_GOOGLE_MAP_IMAGE_URL:
      return {
        ...state,
        googleMapImageURL: action.value
      }
    
    case SET_BUILDING_INIT_DATA:
      return {
        ...state,
        buildingData: action.value
      }
    case SET_SELECTED_BUILDING_NUMBER:
      return {
        ...state,
        selectedBuildingNumber: action.value
      }
    case UPDATE_SELECTED_BUILDIING_TYPE:
      return {
        ...state,
        buildingData: state.buildingData.map(item => {
          if (item.buildingNumber === action.value.buildingNumber) {
              return {
                  ...item,
                  buildingType: action.value.buildingType
              };
          }
          return item;
        })
      }
    case UPDATE_SELECTED_ROOF_TYPE:
      return {
        ...state,
        buildingData: state.buildingData.map(item => {
          if (item.buildingNumber === action.value.buildingNumber) {
              return {
                  ...item,
                  roofType: action.value.roofType
              };
          }
          return item;
        })
      }
    case UPDATE_SELECTED_ROOF_ANGLE:
      return {
        ...state,
        buildingData: state.buildingData.map(item => {
          if (item.buildingNumber === action.value.buildingNumber) {
              return {
                  ...item,
                  roofAngle: action.value.roofAngle
              };
          }
          return item;
        })
      }
    case UPDATE_SELECTED_ROOF_PITCH:
      return {
        ...state,
        buildingData: state.buildingData.map(item => {
          if (item.buildingNumber === action.value.buildingNumber) {
              return {
                  ...item,
                  roofPitch: action.value.roofPitch
              };
          }
          return item;
        })
      }
    case UPDATE_SELECTED_RIDGE_DIRECTION:
      return {
        ...state,
        buildingData: state.buildingData.map(item => {
          if (item.buildingNumber === action.value.buildingNumber) {
              return {
                  ...item,
                  ridgeDirection: action.value.ridgeDirection
              };
          }
          return item;
        })
      }
      case UPDATE_SELECTED_BUILDING_WIDTH:
        return {
          ...state,
          buildingData: state.buildingData.map(item => {
            if (item.buildingNumber === action.value.buildingNumber) {
                return {
                    ...item,
                    buildingWidth: action.value.buildingWidth
                };
            }
            return item;
          })
        }
      case UPDATE_SELECTED_BUILDING_WIDTH1:
        return {
          ...state,
          buildingData: state.buildingData.map(item => {
            if (item.buildingNumber === action.value.buildingNumber) {
                return {
                    ...item,
                    buildingWidth1: action.value.buildingWidth1
                };
            }
            return item;
          })
        }
      case UPDATE_SELECTED_BUILDING_WIDTH2:
        return {
          ...state,
          buildingData: state.buildingData.map(item => {
            if (item.buildingNumber === action.value.buildingNumber) {
                return {
                    ...item,
                    buildingWidth2: action.value.buildingWidth2
                };
            }
            return item;
          })
        }
      case UPDATE_SELECTED_BUILDING_LENGTH:
        return {
          ...state,
          buildingData: state.buildingData.map(item => {
            if (item.buildingNumber === action.value.buildingNumber) {
                return {
                    ...item,
                    buildingLength: action.value.buildingLength
                };
            }
            return item;
          })
        }
      case UPDATE_SELECTED_BUILDING_LENGTH1:
        return {
          ...state,
          buildingData: state.buildingData.map(item => {
            if (item.buildingNumber === action.value.buildingNumber) {
                return {
                    ...item,
                    buildingLength1: action.value.buildingLength1
                };
            }
            return item;
          })
        }
      case UPDATE_SELECTED_BUILDING_HEIGHT:
        return {
          ...state,
          buildingData: state.buildingData.map(item => {
            if (item.buildingNumber === action.value.buildingNumber) {
                return {
                    ...item,
                    buildingHeight: action.value.buildingHeight
                };
            }
            return item;
          })
        }
      case UPDATE_SELECTED_BUILDING_ROTATION:
        return {
          ...state,
          buildingData: state.buildingData.map(item => {
            if (item.buildingNumber === action.value.buildingNumber) {
                return {
                    ...item,
                    buildingRotation: action.value.buildingRotation
                };
            }
            return item;
          })
        }
      case UPDATE_SELECTED_ROOF_MATERIAL:
        return {
          ...state,
          buildingData: state.buildingData.map(item => {
            if (item.buildingNumber === action.value.buildingNumber) {
                return {
                    ...item,
                    material: action.value.material
                };
            }
            return item;
          })
        }
    default:
      return state;
  }
};

export default configurator;
