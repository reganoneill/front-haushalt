import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { fetchPrimaryFavorites, fetch6monthsFavorites, fetch3monthsFavorites } from '../utils/tunes';

import ListHolder from './ListHolder.jsx';
import SongList from './SongList.jsx';

export default class TuneJam extends Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		fetchPrimaryFavorites();
		fetch6monthsFavorites();
		fetch3monthsFavorites();
	}

	sortByAlbum() {
		let allTracks = this.props.topTracksAll;

		allTracks = _.orderBy(allTracks, ['playcount'], ['desc']);
	}

	render() {
		//testing out
		let thing = [1, 2, 3, 4, 5, 6];

		return (
			<div className="outerListContainer">
				<SongList listName="Top Tracks All Time" primaryData={this.props.topTracksAll} />
				<SongList listName="Top Tracks 6 months" primaryData={this.props.topTracks6Months} />
				<SongList listName="Top Tracks 3 months" primaryData={this.props.topTracks3Months} />
				<ListHolder listName="Top Tracks 3 months" primaryData={thing} />
				<ListHolder listName="Top Characteristics of Tracks" primaryData={thing} />
			</div>
		);
	}
}
