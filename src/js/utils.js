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

function getZero(num) {
  return (num >= 0 && num < 10) ? `0${num}` : num;
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

    daysElem.innerHTML = getZero(t.days);
    hoursElem.innerHTML = getZero(t.hours);
    minutesElem.innerHTML = getZero(t.minutes);
    secondsElem.innerHTML = getZero(t.seconds);

    (t.total <= 0) ? clearInterval(timeInterval) : null;
  }
}

export function showModal(element, selector) {
  element.classList.add(selector);
  document.body.style.overflow = 'hidden';
}

export function hideModal(element, selector) {
  element.classList.remove(selector);
  document.body.style.overflow = '';
}

export function postData(form, message) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    statusMessage.textContent = message.loading;
    form.append(statusMessage);

    const request = new XMLHttpRequest();
    request.open('POST', 'server.php');

    const formData = new FormData(form);

    request.send(formData);

    request.addEventListener('load', () => {
      if (request.status === 200) {
        console.log(request.response);
        statusMessage.textContent = message.success;
      } else {
        statusMessage.textContent = message.failure;
      }
    });
  });
}
