import { SET_SEARCH_TERM, SET_TOKEN, SET_USER, SET_LISTITEM } from './actions';

const DEFAULT_STATE = {
	searchTerm: 'whoa',
	firstname: 'first name',
	user: {
		email: 'aaaaah',
		firstname: 'mmmmmmmhmmmm',
		id: '1010101010101',
		token: 'tooooooken',
	},
	listitems: {},
};

const setToken = (state, action) =>
	Object.assign({}, state, { token: action.payload });

const setSearchTerm = (state, action) =>
	Object.assign({}, state, { searchTerm: action.payload });

const setUser = (state, action) =>
	Object.assign({}, state, {
		user: {
			email: action.payload.email,
			firstname: action.payload.firstname,
			id: action.payload.id,
			token: action.payload.token,
		},
	});

const setListitem = (state, action) =>
	Object.assign({}, state.listitems, { [action.payload.id]: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_SEARCH_TERM:
			return setSearchTerm(state, action);
		case SET_TOKEN:
			return setToken(state, action);
		case SET_USER:
			return setUser(state, action);
		case SET_LISTITEM:
			return setListitem(state, action);
		default:
			return state;
	}
};

export default rootReducer;
