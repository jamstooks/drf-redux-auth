import "isomorphic-fetch";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const requestLogin = creds => ({
  type: LOGIN_REQUEST,
  creds
});

const receiveLogin = (token, username) => ({
  type: LOGIN_SUCCESS,
  token,
  username
});

const loginError = message => ({
  type: LOGIN_FAILURE,
  message
});

export const LOGOUT_USER = "LOGOUT_USER";

export const logoutUser = () => ({
  type: LOGOUT_USER
});

const BASE_AUTH_URL = process.env.REACT_APP_AUTH_URL;

/**
 * Async connection to the `obtain_auth_token` DRF view
 */
export const loginUser = creds => {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: creds.username,
      password: creds.password
    })
  };

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return (
      fetch(BASE_AUTH_URL, config)
        .then(response => {
          return response.json().then(json => ({ json, response }));
        })
        .then(({ json, response }) => {
          if (!response.ok) {
            dispatch(loginError(json));
            return Promise.reject(json);
          } else {
            // Dispatch the success action
            return dispatch(receiveLogin(json.token, creds.username));
          }
        })
        // @todo - how can I use this to catch network errors,
        // but not respond to every login failure?
        .catch(err => ({})) //console.log("Error: ", err))
    );
  };
};
