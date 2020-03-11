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

export function getMURVGenes(callback){

  let genesTemp;
  let genes = [];
  firebase.database().ref().on('value', (snapshot) => {
    for (var i = 0; i < Object.keys(snapshot.val()).length; i++) {
      genesTemp = snapshot.val()[Object.keys(snapshot.val())[i]].genes;
      for (var j = 0; j < Object.keys(genesTemp).length; j++) {
        genes.push(genesTemp[Object.keys(genesTemp)[j]].gene);
      }
    }
    callback(genes);
  });
}

export function getOpenResponses(callback){
  let arr = [];
  let sus = [];
  let total = 0;
  let liked = 0;
  let count = 0;
  firebase.database().ref().on('value', (snapshot) => {
    for (var i = 0; i < Object.keys(snapshot.val()).length; i++) {
      console.log(snapshot.val()[Object.keys(snapshot.val())[i]])
      if(snapshot.val()[Object.keys(snapshot.val())[i]].survey)
        arr.push(snapshot.val()[Object.keys(snapshot.val())[i]].survey)
      if(snapshot.val()[Object.keys(snapshot.val())[i]].sus)
        sus.push(snapshot.val()[Object.keys(snapshot.val())[i]].sus.response.value)
      total += Object.keys(snapshot.val()[Object.keys(snapshot.val())[i]].genes).length;
      for (var j = 0; j < Object.keys(snapshot.val()[Object.keys(snapshot.val())[i]].genes).length; j++) {
        if(snapshot.val()[Object.keys(snapshot.val())[i]].genes[Object.keys(snapshot.val()[Object.keys(snapshot.val())[i]].genes)[j]].response)
          liked++;
      }
    }

    callback({open:arr, sus:sus, totalVis: total, liked: liked, partCount: Object.keys(snapshot.val()).length});
  })

}

export function getSUS(callback){

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
