import address from "./address";
import roofs from "./roofs";
import map from "./map";
import details from "./details";
import result from "./result";
import obstacles from "./obstacles";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  address,
  details,
  map,
  result,
  roofs,
  obstacles
});

const rootReducer = (state, action) => {
  let rootState = undefined; // State undefined will reset reducer to initial state
  switch (action.type) {
    case "RESET":
      state.roofs = roofs(rootState, action);
      state.obstacles = obstacles(rootState, action);
      state.details = details(rootState, action);
      state._persist = {};
      break;
    default:
      break;
  }
  return appReducer(state, action);
};

export default rootReducer;
