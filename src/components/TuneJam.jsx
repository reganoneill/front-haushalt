import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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

		}
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

	renderLists() {
		console.log('yoyo here yo listssssss', this.props.lists);
		//this reads from state to see how many lists to create inside the outerListContainer element (it defaults to one).
		return _.map(this.props.lists, (list, idx) => {
			return (
					<SongList key={idx} listName={list.title} primaryData={list.dataset} />
			)
		})
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
				<div style={tuneJamStyle} className="tuneJamContainer">
					{this.renderLists()}
				</div>
			</div>
		);
	}
}
