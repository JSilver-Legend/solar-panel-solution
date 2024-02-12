import { ON_POLYGON_COMPLETE, SET_DRAWING_MODE, SET_MAP_CENTER } from "../types";
import * as mapActions from "../actions";

it("should dispatch set details", () => {
  let coords = [{lat:1,lng:2}];
  let area = 123;
  const expectedAction = {
    type: ON_POLYGON_COMPLETE,
    coords: coords,
    area: area
  };
  expect(mapActions.onPolygonComplete(coords,area)).toEqual(expectedAction);
});

it("should dispatch set drawing mode", () => {
  const expectedAction = {
    type: SET_DRAWING_MODE,
    payload: "polygon"
  };
  expect(
    mapActions.activateDrawingMode()
  ).toEqual(expectedAction);
});

it("should dispatch set drawing mode to not drawing", () => {
  const expectedAction = {
    type: SET_DRAWING_MODE,
    payload: ""
  };
  expect(
    mapActions.deactivateDrawingMode()
  ).toEqual(expectedAction);
});

it("should dispatch set new center", () => {
  let center = { lat: 61.099222, lng: 14.651552 };
  const expectedAction = {
    type: SET_MAP_CENTER,
    payload: center
  };
  expect(
    mapActions.updateCenter(center)
  ).toEqual(expectedAction);
});
