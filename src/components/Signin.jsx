import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { signinRequest, signupRequest } from "../utils/auth";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailSignup: "",
      passwordSignup: "",
      user: {},
      redirect: false
    };
    this.handleSignin = this.handleSignin.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);

    this.handleSignup = this.handleSignup.bind(this);
    this.emailChangeSignup = this.emailChangeSignup.bind(this);
    this.passwordChangeSignup = this.passwordChangeSignup.bind(this);
  }

  handleSignin(event) {
    event.preventDefault();
    signinRequest(this.state)
      .then(() => {
        if (this.state.token) {
          this.setState({ redirect: true });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleSignup(event) {
    event.preventDefault();
    signupRequest(this.state)
      .then(() => {
        if (this.props.user.token) {
          this.setState({ redirect: true });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  emailChange(event) {
    this.setState({ email: event.target.value });
  }

  passwordChange(event) {
    this.setState({ password: event.target.value });
  }

  emailChangeSignup(event) {
    this.setState({ emailSignup: event.target.value });
  }

  passwordChangeSignup(event) {
    this.setState({ passwordSignup: event.target.value });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      console.log("redirect to /profile");
      return <Redirect to="/profile" />;
    }

    return (
      <div className="signin">
        <code>{JSON.stringify(this.props)}</code>
        <h1>signin</h1>
        <form onSubmit={this.handleSignin}>
          <input
            type="text"
            placeholder="email"
            value={this.state.email}
            onChange={this.emailChange}
          />
          <input
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.passwordChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <h1>signup</h1>
        <form onSubmit={this.handleSignup}>
          <input
            type="text"
            placeholder="email"
            value={this.state.emailSignup}
            onChange={this.emailChangeSignup}
          />
          <input
            type="password"
            placeholder="password"
            value={this.state.passwordSignup}
            onChange={this.passwordChangeSignup}
          />
          <input type="submit" value="Submit" />
        </form>
        <pre>
          <code>{JSON.stringify(this.props.user)}</code>
        </pre>
      </div>
    );
  }
}
Signin.defaultProps = {
  signin: null,
  user: null,
  history: null // eslint-disable-line react/forbid-prop-types
  // this works but looks weird. strange that it needs a default as it is pretty much native
};

Signin.propTypes = {
  signin: PropTypes.func,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }),
  // eslint-disable-next-line
  history: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  user: state.user
  // location: state.location
});

const connectedContainer = connect(mapStateToProps)(Signin);

const SigninRoute = withRouter(connectedContainer);

export default SigninRoute;
