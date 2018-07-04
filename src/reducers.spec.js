import authReducer from "./reducers";
import localStorage from "./testUtils";

const CREDS = {
  username: "user",
  password: "pass"
};

localStorage.removeItem("drf_token");
localStorage.removeItem("drf_username");

describe("auth reducers", () => {
  beforeEach(() => {
    global.oldLocalStorage = global.localStorage;
    global.localStorage = localStorage;
  });
  afterEach(() => {
    global.localStorage = global.oldLocalStorage;
  });

  it("should handle initial state", () => {
    expect(authReducer(undefined, [])).toEqual({
      isFetching: false,
      isAuthenticated: false,
      username: null,
      token: null,
      errorMessage: null
    });
  });

  it("should persist login state", () => {
    localStorage.setItem("drf_token", "blahblahtoken");
    localStorage.setItem("drf_username", "user");
    expect(authReducer(undefined, [])).toEqual({
      isFetching: false,
      isAuthenticated: true,
      username: "user",
      token: "blahblahtoken",
      errorMessage: null
    });
    localStorage.removeItem("drf_token");
    localStorage.removeItem("drf_username");
  });

  it("should handle LOGIN_REQUEST ", () => {
    expect(
      authReducer(
        {
          isFetching: false,
          isAuthenticated: false,
          username: null,
          token: null,
          errorMessage: null
        },
        {
          type: "LOGIN_REQUEST",
          creds: CREDS
        }
      )
    ).toEqual({
      isFetching: true,
      isAuthenticated: false,
      username: "user",
      token: null,
      errorMessage: null
    });
  });

  it("should handle LOGIN_SUCCESS ", () => {
    expect(
      authReducer(
        {
          isFetching: true,
          isAuthenticated: false,
          username: "user",
          token: null,
          errorMessage: null
        },
        {
          type: "LOGIN_SUCCESS",
          token: "blahblah",
          username: CREDS.username
        }
      )
    ).toEqual({
      isFetching: false,
      isAuthenticated: true,
      username: "user",
      token: "blahblah",
      errorMessage: null
    });
    expect(localStorage.getItem("drf_token")).toEqual("blahblah");
    expect(localStorage.getItem("drf_username")).toEqual(CREDS.username);
  });

  it("should handle LOGIN_FAILURE ", () => {
    expect(
      authReducer(
        {
          isFetching: true,
          isAuthenticated: false,
          username: "user",
          token: null,
          errorMessage: null
        },
        {
          type: "LOGIN_FAILURE",
          message: "d'oh"
        }
      )
    ).toEqual({
      isFetching: false,
      isAuthenticated: false,
      username: null,
      token: null,
      errorMessage: "d'oh"
    });
  });

  it("should handle LOGOUT_USER ", () => {
    expect(
      authReducer(
        {
          isFetching: false,
          isAuthenticated: true,
          username: "user",
          token: "blahblah",
          errorMessage: null
        },
        {
          type: "LOGOUT_USER"
        }
      )
    ).toEqual({
      isFetching: false,
      isAuthenticated: false,
      username: null,
      token: null,
      errorMessage: null
    });
    expect(localStorage.getItem("drf_token")).toEqual(undefined);
    expect(localStorage.getItem("drf_username")).toEqual(undefined);
  });
});
