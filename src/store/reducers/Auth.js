import { ActionTypes } from '../actions';

const initialState = {
  token: null,
  errorMessage: null,
  loggedIn: false,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_LOGGED_IN:
      return {
        ...initialState,
        token: action.payload.token,
        loggedIn: true,
      };
    case ActionTypes.AUTH_LOGGED_OUT:
      return {
        ...initialState,
      };
    case ActionTypes.AUTH_REQUESTING_LOGIN:
      return {
        ...initialState,
        isLoading: true,
      };
    case ActionTypes.AUTH_FAIL_LOGIN:
      return {
        ...initialState,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
};

export default reducer;
