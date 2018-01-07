const simonSounds = ['http://freesound.org/data/previews/316/316901_5385832-lq.mp3', 'http://freesound.org/data/previews/316/316908_5385832-lq.mp3', 'http://freesound.org/data/previews/316/316906_5385832-lq.mp3', 'http://freesound.org/data/previews/316/316904_5385832-lq.mp3',
	'http://freesound.org/data/previews/216/216090_3450800-lq.mp3'];
const start = document.getElementById('start');
const letters = document.querySelectorAll('span');
const levels = document.querySelector('#levels h3');
let simonSequence = [];
let playerSequence = [];
const numLevels = 3;
let level = 0;

start.addEventListener('click', function() {
	if (level < numLevels) {
		level++;
	} else {
		level = 1;
		simonSequence = [];
		playerSequence = [];
	}
	startGameSequence();
});

for (let j = 0; j < letters.length; j++) {
	letters[j].addEventListener('click', function() {
		let id = parseInt(this.id);
		let color = this.classList.value;
		playerSequence.push(id);
		console.log(`User-clicked: ${typeof id}, ${color}`);
		addClassAndSound(id, color);
		// verify user sequence matches Simon sequence
		if (!checkPlayerSequence()) {
			playSound(4);
			displayError();
			playerSequence = [];
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

function checkPlayerSequence() {
	for (let m = 0; m < playerSequence.length; m++) {
		console.log(`${simonSequence}, ${playerSequence}`);
		if (playerSequence[m] !== simonSequence[m]) {
			return false;
		}
	}
	return true;
}

function displayError() {
	console.log('error');
	levels.innerText = 'X';
	let counter = 0;
	let errorInterval = setInterval(function() {
		counter++;
		if (counter === 3) {
			// levels.innerText = 'X';
			clearInterval(errorInterval);
			playerSequence = [];
			counter = 0;
		}
	}, 500);
}

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

function generateRandomNum() {
	let random = Math.floor(Math.random() * 4);
	console.log(`Random number: ${random}`);
	simonSequence.push(random);
}

function addClassAndSound(id, color) {
	document.getElementById(`${id}`).classList.add(`${color}-active`);
	playSound(id);
	setTimeout(function() {
		document.getElementById(`${id}`).classList.remove(`${color}-active`);
	}, 200);
}

function playSound(id) {
	let sound = new Audio(simonSounds[id]);
	sound.play();
}

