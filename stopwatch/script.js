let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;
const timeDisplay = document.getElementById("time-display");
const lapsContainer = document.getElementById("laps");

function start() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime += difference;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    timeDisplay.innerHTML = "00:00:00";
    lapsContainer.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = formatTime(difference);
        const lapElement = document.createElement('li');
        lapElement.textContent = lapTime;
        lapsContainer.appendChild(lapElement);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = (updatedTime - startTime) + savedTime;
    timeDisplay.innerHTML = formatTime(difference);
}

function formatTime(time) {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return (
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + ":" +
        (milliseconds > 9 ? milliseconds : "0" + milliseconds)
    );
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
