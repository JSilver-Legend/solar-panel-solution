import {
  ADD_ROOF,
  REMOVE_ROOF,
  UPDATE_ROOF_SPACE,
  UPDATE_ROOF_DETAILS,
  SET_EDIT_ROOF_OPEN,
  SET_SELECTED_ROOF,
  SET_ROOF_MOBILE_MENU_OPEN,
  ADD_RESULT_ROOF,
  REMOVE_RESULT_ROOF
} from "../types";
import * as roofActions from "../actions";
import roof from "../roof";

it("should dispatch remove roof", () => {
  const expectedAction = {
    type: REMOVE_ROOF,
    roofId: 1
  };
  expect(roofActions.removeRoof(1)).toEqual(expectedAction);
});

it("should dispatch roof update details", () => {
  let roofId = 1;
  let details = {
    obstacles: true,
    southPosition: false
  };
  const expectedAction = {
    type: UPDATE_ROOF_DETAILS,
    details: details,
    roofId: roofId
  };
  expect(roofActions.updateRoof(roofId, details)).toEqual(expectedAction);
});

it("should dispatch roof update space", () => {
  let roofId = 1;
  let space = [{ lat: 1, lng: 1 }];
  let area = 334;
  const expectedAction = {
    type: UPDATE_ROOF_SPACE,
    space: space,
    area: area,
    roofId: roofId
  };
  expect(roofActions.updateRoofSpace(roofId, space, area)).toEqual(
    expectedAction
  );
});

it("should select a roof", () => {
  const expectedAction = {
    type: SET_SELECTED_ROOF,
    payload: 1
  };
  expect(roofActions.setSeletedRoof(1)).toEqual(expectedAction);
});

it("should set edit roof open", () => {
  const expectedAction = {
    type: SET_EDIT_ROOF_OPEN,
    payload: true
  };
  expect(roofActions.setEditRoofOpen(true)).toEqual(expectedAction);
});

it("should set roof mobile menu open", () => {
  const expectedAction = {
    type: SET_ROOF_MOBILE_MENU_OPEN,
    payload: true
  };
  expect(roofActions.setRoofMenuOpen(true)).toEqual(expectedAction);
});
