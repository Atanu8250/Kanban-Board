import * as authTypes from './auth.types';
import axios from 'axios';

export const signin = (cred, toastMsg) => async (dispatch) => {

     if (!cred.email || !cred.password) return;

     dispatch({ type: authTypes.AUTH_LOADING });

     try {
          const res = await axios.post('/signin', cred);

          if (res.status === 200) {
               dispatch({ type: authTypes.AUTH_LOGIN_SUCCESS, payload: res.data.user })
          } else {
               dispatch({ type: authTypes.AUTH_ERROR })
          }

          toastMsg({
               title: res.data.message,
               status: res.status === 200 ? 'success' : 'warning',
          })

     } catch (error) {
          console.log('error:', error)
          dispatch({ type: authTypes.AUTH_ERROR })
          toastMsg({
               title: error.message,
               status: 'error'
          })
     }
}


export const signup = (cred, toastMsg) => async (dispatch) => {
     if (!cred.username || !cred.email || !cred.password) return;

     dispatch({ type: authTypes.AUTH_LOADING })

     try {
          const res = await axios.post("/signup", cred)
          dispatch({ type: res.status === 201 ? authTypes.AUTH_SUCCESS : authTypes.AUTH_ERROR });

          toastMsg({
               title: res.data.message,
               status: res.status === 200 ? 'success' : 'warning',
          })
     } catch (error) {
          console.log('error:', error)
          dispatch({ type: authTypes.AUTH_ERROR })
          toastMsg({
               title: error.message,
               status: 'error'
          })
     }

}