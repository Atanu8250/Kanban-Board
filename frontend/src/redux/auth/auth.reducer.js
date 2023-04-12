import * as authTypes from './auth.types';

const initialState = {
     loading: false,
     error: false,
     isAuth: false,
     user: {},
}


export const reducer = (state = initialState, { type, payload }) => {

     switch (type) {
          case authTypes.AUTH_LOADING: {
               return { ...state, loading: true, error: false };
          }

          case authTypes.AUTH_ERROR: {
               return { ...state, loading: false, error: true };
          }

          case authTypes.AUTH_SUCCESS: {
               return { ...state, loading: false, error: false };
          }

          case authTypes.AUTH_LOGIN_SUCCESS: {
               sessionStorage.setItem("TOKEN", payload.token);
               return { loading: false, error: false, isAuth: true, user: payload }
          }

          case authTypes.AUTH_LOGOUT: {
               sessionStorage.removeItem("TOKEN");
               return initialState;
          }

          default: return state;
     }
}