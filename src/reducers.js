import { SET_SEARCH_TERM, SET_TOKEN } from './actions';

const DEFAULT_STATE = {
	searchTerm: 'whoa',
};

const setToken = (state, action) =>
	Object.assign({}, state, { token: action.payload });

const setSearchTerm = (state, action) =>
	Object.assign({}, state, { searchTerm: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_SEARCH_TERM:
			return setSearchTerm(state, action);
		case SET_TOKEN:
			return setToken(state, action);
		default:
			return state;
	}
};

export default rootReducer;
