import { ActionTypes } from '.';

export const registerData = (data) => async (dispatch) => {
  dispatch({
    type: ActionTypes.USER_REGISTER_DATA,
    payload: {
      name: data.name || null,
      email: data.email || null,
      id: data.id || null,
    },
  });
};

export const clearData = () => ({
  type: ActionTypes.USER_CLEAR_DATA,
});
