import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKHr8la5rOVmbGMDhAPvDPtlmacqFBcIA",
  authDomain: "dharmannbingoboard.firebaseapp.com",
  projectId: "dharmannbingoboard",
  storageBucket: "dharmannbingoboard.appspot.com",
  messagingSenderId: "402567985467",
  appId: "1:402567985467:web:39b898e9785dd20ad01f1e",
  measurementId: "G-L45KBQDD45"
};

// Initialize Firebase
const appe = initializeApp(firebaseConfig);
const analytics = getAnalytics(appe);
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

// Setup
const app = express();
app.use('/', express.static("public"));


app.listen(3000);