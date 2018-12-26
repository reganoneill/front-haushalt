import React, { Component } from "react";
import PropTypes from "prop-types";
import superagent from "superagent";
import _ from "lodash";

import { backupTrack } from "../utils/tunes";

export default class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadView: this.props.uploadView,
      showTracks: [],
      streamingTrack: null
    };
    this.uploadTrack = this.uploadTrack.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  componentWillReceiveProps(next) {
    console.log("oh gooood!", next);
  }

  uploadTrack(track) {
    console.log("you just clicked on this track--->", track);
    backupTrack(track).then(data => {
      console.log("backup complete:", data);
    });
  }

  uploadFile({ track }) {
    // backupTrack(track);
  }

  render() {
    let renderSongsTable = _.map(this.props.primaryData, (track, idx) => {
      let amazonUrl = `${this.props.awsUrl}${track.amazonLookup}`;
      return (
        <tr className="trackRow" key={idx}>
          <td className="trackData">{track.title}</td>
          <td className="trackData">{track.artist}</td>
          <td className="trackData">{track.playcount}</td>
          {track.backedUp < 1 ? (
            <td className="trackData" onClick={() => this.uploadTrack(track)}>
              upload
            </td>
          ) : (
            <td className="trackData">
              <audio controls="controls" preload="auto" id="audio_player">
                <source src={amazonUrl} />
              </audio>
            </td>
          )}
        </tr>
      );
    });

    return (
      <div className="listContainer">
        <div className="tableName">
          <h3>{this.props.listName}</h3>
        </div>
        <div className="listInnerContainer">
          <table className="listTable table table-striped sticky-header">
            <thead className="songsTableHeader">
              <tr>
                <th>track</th>
                <th>artist</th>
                <th>playcount</th>
                <th>play / upload</th>
              </tr>
            </thead>
            <tbody>{renderSongsTable}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

SongList.PropTypes = {
  listName: PropTypes.string,
  primaryData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  uploadView: PropTypes.string,
  awsUrl: PropTypes.string
};
