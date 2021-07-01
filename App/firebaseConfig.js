import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBj_P_ugJssg1PPgxNESrMKXJ8Q2GHp-ig",
    authDomain: "hotelmanager-c62b6.firebaseapp.com",
    projectId: "hotelmanager-c62b6",
    storageBucket: "hotelmanager-c62b6.appspot.com",
    messagingSenderId: "1002479450148",
    appId: "1:1002479450148:web:bbed6eaa39ca605c9980b1",
    measurementId: "G-WT2Y7D9BF6"
};

export default firebaseApp = firebase.initializeApp(firebaseConfig);