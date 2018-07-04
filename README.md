# Django Rest Framework Authentication for React and Redux

Provides actions, reducers, and components to authenticate with
django using Django Rest Framework's
[Token Authentication](http://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication)

## Install

    npm install --save drf-redux-auth

## Setup

Setup should be simple. Just add the reducers where you `combineReducers`:

    import authReducer from 'drf-react-auth';
    
    const rootReducer = combineReducers({
      ...
      auth: authReducer,
      ...
    });
    
Then apply the middleware where you create your store:

    const store = createStore(
      rootReducer,
      applyMiddleware(
        ...,
        djangoDRFAuthMiddleware,
        ...
      )
    );
    
## State Shape

The state provided by this libary is the following:

    {
        username,
        token,
        isAuthenticated: <bool>,
        isFetching: <bool>,
        errorMessage
    }
    
## References

### Implementation Design

 - [Redux Middleware](https://redux.js.org/advanced/middleware)
 - [Auth0 JWT Authentication](https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/)
 - [django-react-auth](https://github.com/geezhawk/django-react-auth)

### Packaging Decisions

 - [bookercodes](https://github.com/bookercodes/articles/blob/master/how-to-build-and-publish-es6-npm-modules-today-with-babel.md)