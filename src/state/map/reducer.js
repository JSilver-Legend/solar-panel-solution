import { ON_POLYGON_COMPLETE, SET_DRAWING_MODE, SET_PLACING_OBSTACLE, SET_MAP_CENTER } from "./types";

export const initialState = {
  drawingMode: "",
  isPlacingObstacle: false,
  center: { lat: 61.099222, lng: 14.651552 }
};

export const map = (state = initialState, action) => {
  switch (action.type) {
    case ON_POLYGON_COMPLETE:
      return {
        ...state,
        drawingMode: ""
      };
    case SET_DRAWING_MODE:
      return {
        ...state,
        drawingMode: action.payload
      };
      case SET_PLACING_OBSTACLE:
      return {
        ...state,
        isPlacingObstacle: action.payload
      };
    case SET_MAP_CENTER:
      return {
        ...state,
        center: action.payload
      };
    default:
      return state;
  }
};

export default map;
