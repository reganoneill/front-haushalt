import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import _ from 'lodash';
import { fetchEntireLibrary } from '../utils/tunes';


export default class Library extends Component {
    constructor(props) {
        super(props);

        this.state = {
            test : 'yo'
        };
    };

    componentDidMount(){
        console.log('yes. mounted');
        fetchEntireLibrary()
        .then((response) => {
            console.log('promise response:', response);
        })
        .catch((err) => {
            console.log('an error occurred:', err);
        })
    };

    componentWillReceiveProps(next){
        console.log('here are your props:', next);
    }

    render(){
        let renderSongsTable = _.map(this.props.library, (track, idx) => {
            return (
                    <tr className="trackRow" key={idx}>
                        <td className="trackData">{track.title}</td>
                        <td className="trackData">{track.artist}</td>
                        <td className="trackData">{track.playcount}</td>
                    </tr>
                    )
        });
        return(
            <div className="libraryContainer">
				<div className="tableName">
				    <h3>library</h3>
				</div>
				<div className="listInnerContainer">
				<table className="listTable table table-striped sticky-header">
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
        )
    };
};