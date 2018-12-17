import { createStore } from "redux";

import {
  SET_LIBRARY,
  SET_USER,
  SET_MOSTPLAYED_ALL,
  SET_MOSTPLAYED_6MONTHS,
  SET_MOSTPLAYED_3MONTHS,
  SET_MAIN_VIEW,
  SET_TEMP_VIEW,
  SET_UPLOADER_VIEW
} from "./actions";

const defaultState = {
  user: {
    email: "email@gmail",
    firstname: "first name",
    id: "1010101010101",
    token: "token"
  },
  library: { yo_wut_up: "yo wut up" },
  lists: [],
  tempLists: [],
  topTracksAll: [],
  uploader: false
};

const setUploaderView = (state, action) => {
  return Object.assign({}, state, { uploader: action.payload.uploader });
};

const setLibrary = (state, action) => {
  return Object.assign({}, state, { library: action.payload });
};

const setUser = (state, action) => {
  console.log("here is whatsu p", action);
  return Object.assign({}, state, { user: action.payload });
};

const setMainView = (state, action) => {
  return Object.assign({}, state, { lists: action.payload });
};

const setTempView = (state, action) => {
  let temp = state.tempLists;
  temp.push(action.payload);
  return Object.assign({}, state, { tempLists: temp });
};

const setMostPlayedAll = (state, action) => {
  return Object.assign({}, state, { topTracksAll: action.payload });
};

const setTopTracks6Months = (state, action) => {
  return Object.assign({}, state, { topTracks6Months: action.payload });
};

const setTopTracks3Months = (state, action) => {
  return Object.assign({}, state, { topTracks3Months: action.payload });
};

const AppReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return setUser(state, action);
    case SET_MOSTPLAYED_ALL:
      return setMostPlayedAll(state, action);
    case SET_MOSTPLAYED_6MONTHS:
      return setTopTracks6Months(state, action);
    case SET_MOSTPLAYED_3MONTHS:
      return setTopTracks3Months(state, action);
    case SET_MAIN_VIEW:
      return setMainView(state, action);
    case SET_TEMP_VIEW:
      return setTempView(state, action);
    case SET_LIBRARY:
      return setLibrary(state, action);
    default:
      return state;
  }
};

const AppStore = createStore(AppReducer);

export default AppStore;
