import superagent from 'superagent';
import _ from 'lodash';
import async from 'async';
import { setMostPlayedAll, setMostPlayed6months, setMostPlayed3months, setMainView, setTempView } from '../actionCreators';


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

export function buildQuery(obj) {
	let resBody = {};
	superagent
	.post(`http://localhost:3000/api/getReport`)
	.send(obj)
  .then((res) => {
		console.log('save this to state and render it to a template-->', res);
		if (res.body.meta.rowCount < 1) {
			//return no results came back message
		}
		resBody.dataset = _.orderBy(res.body.res, ['playcount'], ['desc']);
		resBody.title = res.body.title;
		setTempView(resBody);
		return;
	})
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
