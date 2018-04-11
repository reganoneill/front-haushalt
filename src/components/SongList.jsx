import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

export default class SongList extends Component {
	render() {
		let renderSongs = _.map(this.props.primaryData, (track, idx) => {
			return (
        <li key={idx} className="trackBasicList">
          <div>
            <span>{track.title}</span>
          </div>
          <div>
            <span>{track.artist}</span>
          </div>
          <div>
            <span>played {track.playcount} times</span>
          </div>

        </li>
			);
		});
		return (
			<div className="listContainer">
				<h3>{this.props.listName}</h3>
				<div className="listInnerContainer">
					<ul>{renderSongs}</ul>
				</div>
			</div>
		);
	}
}

SongList.PropTypes = {
	listName: PropTypes.string,
	primaryData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
