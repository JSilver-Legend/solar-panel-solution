import {
  SET_RESULT_MOBILE_OPEN,
  FETCH_ESTIMATE_RESULT,
  FETCH_ESTIMATE_RESULT_SUCCESS
} from '../types';
import * as resultActions from '../actions';

it('should dispatch open result mobile menu', () => {
  const expectedAction = {
    type: SET_RESULT_MOBILE_OPEN,
    payload:true
  }
  expect(resultActions.setResultMobileOpen(true)).toEqual(expectedAction);
});

it('should dispatch set estimate fetch succcess data',() => {
  let payload = {
    savingsPerMonth:3000,
    annualSavings:12000
  }
  const expectedAction = {
    type: FETCH_ESTIMATE_RESULT_SUCCESS,
    payload:payload
  }
  expect(resultActions.fetchEstimateResultSuccess(payload)).toEqual(expectedAction);
});
