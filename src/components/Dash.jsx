import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Dash extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.userFinder = this.userFinder.bind(this);
	}

	componentDidMount() {
		this.userFinder().then(user => {
			this.setState({
				name: user.firstname,
				email: user.email,
				id: user.id,
			});
		});
	}

	userFinder() {
		return new Promise((resolve, reject) => {
			const userObj = JSON.parse(window.localStorage.user);
			if (this) {
				// checking for 'this' is dumb but necessary to avoid error - dont fully understand it rn. remove it and read error
				if (!userObj) {
					reject();
				}
				resolve(userObj);
			}
		});
	}

	render() {
		return (
			<div className="dash">
				<p>{this.state.name}</p>
				<p>{this.state.email}</p>
				<p>hey</p>
			</div>
		);
	}
}
Dash.defaultProps = {
	user: null,
	history: null, // eslint-disable-line react/forbid-prop-types
};

Dash.propTypes = {
	user: PropTypes.shape({
		email: PropTypes.string,
		firstname: PropTypes.string,
		id: PropTypes.string.isRequired,
		token: PropTypes.string.isRequired,
	}),
	history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
	user: state.user,
});

const connectedDashContainer = connect(mapStateToProps)(Dash);
const DashRoute = withRouter(connectedDashContainer);

export default DashRoute;
