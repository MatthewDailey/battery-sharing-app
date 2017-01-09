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
      .update(data));
}

const setBatteryLevel = (batteryLevel) => {
  console.log('Called setBatteryLevel ', batteryLevel);
  storePhoneDataForUser({
    batteryLevel,
    name: getUser().displayName,
    timestamp: new Date().getTime(),
  })
    .catch(console.log);
};

function readBatteryStatus() {
  return new Promise((resolve, reject) => {
    RNBatteryStatus.batteryStatus(
      'getLevel', // getLevel, turnOff
      (errorResults) => {
        setBatteryLevel(errorResults.errMsg ? errorResults.errMsg : 'unknown');
        reject(errorResults);
      },
      (successResults) => {
        setBatteryLevel(parseBatteryLevel(successResults.successMsg));
        console.log('Read battery Success: ', successResults);
        resolve(successResults);
      }
    );
  });
}

export function readBatteryAndStore() {
  return isSignedIn()
    .then(() => readBatteryStatus());
}

export function onInitialSignIn(handler) {
  firebaseApp.auth().onAuthStateChanged((user) => {
    if (!user) {
      firebaseApp.auth().signInAnonymously();
    } else {
      handler(user);
      readBatteryStatus()
        .catch(console.log);
    }
  });
}

export function storeName(name) {
  return isSignedIn()
    .then(() => getUser().updateProfile({ displayName: name }))
    .then(() => firebase
      .database()
      .ref('users')
      .child(getUser().uid)
      .update({ name }));
}

export function listenToAllUserPhoneData(handler) {
  const listenForValueIgnoreEmpty = (snapshot) => {
    if (snapshot && snapshot.exists()) {
      handler(snapshot.val());
    }
  };

  firebaseApp
    .database()
    .ref('users')
    .on('value', listenForValueIgnoreEmpty);
  return () => firebaseApp
    .database()
    .ref('users')
    .off('child_added', listenForValueIgnoreEmpty);

}