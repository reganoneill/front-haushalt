import React, { Component } from "react";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thing: true,
      why: false
    };

    this.doThing = this.doThing.bind(this);
  }

  componentDidMount() {
    //things happen
  }

  doThing() {
    console.log("eh?");
  }

  render() {
    const sidebarList = {
      //   border: "1px solid red",
      listStyleType: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      marginRight: "0.5em"
    };

    const sidebarHeader = {
      marginLeft: "-1.25em"
    };

    return (
      <div>
        <h4 style={sidebarHeader}>Library</h4>
        <ul style={sidebarList} className="sidebarList">
          <li>Recently Added</li>
          <li>Artists</li>
          <li>Songs</li>
          <li>Albums</li>
        </ul>
        <h4 style={sidebarHeader}>Playlists</h4>
        <ul style={sidebarList} className="sidebarList">
          <li>late summer</li>
          <li>walkin p</li>
          <li>spaced out</li>
        </ul>
      </div>
    );
  }
}
