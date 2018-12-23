import superagent from "superagent";
import _ from "lodash";

import { signinAction } from "../actionCreators";

export const signinRequest = user => {
  return new Promise((resolve, reject) => {
    superagent
      .post(`http://localhost:3000/api/signin`)
      .send(user)
      .then(res => {
        const registeredUser = _.assign(
          {},
          {
            email: res.body.emailAddress,
            firstname: res.body.firstName,
            token: res.body.token,
            status: res.body.status,
            permissionLevel: res.body.permissionLevel
          }
        );
        window.localStorage.setItem("user", JSON.stringify(registeredUser));
        window.localStorage.setItem(
          "bm8_token",
          JSON.stringify(res.body.token)
        );
        console.log("**********signedin*********");
        console.log("response (user):", registeredUser);
        signinAction(registeredUser);
        resolve();
      });
  });
};

export const signupRequest = user => {
  return new Promise((resolve, reject) => {
    superagent
      .post(`http://localhost:3000/api/signup`)
      .send(user)
      .then(res => {
        const registeredUser = _.assign(
          {},
          {
            email: res.body.emailAddress,
            firstname: res.body.firstName,
            token: res.body.token,
            status: res.body.status,
            permissionLevel: res.body.permissionLevel
          }
        );
        window.localStorage.setItem("user", JSON.stringify(registeredUser));
        window.localStorage.setItem(
          "bm8_token",
          JSON.stringify(res.body.token)
        );
        console.log("**********signedup*********");
        console.log("response (user):", registeredUser);
        signinAction(registeredUser);
        resolve();
      });
  });
};
