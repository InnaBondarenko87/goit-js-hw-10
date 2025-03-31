import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

let userSelectedDate;

const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('[data-start]');
const timerEls = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', {
  enableTime: true, // Дозволяє вибір часу
  dateFormat: 'Y-m-d H:i', // Формат дати і часу
  time_24hr: true, // Відображати час у 24-годинному форматі
  defaultDate: new Date(), // За замовчуванням — поточна дата
  minDate: 'today', // Неможливо вибрати дату в минулому
});
