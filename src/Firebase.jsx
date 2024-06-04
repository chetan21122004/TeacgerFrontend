// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBq1sTeH85LDCB1_wCBI20UaPaqIyKE53o",
  authDomain: "attenbe.firebaseapp.com",
  databaseURL: "https://attenbe-default-rtdb.firebaseio.com/",
  projectId: "attenbe",
  storageBucket: "attenbe.appspot.com",
  messagingSenderId: "50468977570",
  appId: "1:50468977570:web:d27fb232dc76a0c28410fb",
  measurementId: "G-GM4R729M0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };





