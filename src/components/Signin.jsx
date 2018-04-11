import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { signinRequest } from '../actionCreators';

class Signin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			user: {},
		};
		this.handleSignin = this.handleSignin.bind(this);
		this.emailChange = this.emailChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
	}
	componentDidMount() {
		// if (window.localStorage.user) {
		// 	console.log('hittang');
		// 	this.props.history.push('/dash');
		// }
	}

	handleSignin(event) {
		event.preventDefault();
		return this.props.signin(this.state);
	}

	emailChange(event) {
		this.setState({ email: event.target.value });
	}

	passwordChange(event) {
		this.setState({ password: event.target.value });
	}

	render() {
		// console.log('here are the props:', this.props.user);
		return (
			<div className="signin">
				<h1>signin</h1>
				<h4>{this.props.user.email}</h4>
				<form onSubmit={this.handleSignin}>
					<input
						type="text"
						placeholder="email"
						value={this.state.email}
						onChange={this.emailChange}
					/>
					<input
						type="password"
						placeholder="password"
						value={this.state.password}
						onChange={this.passwordChange}
					/>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}
Signin.defaultProps = {
	signin: null,
	user: null,
	history: null, // eslint-disable-line react/forbid-prop-types
	// this works but looks weird. strange that it needs a default as it is pretty much native
};

Signin.propTypes = {
	signin: PropTypes.func,
	user: PropTypes.shape({
		email: PropTypes.string.isRequired,
		firstname: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		token: PropTypes.string.isRequired,
	}),
	// eslint-disable-next-line
	history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
	user: state.user,
});

const mapDispatchToProps = dispatch => ({
	signin(user) {
		dispatch(signinRequest(user));
	},
});

const connectedContainer = connect(mapStateToProps, mapDispatchToProps)(Signin);
const ready2route = withRouter(connectedContainer);

export default ready2route;
