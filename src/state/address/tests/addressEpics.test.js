import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { getSearchAddressesEpic, setAddressByIdEpic } from "../epics";
import { searchAddressSuccess, setAddress } from "../actions";

import {
  SEARCH_ADDRESS,
  SET_ADDRESS_BY_ID,
  SEARCH_ADDRESS_SUCCESS
} from "../types";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual[0].notification.value).toEqual(expected[0].notification.value);
});

it("should emit the right action upon completion", () => {
  testScheduler.run(({ hot, cold, expectObservable }) => {
    let addressReply = [{ id: 1 }, { id: 2 }];
    const action$ = hot("-a", {
      a: { type: SEARCH_ADDRESS, payload: "orsa" }
    });
    const state$ = null;
    const googleApiService = {
      searchAddress: query =>
        cold("--a", {
          a: addressReply
        })
    };
    const output$ = getSearchAddressesEpic(action$, state$, {
      googleApiService
    });
    expectObservable(output$).toBe("---a", {
      a: searchAddressSuccess(addressReply)
    });
  });
});

it("should correctly call googleApiService in search address epic", done => {
  const googleApiService = { searchAddress: jest.fn() };
  googleApiService.searchAddress.mockReturnValue(Promise.resolve([{ id: 1 }]));

  const action$ = of({ type: SEARCH_ADDRESS, payload: "orsa" });
  const state$ = null;
  const output$ = getSearchAddressesEpic(action$, state$, { googleApiService });

  output$.subscribe(() => {
    expect(googleApiService.searchAddress).toHaveBeenCalledWith("orsa");
    done();
  });
});

it("should emit the right action upon completion", () => {
  testScheduler.run(({ hot, cold, expectObservable }) => {
    let addressReply = {
      id: 1,
      name: "Min plats",
      geometry: {
        location: {
          lat: jest.fn().mockReturnValueOnce(10),
          lng: jest.fn().mockReturnValueOnce(10)
        }
      }
    };
    let addressExpexted = {
      name: "Min plats",
      lat: 10,
      lng: 10
    };
    const action$ = hot("-a", {
      a: { type: SET_ADDRESS_BY_ID, payload: 1 }
    });
    const state$ = of({
      address: {
        searchAddressResults: [{ id: 1, place_id: 2 }]
      }
    });
    const googleApiService = {
      getPlaceDetails: id =>
        cold("--a", {
          a: addressReply
        })
    };
    const output$ = setAddressByIdEpic(action$, state$, { googleApiService });
    expectObservable(output$).toBe("---a", {
      a: setAddress(addressExpexted)
    });
  });
});
