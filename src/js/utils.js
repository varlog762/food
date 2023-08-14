/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
export function hideTabContenet(collection) {
  collection.forEach((item) => item.classList.remove('tabcontent_active'));
  collection.forEach((item) => item.classList.remove('tabcontent_animation'));
}

export function showTabContent(collection, idx = 0) {
  collection[idx].classList.add('tabcontent_active');
  collection[idx].classList.add('tabcontent_animation');
}

export function removeTabActive(collection) {
  collection.forEach((item) => item.classList.remove('tabheader__item_active'));
}

export function addTabActive(collection, idx = 0) {
  collection[idx].classList.add('tabheader__item_active');
}

export function getTimeRemaning(deadLine) {
  const timeLeft = Date.parse(deadLine) - Date.parse(new Date());
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return {
    total: timeLeft,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function setClock(selector, deadLine) {
  const timer = document.querySelector(selector);
  const daysElem = timer.querySelector('#days');
  const hoursElem = timer.querySelector('#hours');
  const minutesElem = timer.querySelector('#minutes');
  const secondsElem = timer.querySelector('#seconds');

  updateClock();
  const timeInterval = setInterval(updateClock, 1000);

  function updateClock() {
    const t = getTimeRemaning(deadLine);

    daysElem.innerHTML = t.days;
    hoursElem.innerHTML = t.hours;
    minutesElem.innerHTML = t.minutes;
    secondsElem.innerHTML = t.seconds;

    (t.total <= 0) ? clearInterval(timeInterval) : null;
  }
}
