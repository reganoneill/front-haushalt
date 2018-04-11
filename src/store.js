import { createStore } from 'redux';

import { SET_USER, SET_MOSTPLAYED_ALL, SET_MOSTPLAYED_6MONTHS, SET_MOSTPLAYED_3MONTHS } from './actions';

const defaultState = {
	user: {
		email: 'email@gmail',
		firstname: 'first name',
		id: '1010101010101',
		token: 'tooooooken'
	},
	topTracksAll: [],
};

const setUser = (state, action) => {
	return Object.assign({}, state, { user: action.payload.user });
};

const setMostPlayedAll = (state, action) => {
	return Object.assign({}, state, { topTracksAll: action.payload });
};

const setTopTracks6Months = (state, action) => {
	return Object.assign({}, state, { topTracks6Months: action.payload });
};

const setTopTracks3Months = (state, action) => {
	return Object.assign({}, state, { topTracks3Months: action.payload });
};



const AppReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_USER:
			return setUser(state, action);
		case SET_MOSTPLAYED_ALL:
			return setMostPlayedAll(state, action);
		case SET_MOSTPLAYED_6MONTHS:
			return setTopTracks6Months(state, action);
		case SET_MOSTPLAYED_3MONTHS:
			return setTopTracks3Months(state, action);
		default:
			return state;
	}
};

const AppStore = createStore(AppReducer);

export default AppStore;
