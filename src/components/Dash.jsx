import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { newListItem } from "../actionCreators";

class Dash extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.submitListItem = this.submitListItem.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.userFinder = this.userFinder.bind(this);
  }

  componentDidMount() {
    console.log("oh shit, my props!", this.props);
    this.userFinder().then(user => {
      this.setState({
        name: user.firstname,
        email: user.email,
        id: user.id,
        title: "placeholder title"
      });
    });
  }

  userFinder() {
    return new Promise((resolve, reject) => {
      const userObj = JSON.parse(window.localStorage.user);
      if (this) {
        // checking avoids error - dont fully understand it rn. remove it and read error
        if (!userObj) {
          reject();
        }
        resolve(userObj);
      }
    });
  }

  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
  }

  submitListItem(e) {
    e.preventDefault();
    if (this) {
      return this.props.dispatchListItem(this.state.title);
    }
    return "test";
  }

  render() {
    return (
      <div className="dash">
        <p>{this.state.name}</p>
        <p>{this.state.email}</p>
        <p>{this.state.title}</p>
        <div>test</div>
        <form onSubmit={this.submitListItem}>
          <input
            value={this.state.title}
            onChange={this.handleTitleChange}
            placeholder="title"
          />
          <input type="submit" value="submit the form" />
        </form>
        <div>
          <button onClick={this.logout}>logout</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  listitems: state.listitems
});

const mapDispatchToProps = dispatch => ({
  dispatchListItem(item) {
    dispatch(newListItem(item));
  }
});

const connectedDashContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dash
);
const DashRoute = withRouter(connectedDashContainer);

export default DashRoute;
