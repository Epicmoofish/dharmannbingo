var rhit = rhit || {};
import { collection, doc, setDoc, getDoc, onSnapshot  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"; 
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
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
const apper = initializeApp(firebaseConfig);
rhit.AdminController = class {
	constructor() {
		// Note to students, the contructor is done.  You will be implementing the methods one at a time.
		// Connect the buttons to their corresponding methods.
		document.querySelector("#addButton").onclick = (event) => {
			const createWordInput = document.querySelector("#createWordInput");
			this.add(createWordInput.value.trim());
			createWordInput.value = "";
		};
		document.querySelector("#readAllButton").onclick = (event) => {
			this.readAll();
		};
		const datab = getFirestore(apper);
		const unsub = onSnapshot(doc(datab, "dharbingo", "dharbingo"), (doc) => {
			
			let data = doc.data().bingosquares;
		
			let dataStr = "";
			for (let i = 0; i<data.length; i++) {
				dataStr += data[i];
				if (i < data.length-1) dataStr+=", ";
			}
			document.querySelector("#readAllOutput").innerHTML = dataStr;
		});
	}

	add(word) {
		let arr =  word.split("\n");
		const db = getFirestore(apper);
	
		const docRef = doc(db, "dharbingo", "dharbingo");
		let data={"bingosquares":arr};
		setDoc(docRef, data)

	}

	readAll() {
		const db = getFirestore(apper);

    const docRef = doc(db, "dharbingo", "dharbingo");
    const docSnap = getDoc(docRef);
    docSnap.then((response)=> {

        let data = response.data().bingosquares;
		
		let dataStr = "";
		for (let i = 0; i<data.length; i++) {
			dataStr += data[i];
			if (i < data.length-1) dataStr+=", ";
		}
		document.querySelector("#readAllOutput").innerHTML = dataStr;
        
    });
		// TODO: Add your code here.

		// Hint for something you will need later in the process (after backend call(s))
		}

}



/* Main */
rhit.main = function () {
	console.log("Ready");
	if (document.querySelector("#adminPage")) {
		console.log("On the admin page");
		new rhit.AdminController();
	}
};

rhit.main();