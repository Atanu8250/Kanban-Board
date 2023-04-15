import * as taskTypes from './tasks.types';


const initialState = {
     loading: false,
     error: {
          status: false,
          message: ""
     },
     data: {}
}


export const reducer = (state = initialState, { type, payload }) => {
     switch (type) {
          case taskTypes.TASKS_LOADING: {
               return { ...state, loading: true, error: { status: false, message: '' } };
          }

          case taskTypes.TASKS_ERROR: {
               return { ...state, loading: false, error: { status: true, message: payload } };
          }

          case taskTypes.TASKS_SUCCESS: {
               return { ...state, loading: false, error: { status: false, message: '' } };
          }

          case taskTypes.GET_TASKS_SUCCESS: {
               return { loading: false, error: { status: false, message: '' }, data: payload };
          }

          case taskTypes.DELETE_TASKS: {
               return initialState
          }

          default: return state;
     }
}