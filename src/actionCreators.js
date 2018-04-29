import superagent from 'superagent';
import _ from 'lodash';
import Store from './store';

import {
	SET_SEARCH_TERM,
	SET_TOKEN,
	SET_USER,
	SET_LISTITEM,
	SET_MOSTPLAYED_ALL,
	SET_MOSTPLAYED_6MONTHS,
	SET_MOSTPLAYED_3MONTHS,
	SET_MAIN_VIEW,
	SET_TEMP_VIEW
} from './actions';

export function setUser(user) {

	Store.dispatch({
		type: SET_USER,
		user
	});
}

export const setMainView = item => {
	// console.log('inside actionCreators...here is the argument for setting the main view:', item);
	Store.dispatch({
		type: SET_MAIN_VIEW,
		payload: item
	});
};

export const setTempView = item => {
	Store.dispatch({
		type: SET_TEMP_VIEW,
		payload: item
	});
}

export const setMostPlayedAll = item => {
	console.log('inside actionCreators...here is the argument:', item);
	Store.dispatch({
		type: SET_MOSTPLAYED_ALL,
		payload: item
	});
};


export const setMostPlayed6months = item => {
	console.log('inside actionCreators...here is the argument:', item);
	Store.dispatch({
		type: SET_MOSTPLAYED_6MONTHS,
		payload: item
	});
};

export const setMostPlayed3months = item => {
	console.log('inside actionCreators...here is the argument:', item);
	Store.dispatch({
		type: SET_MOSTPLAYED_3MONTHS,
		payload: item
	});
};


export const signinRequest = user => {
	superagent
		.post(`http://localhost:8080/signin`)
		.send(user)
		.then(res => {
			console.log('our res!!!!!!', res);

			const yourUser = _.assign(
				{},
				{
					email: res.body.email,
					firstname: res.body.firstname,
					id: JSON.stringify(res.body.id),
					token: res.body.token,
					yowutUp: 'hehehehe'
				}
			);
			document.cookie = `token=${res.body.token}`;
			window.localStorage.setItem('user', JSON.stringify(yourUser));
			window.location.replace(`http://localhost:8081/dash/${res.body.email}`);
			// this dispatch below may be unnecessary as I think dispatch only gets called from mapDispatchToProps in the component
			// dispatch(setUser(yourUser));
			// return res;
		});

};

export const newListItem = listitem => {
	// get cookie to pass for jwt Authorization
	// const token = document.cookie.hausJwt;
	// TODO:getCookie function was a really quick fix...needs to be refactored.
	// console.log('here si the listitem:', listitem);
	// return;
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
		.then(
			res =>
				// const jsonres = JSON.stringify(res.body);

				// dispatch(setListItem(res.body));
				res
			// Store.dispatch({
			// 	type: SET_SEARCH_TERM,
			// 	payload: searchTerm
			// });
		);
};
