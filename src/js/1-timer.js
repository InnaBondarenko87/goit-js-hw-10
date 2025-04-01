import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('[data-start]');

days: document.querySelector('[data-days]');
hours: document.querySelector('[data-hours]');
minutes: document.querySelector('[data-minutes]');
seconds: document.querySelector('[data-seconds]');

const fp = flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  defaultDate: new Date(),
  onOpen() {
    this.setDate(new Date());
  },
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      userSelectedDate = null;
      buttonEl.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      buttonEl.disabled = false;
    }
  },
});

buttonEl.addEventListener('click', startCount);

// ====================================
// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minValue = document.querySelector('[data-minutes]');
const secValue = document.querySelector('[data-seconds]');

// let userSelectedDate = null;
let countId = null;

// const fp = flatpickr(datetimePicker, {
//     enableTime: true,
//     time_24hr: true,
//     minuteIncrement: 1,
//     defaultDate: new Date(),
//     onOpen() {
//         this.setDate(new Date());
//     },
//     onClose(selectedDates) {
//         const selectedDate = selectedDates[0];
//         const currentDate = new Date();
//                 if (selectedDate <= currentDate) {
//             iziToast.error({
//                 position: "topRight",
//                 title: "Error",
//                 message: "Please choose a date in the future",
//             });
//             userSelectedDate = null;
//             startButton.disabled = true;
//         } else {
//             userSelectedDate = selectedDate;
//             startButton.disabled = false;
//         }
//     },
// });

// startButton.addEventListener("click", startCount);

function startCount() {
  if (!userSelectedDate) return;

  startButton.disabled = true;
  fp.input.disabled = true;

  updateTimer();
  countId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = new Date();
  const timeLeft = userSelectedDate - currentTime;

  if (timeLeft <= 0) {
    clearInterval(countId);
    updateTimerDisplay(convertMs(0));
    fp.input.disabled = false;
    return;
  }

  updateTimerDisplay(convertMs(timeLeft));
}

// function updateTimerDisplay({ days, hours, minutes, seconds }) {
//     daysValue.textContent = addLeadingZero(days);
//     hoursValue.textContent = addLeadingZero(hours);
//     minValue.textContent = addLeadingZero(minutes);
//     secValue.textContent = addLeadingZero(seconds);
// }

// function addLeadingZero(value) {
//     return String(value).padStart(2, "0");
// }

// function convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     const days = Math.floor(ms / day);
//     const hours = Math.floor((ms % day) / hour);
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
// }

// ===================================

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minValue.textContent = addLeadingZero(minutes);
  secValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
