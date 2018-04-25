import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock, FieldGroup } from 'react-bootstrap';
import _ from 'lodash';
import { fetchPrimaryFavorites, fetch6monthsFavorites, fetch3monthsFavorites } from '../utils/tunes';

import ListHolder from './ListHolder.jsx';
import SongList from './SongList.jsx';

export default class TuneJam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//this should probably live in redux but just getting idea out there
			// lists : [{ title: 'Top Tracks of All Time' , dataSet: mostPlayedAll }],
			show : false,
		}
		this.showThing = this.showThing.bind(this);
		this.renderModal = this.renderModal.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.renderCreateReportForm = this.renderCreateReportForm.bind(this);
		this.renderLists = this.renderLists.bind(this);
	}

	componentDidMount() {
		fetchPrimaryFavorites();
		// fetch6monthsFavorites();
		// fetch3monthsFavorites();

		//TODO: make this work (it probably belongs in a componentWillReceiveProps block)
		// getLists();
		// getListOpts();
	}

	sortByAlbum() {
		let allTracks = this.props.topTracksAll;

		allTracks = _.orderBy(allTracks, ['playcount'], ['desc']);
	}

	//TODO: right now, each SongList component is hardcoded into the page, we want to dynamically display any number of reports inside the outerListContainer
	renderCreateReportForm() {
		return (
			<form>
        <FormGroup
          controlId="formBasicText"

        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value="whoa"
            placeholder="Enter text"
          />
					<FormControl
						type="text"
						value="whoa"
						placeholder="Enter text"
					/>
					<FormControl
						type="text"
						value="whoa"
						placeholder="Enter text"
					/>

          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>

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
            <h4>Text in a modal</h4>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>

            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            {this.renderCreateReportForm()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
			</div>
		)
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
