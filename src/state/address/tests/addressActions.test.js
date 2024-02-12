import {
  SEARCH_ADDRESS,
  SEARCH_ADDRESS_SUCCESS,
  SET_ADDRESS,
  SET_ADDRESS_BY_ID
} from "../types";
import * as addressActions from "../actions";

it("should dispatch search address", () => {
  const expectedAction = {
    type: SEARCH_ADDRESS,
    payload: "query"
  };
  expect(addressActions.searchAddress("query")).toEqual(expectedAction);
});

it("should dispatch search address success", () => {
  let addresses = [{ id: 1 }, { id: 2 }];
  const expectedAction = {
    type: SEARCH_ADDRESS_SUCCESS,
    payload: addresses
  };
  expect(addressActions.searchAddressSuccess(addresses)).toEqual(
    expectedAction
  );
});

it("should dispatch set address", () => {
  let address = { id: 1 };
  const expectedAction = {
    type: SET_ADDRESS,
    payload: address
  };
  expect(addressActions.setAddress(address)).toEqual(expectedAction);
});
