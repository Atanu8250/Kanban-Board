import * as authTypes from './auth.types';

/** 
 * * Using 'fetch' instead of 'axios' because when I'm send error from the backend at
 * * that time axios is not able to catch the response messages with error status codes
 * * like 400 and above codes, but fetch is able get the errors with message and the 
 * * status properly,
 * * But for accessing the status we will get it from the first 'response' and for 
 * * the data we need to do 'response.json()'
 * */



/**
 * In 'cred' we're passing an Object with 'username', 'email', and 'password' key with 
 * proper values and 
 * 'navigate' for naviagting the user to the 'sign-in' page
 * In the 'toastMsg' we're passing the returned function by the 'useToastMsg' custom-hook
 * */

export const signin = (cred, navigate, toastMsg) => async (dispatch) => {

     if (!cred.email || !cred.password) return;

     dispatch({ type: authTypes.AUTH_LOADING });

     try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/signin`, {
               method: 'POST',
               body: JSON.stringify(cred),
               headers: {
                    'Content-Type': 'application/json'
               }
          })

          const data = await res.json();

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT })
               alert(`Session Expired! \n Please Login again.. ${window.location.replace('/signin')}`)
          }

          if (res.ok) {
               dispatch({ type: authTypes.AUTH_LOGIN_SUCCESS, payload: data.user });
               navigate('/');
          } else {
               dispatch({ type: authTypes.AUTH_ERROR });
          }

          toastMsg({
               title: data.message,
               status: res.ok ? 'success' : 'warning',
          })

     } catch (error) {
          console.log('error:', error);
          dispatch({ type: authTypes.AUTH_ERROR });
          toastMsg({
               title: error.message,
               status: 'error'
          });
     }
}


/**
 * In 'cred' we're passing an Object with 'username', 'email', and 'password' key with 
 * proper values and 
 * 'navigate' for naviagting the user to the 'sign-up' page
 * In the 'toastMsg' we're passing the returned function by the 'useToastMsg' custom-hook
 * */
export const signup = (cred, navigate, toastMsg) => async (dispatch) => {

     if (!cred.username || !cred.email || !cred.password) return;

     dispatch({ type: authTypes.AUTH_LOADING });

     try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/signup`, {
               method: "POST",
               body: JSON.stringify(cred),
               headers: {
                    'Content-Type': 'application/json'
               }
          })

          const data = await res.json();
          
          
          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT })
               alert(`Session Expired! \n Please Login again.. ${window.location.replace('/signin')}`)
          }

          if(res.ok) navigate('/signin');
          dispatch({ type: res.ok ? authTypes.AUTH_SUCCESS : authTypes.AUTH_ERROR });

          toastMsg({
               title: data.message,
               status: res.ok ? 'success' : 'warning',
          });
     } catch (error) {
          console.log('error:', error);
          dispatch({ type: authTypes.AUTH_ERROR })
          toastMsg({
               title: error.message,
               status: 'error'
          });
     }
}