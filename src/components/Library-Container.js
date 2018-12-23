import { connect } from 'react-redux';
import Library from './Library.jsx';

const mapStateToProps = (state, props) => {
    return {
        user: state.user,
        library: state.library
    };
};

export default connect(mapStateToProps)(Library);