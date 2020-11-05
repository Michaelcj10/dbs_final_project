const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_VIEWED_MSG = "SET_VIEWED_MSG";
const SET_USER_ORG = "SET_USER_ORG";
const SET_VIEWED_ORG = "SET_VIEWED_ORG";
const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
import {
  MessageItem,
  UserProfile,
  Organisation,
  NotificationItem,
} from "../domain/interfaces";

export const msgsinitial: MessageItem = {
  comment: "",
  replies: [],
  title: "",
  username: "",
};

export const usrPrfinitial: UserProfile = {
  detail: "",
  email: "",
  title: "",
  user: { email: "" },
};

export const orginitial: Organisation = {
  address: "",
  contactNumber: "",
  facebook: "",
  twitter: "",
  website: "",
  location: "",
  name: "",
  bedsAvailable: 0,
  postCode: 0,
};

const initialState = {
  userProfile: usrPrfinitial,
  message: msgsinitial,
  organisation: orginitial,
  viewedOrganisation: orginitial,
  notifications: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.profile,
      };
    case SET_USER_ORG:
      return {
        ...state,
        org: action.organisation,
      };
    case SET_VIEWED_ORG:
      return {
        ...state,
        viewedOrganisation: action.organisation,
      };
    case SET_VIEWED_MSG:
      return {
        ...state,
        message: action.message,
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      };

    default:
      return state;
  }
};

export const setUserProfile = (profile: UserProfile) => {
  return (dispatch) => {
    dispatch({
      type: SET_USER_PROFILE,
      profile,
    });
  };
};

export const setViewedMsg = (message: MessageItem) => {
  return (dispatch) => {
    dispatch({
      type: SET_VIEWED_MSG,
      message,
    });
  };
};

export const setOrganisation = (organisation: Organisation) => {
  return (dispatch) => {
    dispatch({
      type: SET_USER_ORG,
      organisation,
    });
  };
};

export const setViewedOrganisation = (organisation: Organisation) => {
  return (dispatch) => {
    dispatch({
      type: SET_VIEWED_ORG,
      organisation,
    });
  };
};

export const setNotifications = (notifications: NotificationItem[]) => {
  return (dispatch) => {
    dispatch({
      type: SET_NOTIFICATIONS,
      notifications,
    });
  };
};
