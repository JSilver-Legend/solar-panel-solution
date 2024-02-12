import {result as reducer, initialState} from '../reducer'
import {
  SET_RESULT_MOBILE_OPEN,
  FETCH_ESTIMATE_RESULT,
  FETCH_ESTIMATE_RESULT_SUCCESS
} from '../types';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

let estimate = {
  savingsPerMonth:3000,
  annualSavings:12000,
  paybackTimeInYears:12,
  solarPanelQuantity:8,
  solarPanelType:{
    name:"Premium solpanel",
    wattsPerPanel:400,
    size:35,
    description:"",
    img:""
  }
}

it('should set result mobile menu open', () => {
  expect(reducer(undefined, {
    type:SET_RESULT_MOBILE_OPEN,
    payload:true
  })).toEqual({
    ...initialState,
    resultMobileMenuOpen:false
  });
});

it('should update the estimate with new data', () => {
  expect(reducer(undefined, {
    type:FETCH_ESTIMATE_RESULT_SUCCESS,
    payload:estimate
  })).toEqual({
    ...initialState,
    ...estimate,
    savingsPerMonth:3000,
    solarPanelQuantity:8
  });
});
