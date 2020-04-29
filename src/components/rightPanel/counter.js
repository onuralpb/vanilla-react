let progressBarS = document.getElementById('Sprogress');
let timeS = document.getElementById('second5');
let progressBarMi = document.getElementById('Miprogress');
let timeMi = document.getElementByld('second4');
let progressBarH = document.getElementById('Hprogress');
let timeH = document.getElementById('second3');
let progressBarD = document.getElementById('Dprogress');
let timeD = document.getElementById('second2');
let length = Math.PI * 2 * 100;

progressBarS.style.strokeDasharray = length;
progressBarMi.style.strokeDasharray = length;
progressBarH.style.strokeDasharray = length;
progressBarD.style.strokeDasharray = length;

let intervalTimerS, intervalTimerMi, intervalTimerH, intervalTimerD;
let countS,
	wholeTimeS = 60,
	countMi,
	wholeTimeMi = 60,
	countH,
	wholeTimeH = 24,
	countD,
	wholeTimeD = 30;

let today = new Date();
countM = 0;
countD = 30 - today.getDate() - 1;
countH = 24 - today.getHours() - 1;
countMi = 60 - today.getMinutes() - 1;
countS = 60 - today.getSeconds();

timerS();

displayTimeLeftS(countS);
function updateS(value, timePercent) {
	var offset = length + length * value / timePercent;
	progressBarS.style.strokeDashoffset = offset;
}

function timerS() {
	//counts time, takes seconds
	intervalTimerS = setInterval(function() {
		countS = --countS < 0 ? 59 : countS;
		if (countS == 59) {
			countMi = --countMi < 0 ? 59 : countMi;
			displayTimeLeftMi(countMi);
			if (countMi == 59) {
				countH = --countH < 1 ? 24 : countH;
				displayTimeLeftH(countH);
				if (countH == 24) {
					countD = --countD < 1 ? 30 : countD;
					displayTimeLeftD(countdD);
				}
			}
		}
		displayTimeLeftS(countS);
	}, 1000);
}

function displayTimeLeftS(timeLeft) {
	//displays time on the input
	let seconds = timeLeft;
	timeS.textContent = `${seconds < 10 ? '0' : ''} ${seconds}`;
	updateS(timeLeft, wholeTimeS);
}

displayTimeLeftMi(countMi);
function updateMi(value, timePercent) {
	var offset = length + length * value / timePercent;
	progressBarMi.style.strokeDashoffset = offset;
}

function displayTimeLeftMi(timeLeft) {
	//displays time on the input
	let seconds = timeLeft;
	timeMi.textContent = `${seconds < 10 ? '0' : ''} ${seconds}`;
	updateMi(timeLeft, wholeTimeMi);
}

displayTimeLeftH(countH);
function updateH(value, timePercent) {
	var offset = length + length * value / timePercent;
	progressBarH.style.strokeDashoffset = offset;
}

function displayTimeLeftH(timeLeft) {
	//displays time on the input
	let seconds = timeLeft;
	timeH.textContent = `${seconds < 10 ? '0' : ''} ${seconds}`;
	updateH(timeLeft, wholeTimeH);
}

displayTimeLeftD(countD);
function updateD(value, timePercent) {
	var offset = length + length * value / timePercent;
	progressBarD.style.strokeDashoffset = offset;
}

function displayTimeLeftD(timeLeft) {
	//displays time on the input
	let seconds = timeLeft;
	timeD.textContent = `${seconds < 10 ? '0' : ''} ${seconds}`;
	updateD(timeLeft, wholeTimeD);
}
