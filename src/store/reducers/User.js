import { ActionTypes } from '../actions';

const initialState = {
  id: null,
  name: null,
  email: null,
  cityName: null,
  profilePicture: null,
  guidesSearched: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_REGISTER_DATA:
      return {
        ...initialState,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        cityName: action.payload.cityName,
        profilePicture: action.payload.profilePicture,
        guidesSearched: action.payload.guidesSearched,
      };
    case ActionTypes.USER_CLEAR_DATA:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
