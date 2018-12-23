import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import _ from 'lodash';
import { fetchEntireLibrary , backupTrack} from '../utils/tunes';


export default class Library extends Component {
    constructor(props) {
        super(props);

        this.state = {
            test : 'yo'
        };

        this.renderPlay = this.renderPlay.bind(this);
        this.renderSongsTable = this.renderSongsTable.bind(this);
        this.renderBackup = this.renderBackup.bind(this);
        this.renderBackupOrPlay = this.renderBackupOrPlay.bind(this);
        this.backUpTrack = this.backUpTrack.bind(this);
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
        console.log('here are your props:', next.library);
    };

    backUpTrack(track){
        console.log(`you just hit backUpTrack with this id which we'll use to upload this track to s3: ${track}`);
        //send back to server and begin uploading to s3.
        backupTrack(track);
    }

    renderPlay() {
        return (
            <span>
                <p>plaay</p>
            </span>
        )
    };

    renderBackup(){
        console.log('ooook')
        return (
            <span>
                <p>backuuuuup</p>
            </span>
        )
    }

    renderBackupOrPlay(track){
        // console.log(track);
        if(track.backedUp){
            return (
                <span>
                 play
                </span>
            );
        } else {
            return (
                <span onClick={(e) => this.backUpTrack(track.id)}>
                 backup
                </span>
            )
        }
    }

    renderSongsTable() {
       return _.map(this.props.library, (track, idx) => {
            return (
                    <tr className="trackRow" key={idx}>
                        <td className="trackData">{track.title}</td>
                        <td className="trackData">{track.artist}</td>
                        <td className="trackData">{track.playcount}</td>
                        <td className="trackData">{this.renderBackupOrPlay(track)}</td>
                    </tr>
                    )
        });
    };

    render(){

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
                        <th>play/backup</th>
                    </thead>
                    <tbody className="songsTableBody">
                        {this.renderSongsTable()}
                    </tbody>
                    </table>
				</div>
			</div>
        )
    };
};