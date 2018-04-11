import { connect } from 'react-redux';
import TuneJam from './TuneJam.jsx';

const mapStateToProps = (state, props) => {
	return {
		user: state.user,
		topTracksAll: state.topTracksAll,
		topTracks6Months : state.topTracks6Months,
		topTracks3Months : state.topTracks3Months
	};
};

export default connect(mapStateToProps)(TuneJam);
