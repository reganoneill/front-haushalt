import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock, FieldGroup, DropdownButton, MenuItem, SplitButton } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import _ from 'lodash';
import { fetchPrimaryFavorites, fetch6monthsFavorites, fetch3monthsFavorites, buildQuery } from '../utils/tunes';

import ListHolder from './ListHolder.jsx';
import SongList from './SongList.jsx';

export default class TuneJam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show    : false,
			keyword : '',
			artist  : '',
			album   : '',
			genre   : '',
			year    : '',
			insightDropdown : '',
			specifyInsight: ''
		}
		this.showThing = this.showThing.bind(this);
		this.renderModal = this.renderModal.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.submitView = this.submitView.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.renderCreateReportForm = this.renderCreateReportForm.bind(this);
		this.renderLists = this.renderLists.bind(this);
	}

	componentDidMount() {
		fetchPrimaryFavorites();

	}

	sortByAlbum() {
		let allTracks = this.props.topTracksAll;

		allTracks = _.orderBy(allTracks, ['playcount'], ['desc']);
	}

	renderCreateReportForm() {
		return (
			<form>
				<SplitButton title="Choose an option">
					<MenuItem name="keyword" eventKey="1" onClick={this.handleFormChange}>keyword</MenuItem>
					<MenuItem name="artist" eventKey="2" onClick={this.handleFormChange}>artist</MenuItem>
					<MenuItem name="album" eventKey="3"  onClick={this.handleFormChange} active>album</MenuItem>
					<MenuItem name="year" eventKey="4" onClick={this.handleFormChange}>year</MenuItem>
					<MenuItem name="genre" eventKey="5" onClick={this.handleFormChange}>genre</MenuItem>
				</SplitButton>
				{/* method to dynamically display input field based on selection */}
				<Button bsStyle="success" onClick={this.submitView}>Create View</Button>
      </form>
		)
	}
	renderLists() {
		console.log('yoyo here yo listssssss', this.props.lists);
		//this reads from state to see how many lists to create inside the outerListContainer element (it defaults to one).
		return _.map(this.props.lists, (list, idx) => {
			return (
					<SongList key={idx} listName={list.title} primaryData={list.dataset} />
			)
		})
	}
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
		)
	}

	handleFormChange(e) {
		let target = e.target.name;
		// let val = e.target.value
		// console.log(`here is what we are dealing with --> ${target}, and ${val}`);
		// this.setState({ [target]: val});
		this.setState({ insightDropdown: target});
	}
	submitView(e) {
		e.preventDefault();
		console.log(this.state);
		buildQuery(this.state);

	}
	handleClose() {
		this.setState({show : false});
	}

	showThing() {
		this.setState({show : true});
	}

	render() {
		//testing out
		// let thing = [1, 2, 3, 4, 5, 6];
		let tuneJamStyle = {
			display: 'flex',
			flexDirection : 'row',
			flexWrap : 'wrap',
			justifyContent : 'space-around',
			alignItems : 'center',
			height: '50em',
    	overflow: 'scroll',
    	border: '2px white solid',
		}

		return (
			<div id='appWrap'>
				<div className="menu">
					<div className="hamburger"><i className="fa fa-hamburger"></i></div>
					<div className="addIcon">
						<i className="fa fa-plus"></i><Button type="button" className="btn btn-primary" onClick={() => this.showThing()}>Create New Report</Button>
				</div>
				</div>
				<div style={tuneJamStyle} className="tuneJamContainer">
					{this.renderLists()}
					{this.renderModal()}
				</div>
			</div>
		);
	}
}
