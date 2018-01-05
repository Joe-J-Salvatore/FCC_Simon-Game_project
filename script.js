const start = document.getElementById('start');
const letters = document.querySelectorAll('span');
console.log(letters);
let simonSequence = [0, 1, 2];
let playerSequence = [];
let level = 0;

start.addEventListener('click', function() {
	level++;
	startGameSequence();
});

for (let j = 0; j < letters.length; j++) {
	letters[j].addEventListener('click', function() {
		let id = this.id;
		let color = this.classList.value;
		playerSequence.push(id);
		console.log(`User-clicked: ${id}, ${color}`);
		addClassAndSound(id, color);
		// verify user sequence matches Simon sequence
		if (!checkPlayerSequence()) {
			displayError();
			playerSequence = [];
		}
		if (playerSequence === simonSequence) {
			level++;
			playerSequence = [];
			startGameSequence();
		}
	});
}

function checkPlayerSequence() {
	for (let m = 0; m < playerSequence.length; m++) {
		if (playerSequence[m] !== simonSequence[m]) {
			return false;
		}
	}
	return true;
}

function displayError() {
	
}

function startGameSequence() {
	console.log(`Level: ${level}`);
	// display level value in HTML
	// generateRandomNum();
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
	// playSound(id);
	setTimeout(function() {
		document.getElementById(`${id}`).classList.remove(`${color}-active`);
	}, 200);
}

// function playSound(id) {

// }

