import { details as reducer, initialState } from "../reducer";
import { SET_DETAILS } from "../types";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

let details = {
  car: true,
  consumtion: 1,
  ownConsumtion: 3000
};

it("should set details", () => {
  expect(
    reducer(undefined, {
      type: SET_DETAILS,
      payload: details
    })
  ).toEqual(details);
});
