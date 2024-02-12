import { SET_DETAILS, SET_PACKAGETYPE, SET_BOXTYPE, SET_BOXTABUNFOLDED } from "./types";

export const initialState = {
  car: true,
  consumtion: 1,
  ownConsumtion: null,
  packageType: 3,
  boxType: 0,
  boxTabUnfolded: false
};

export const details = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAILS:
      return {
        ...state,
        ...action.payload
      };

      case SET_PACKAGETYPE:
        return {
          ...state,
          packageType: action.payload
        };
        case SET_BOXTYPE:
          return {
            ...state,
            boxType: action.payload
          };
          case SET_BOXTABUNFOLDED:
          return {
            ...state,
            boxTabUnfolded: action.payload
          };

    default:
      return state;
  }
};

export default details;
