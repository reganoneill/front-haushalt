import { connect } from 'react-redux';
import SaveJam from './SaveJam.jsx';

const mapStateToProps = (state, props) => {
	return {
		user: state.user,
		topTracksAll: state.topTracksAll,
		topTracks6Months : state.topTracks6Months,
		topTracks3Months : state.topTracks3Months,
		lists     : state.lists,
		tempLists : state.tempLists
	};
};

export default connect(mapStateToProps)(SaveJam);
