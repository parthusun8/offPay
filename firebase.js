const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");

console.log(process.env.FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: "AIzaSyAYen1PzrAwvKW7Bbjr5Gc8XgNvqw-RfQE",
  authDomain: "offpay-e34e7.firebaseapp.com",
  databaseURL: "https://offpay-e34e7-default-rtdb.firebaseio.com",
  projectId: "offpay-e34e7",
  storageBucket: "offpay-e34e7.appspot.com",
  messagingSenderId: "337574039524",
  appId: "1:337574039524:web:6c1bdf310636f524ebc1f1",
  measurementId: "G-HQCXBH71TE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

auth.languageCode = "it";
module.exports = { auth, db };
