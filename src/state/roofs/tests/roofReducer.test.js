import { roofs as reducer, initialState } from "../reducer";
import {
  ADD_ROOF,
  REMOVE_ROOF,
  UPDATE_ROOF_SPACE,
  UPDATE_ROOF_DETAILS,
  SET_SELECTED_ROOF,
  SET_EDIT_ROOF_OPEN,
  SET_ROOF_MOBILE_MENU_OPEN,
  ADD_RESULT_ROOF,
  REMOVE_RESULT_ROOF
} from "../types";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

let roof = {
  id: 1,
  name: "My roof",
  space: [],
  southPostition: false,
  obstacles: false,
  roofType: "Plåt"
};

let updateRoof = {
  southPostition: true,
  obstacles: false,
  roofType: "Tegel",
  name: "My roof"
};

const positiveSpace = [{ lat: 1, lng: 1 }];

it("should add a roof and select it", () => {
  expect(
    reducer(undefined, {
      type: ADD_ROOF,
      roof: roof
    })
  ).toEqual({
    ...initialState,
    addRoofDialogOpen: true,
    selectedRoofId: roof.id,
    roofs: [roof]
  });
});

it("should remove a roof by id", () => {
  expect(
    reducer(
      {
        ...initialState,
        roofs: [roof]
      },
      {
        type: REMOVE_ROOF,
        roofId: 1
      }
    )
  ).toEqual({
    ...initialState,
    roofs: []
  });
});

it("should update space of roof by id", () => {
  expect(
    reducer(
      {
        ...initialState,
        roofs: [roof]
      },
      {
        type: UPDATE_ROOF_SPACE,
        roofId: 1,
        space: positiveSpace
      }
    )
  ).toEqual({
    ...initialState,
    roofs: [{ ...roof, space: positiveSpace }]
  });
});

it("should update details of roof by id", () => {
  expect(
    reducer(
      {
        ...initialState,
        roofs: [roof],
        addRoofDialogOpen: true
      },
      {
        type: UPDATE_ROOF_DETAILS,
        roofId: 1,
        details: updateRoof
      }
    )
  ).toEqual({
    ...initialState,
    roofs: [{ ...roof, ...updateRoof }],
    addRoofDialogOpen: false
  });
});

it("should select a roof", () => {
  expect(
    reducer(undefined, {
      type: SET_SELECTED_ROOF,
      payload: 2
    })
  ).toEqual({
    ...initialState,
    selectedRoofId: 2
  });
});

it("should open roof set edit menu open", () => {
  expect(
    reducer(undefined, {
      type: SET_EDIT_ROOF_OPEN,
      payload: true
    })
  ).toEqual({
    ...initialState,
    addRoofDialogOpen: true
  });
});

it("should open roof mobile menu", () => {
  expect(
    reducer(undefined, {
      type: SET_ROOF_MOBILE_MENU_OPEN,
      payload: true
    })
  ).toEqual({
    ...initialState,
    roofMobileMenuOpen: true
  });
});
