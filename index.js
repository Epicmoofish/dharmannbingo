import express from 'express'; 
import bodyParser from "body-parser";
import fs from "fs";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyBKHr8la5rOVmbGMDhAPvDPtlmacqFBcIA",
    authDomain: "dharmannbingoboard.firebaseapp.com",
    databaseURL: "https://dharmannbingoboard-default-rtdb.firebaseio.com",
    projectId: "dharmannbingoboard",
    storageBucket: "dharmannbingoboard.appspot.com",
    messagingSenderId: "402567985467",
    appId: "1:402567985467:web:39b898e9785dd20ad01f1e",
    measurementId: "G-L45KBQDD45"
  };
  

// Initialize Firebase
const apper = initializeApp(firebaseConfig);
import { getDatabase, ref, push, set } from "firebase/database";

// Initialize Cloud Firestore and get a reference to the service

// Setup
const app = express();
app.use('/', express.static("public"));
    
app.listen(3000);