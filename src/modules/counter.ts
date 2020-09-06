const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_VIEWED_MSG = "SET_VIEWED_MSG";
const SET_USER_ORG = "SET_USER_ORG";
const SET_VIEWED_ORG = "SET_VIEWED_ORG";
import { MessageItem, UserProfile, Organisation } from "../domain/interfaces";

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
  user: {email: ""}
};

const org: Organisation = {
  address: "",
  contactNumber: "",
  facebook: "",
  twitter: "",
  website: "",
  location: "",
  name: ""
};

const initialState = {
  userProfile: usrPrf,
  message: msgs,
  organisation: org,
  viewedOrganisation: org
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.profile
    };
    case SET_USER_ORG:
      return {
        ...state,
        org: action.organisation
    };
    case SET_VIEWED_ORG:
      return {
        ...state,
        viewedOrganisation: action.organisation
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

export const setOrganisation = (organisation: Organisation) => {
  return dispatch => {
    dispatch({
      type: SET_USER_ORG,
      organisation
    });
  };
};

export const setViewedOrganisation = (organisation: Organisation) => {
  return dispatch => {
    dispatch({
      type: SET_VIEWED_ORG,
      organisation
    });
  };
};
