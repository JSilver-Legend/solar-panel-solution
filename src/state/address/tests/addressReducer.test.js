import { address as reducer, initialState } from "../reducer";
import { SET_ADDRESS, SEARCH_ADDRESS_SUCCESS } from "../types";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

let address = {
  id: 1
};

it("should set an address", () => {
  expect(
    reducer(undefined, {
      type: SET_ADDRESS,
      payload: address
    })
  ).toEqual({
    ...initialState,
    address: address
  });
});

it("should set search addresses", () => {
  expect(
    reducer(undefined, {
      type: SEARCH_ADDRESS_SUCCESS,
      payload: [address]
    })
  ).toEqual({
    ...initialState,
    searchAddressResults: [address]
  });
});
