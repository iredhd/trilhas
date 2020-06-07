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
      guidesSearched: data.guidesSearched || user.guidesSearched || [],
    },
  });
};

export const addGuideSearched = (guideSearched) => (dispatch, getState) => {
  const { guidesSearched: actualGuidesSearch } = getState().User;

  let guidesSearched = actualGuidesSearch.filter((guide) => guide.id !== guideSearched.id);

  guidesSearched.push({
    ...guideSearched,
    searchMoment: new Date(),
  });

  guidesSearched = guidesSearched
    .sort((a, b) => new Date(b.searchMoment) - new Date(a.searchMoment))
    .filter((_, index) => index <= 10);

  dispatch(registerData({
    guidesSearched,
  }));
};

export const clearData = () => ({
  type: ActionTypes.USER_CLEAR_DATA,
});
