export const SET_USER_PROFILE = "SET_USER_PROFILE";

const initialState = {
  userProfile: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.profile
    };

    default:
      return state;
  }
};

export const setUserProfile = (profile) => {
  return dispatch => {
    dispatch({
      type: SET_USER_PROFILE,
      profile
    });
  };
};
