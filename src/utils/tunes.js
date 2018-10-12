import superagent from 'superagent';
import _ from 'lodash';
import async from 'async';
import { setLibrary, setMostPlayedAll, setMostPlayed6months, setMostPlayed3months, setMainView, setTempView } from '../actionCreators';
// import multer from 'multer';
// import AWS from 'aws-sdk';


// const s3 = new AWS.S3();

// var uploadStore = __dirname + '/../uploads';
// console.log(uploadStore);
// var upload = multer({dest: uploadStore });



export function fetchEntireLibrary() {
	return new Promise((resolve, reject) => {
		let resBody;
		console.log('going in');
		superagent.get(`http://localhost:3000/api/loadLibrary`).end((err, res) => {
			if (err) {
				console.error('ERROR:', err);
				reject(err);
			}
			setLibrary(res.body.res);
			resolve('worked');
		});
	});
}

export function backupTrack(trackid) {
	return new Promise((resolve, reject) => {
		console.log('backupTrack');
		superagent.post(`http://localhost:3000/api/backupTrack`).send({id: trackid}).then((thing) => {
			console.log('what is this', thing);
		})
	});
};


export function fetchPrimaryFavorites() {
	let resBody;
	superagent.get(`http://localhost:3000/api/loadMainView`).end((err, res) => {
		if (err) {
			console.error('ERROR:', err);
			return err;
		}
		console.log('le res', res.body);
		_.each(res.body, (obj) => {
			obj.dataset = _.orderBy(obj.dataset, ['playcount'], ['desc']);
		});
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
		if(obj.insightDropdown === 'artists') {
			resBody.dataset = res.body.res;
			resBody.title = res.body.title;
			resBody.tip = 'topArtists';
			setTempView(resBody);
			return;
		}
		resBody.dataset = _.orderBy(res.body.res, ['playcount'], ['desc']);
		resBody.title = res.body.title;
		setTempView(resBody);
		return;
	})
};

// export function backupTrack(obj) {
// 	console.log('sending this to the server -->', obj);

// 	//var myFormData = new FormData();
// 	// myFormData.append('pictureFile', pictureInput.files[0]);
// 	// return;
// 	// const data = new FormData();
// 	// data.append('serverPath', obj.location, obj.id);
// 	// data.append('track', JSON.stringify(obj));

// 	// console.log('the data--->', data);
// 	// return;
// 	superagent.post('http://localhost:3000/api/addToCloud').send(obj).then((res) => {
// 		console.log('here is the res! -->', res);
// 	});
// }

export function uploadTrack(obj){
	console.log('here is the object we are sending:', obj);
	return;
	superagent.post('http://localhost:3000/api/addToCloud').send(obj).then((res) => {
		console.log('the res from uploading --> ', res);


	})
};

export function getLoved() {
	let resBody;
	superagent.get(`http://localhost:3030/api/getUserLibrary`).end((err, res) => {
		if (err) {
			console.error('ERROR:', err);
			return err;
		}
		console.log('le res', res.body);
		// _.each(res.body, (obj) => {
			// console.log('track-->', obj);
			res.body.dataset = _.orderBy(res.body.dataset, ['playcount'], ['desc']);
		// });
		setMainView([res.body]);
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
