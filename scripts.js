var time = 0;

let timerTimeout;

let timerInterval;

function convertTimeToSeconds(hours, minutes, seconds) {
  const hoursInSeconds = hours * 3600;
  const minutesInSeconds = minutes * 60;

  return (hoursInSeconds + minutesInSeconds + seconds);
}

function setTimerValue(event) {
  event.preventDefault();

  const hours = Number(document.querySelector("#hours-input").value);
  const minutes = Number(document.querySelector("#minutes-input").value);
  const seconds = Number(document.querySelector("#seconds-input").value);

  toggleTimerModal();

  time = convertTimeToSeconds(hours, minutes, seconds);

  setTimerFields(hours, minutes, seconds);

  resetFields();
}

function formatTime(time) {
  hours = Math.floor(time / 3600);
  minutes = Math.floor((time % 3600) / 60);
  seconds = Math.floor((time % 60));

  return { hours, minutes, seconds };
}

function startTimer() {
  const isRunning = runTimer();
  if (isRunning) {
    toogleButtons();    
  }
}

function runTimer() {
  try {
    validateTime();

    timerTimeout = setTimeout(() => {
      throwNotification();
      resetTimer();
    }, time * 1000);

    timerInterval = setInterval(() => {
      time--;

      const { hours, minutes, seconds } = formatTime(time);

      setTimerFields(hours, minutes, seconds);
    }, 1000);

    return true;
  } catch (error) {
    alert(error.message);

    return false;
  }
}

function stopTimer() {
  clearTimeout(timerTimeout);
  clearInterval(timerInterval);
  toggleResumeButton();
}

function setTimerFields(hours, minutes, seconds) {
  document.querySelector("#hours").innerHTML = String(hours).padStart(2, '0');
  document.querySelector("#minutes").innerHTML = String(minutes).padStart(2, '0');
  document.querySelector("#seconds").innerHTML = String(seconds).padStart(2, '0');
}

function resetTimer() {
  time = 0;

  toogleButtons();
  stopTimer();

  document.querySelector("#hours").innerHTML = "00";
  document.querySelector("#minutes").innerHTML = "00";
  document.querySelector("#seconds").innerHTML = "00";
}

function resumeTimer(){
  runTimer();
  toggleResumeButton();
}

function toggleResumeButton() {
  document.querySelector("#resume").classList.toggle("inactive");
  document.querySelector("#stop").classList.toggle("inactive");
}

function resetFields() {
  document.querySelector("#hours-input").value = "00";
  document.querySelector("#minutes-input").value = "00";
  document.querySelector("#seconds-input").value = "00";
}

function toggleTimerModal() {
  document.querySelector("#modal-set-timer").classList.toggle("inactive");
}

function toogleButtons() {
  document.querySelector("#initial-timer-buttons").classList.toggle("inactive");
  document.querySelector("#running-timer-buttons").classList.toggle("inactive");
}

function validateTime() {
  if (time <= 0) {
    throw new Error("Tempo deve ser maior que zero!");
  }
}

Notification.requestPermission();

function throwNotification() {
  if (Notification.permission === 'granted') {
    new Notification('Tempo esgotado ⏰', {
      body: 'Seu tempo acabou. Defina um novo tempo para continuar!',
    });
  }
}