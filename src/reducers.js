import { combineReducers } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER
} from "./actions";

// @todo - look into the need for token expiration
const authReducer = (
  state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem("drf_token") ? true : false,
    username: localStorage.getItem("drf_username")
      ? localStorage.getItem("drf_username")
      : null,
    token: localStorage.getItem("drf_token")
      ? localStorage.getItem("drf_token")
      : null,
    errorMessage: null
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        username: action.creds.username,
        token: null
      });
    case LOGIN_SUCCESS:
      // @todo: do we need to catch an error here?
      localStorage.setItem("drf_token", action.token);
      localStorage.setItem("drf_username", action.username);
      return {
        ...state,
        ...{
          isFetching: false,
          isAuthenticated: true,
          errorMessage: null,
          token: action.token
        }
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        ...{
          isFetching: false,
          isAuthenticated: false,
          username: null,
          token: null,
          errorMessage: action.message
        }
      };
    case LOGOUT_USER:
      localStorage.removeItem("drf_token");
      localStorage.removeItem("drf_username");
      return {
        ...state,
        ...{
          isFetching: false,
          isAuthenticated: false,
          username: null,
          token: null,
          errorMessage: null
        }
      };
    default:
      return state;
  }
};

export default authReducer;
