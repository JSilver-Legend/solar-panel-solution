import {
  SEARCH_ADDRESS,
  SEARCH_ADDRESS_SUCCESS,
  SET_ADDRESS,
  SET_ADDRESS_BY_ID
} from "./types";

export const searchAddress = searchQuery => ({
  type: SEARCH_ADDRESS,
  payload: searchQuery
});
export const searchAddressSuccess = addresses => ({
  type: SEARCH_ADDRESS_SUCCESS,
  payload: addresses
});
export const setAddressById = id => ({ type: SET_ADDRESS_BY_ID, payload: id });
export const setAddress = address => ({ type: SET_ADDRESS, payload: address });
