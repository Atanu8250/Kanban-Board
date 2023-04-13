import * as boardTypes from './board.types';


const initialState = {
     loading: false,
     error: {
          status: false,
          message: ""
     },
     data: []
}


export const reducer = (state = initialState, { type, payload }) => {
     switch (type) {
          case boardTypes.BOARD_LOADING: {
               return { ...state, loading: true, error: { status: false, message: '' } };
          }

          case boardTypes.BOARD_ERROR: {
               return { ...state, loading: false, error: { status: true, message: payload } };
          }

          case boardTypes.BOARD_SUCCESS: {
               return { ...state, loading: false, error: { status: false, message: '' } };
          }

          case boardTypes.GET_BOARD_SUCCES: {
               return { loading: false, error: { status: false, message: '' }, data: payload };
          }

          default: return state;
     }
}