const simonSounds = ['http://freesound.org/data/previews/316/316901_5385832-lq.mp3', 'http://freesound.org/data/previews/316/316908_5385832-lq.mp3', 'http://freesound.org/data/previews/316/316906_5385832-lq.mp3', 'http://freesound.org/data/previews/316/316904_5385832-lq.mp3',
	'http://freesound.org/data/previews/216/216090_3450800-lq.mp3'];
const last = document.getElementById('last');
const start = document.getElementById('start');
const strict = document.getElementById('strict');
const letters = document.querySelectorAll('span');
const levels = document.querySelector('#levels h3');
let strictPlay = false;
let simonSequence = [];
let playerSequence = [];
const numLevels = 3;
let level = 0;

// onload Simon sequence
window.addEventListener('load', gameIntro());

function gameIntro() {
	simonSequence = [0, 1, 2, 3];
	let i = 0;
	let replayLastInterval = setInterval(function() {
		let id = simonSequence[i];
		let color = document.getElementById(`${id}`).classList.value;
		console.log(`ID: ${id}, Color: ${color}`);
		addClassAndSound(id, color);
		i++;
		if (i === simonSequence.length) {
			clearInterval(replayLastInterval);
			simonSequence = [];
			console.log(simonSequence);
		}
	}, 500);
}
// starts non-strict game play
start.addEventListener('click', function() {
	level = 1;
	simonSequence = [];
	playerSequence = [];
	// 	playerSequence = [];
	// 	simonSequence = [];
	// 	playerSequence = [];
	// if (level < numLevels) {
	// 	level++;
	// } else {
	// 	level = 1;
	// 	simonSequence = [];
	// 	playerSequence = [];
	// }
	startGameSequence();
});
// user selection i/o
for (let j = 0; j < letters.length; j++) {
	letters[j].addEventListener('click', function() {
		let id = parseInt(this.id);
		let color = this.classList.value;
		playerSequence.push(id);
		console.log(`User-clicked: ${typeof id}, ${color}`);
		addClassAndSound(id, color);
		// return action after verifying user sequence against Simon sequence
		if (!checkPlayerSequence()) {
			playSound(4);
			displayError();
			replayLastSimonSeq();
			playerSequence = [];
			if (strictPlay) {
				simonSequence = [];
				level = 1;
				startGameSequence();
			}
		}
		if (playerSequence.length === simonSequence.length && playerSequence.length < numLevels) {
			level++;
			playerSequence = [];
			startGameSequence();
		}
		if (playerSequence.length === numLevels) {
			levels.innerText = 'W';
		}
	});
}
// verifies user array with simon array
function checkPlayerSequence() {
	for (let m = 0; m < playerSequence.length; m++) {
		console.log(`${simonSequence}, ${playerSequence}`);
		if (playerSequence[m] !== simonSequence[m]) {
			return false;
		}
	}
	return true;
}
// displays error ('X'), during non-strict game play when user makes incorrect selection
function displayError() {
	console.log('error');
	levels.innerText = 'X';
	let counter = 0;
	let errorInterval = setInterval(function() {
		counter++;
		if (counter === 3) {
			clearInterval(errorInterval);
			playerSequence = [];
			counter = 0;
		}
	}, 500);
}
// initial game play
function startGameSequence() {
	console.log(`Level: ${level}`);
	levels.innerText = level;
	generateRandomNum();
	let i = 0;
	let gameInterval = setInterval(function() {
		let id = simonSequence[i];
		let color = document.getElementById(`${id}`).classList.value;
		console.log(`ID: ${id}, Color: ${color}`);
		addClassAndSound(id, color);
		i++;
		if (i === simonSequence.length) {
			clearInterval(gameInterval);
		}
	}, 1000);
}
// psuedorandom number generation used to build game sequence
function generateRandomNum() {
	let random = Math.floor(Math.random() * 4);
	console.log(`Random number: ${random}`);
	simonSequence.push(random);
}
// adds temporary class to letters; color shift and movement
function addClassAndSound(id, color) {
	document.getElementById(`${id}`).classList.add(`${color}-active`);
	playSound(id);
	setTimeout(function() {
		document.getElementById(`${id}`).classList.remove(`${color}-active`);
	}, 200);
}
// game sequence, user selection, and error sounds
function playSound(id) {
	let sound = new Audio(simonSounds[id]);
	sound.play();
}

function replayLastSimonSeq() {
	if (simonSequence.length !== 0) {
		let l = 0;
		let replayLastInterval = setInterval(function() {
			let id = simonSequence[l];
			let color = document.getElementById(`${id}`).classList.value;
			console.log(`ID: ${id}, Color: ${color}`);
			addClassAndSound(id, color);
			l++;
			if (l === simonSequence.length) {
				clearInterval(replayLastInterval);
			}
		}, 1000);
	} else {
		level = 1;
		playerSequence = [];
		startGameSequence();
	}
}
// last game sequence replay: 
last.addEventListener('click', replayLastSimonSeq);
// strict play: if user makes one wrong selection the game restarts
strict.addEventListener('click', function() {
	strictPlay = true;
	level = 1;
	simonSequence = [];
	playerSequence = [];
	startGameSequence();
});