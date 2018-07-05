# Django Rest Framework Authentication for React and Redux

[![Build Status](https://travis-ci.org/jamstooks/drf-redux-auth.svg?branch=master)](https://travis-ci.org/jamstooks/drf-redux-auth)

Provides actions, reducers, and components to authenticate with
django using Django Rest Framework's
[Token Authentication](http://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication)

[Demo Available](https://github.com/jamstooks/drf-redux-auth-demo)

## Install

    npm install --save drf-redux-auth

## Setup

Setup should be simple. Just add the reducers where you `combineReducers`:

    import { authReducer } from "drf-redux-auth";
    
    const rootReducer = combineReducers({
      ...
      auth: authReducer,
      ...
    });
    
This also relies on an environment variable, `REACT_APP_AUTH_URL`
for the DRF URL for now.
    
## State Shape

The state provided by this libary is the following:

    {
        username,
        token,
        isAuthenticated: <bool>,
        isFetching: <bool>,
        errorMessage
    }

## Actions

    import { loginUser, logoutUser } from "drf-redux-auth";
    
    const mapDispatchToProps = dispatch => ({
      ...
      logout: () => dispatch(logoutUser()),
      login: creds => dispatch(loginUser(creds)),
      ...
    });
    
## Components

Two extremely basic components are available:

    import { AuthStatus, Login } from "drf-redux-auth";
    
You'll want to write your own, but they're useful for reference.
    
## References

### Implementation Design

 - [Redux Middleware](https://redux.js.org/advanced/middleware)
 - [Auth0 JWT Authentication](https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/)
 - [django-react-auth](https://github.com/geezhawk/django-react-auth)

### Packaging Decisions

 - [bookercodes](https://github.com/bookercodes/articles/blob/master/how-to-build-and-publish-es6-npm-modules-today-with-babel.md)
