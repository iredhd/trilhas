import { ActionTypes } from '.';

export const registerData = (data) => async (dispatch, getState) => {
  const user = getState().User;

  dispatch({
    type: ActionTypes.USER_REGISTER_DATA,
    payload: {
      name: data.name || user.name || null,
      email: data.email || user.email || null,
      cityName: data.cityName || user.cityName || null,
      id: data.id || user.id || null,
      profilePicture: data.profilePicture || user.profilePicture || null,
    },
  });
};

export const clearData = () => ({
  type: ActionTypes.USER_CLEAR_DATA,
});
