import {
  ADD_OBSTACLE,
  REMOVE_OBSTACLE,
  UPDATE_OBSTACLE_SPACE,
  UPDATE_OBSTACLE_DETAILS,
  SET_EDIT_OBSTACLE_OPEN,
  SET_SELECTED_OBSTACLE,
  SET_OBSTACLE_MOBILE_MENU_OPEN,
  CLEAN_OBSTACLES,
  CREATE_OBSTACLE_SQUARE,

  /**
   * <--- harrypotter --->
   */

  // ...builder component
  SET_HIGHEST_BUILDING_HEIGHT,
  CREATE_HIGHEST_BUILDING_HEIGHT,
  GET_SELECTED_SOLAR_OBJECT,
  HANDLE_ORBIT_CAMERA,
  SET_OBSTACLES_DATA,
  //---------------------
} from "./types";
import { utils } from "services";

export const addObstacle = (obstacleCoords, area) => ({
  type: ADD_OBSTACLE,
  obstacle: {
    id: utils.uuidv4(),
    name: "",
    space: obstacleCoords,
    area: area,
    obstacleType: "0"
  }
});

export const createObstacleSquare = (mapCenter) => ({
  type: CREATE_OBSTACLE_SQUARE,
  mapCenter: mapCenter
});

export const cleanObstacles = () => ({
  type: CLEAN_OBSTACLES
});

export const removeObstacle = id => ({
  type: REMOVE_OBSTACLE,
  obstacleId: id
});

export const updateObstacle = (id, newObstacleValues) => ({
  type: UPDATE_OBSTACLE_DETAILS,
  details: newObstacleValues,
  obstacleId: id
});

export const updateObstacleSpace = (id, newSpace, area) => ({
  type: UPDATE_OBSTACLE_SPACE,
  space: newSpace,
  area: area,
  obstacleId: id
});

export const setSelectedObstacle = obstacleId => ({
  type: SET_SELECTED_OBSTACLE,
  payload: obstacleId
});

export const setEditObstacleOpen = open => ({
  type: SET_EDIT_OBSTACLE_OPEN,
  payload: open
});

export const setObstacleMenuOpen = open => ({
  type: SET_OBSTACLE_MOBILE_MENU_OPEN,
  payload: open
});

/**
 * <--- harrypotter --->
 */

// ... builder component
export const setHighestBuildingHeight = value => ({
  type: SET_HIGHEST_BUILDING_HEIGHT,
  payload: value
})

export const createHighestBuildingHeight = value => ({
  type: CREATE_HIGHEST_BUILDING_HEIGHT,
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

export const setObstaclesData = value => ({
  type: SET_OBSTACLES_DATA,
  payload: value,
})
//----------------------