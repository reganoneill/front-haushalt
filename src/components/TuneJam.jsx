import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  FieldGroup,
  DropdownButton,
  MenuItem,
  SplitButton
} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";
import _ from "lodash";
import {
  fetchPrimaryFavorites,
  fetch6monthsFavorites,
  fetch3monthsFavorites,
  buildQuery,
  fetchS3Info
} from "../utils/tunes";

import Sidebar from "./Sidebar.jsx";
import PlayerContainer from "./Player-Container.js";
import SeachInputContainer from "./SearchInput-Container.js";
import ListHolder from "./ListHolder.jsx";
import SongList from "./SongList.jsx";

export default class TuneJam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      keyword: "",
      artist: "",
      album: "",
      genre: "",
      year: "",
      insightDropdown: "Select An Option",
      specifyInsight: ""
    };
    this.showModal = this.showModal.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitView = this.submitView.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.renderCreateReportForm = this.renderCreateReportForm.bind(this);
    this.renderInsightSpecificationField = this.renderInsightSpecificationField.bind(
      this
    );
    this.renderLists = this.renderLists.bind(this);
    // this.renderTempLists = this.renderTempLists.bind(this);
    this.renderUploadView = this.renderUploadView.bind(this);
    this.showUploadView = this.showUploadView.bind(this);
    this._playTrack = this._playTrack.bind(this);
  }

  componentDidMount() {
    console.log("props available inside tune jam component --->", this.props);
    fetchS3Info();
    fetchPrimaryFavorites();
  }

  sortByAlbum() {
    let allTracks = this.props.topTracksAll;
    allTracks = _.orderBy(allTracks, ["playcount"], ["desc"]);
  }

  renderInsightSpecificationField() {
    switch (this.state.insightDropdown) {
      case "artist":
        return (
          <FormControl
            type="text"
            name="artist"
            value={this.state.artist}
            placeholder="Enter Arist Name"
            onChange={this.handleFormChange}
          />
        );
      case "album":
        return (
          <FormControl
            type="text"
            name="album"
            value={this.state.album}
            placeholder="Enter Album Name"
            onChange={this.handleFormChange}
          />
        );
      case "genre":
        return (
          <FormControl
            type="text"
            name="genre"
            value={this.state.genre}
            placeholder="Enter Genre"
            onChange={this.handleFormChange}
          />
        );
      case "year":
        return (
          <FormControl
            type="text"
            name="year"
            value={this.state.year}
            placeholder="Enter Year"
            onChange={this.handleFormChange}
          />
        );
      case "keyword":
        return (
          <FormControl
            type="text"
            name="keyword"
            value={this.state.keyword}
            placeholder="Enter Keyword"
            onChange={this.handleFormChange}
          />
        );
      default:
        return null;
    }
  }

  renderCreateReportForm() {
    return (
      <form>
        <SplitButton title={this.state.insightDropdown}>
          <MenuItem name="keyword" eventKey="1" onClick={this.handleFormChange}>
            keyword
          </MenuItem>
          <MenuItem name="artist" eventKey="2" onClick={this.handleFormChange}>
            artist
          </MenuItem>
          <MenuItem name="album" eventKey="3" onClick={this.handleFormChange}>
            album
          </MenuItem>
          <MenuItem name="year" eventKey="4" onClick={this.handleFormChange}>
            year
          </MenuItem>
          <MenuItem name="genre" eventKey="5" onClick={this.handleFormChange}>
            genre
          </MenuItem>
          <MenuItem divider />
          <MenuItem name="artists" eventKey="6" onClick={this.handleFormChange}>
            top artists
          </MenuItem>
        </SplitButton>
        {this.renderInsightSpecificationField()}
        <Button bsStyle="success" onClick={this.submitView}>
          Create View
        </Button>
      </form>
    );
  }

  determineUploadView() {}

  _playTrack(track) {
    console.log("oh yeeaaaaahhhhh!!!!!! the tracccckkkk ---->", track);
    this.props.playTrack(track);
  }

  renderLists() {
    return _.map(this.props.lists, (list, idx) => {
      return (
        <SongList
          key={idx}
          listName={list.title}
          primaryData={list.dataset}
          uploadView={list.uploadView}
          updateUploadView={this.showUploadView}
          playTrack={this._playTrack}
          awsUrl={this.props.awsTrackUrl ? this.props.awsTrackUrl : null}
        />
      );
    });
  }

  // renderTempLists() {
  //   if (!this.props.tempLists.length) {
  //     return null;
  //   }
  //   return _.map(this.props.tempLists, (list, idx) => {
  //     return (
  //       <SongList key={idx} listName={list.title} primaryData={list.dataset} />
  //     );
  //   });
  // }

  renderModal() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Library Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Choose Insight</h4>
            {this.renderCreateReportForm()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  handleFormChange(e) {
    let target = e.target.name;
    let val = e.target.value;
    if (target && val) {
      this.setState({ [target]: val });
    } else {
      this.setState({ insightDropdown: target });
    }
  }

  submitView(e) {
    e.preventDefault();
    buildQuery(this.state);
  }

  renderUploadView() {}

  handleClose() {
    this.setState({ show: false });
  }

  showUploadView(list) {
    // console.log("showUploadView - list -->", list);
  }

  showModal() {
    this.setState({ show: true });
  }

  render() {
    let tuneJamStyle = {
      display: "flex",
      flexDirection: "row"
      // flexWrap: "wrap"
    };

    return (
      <div id="appWrap">
        <div className="alignChildren">
          {/* <div className="menu">
            <i className="fa fa-angle-double-right" />
          </div> */}
          <div className="controls">
            <PlayerContainer />
            <SeachInputContainer />
          </div>
          <div style={tuneJamStyle} className="tuneJamContainer">
            <Sidebar />
            {this.renderLists()}
            {this.renderModal()}
          </div>
        </div>
      </div>
    );
  }
}
