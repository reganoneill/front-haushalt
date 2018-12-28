import React, { Component } from "react";

export default class Player extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("player has mounted");
  }

  render() {
    // if (!this.props.nowPlaying) {
    //   return null;
    // } else if (!this.props.nowPlaying.amazonLookup) {
    //   return <h1>no</h1>;
    // } else {
    const placeholder = this.props.nowPlaying
      ? this.props.nowPlaying.title - this.props.nowPlaying.artist
      : "select a track to stream";
    const streamingUrl = this.props.awsUrl
      ? this.props.awsUrl + this.props.nowPlaying.amazonLookup
      : null;
    return (
      <div className="playerContainer">
        {/* <pre>
          <code>{JSON.stringify(this.props.nowPlaying)}</code>
        </pre> */}
        {/* <div> */}
        <div className="scrollLeft">
          <p>
            {placeholder}
            {/* {this.props.nowPlaying.title} - {this.props.nowPlaying.artist} */}
          </p>
        </div>
        {/* </div> */}
        <div>
          <audio controls="controls" preload="auto" id="audio_player">
            <source src={streamingUrl} />
          </audio>
        </div>
      </div>
    );
    // }
  }
}
