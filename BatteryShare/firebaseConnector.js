import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAmdEA7HWeyccjT5CTEGUtSoJU5cCNfutI',
  authDomain: 'battery-sharing-c0cb3.firebaseapp.com',
  databaseURL: 'https://battery-sharing-c0cb3.firebaseio.com',
  storageBucket: 'battery-sharing-c0cb3.appspot.com',
  messagingSenderId: '757446386071',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.auth().onAuthStateChanged((user) => {
  if (!user) {
    firebaseApp.auth().signInAnonymously();
  }
});
