import React, { Component } from "react";

export default class Player extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("player has mounted");
  }

  render() {
    if (!this.props.nowPlaying) {
      return <h1>ummmmmm</h1>;
    } else if (!this.props.nowPlaying.amazonLookup) {
      return <h1>shit bitch!</h1>;
    } else {
      const streamingUrl =
        this.props.awsUrl + this.props.nowPlaying.amazonLookup;
      console.log(
        "-------streamingUrl------streamingUrl--------------------",
        streamingUrl
      );
      //   const playerContainer = {
      //     marginTop: "15em",
      //     display: "flex",
      //     flexDirection: "row"
      //   };

      return (
        <div className="playerContainer">
          {/* <h1>ypyp: {streamingUrl}</h1>
          <pre>
            <code>{JSON.stringify(this.props.nowPlaying)}</code>
          </pre> */}
          <div>
            <div className="scrollLeft">
              <p>
                {this.props.nowPlaying.title} - {this.props.nowPlaying.artist}
              </p>
            </div>
          </div>
          <div>
            <audio controls="controls" preload="auto" id="audio_player">
              <source src={streamingUrl} />
            </audio>
          </div>
        </div>
      );
    }
  }
}
