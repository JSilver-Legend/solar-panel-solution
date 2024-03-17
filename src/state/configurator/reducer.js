import {
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
} from "./types";

export const initialState = {
  selectedBuildingNumber: null,
  buildingData: [
    { buildingNumber: 1, buildingType: 'type-1', buildingWidth: 3, buildingLength: 3, buildingHeight: 3, buildingRotation: 3, material: 'brick', roofType: 'flat', roofAngle: 3, roofPitch: 5, ridgeDirection: 'direction-1'},
    { buildingNumber: 2, buildingType: 'type-2-1', buildingWidth: 3, buildingLength: 4, buildingHeight: 3, buildingRotation: 3, material: 'concrete', roofType: 'shed', roofAngle: 4, roofPitch: 5, ridgeDirection: 'direction-1'},
    { buildingNumber: 3, buildingType: 'type-2-2', buildingWidth: 3, buildingLength: 5, buildingHeight: 3, buildingRotation: 3, material: 'metal', roofType: 'box-gable', roofAngle: 3, roofPitch: 5, ridgeDirection: 'direction-1'},
    { buildingNumber: 4, buildingType: 'type-2-3', buildingWidth: 3, buildingLength: 6, buildingHeight: 3, buildingRotation: 3, material: 'plate', roofType: 'open-gable', roofAngle: 5, roofPitch: 5, ridgeDirection: 'direction-1'},
    { buildingNumber: 5, buildingType: 'type-2-4', buildingWidth: 3, buildingLength: 7, buildingHeight: 3, buildingRotation: 3, material: 'plegel', roofType: 'saltt-box', roofAngle: 3, roofPitch: 5, ridgeDirection: 'direction-1'},
    { buildingNumber: 6, buildingType: 'type-3-1', buildingWidth: 3, buildingLength: 8, buildingHeight: 3, buildingRotation: 3, material: 'cardboard', roofType: 'flat', roofAngle: 3, roofPitch: 7, ridgeDirection: 'direction-1'},
    { buildingNumber: 7, buildingType: 'type-3-2', buildingWidth: 3, buildingLength: 9, buildingHeight: 3, buildingRotation: 3, material: 'brick', roofType: 'shed', roofAngle: 3, roofPitch: 5, ridgeDirection: 'direction-2'},
    { buildingNumber: 8, buildingType: 'type-3-3', buildingWidth: 3, buildingLength: 10, buildingHeight: 3, buildingRotation: 3, material: 'concrete', roofType: 'box-gable', roofAngle: 3, roofPitch: 5, ridgeDirection: 'direction-2'},
    { buildingNumber: 9, buildingType: 'type-3-4', buildingWidth: 3, buildingLength: 11, buildingHeight: 3, buildingRotation: 3, material: 'metal', roofType: 'open-gable', roofAngle: 6, roofPitch: 5, ridgeDirection: 'direction-2'},
    { buildingNumber: 10, buildingType: 'type-4-1', buildingWidth: 3, buildingLength: 12, buildingHeight: 3, buildingRotation: 3, material: 'plate', roofType: 'saltt-box', roofAngle: 3, roofPitch: 5, ridgeDirection: 'direction-2'},
    { buildingNumber: 11, buildingType: 'type-4-2', buildingWidth: 3, buildingLength: 13, buildingHeight: 3, buildingRotation: 3, material: 'plegel', roofType: 'flat', roofAngle: 3, roofPitch: 5, ridgeDirection: 'direction-2'},
    { buildingNumber: 12, buildingType: 'type-4-3', buildingWidth: 3, buildingLength: 14, buildingHeight: 3, buildingRotation: 3, material: 'cardboard', roofType: 'shed', roofAngle: 3, roofPitch: 5, ridgeDirection: 'direction-2'},
    { buildingNumber: 13, buildingType: 'type-4-4', buildingWidth: 3, buildingLength: 15, buildingHeight: 3, buildingRotation: 3, material: 'brick', roofType: 'box-gable', roofAngle: 3, roofPitch: 5, ridgeDirection: 'direction-2'},
  ]
};

export const configurator = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default configurator;
