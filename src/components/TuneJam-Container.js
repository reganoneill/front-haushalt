import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";

import { setPlayTrack } from "../actionCreators";
import TuneJam from "./TuneJam.jsx";

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    topTracksAll: state.topTracksAll,
    topTracks6Months: state.topTracks6Months,
    topTracks3Months: state.topTracks3Months,
    lists: state.lists,
    tempLists: state.tempLists,
    uploader: state.uploader,
    library: state.library,
    awsTrackUrl: state.awsTrackUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    playTrack: track => dispatch(setPlayTrack(track))
  };
};

const tuneJamRedux = connect(mapStateToProps, mapDispatchToProps)(TuneJam);

const TuneJamContainer = withRouter(tuneJamRedux);
export default TuneJamContainer;
