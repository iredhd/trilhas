import { ActionTypes } from '.';
import { Auth } from '../../services';
import { registerData } from './User';

export const loginWithEmailAndPassword = (email, password) => async (dispatch) => {
  dispatch(requestLogin());

  const AuthData = await Auth.LoginWithEmailAndPassword(email, password);

  if (AuthData.error) {
    return dispatch(failLogin(AuthData.error));
  }

  return dispatch(storeData(AuthData));
};

export const storeData = (AuthData) => async (dispatch) => {
  dispatch(registerData(AuthData.user));

  dispatch({
    type: ActionTypes.AUTH_LOGGED_IN,
    payload: {
      token: AuthData.token,
    },
  });
};

export const requestLogin = () => ({
  type: ActionTypes.AUTH_REQUESTING_LOGIN,
});

export const failLogin = (message) => ({
  type: ActionTypes.AUTH_FAIL_LOGIN,
  payload: {
    message,
  },
});

export const logout = () => (dispatch) => {
  Auth.Logout();

  dispatch({
    type: ActionTypes.USER_CLEAR_DATA,
  });

  dispatch({
    type: ActionTypes.AUTH_LOGGED_OUT,
  });
};
