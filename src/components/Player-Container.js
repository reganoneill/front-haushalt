import React, { Component } from "react";
import { connect } from "react-redux";
import Player from "./Player.jsx";

const mapStateToProps = (state, props) => {
  return {
    nowPlaying: state.nowPlaying,
    awsUrl: state.awsTrackUrl
  };
};

//TODO: possibly need mapDispatchToProps

const playerRedux = connect(mapStateToProps)(Player);

export default playerRedux;
