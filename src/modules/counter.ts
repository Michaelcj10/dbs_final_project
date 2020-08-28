export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const SET_VIEWED_MSG = "SET_VIEWED_MSG";
import { MessageItem, UserProfile } from "../domain/interfaces";

const msgs: MessageItem = {
  comment: "",
  replies: [],
  title: "",
  username: ""
};

const usrPrf: UserProfile = {
  detail: "",
  email: "",
  title: "",
  user: {email: ""},
};

const initialState = {
  userProfile: usrPrf,
  message: msgs
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.profile
    };
    case SET_VIEWED_MSG:
      return {
        ...state,
        message: action.message
    };

    default:
      return state;
  }
};

export const setUserProfile = (profile: UserProfile) => {
  return dispatch => {
    dispatch({
      type: SET_USER_PROFILE,
      profile
    });
  };
};

export const setViewedMsg = (message: MessageItem) => {
  return dispatch => {
    dispatch({
      type: SET_VIEWED_MSG,
      message
    });
  };
};
