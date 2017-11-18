import superagent from 'superagent';
import { SET_SEARCH_TERM, SET_TOKEN } from './actions';

export function setSearchTerm(searchTerm) {
	return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export function setToken(token) {
	return { type: SET_TOKEN, payload: token };
}

export const signinRequest = user => dispatch => {
	superagent
		.post(`http://localhost:8080/signin`)
		.send(user)
		.then(res => {
			// history.push('/fuck!');
			console.log(res); // eslint-disable-line no-console
			window.localStorage.setItem('user', res.text);
			dispatch(setToken(res.body.token));
			return res;
		});
	// .end('');
};
