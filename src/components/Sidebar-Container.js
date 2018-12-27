import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "./Sidebar.jsx";

const mapStateToProps = (state, props) => {
  return {
    listView: state.listView,
    user: state.user
  };
};

const sidebarRedux = connect(mapStateToProps)(Sidebar);

export default sidebarRedux;
