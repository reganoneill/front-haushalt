import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import { backupTrack } from '../utils/tunes';


export default class SongList extends Component {
	constructor(props){
		super(props);
		this.state = {
			uploadView : this.props.uploadView,
		}
		this.uploadTrack = this.uploadTrack.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
	}

	uploadTrack(track){
		backupTrack(track);
	};

	uploadFile({track}) {
		// backupTrack(track);
	}

	render() {
    // option 1
		// let renderSongs = _.map(this.props.primaryData, (track, idx) => {
		// 	return (
    //     <li key={idx} className="trackBasicList">
    //       <div>
    //         <span>{track.title}</span>
    //       </div>
    //       <div>
    //         <span>{track.artist}</span>
    //       </div>
    //       <div>
    //         <span>played {track.playcount} times</span>
    //       </div>
    //
    //     </li>
		// 	);
		// });

    // option 2
    let renderSongsTable = _.map(this.props.primaryData, (track, idx) => {
			console.log('track- - - - ->', track);
			if(this.props.listName === 'Top artists') {
				return (
					<tr className="trackRow" key={idx}>
						<td className="trackData">{track.artistname}</td>
						<td className="trackData">{track.plays}</td>
					</tr>
				)
			} else {
      return (
		<div>
		<input type="file" onChange={this.uploadFile} />
		<tr className="trackRow" key={idx}>
	        <td className="trackData">{track.title}</td>
	        <td className="trackData">{track.artist}</td>
	        <td className="trackData">{track.playcount}</td>
			<td className="trackData" onClick={() => this.uploadTrack(track)}>upload</td>
      	</tr>
				</div>

			)
			}
    });

		if(this.props.listName === 'Top artists') {
			return (
				<div className="listContainer">
					<div className="tableName">
						<h3>{this.props.listName}</h3>
					</div>
					<div className="listInnerContainer">
						<table className="listTable table table-striped sticky-header">
							<thead className="songsTableHeader">
								<th>artist</th>
								<th>playcount</th>
								<th>upload</th>
							</thead>
							<tbody className="songsTableBody">
								{renderSongsTable}
							</tbody>
						</table>
					</div>
				</div>
			);
		} else {
			return (
				<div className="listContainer">
					<div className="tableName">
						<h3>{this.props.listName}</h3>
						<p>{this.props.uploadView ? 'sweet' : 'idk?!'}</p>
					</div>
					<div className="listInnerContainer">
						<table className="listTable table table-striped sticky-header">
	            <thead className="songsTableHeader">
	              <th>track</th>
	              <th>artist</th>
	              <th>playcount</th>
	            </thead>
	            <tbody className="songsTableBody">
							<div>
							{renderSongsTable}
							</div>
	            </tbody>
	          </table>
					</div>
				</div>
			);
		}
	};
};

SongList.PropTypes = {
	listName: PropTypes.string,
	primaryData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	uploadView : PropTypes.string
};
