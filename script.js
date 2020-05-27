'use strict'

let getSel = selector => document.querySelector(selector);

function date() {
    let myDate = new Date();
    let day = myDate.getDate();
    let month = myDate.getMonth() + 1;
    let year = myDate.getFullYear();
    getSel('.currentDate').textContent = (day > 9 ? day : "0" + day) + '.' + (month > 9 ? month : "0" + month) + '.' + (year);
}
date();

// Перший варіант, як можна вивести поточний час

setInterval(() => {
    let myDate = new Date();
    let hh = myDate.getHours();
    let mm = myDate.getMinutes();
    let ss = myDate.getSeconds();
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;
    getSel('.currentTime').textContent = `${hh}:${mm}:${ss}`;
});

// Другий  варіант, як можна вивести поточний час

// let myTimer = setInterval(myClock, 1000);
// function myClock() {
//     getSel('.currentTime').textContent  = new Date().toLocaleTimeString();
// }


let timeBegan = null;
let timeStopped = null;
let stoppedDuration = 0;
let started = null;

function start() {
    if (timeBegan === null) {
        timeBegan = new Date();
    } else {
        clearInterval(started);
    };

    if (timeStopped !== null) {
        stoppedDuration += (new Date() - timeStopped);
    };

    started = setInterval(clockRunning, 10);

    return stoppedDuration;
}

function stop() {
    timeStopped = new Date();
    clearInterval(started);
}

function clockRunning() {
    let currentTime = new Date();
    let timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);
    let hour = timeElapsed.getUTCHours();
    let min = timeElapsed.getUTCMinutes();
    let sec = timeElapsed.getUTCSeconds();
    let ms = timeElapsed.getUTCMilliseconds();

    getSel('.startStop').innerHTML = (hour > 9 ? hour : "0" + hour) + " : " + (min > 9 ? min : "0" + min) + " : " + (sec > 9 ? sec : "0" + sec) + " . " + (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
};

function reset() {
    clearInterval(started);
    stoppedDuration = 0;
    timeBegan = null;
    timeStopped = null;
    getSel('.startStop').innerHTML = '00 : 00 : 00 . 000';
}

// Button LOOP додає в список зправа час, на якому ми зупинилсь
getSel('.loop').onclick = function () {
    let text = getSel('.startStop').innerHTML;
    let ul = getSel('.list');
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.className = "txt";
    li.appendChild(span);
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
}

// Баттони, які відповідають за те, щоб збільшити або зменшити час таймера

let currentTimeMinutesConfigValue = 25;
updateConfigTime();

let currentTimeSeconds = 0;
let isTimerRunning = false;
let isTimerReseted = true;


getSel('.plus').onclick = function () {
    ++currentTimeMinutesConfigValue;
    getSel('.txtTimeFst').innerHTML = currentTimeMinutesConfigValue;
}
getSel('.minus').onclick = function () {
    --currentTimeMinutesConfigValue;
    getSel('.txtTimeFst').innerHTML = currentTimeMinutesConfigValue;
}

function startTimer() {

    if (!isTimerRunning) {
        isTimerRunning = true;
        if (isTimerReseted) {
            currentTimeSeconds = currentTimeMinutesConfigValue * 60;
            isTimerReseted = false;
        }
        countdownTimer();
    }
}

function updateConfigTime() {
    getSel('.txtTimeFst').innerHTML = currentTimeMinutesConfigValue;
}

function updateCurrentTime() {
    let minutes = parseInt(currentTimeSeconds / 60, 10)
    let seconds = parseInt(currentTimeSeconds % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    getSel('.txtTimeSnd').innerHTML = minutes + " : " + seconds;
}

function countdownTimer() {
    let timerStart = setInterval(function () {
        if (currentTimeSeconds > 0) {
            --currentTimeSeconds;
        }
        updateCurrentTime();
    }, 1000);

    getSel('.stopCountdown').onclick = function () {
        isTimerRunning = false;
        clearInterval(timerStart);
    }
    getSel('.resetCountdown').onclick = function () {
        currentTimeSeconds = 0;
        isTimerReseted = true;
        isTimerRunning = false;
        updateCurrentTime();
        clearInterval(timerStart);
    }
}