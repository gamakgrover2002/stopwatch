const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const milliSecondsLabel = document.getElementById("milliSeconds");

const startButton = document.getElementById("start-btn");
const endButton = document.getElementById("stop-btn");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");

const lapList = document.getElementById("lap-list");

let minutes = 0;
let seconds = 0;
let milliSeconds = 0;
let interval;

startButton.addEventListener("click", startTimer);
endButton.addEventListener("click", endTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

function startTimer() {
  interval = setInterval(updateTimer, 10);
  startButton.disabled = true;
  endButton.disabled = false;
  resetButton.disabled = false;
}

function endTimer() {
  clearInterval(interval);
  addToLapList();
  resetTime();

  startButton.disabled = false;
  endButton.disabled = true;
}

function pauseTimer() {
  clearInterval(interval);
  startButton.disabled = false;
}

function resetTimer() {
  resetTime();
  displayTimer();
  clearInterval(interval);
  startButton.disabled = false;
  endButton.disabled = true;
}

function updateTimer() {
  milliSeconds++;
  if (milliSeconds === 100) {
    milliSeconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  }
  displayTimer();
}

function displayTimer() {
  minutesLabel.textContent = padTime(minutes);
  secondsLabel.textContent = padTime(seconds);
  milliSecondsLabel.textContent = padTime(milliSeconds);
}

function padTime(time) {
  return time.toString().padStart(2, "0");
}

function resetTime() {
  minutes = 0;
  seconds = 0;
  milliSeconds = 0;
}

function addToLapList() {
  const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(
    milliSeconds
  )}`;
  const listItem = document.createElement("li");
  listItem.innerHTML = `<span>Lap${
    lapList.childElementCount + 1
  }: ${lapTime} </span>`;
  lapList.appendChild(listItem);
}
