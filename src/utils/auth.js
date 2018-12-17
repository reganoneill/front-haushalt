import superagent from "superagent";
import _ from "lodash";

import { signinAction, signupAction } from "../actionCreators";

export const signinRequest = user => {
  superagent
    .post(`http://localhost:3000/api/signin`)
    .send(user)
    .then(res => {
      const yourUser = _.assign(
        {},
        {
          //   email: res.body.email,
          //   firstname: res.body.firstname,
          //   id: JSON.stringify(res.body.id),
          //   token: res.body.token,
          //   yowutUp: "yo wut up"
          //testing
          email: res.body.emailAddress,
          firstname: res.body.firstName,
          id: res.body.id,
          token: res.body.token,
          permissionLevel: res.body.permissionLevel,
          lol: true
        }
      );
      document.cookie = `token=${res.body.token}`;
      window.localStorage.setItem("user", JSON.stringify(yourUser));
      console.log("**********signinup*********");
      //   Store.dispatch(setUser(yourUser));
      signinAction(yourUser);
      // return res;
    });
};

export const signupRequest = user => {
  console.log("here is the signup user", user);
  superagent
    // .post(`http://localhost:8080/signin`)
    .post(`http://localhost:3000/api/signup`)
    .send(user)
    .then(res => {
      const yourUser = _.assign(
        {},
        {
          email: res.body.emailAddress,
          firstname: res.body.firstName,
          id: JSON.stringify(res.body.id) || "unset",
          token: res.body.token,
          status: res.body.status,
          permissionLevel: res.body.permissionLevel,
          yowutUp: "yo wut up"
        }
      );
      document.cookie = `token_fuckkkkkk=${res.body.token}`;
      window.localStorage.setItem("user", JSON.stringify(yourUser));
      console.log("congratz");
      console.log("res", res);
      //   window.location.replace(`http://localhost:8081/dash/${res.body.email}`);
      // this dispatch below may be unnecessary as I think dispatch only gets called from mapDispatchToProps in the component
      //   dispatch(setUser(yourUser));
      // return res;
    });
};
