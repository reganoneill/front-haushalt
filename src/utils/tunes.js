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
		console.log('le res', res.body);
		_.each(res.body, (obj) => {
			obj.dataset = _.orderBy(obj.dataset, ['playcount'], ['desc']);
		})
		setMainView(res.body);
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
