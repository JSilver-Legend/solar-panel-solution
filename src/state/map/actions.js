import { ON_POLYGON_COMPLETE, SET_DRAWING_MODE, SET_PLACING_OBSTACLE, SET_MAP_CENTER } from "./types";

export const onPolygonComplete = (polygon, area) => ({
  type: ON_POLYGON_COMPLETE,
  coords: polygon,
  area: area
});
export const activateDrawingMode = () => ({
  type: SET_DRAWING_MODE,
  payload: "polygon"
});

export const deactivateDrawingMode = () => ({
  type: SET_DRAWING_MODE,
  payload: ""
});

export const setIsPlacingObstacle = trueOrFalse => ({
  type: SET_PLACING_OBSTACLE,
  payload: trueOrFalse
});

export const updateCenter = newCenter => ({
  type: SET_MAP_CENTER,
  payload: newCenter
});
