import { CLEAR_ADDRESS, SET_ADDRESS, SEARCH_ADDRESS_SUCCESS } from "./types";

export const initialState = {
  searchAddressResults: [],
  address: null
};

export const address = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case SEARCH_ADDRESS_SUCCESS:
      return {
        ...state,
        searchAddressResults: action.payload
      };
    case CLEAR_ADDRESS:
      return initialState;
    default:
      return state;
  }
};

export default address;
