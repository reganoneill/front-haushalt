import superagent from 'superagent';
import _ from 'lodash';
import { SET_SEARCH_TERM, SET_TOKEN, SET_USER } from './actions';

export function setSearchTerm(searchTerm) {
	return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export function setToken(token) {
	return { type: SET_TOKEN, payload: token };
}

export function setUser(user) {
	return {
		type: SET_USER,
		payload: user,
	};
}

export const signinRequest = user => dispatch => {
	superagent
		.post(`http://localhost:8080/signin`)
		.send(user)
		.then(res => {
			const yourUser = _.assign(
				{},
				{
					email: res.body.email,
					firstname: res.body.firstname,
					id: JSON.stringify(res.body.id),
					token: res.body.token,
				},
			);
			window.localStorage.setItem('user', res.text);
			document.cookie = `hausJwt=${res.body.token}`;
			dispatch(setUser(yourUser));
			return res;
		});
};
