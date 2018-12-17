// import superagent from "superagent";

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100);
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

// function realAuth() {
//   let isAuthenticated;

//   const token = localStorage.getItem("token");

//   let userID = window.localStorage.userID;

//   superagent
//     .get(`http://localhost:3000/api/auth/${userID}`)
//     .set("Authorization", `Bearer ${token}`)
//     .set("Accept", "application/json")
//     .then(res => {
//       console.log("here is the res --->", res);
//       if()
//       isAuthenticated = true;
//       return isAuthenticated;
//     })
//     .catch(() => {
//       console.log("NOT ALLOWED!");
//       isAuthenticated = false;
//       return isAuthenticated;
//     });
// }

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       realAuth.isAuthenticated === true ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/signin" />
//       )}
//   />
// );

// export default PrivateRoute;
