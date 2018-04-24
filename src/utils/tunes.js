import superagent from 'superagent';
import _ from 'lodash';
import async from 'async';
import { setMostPlayedAll, setMostPlayed6months, setMostPlayed3months, setMainView } from '../actionCreators';


export function fetchPrimaryFavorites() {
	let resBody;
	superagent.get(`http://localhost:3000/api/loadMainView`).end((err, res) => {
		if (err) {
			console.err('ERROR:', err);
			return err;
		}

		res.body.res.dataSet = _.orderBy(res.body.res.dataSet, ['playcount'], ['desc']);
		console.log('all time most played:', res.body.res);
		setMainView(res.body.res);
		return res;
	});
}


// export function fetch6monthsFavorites() {
// 	let resBody;
// 	superagent.get(`http://localhost:3000/api/past6months`).end((err, res) => {
// 		if (err) {
// 			console.err('ERROR:', err);
// 			return err;
// 		}
// 		resBody = _.orderBy(res.body.res, parseInt(['playcount']), ['desc']);
// 		setMostPlayed6months(resBody);
// 		return res;
// 	});
// }

// export function fetch3monthsFavorites() {
// 	let resBody;
// 	superagent.get(`http://localhost:3000/api/past3months`).end((err, res) => {
// 		if (err) {
// 			console.err('ERROR:', err);
// 			return err;
// 		}
// 		resBody = _.orderBy(res.body.res, parseInt(['playcount']), ['desc']);
// 		console.log('HERE IS YOUR RES 3mo:', resBody);
// 		setMostPlayed3months(resBody);
// 		return res;
// 	});
// }
