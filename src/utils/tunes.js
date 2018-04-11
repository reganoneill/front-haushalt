import superagent from 'superagent';
import _ from 'lodash';
import async from 'async';
import { setMostPlayedAll, setMostPlayed6months, setMostPlayed3months } from '../actionCreators';

export function fetchPrimaryFavorites() {
	let resBody;
	superagent.get(`http://localhost:3000/api/mostPlayed`).end((err, res) => {
		if (err) {
			console.err('ERROR:', err);
			return err;
		}
		console.log('HERE IS YOUR RES:', res);
		resBody = _.orderBy(res.body.res, ['playcount'], ['desc']);
		setMostPlayedAll(resBody);
		return res;
	});
}


export function fetch6monthsFavorites() {
	let resBody;
	superagent.get(`http://localhost:3000/api/past6months`).end((err, res) => {
		if (err) {
			console.err('ERROR:', err);
			return err;
		}
		resBody = _.orderBy(res.body.res, ['playcount'], ['desc']);
		setMostPlayed6months(resBody);
		return res;
	});
}

export function fetch3monthsFavorites() {
	let resBody;
	superagent.get(`http://localhost:3000/api/past3months`).end((err, res) => {
		if (err) {
			console.err('ERROR:', err);
			return err;
		}
		resBody = _.orderBy(res.body.res, ['playcount'], ['desc']);
		setMostPlayed3months(resBody);
		return res;
	});
}
