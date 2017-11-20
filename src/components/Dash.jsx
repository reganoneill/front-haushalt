import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { newListItem } from '../actionCreators';

class Dash extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.submitListItem = this.submitListItem.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.userFinder = this.userFinder.bind(this);
	}

	componentDidMount() {
		this.userFinder().then(user => {
			this.setState({
				name: user.firstname,
				email: user.email,
				id: user.id,
				title: 'placeholder title',
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

	handleTitleChange(e) {
		const title = e.target.value;
		this.setState({ title });
	}

	submitListItem(e) {
		e.preventDefault();
		if (this) {
			return this.props.dispatchListItem(this.state);
			// console.log('hehehe', this.state);
		}
		return 'shit';
	}

	render() {
		return (
			<div className="dash">
				<p>{this.state.name}</p>
				<p>{this.state.email}</p>
				<p>{this.state.title}</p>
				<form onSubmit={this.submitListItem}>
					<input
						value={this.state.title}
						onChange={this.handleTitleChange}
						placeholder="title"
					/>
					<input type="submit" value="submit the form" />
				</form>
			</div>
		);
	}
}
Dash.defaultProps = {
	// user: null,
	dispatchListItem: null,

	// history: null, // eslint-disable-line react/forbid-prop-types
};

Dash.propTypes = {
	// user: PropTypes.shape({
	// 	email: PropTypes.string,
	// 	firstname: PropTypes.string,
	// 	id: PropTypes.string.isRequired,
	// 	token: PropTypes.string.isRequired,
	// }),
	dispatchListItem: PropTypes.func,
	// history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
	user: state.user,
});

const mapDispatchToProps = dispatch => ({
	dispatchListItem(item) {
		dispatch(newListItem(item));
	},
});

const connectedDashContainer = connect(mapStateToProps, mapDispatchToProps)(
	Dash,
);
const DashRoute = withRouter(connectedDashContainer);

export default DashRoute;