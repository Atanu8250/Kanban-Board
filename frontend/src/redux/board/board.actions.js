import * as boardTypes from './board.types';
import { AUTH_LOGOUT } from '../auth/auth.types';


/** 
 * * Using 'fetch' instead of 'axios' because when I'm sending error from the backend at
 * * that time axios is not able to catch the response messages with error status codes
 * * like 400 and above codes, but fetch is able get the errors with message and the 
 * * status properly,
 * * But for accessing the status we will get it from the first 'response' and for 
 * * the data we need to do 'response.json()'
 * */


// Get Boards names based on the logged-in user
export const getBoards = () => async (dispatch) => {

     dispatch({ type: boardTypes.BOARD_LOADING })

     try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/board`, {
               method: 'GET',
               headers: {
                    'authorization': sessionStorage.getItem("TOKEN"),
               }
          })
          const data = await res.json();

          if (res.ok) {
               dispatch({ type: boardTypes.GET_BOARD_SUCCES, payload: data })
          } else {
               dispatch({ type: boardTypes.BOARD_ERROR, payload: data.message })
          }

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT });
               alert(`Session Expired! \n Please Login again.. ${window.location.replace('/signin')}`);
               return;
          }
     } catch (error) {
          console.log('error:', error)
          dispatch({ type: boardTypes.BOARD_ERROR, payload: error.message })
     }
}


// Create Board
export const createBoard = (boardName) => async (dispatch) => {
     if (!boardName) return;

     dispatch({ type: boardTypes.BOARD_LOADING });

     try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/board`, {
               method: 'POST',
               body: JSON.stringify({ name: boardName }),
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("TOKEN"),
               }
          })
          const data = await res.json();

          if (res.ok) {
               dispatch(getBoards())
          } else {
               dispatch({ type: boardTypes.BOARD_ERROR, payload: data.message })
          }

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT });
               alert(`Session Expired! \n Please Login again.. ${window.location.replace('/signin')}`);
               return;
          }
     } catch (error) {
          console.log('error:', error)
          dispatch({ type: boardTypes.BOARD_ERROR, payload: error.message })
     }
}


// Patch Boards
export const editBoard = (boardId, boardName) => async (dispatch) => {

     if (!boardId || !boardName) return;

     dispatch({ type: boardTypes.BOARD_LOADING });

     try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/board/${boardId}`, {
               method: 'PATCH',
               body: JSON.stringify({ name: boardName }),
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("TOKEN"),
               }
          })
          const data = await res.json();

          if (res.ok) {
               dispatch(getBoards());
          } else {
               dispatch({ type: boardTypes.BOARD_ERROR, payload: data.message })
          }
          
          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT })
               alert(`Session Expired! \n Please Login again.. ${window.location.replace('/signin')}`)
               return;
          }
     } catch (error) {
          console.log('error:', error)
          dispatch({ type: boardTypes.BOARD_ERROR, payload: error.message })
     }
}

// Delete Board
export const deleteBoard = (boardId) => async (dispatch) => {
     if (!boardId) return;

     dispatch({ type: boardTypes.BOARD_LOADING });

     try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/board/${boardId}`, {
               method: 'DELETE',
               headers: {
                    'authorization': sessionStorage.getItem("TOKEN"),
               }
          })
          const data = await res.json();

          if (res.ok) {
               dispatch(getBoards())
          } else {
               dispatch({ type: boardTypes.BOARD_ERROR, payload: data.message })
          }
          
          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT })
               alert(`Session Expired! \n Please Login again.. ${window.location.replace('/signin')}`)
               return;
          }
     } catch (error) {
          console.log('error:', error)
          dispatch({ type: boardTypes.BOARD_ERROR, payload: error.message })
     }
}