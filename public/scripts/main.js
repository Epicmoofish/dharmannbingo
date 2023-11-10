var rhit = rhit || {};
const adminApiUrl = "http://localhost:3000/api/admin/";
//Reference (Note: the Admin api tells you words.  You are an admin.):
// POST   /api/admin/add      with body {"word": "..."} - Add a word to the word list
// GET    /api/admin/words    													- Get all words
// GET    /api/admin/word/:id 													- Get a single word at index
// PUT    /api/admin/word/:id with body {"word": "..."} - Update a word at index
// DELETE /api/admin/word/:id 													- Delete a word at index

const playerApiUrl = "http://localhost:3000/api/player/";
//Reference (The player api never shares the word. It is a secret.):
// GET    /api/player/numwords    											- Get the number of words
// GET    /api/player/wordlength/:id								 		- Get the length of a single word at index
// GET    /api/player/guess/:id/:letter								  - Guess a letter in a word

rhit.AdminController = class {
	constructor() {
		// Note to students, the contructor is done.  You will be implementing the methods one at a time.
		// Connect the buttons to their corresponding methods.
		document.querySelector("#addButton").onclick = (event) => {
			const createWordInput = document.querySelector("#createWordInput");
			this.add(createWordInput.value);
			createWordInput.value = "";
		};
		document.querySelector("#readAllButton").onclick = (event) => {
			this.readAll();
		};
		document.querySelector("#readSingleButton").onclick = (event) => {
			const readIndexInput = document.querySelector("#readIndexInput");
			this.readSingle(parseInt(readIndexInput.value));
			readIndexInput.value = "";
		};
		document.querySelector("#updateButton").onclick = (event) => {
			const updateIndexInput = document.querySelector("#updateIndexInput");
			const updateWordInput = document.querySelector("#updateWordInput");
			this.update(parseInt(updateIndexInput.value), updateWordInput.value);
			updateIndexInput.value = "";
			updateWordInput.value = "";
		};
		document.querySelector("#deleteButton").onclick = (event) => {
			const deleteIndexInput = document.querySelector("#deleteIndexInput");
			this.delete(parseInt(deleteIndexInput.value));
			deleteIndexInput.value = "";
		};
	}

	add(word) {
		if (!word) {
			console.log("No word provided.  Ignoring request.");
			return;
		}
		let data = { "word":word};

    let entry = fetch(adminApiUrl+"add/", {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify( data )
    })
    .then(data=> {
    }).catch( (err)=>{
        console.log(err);
    });

	}

	readAll() {
		let entry = fetch(adminApiUrl+"words/")
		.then(response=>response.json())
		.then(data=> {
			let dataStr = "";
			for (let i = 0; i<data.length; i++) {
				dataStr += data.words[i];
				if (i < data.length-1) dataStr+=", ";
			}
			document.querySelector("#readAllOutput").innerHTML = `{"words": [${dataStr}], "length": ${data.length}`;
		});
		// TODO: Add your code here.

		// Hint for something you will need later in the process (after backend call(s))
		}

	readSingle(index) {
		if (Number.isNaN(index)) {
			console.log("No index provided.  Ignoring request.");
			return;
		}
		let entry = fetch(adminApiUrl+"word/"+index)
		.then(response=>response.json())
		.then(data=> {
			document.querySelector("#readSingleOutput").innerHTML = data.word;
		});
		// TODO: Add your code here.

		// Hint for something you will need later in the process (after backend call(s))
		// document.querySelector("#readSingleOutput").innerHTML = "Result goes here"
	}

	update(index, word) {
		if (Number.isNaN(index)) {
			console.log("No index provided.  Ignoring request.");
			return;
		}
		if (!word) {
			console.log("No word provided.  Ignoring request.");
			return;
		}
		let data = {"word": word};
		let entry = fetch(adminApiUrl+"word/"+index,{
			method: "PUT",
			headers: {"Content-Type": 'application/json'},
			body: JSON.stringify( data )
		})
		.then(response=>response.json())
		.then(data=> {

		});
		// TODO: Add your code here.

	}

	delete(index) {
		if (Number.isNaN(index)) {
			console.log("No index provided.  Ignoring request.");
			return;
		}
		let entry = fetch(adminApiUrl+"word/"+index,{
			method: "DELETE"
		})
		.then(response=>response.json())
		.then(data=> {

		});
		// TODO: Add your code here.

	}
}

rhit.PlayerController = class {
	constructor() {
		// Note to students, you can declare instance variables here (or later) to track the state for the game in progress.

		// Connect the Keyboard inputs
		const keyboardKeys = document.querySelectorAll(".key");
		for (const keyboardKey of keyboardKeys) {
			keyboardKey.onclick = (event) => {
				this.handleKeyPress(keyboardKey.dataset.key);
			};
		}
		// Connect the new game button
		document.querySelector("#newGameButton").onclick = (event) => {
			this.handleNewGame();
		}
		this.handleNewGame(); // Start with a new game.
	}
	id = 0;
	wordlen = 0;
	guessResults = [];
	handleNewGame() {
		let entry = fetch(playerApiUrl+"numwords")
		.then(response=>response.json())
		.then(data=> {
			this.id = Math.floor(Math.random() * data.length);
			let entry2 = fetch(playerApiUrl+"wordlength/"+this.id)
			.then(response=>response.json())
			.then(data=> {
				this.wordlen = data.length;
				this.updateView();
			});
		});
		

	}

	handleKeyPress(keyValue) {
		let entry = fetch(playerApiUrl+"guess/"+this.id+"/"+keyValue)
		.then(response=>response.json())
		.then(data=> {
			this.guessResults.push(data);
			this.updateView();
		});
		// TODO: Add your code here.

	}

	updateView() {

		document.querySelector("#displayWord").innerHTML = "";
		for (let i = 0; i<this.wordlen; i++) {
			document.querySelector("#displayWord").innerHTML += "_"
		}
		document.querySelector("#incorrectLetters").innerHTML = "";
		this.guessResults = this.guessResults.sort((a, b)=> {
			return a.letter.localeCompare(b.letter);
		})
		function setCharAt(str,index,chr) {
			if(index > str.length-1) return str;
			return str.substring(0,index) + chr + str.substring(index+1);
		}
		for (let j = 0; j<this.guessResults.length; j++) {
			if (this.guessResults[j].locations.length==0) {
				document.querySelector("#incorrectLetters").innerHTML += this.guessResults[j].letter;
			} else {
				for (let k = 0; k < this.guessResults[j].locations.length; k++) {
					document.querySelector("#displayWord").innerHTML = setCharAt(document.querySelector("#displayWord").innerHTML, this.guessResults[j].locations[k], this.guessResults[j].letter);
				}
			}
		}
		// Some hints to help you with updateView.
		// 	document.querySelector("#displayWord").innerHTML = "____";
		// 	document.querySelector("#incorrectLetters").innerHTML = "ABCDE";

		// 	const keyboardKeys = document.querySelectorAll(".key");
		// 	for (const keyboardKey of keyboardKeys) {
		// 		if (some condition based on keyboardKey.dataset.key) {
		// 			keyboardKey.style.visibility = "hidden";
		// 		} else {
		// 			keyboardKey.style.visibility = "initial";
		// 		}
		// 	}
	}
}

/* Main */
rhit.main = function () {
	console.log("Ready");
	if (document.querySelector("#adminPage")) {
		console.log("On the admin page");
		new rhit.AdminController();
	}
	if (document.querySelector("#playerPage")) {
		console.log("On the player page");
		new rhit.PlayerController();
	}
};

rhit.main();