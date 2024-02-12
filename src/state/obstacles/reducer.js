import {
    ADD_OBSTACLE,
    REMOVE_OBSTACLE,
    UPDATE_OBSTACLE_SPACE,
    UPDATE_OBSTACLE_DETAILS,
    SET_EDIT_OBSTACLE_OPEN,
    SET_SELECTED_OBSTACLE,
    SET_OBSTACLE_MOBILE_MENU_OPEN,
    ADD_RESULT_OBSTACLE,
    REMOVE_RESULT_OBSTACLE,
    CLEAN_OBSTACLES,
    CREATE_OBSTACLE_SQUARE,
    SET_OBSTACLES_DATA,
} from "./types";

import {
    utils
} from "services";

export const initialState = {
    obstacleList: [],
    addObstacleDialogOpen: false,
    selectedObstacleId: null,
    obstacleMobileMenuOpen: false,

    //----- Harry Potter -----
    obstaclesData: [],
    currentObstacleId: null,
};

export const obstacles = (state = initialState, action) => {
    switch (action.type) {
        case ADD_OBSTACLE:
            console.log('obstacleList: ', state.obstacleList);
            return {
                ...state,
                obstacleList: state.obstacleList.concat(action.Obstacle),
                selectedObstacleId: action.Obstacle.id,
            };
        case CREATE_OBSTACLE_SQUARE:
            let mapCenter = action.mapCenter;
            const pointDistance = 0.000025;
            let paths = [{
                lat: mapCenter.lat - pointDistance,
                lng: mapCenter.lng - pointDistance
            },
            {
                lat: mapCenter.lat + pointDistance,
                lng: mapCenter.lng - pointDistance
            },
            {
                lat: mapCenter.lat + pointDistance,
                lng: mapCenter.lng + pointDistance
            },
            {
                lat: mapCenter.lat - pointDistance,
                lng: mapCenter.lng + pointDistance
            }
            ];

            let newObstacle = {
                id: utils.uuidv4(),
                name: "",
                space: paths,
                area: 63,
                obstacleType: "0"
            }

            return {
                ...state,
                obstacleList: state.obstacleList.concat(newObstacle),
                selectedObstacleId: newObstacle.id
            };
        case REMOVE_OBSTACLE:
            return {
                ...state,
                obstacleList: state.obstacleList.filter(Obstacle => Obstacle.id !== action.obstacleId),
                selectedObstacleId: null
            };
        case UPDATE_OBSTACLE_SPACE:
            return {
                ...state,
                obstacleList: state.obstacleList.map(Obstacle => {
                    if (Obstacle.id === action.obstacleId) {
                        return {
                            ...Obstacle,
                            space: action.space,
                            area: action.area
                        };
                    }
                    return Obstacle;
                })
            };
        case UPDATE_OBSTACLE_DETAILS:
            return {
                ...state,
                addObstacleDialogOpen: false,
                obstacleList: state.obstacleList.map(Obstacle => {
                    if (Obstacle.id === action.obstacleId) {
                        return {
                            ...Obstacle,
                            ...action.details
                        };
                    }
                    return Obstacle;
                })
            };
        case SET_EDIT_OBSTACLE_OPEN:
            return {
                ...state,
                addObstacleDialogOpen: action.payload
            };
        case SET_SELECTED_OBSTACLE:
            return {
                ...state,
                selectedObstacleId: action.payload
            };
        case SET_OBSTACLE_MOBILE_MENU_OPEN:
            return {
                ...state,
                obstacleMobileMenuOpen: action.payload
            };
        case ADD_RESULT_OBSTACLE:
            return {
                ...state,
                selectedResultObstacleIds: state.selectedResultObstacleIds.concat(
                    action.payload
                )
            };
        case REMOVE_RESULT_OBSTACLE:
            return {
                ...state,
                selectedResultObstacleIds: state.selectedResultObstacleIds.filter(
                    obstacleId => obstacleId !== action.payload
                )
            };
        case CLEAN_OBSTACLES:
            let tempObstacles = state.obstacleList.filter(Obstacle => Obstacle.name !== "");
            let obstacleCount = 0;

            if (tempObstacles.length === 1) {
                tempObstacles[0].name = "Tak"
            } else {
                for (var i = 0; i < tempObstacles.length; i++) {
                    if (tempObstacles[i].obstacleType !== '5') {
                        tempObstacles[i].name = "Tak " + (++obstacleCount);
                    }
                }
            }
            return {
                ...state,
                obstacleList: tempObstacles
            };

        //----- Harry Potter -----
        case SET_OBSTACLES_DATA:
            return {
                ...state,
                obstaclesData: action.payload
            }
        default:
            return state;
    }
};

export default obstacles;