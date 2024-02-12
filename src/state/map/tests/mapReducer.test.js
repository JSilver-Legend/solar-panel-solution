import { map as reducer, initialState } from "../reducer";
import { ON_POLYGON_COMPLETE, SET_DRAWING_MODE, SET_MAP_CENTER } from "../types";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it("should set new map center", () => {
  expect(
    reducer(undefined, {
      type: SET_DRAWING_MODE,
      payload: "polygon"
    })
  ).toEqual({
    ...initialState,
    drawingMode:"polygon"
  });
});

it("should set drawing mode", () => {
  let center = { lat: 61, lng: 14};
  expect(
    reducer(undefined, {
      type: SET_MAP_CENTER,
      payload: center
    })
  ).toEqual({
    ...initialState,
    center:center
  });
});
