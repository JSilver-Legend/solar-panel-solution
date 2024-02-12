import { SET_DETAILS } from "../types";
import * as detailsActions from "../actions";

it("should dispatch set details", () => {
  const expectedAction = {
    type: SET_DETAILS,
    payload: {
      ownConsumtion: 3000
    }
  };
  expect(
    detailsActions.setDetails({
      ownConsumtion: 3000
    })
  ).toEqual(expectedAction);
});
