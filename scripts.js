let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const pause = document.querySelector('.pauseTimer');

function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it!
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // display seconds left
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const amPm = hour > 12 ? 'PM' : 'AM';
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
    pause.textContent = `Pause Timer`;
}

function customSeconds(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
    pause.textContent = `Pause Timer`;
}

function pauseTimer() {
    const timePausedAt = timerDisplay.textContent;
    let digits = '';
    let minsLeft = 0;
    let secsLeft = 0;

    for (i = 0; i < timePausedAt.length; i++) {
        if (timePausedAt[i] === ':') {
            minsLeft = parseInt(digits);
            digits = '';
            i + 1;
        }            
    digits += timePausedAt[i];
    }

    secsLeft = digits.substring(1);
    secsLeft = parseInt(secsLeft);
    clearInterval(countdown);
    pause.textContent = `Resume Timer`;
    return [minsLeft, secsLeft];
}

function resumeTimer() {
    const timeLeft = pauseTimer();
    const secondsLeft = (timeLeft[0] * 60) + timeLeft[1];
    timer(secondsLeft);
    pause.textContent = `Pause Timer`;
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', customSeconds);
pause.addEventListener('click', () => {
    if (pause.textContent === 'Pause Timer') {
        pauseTimer();
    } else {
        resumeTimer();
    }
});