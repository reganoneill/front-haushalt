import superagent from 'superagent';
import _ from 'lodash';
import { SET_SEARCH_TERM, SET_TOKEN, SET_USER, SET_LISTITEM } from './actions';

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

export function setListItem(item) {
	return { type: SET_LISTITEM, payload: item };
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
			// this dispatch below may be unnecessary as I think dispatch only gets called from mapDispatchToProps in the component
			dispatch(setUser(yourUser));
			return res;
		});
};

export const newListItem = listitem => {
	// get cookie to pass for jwt Authorization
	// const token = document.cookie.hausJwt;
	// TODO:getCookie function was a really quick fix...needs to be refactored.
	console.log('here si the listitem:', listitem);
	return;
	const jwtName = 'hausJwt';
	function getCookie(token) {
		const v = document.cookie.match(`(^|;) ?${token}=([^;]*)(;|$)`);
		return v ? v[2] : null;
	}
	// const titleobj = JSON.stringify({ title: listitem });
	const cook = getCookie(jwtName);
	superagent
		.post(`http://localhost:8080/newListItem`)
		.set('Authorization', `JWT ${cook}`)
		.send(listitem)
		.then(res => {
			const jsonres = JSON.stringify(res.body);

			dispatch(setListItem(res.body));
			return res;
		});
};
