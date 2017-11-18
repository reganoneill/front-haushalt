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
		};
		this.handleSignin = this.handleSignin.bind(this);
		this.emailChange = this.emailChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
	}

	componentDidUpdate() {
		if (this.props.token) {
			this.props.history.push('/dash');
		}
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
		return (
			<div className="signin">
				<h1>signin</h1>
				<p>{this.props.token}</p>
				<h2>{this.props.searchTerm}</h2>
				<h2>{this.state.password}</h2>
				<button onClick={this.testPageChange}>change page</button>
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
	searchTerm: null,
	signin: null,
	token: null,
	history: null, // this works but looks weird. strange that it needs a default as it is pretty much native
};

Signin.propTypes = {
	searchTerm: PropTypes.string,
	signin: PropTypes.func,
	token: PropTypes.string,
	history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
	token: state.token,
	searchTerm: state.searchTerm,
});

const mapDispatchToProps = dispatch => ({
	// signin: user => dispatch(signinRequest(user)),
	signin(user) {
		dispatch(signinRequest(user));
	},
	// handleChange(event) {
	// 	dispatch(setSearchTerm(event.target.value));
	// },
});

const connectedContainer = connect(mapStateToProps, mapDispatchToProps)(Signin);
const ready2route = withRouter(connectedContainer);

export default ready2route;
