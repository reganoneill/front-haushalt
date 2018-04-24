import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

export default class SongList extends Component {
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
			// console.log('A TRACK:', track);
      return (<tr className="trackRow" key={idx}>
        <td className="trackData">{track.title}</td>
        <td className="trackData">{track.artist}</td>
        <td className="trackData">{track.playcount}</td>
      </tr>)
    })
    //bring in bootstrap-react and get Table component?
		return (
			<div className="listContainer">
				<h3>{this.props.listName}</h3>
				<div className="listInnerContainer">
					<table className="listTable">
            <thead className="songsTableHeader">
              <th>track</th>
              <th>artist</th>
              <th>playcount</th>
            </thead>
            <tbody className="songsTableBody">
              {renderSongsTable}
            </tbody>
          </table>
				</div>
			</div>
		);
	}
}

SongList.PropTypes = {
	listName: PropTypes.string,
	primaryData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
