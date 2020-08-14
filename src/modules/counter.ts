export const SET_LIST = "counter/SET_LIST";
export const SET_CATEGORY_LIST = "SET_CATEGORY_LIST";
export const LOADING = "counter/LOADING";
export const SET_PLACE = "counter/SET_PLACE";
export const CURRENT_PLACE_SHOWING = "counter/CURRENT_PLACE_SHOWING";

const initialState = {
  placeList: [],
  loading: true,
  currentShowing: {},
  place: {},
  categoryList: []
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_LIST:

    return {
      ...state,
      placeList: action.list
    };

    case SET_CATEGORY_LIST:
    return {
      ...state,
      categoryList: action.categories
    };

    case LOADING:
    return {
      ...state,
      loading: action.show
    };

    case CURRENT_PLACE_SHOWING:
    return {
      ...state,
      currentShowing: action.placeShowing
    };

    case SET_PLACE:
    return {
      ...state,
      place: action.place
    };

    default:
      return state;
  }
};

export const setList = (list) => {

  return dispatch => {
    dispatch({
      type: SET_LIST,
      list
    });
  };
};

export const setCategoryList = (list) => {
  const categories = list;

  return dispatch => {
    dispatch({
      type: SET_CATEGORY_LIST,
      categories
    });
  };
};

export const setCurrentShowing = (placeShowing) => {

  return dispatch => {
    dispatch({
      type: CURRENT_PLACE_SHOWING,
      placeShowing
    });
  };
};

export const loading = (show) => {
  return dispatch => {
    dispatch({
      type: LOADING,
      show
    });
  };
};

export const setAd = (place) => {

  return dispatch => {
    dispatch({
      type: SET_PLACE,
      place
    });
  };
};