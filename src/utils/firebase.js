import firebase from 'firebase/app';
import 'firebase/database'

const config = {
  apiKey: "AIzaSyBlSyzh03lACb2iSvPidvi934OPEJE_I-M",
    authDomain: "microvisdesigns.firebaseapp.com",
    databaseURL: "https://microvisdesigns.firebaseio.com",
    projectId: "microvisdesigns",
    storageBucket: "microvisdesigns.appspot.com",
    messagingSenderId: "767925093154"
};
firebase.initializeApp(config);

if(!window.localStorage.getItem("firebase_key"))
  window.localStorage.setItem("firebase_key", firebase.database().ref().push().getKey());

export function getGeneKey(key){
  return firebase.database().ref().child(key).push().getKey();
}

export function setGeneResponse(key, geneKey, gene, response){
  firebase.database().ref(key + "/genes/" + geneKey).set({
    gene: gene,
    response: response
  });
}

export function setSurveyResponse(key, sKey, response, callback){
  firebase.database().ref(key + "/" + sKey).set({
    response: response
  }, callback())
}

export function setSUSResponse(key, response, callback){
  firebase.database().ref(key + "/sus").set({
    response: response
  }, callback())
}

export function sendData(obj, callback){
  let key = window.localStorage.getItem("firebase_key");
  firebase.database().ref().child(key).push({key: key, obj: obj}, function(error){
    callback();
  });
}

export default firebase;
