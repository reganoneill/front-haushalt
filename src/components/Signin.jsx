import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import superagent from 'superagent'; // import { setSearchTerm } from '../actionCreators';
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
		this.testPageChange = this.testPageChange.bind(this);
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

	// testing out using history api to change pages
	testPageChange(event) {
		event.preventDefault();
		this.props.history.push('/test');
	}
	render() {
		return (
			<div className="signin">
				<h1>signin</h1>

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
	// handleChange: null,
};

Signin.propTypes = {
	// handleChange: PropTypes.function,
	searchTerm: PropTypes.string,
	signin: PropTypes.function,
};

const mapStateToProps = state => ({
	token: state.token,
	searchTerm: state.searchTerm,
});

const mapDispatchToProps = dispatch => ({
	signin: user => dispatch(signinRequest(user)),
	// handleChange(event) {
	// 	dispatch(setSearchTerm(event.target.value));
	// },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
