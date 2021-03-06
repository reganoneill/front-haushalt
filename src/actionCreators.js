import superagent from "superagent";
import _ from "lodash";
import Store from "./store";

import {
  SET_SEARCH_TERM,
  SET_TOKEN,
  SET_USER,
  SET_LISTITEM,
  SET_MOSTPLAYED_ALL,
  SET_MOSTPLAYED_6MONTHS,
  SET_MOSTPLAYED_3MONTHS,
  SET_MAIN_VIEW,
  SET_TEMP_VIEW,
  SET_UPLOADER_VIEW,
  SET_LIBRARY,
  SET_S3_URL,
  PLAY_TRACK
} from "./actions";

export const setUploaderView = item => {
  return {
    type: SET_UPLOADER_VIEW,
    payload: item
  };
};

export const setPlayTrack = track => {
  return {
    type: PLAY_TRACK,
    payload: track
  };
};

export const setLibrary = item => {
  return {
    type: SET_LIBRARY,
    payload: item
  };
};

export const sets3Url = item => {
  // return {
  //   type: SET_S3_URL,
  //   payload: item
  // };
  Store.dispatch({
    type: SET_S3_URL,
    payload: item
  });
};

export function setUser(user) {
  return {
    type: SET_USER,
    user
  };
}

//ro update - here is your problem!
export const setMainView = item => {
  // return {
  //   type: SET_MAIN_VIEW,
  //   payload: item
  // };
  Store.dispatch({
    type: SET_MAIN_VIEW,
    payload: item
  });
};

export const setTempView = item => {
  return {
    type: SET_TEMP_VIEW,
    payload: item
  };
};

export const setMostPlayedAll = item => {
  return {
    type: SET_MOSTPLAYED_ALL,
    payload: item
  };
  // Store.dispatch({
  //   type: SET_MAIN_VIEW,
  //   payload: item
  // });
};

export const setMostPlayed6months = item => {
  console.log("inside actionCreators...here is the argument:", item);
  return {
    type: SET_MOSTPLAYED_6MONTHS,
    payload: item
  };
};

export const setMostPlayed3months = item => {
  console.log("inside actionCreators...here is the argument:", item);
  return {
    type: SET_MOSTPLAYED_3MONTHS,
    payload: item
  };
};

export const signinAction = user => {
  console.log("here is the signin user-->", user);
  return {
    type: SET_USER,
    payload: user
  };
};

// export const signupAction = user => {
//   console.log("here is the signup user", user);
//   return {
//     type: SET_USER,
//     payload: user
//   });
//   //TODO: FIX THIS
// };

export const newListItem = listitem => {
  // get cookie to pass for jwt Authorization
  // const token = document.cookie.hausJwt;
  // TODO:getCookie function was a really quick fix...needs to be refactored.
  // console.log('here si the listitem:', listitem);
  // return;
  const jwtName = "hausJwt";
  function getCookie(token) {
    const v = document.cookie.match(`(^|;) ?${token}=([^;]*)(;|$)`);
    return v ? v[2] : null;
  }
  // const titleobj = JSON.stringify({ title: listitem });
  const cook = getCookie(jwtName);
  superagent
    .post(`http://localhost:8080/newListItem`)
    .set("Authorization", `JWT ${cook}`)
    .send(listitem)
    .then(
      res =>
        // const jsonres = JSON.stringify(res.body);

        // dispatch(setListItem(res.body));
        res
      // Store.dispatch({
      // 	type: SET_SEARCH_TERM,
      // 	payload: searchTerm
      // });
    );
};
