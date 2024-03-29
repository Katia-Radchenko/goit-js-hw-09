import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputData: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]')
};
let selectedTime = null;
let currentTime = null;
let timerId
refs.btnStart.setAttribute('disabled', true);
refs.btnStart.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dataSelectedInput(selectedDates);
  },
};
flatpickr('#datetime-picker', options);

function dataSelectedInput(selectedDates) {

  selectedTime = selectedDates[0].getTime();
  currentTime = Date.now();
  if (selectedTime < currentTime) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.btnStart.disabled = false;
  }
}

function startTimer() {
  refs.inputData.setAttribute('disabled', true);
  refs.btnStart.setAttribute('disabled', true);

  timerId = setInterval(() => {
    currentTime = Date.now();
    const deltaTime = selectedTime - currentTime;
    if (selectedTime <= currentTime) {
      clearInterval(timerId);
      Notiflix.Notify.failure('BANG');
      return;
    }
    const time = convertMs(deltaTime);
    updateTime(time)
  }, 1000)
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}


function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}



function convertMs(ms) {


  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}