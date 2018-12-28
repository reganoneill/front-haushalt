import superagent from "superagent";
import _ from "lodash";
import async from "async";
import {
  setLibrary,
  setMostPlayedAll,
  setMostPlayed6months,
  setMostPlayed3months,
  setMainView,
  setTempView,
  sets3Url
} from "../actionCreators";

export function fetchEntireLibrary() {
  return new Promise((resolve, reject) => {
    let resBody;
    console.log("going in");
    superagent.get(`http://localhost:3000/api/loadLibrary`).end((err, res) => {
      if (err) {
        console.error("ERROR:", err);
        reject(err);
      }
      setLibrary(res.body.res);
      resolve("worked");
    });
  });
}

export function backupTrack(track) {
  return new Promise((resolve, reject) => {
    console.log("backupTrack");
    superagent
      .post(`http://localhost:3000/api/backupTrack`)
      .send(track)
      .then(thing => {
        console.log("what is this", thing);
        resolve(thing);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function fetchPrimaryFavorites() {
  let resBody;
  superagent.get(`http://localhost:3000/api/loadMainView`).end((err, res) => {
    if (err) {
      console.error("ERROR:", err);
      return err;
    }
    console.log("le res", res.body);
    _.each(res.body, obj => {
      obj.dataset = _.orderBy(obj.dataset, ["playcount"], ["desc"]);
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
    .then(res => {
      console.log("save this to state and render it to a template-->", res);
      if (res.body.meta.rowCount < 1) {
        //return no results came back message
      }
      if (obj.insightDropdown === "artists") {
        resBody.dataset = res.body.res;
        resBody.title = res.body.title;
        resBody.tip = "topArtists";
        setTempView(resBody);
        return;
      }
      resBody.dataset = _.orderBy(res.body.res, ["playcount"], ["desc"]);
      resBody.title = res.body.title;
      setTempView(resBody);
      return;
    });
}

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

export function uploadTrack(obj) {
  console.log("here is the object we are sending:", obj);
  return;
  superagent
    .post("http://localhost:3000/api/addToCloud")
    .send(obj)
    .then(res => {
      console.log("the res from uploading --> ", res);
    });
}

export function fetchS3Info() {
  superagent.get("http://localhost:3000/api/fetchS3Info").then(res => {
    console.log(
      "the res to set state with so that we can conceal our s3 url --> ",
      res.body[0].title
    );
    let awsUrl = res.body[0].title;
    sets3Url(awsUrl);
    return;
  });
}

export function getLoved() {
  let resBody;
  superagent.get(`http://localhost:3030/api/getUserLibrary`).end((err, res) => {
    if (err) {
      console.error("ERROR:", err);
      return err;
    }
    console.log("le res", res.body);
    res.body.dataset = _.orderBy(res.body.dataset, ["playcount"], ["desc"]);
    setMainView([res.body]);
    return res;
  });
}
