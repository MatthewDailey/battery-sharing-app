import firebase from 'firebase';

import { RNBatteryStatus } from 'NativeModules';

const firebaseConfig = {
  apiKey: 'AIzaSyAmdEA7HWeyccjT5CTEGUtSoJU5cCNfutI',
  authDomain: 'battery-sharing-c0cb3.firebaseapp.com',
  databaseURL: 'https://battery-sharing-c0cb3.firebaseio.com',
  storageBucket: 'battery-sharing-c0cb3.appspot.com',
  messagingSenderId: '757446386071',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default undefined;

function getUser() {
  return firebaseApp
    .auth()
    .currentUser;
}

function isSignedIn() {
  return new Promise((resolve, reject) => {
    console.log(getUser())
    if (getUser()) {
      resolve();
    } else {
      reject('ERROR: Not signed in.');
    }
  });
}

function parseBatteryLevel(successMsg) {
  return parseFloat(
    successMsg.replace('Battery level is ', '').replace(' percent', '')).toFixed(2);
}

function storePhoneDataForUser(data) {
  return isSignedIn()
    .then(() => firebase
      .database()
      .ref('users')
      .child(getUser().uid)
      .set(data));
}

const setBatteryLevel = (batteryLevel) => {
  console.log('Called setBatteryLevel ', batteryLevel);
  storePhoneDataForUser({
    batteryLevel,
  })
    .catch(console.log);
};

function readBatteryStatus() {
  RNBatteryStatus.batteryStatus(
    'getLevel', // getLevel, turnOff
    (errorResults) => {
      setBatteryLevel('unknown');
      console.log('JS Error: ', errorResults);
    },
    (successResults) => {
      setBatteryLevel(parseBatteryLevel(successResults.successMsg));
      console.log('JS Success: ', successResults);
    }
  );
}

firebaseApp.auth().onAuthStateChanged((user) => {
  if (!user) {
    firebaseApp.auth().signInAnonymously();
  } else {
    readBatteryStatus();
  }
});