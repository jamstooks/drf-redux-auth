import { loginUser, logoutUser } from "./actions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const CREDS = {
  username: "user",
  password: "pass"
};

/**
 * Note, if you'd like to use these tests without mocking fetch
 * (when testing with a backend, for example)
 * you'll have to comment out the `fetch.once()` functions
 * AND `global.fetch = require("jest-fetch-mock");` above.
 */

describe("auth actions", () => {
  beforeEach(() => {
    global.oldFetch = global.fetch;
    global.fetch = require("jest-fetch-mock");
  });
  afterEach(() => {
    global.fetch = global.oldFetch;
  });

  it("loginUser failure creates LOGIN_REQUEST and LOGIN_FAILURE", () => {
    fetch.once(
      JSON.stringify({
        non_field_errors: ["Unable to log in with provided credentials."]
      }),
      { status: 400 }
    );

    const BOGUS_CREDS = { username: "bogus", password: "bogus" };

    const expectedActions = [
      {
        type: "LOGIN_REQUEST",
        creds: BOGUS_CREDS
      },
      {
        type: "LOGIN_FAILURE",
        message: ["Unable to log in with provided credentials."]
      }
    ];
    const store = mockStore({ auth: {} });

    return store.dispatch(loginUser(BOGUS_CREDS)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it("loginUser success creates LOGIN_REQUEST and LOGIN_SUCCESS", () => {
    fetch.once(JSON.stringify({ token: "blahblah" }));
    const expectedActions = [
      {
        type: "LOGIN_REQUEST",
        creds: CREDS
      },
      {
        type: "LOGIN_SUCCESS",
        token: "blahblah",
        username: "user"
      }
    ];
    const store = mockStore({ auth: {} });

    return store.dispatch(loginUser(CREDS)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it("logoutUser should create LOGOUT_USER action", () => {
    expect(logoutUser()).toEqual({
      type: "LOGOUT_USER"
    });
  });
});
