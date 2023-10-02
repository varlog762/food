/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
const TWO_SEC = 2000;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MS_PER_DAY = 86400000;
const MS_PER_HOUR = 3600000;
const MS_PER_MINUTE = 60000;
const MS_PER_SECOND = 1000;

const modal = document.querySelector('.modal');

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
  const days = Math.floor(timeLeft / MS_PER_DAY);
  const hours = Math.floor((timeLeft / MS_PER_HOUR) % HOURS_IN_DAY);
  const minutes = Math.floor((timeLeft / MS_PER_MINUTE) % MINUTES_IN_HOUR);
  const seconds = Math.floor((timeLeft / MS_PER_SECOND) % SECONDS_IN_MINUTE);

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

    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      padding-top: 10px;
    `;
    form.insertAdjacentElement('afterend', statusMessage);

    const formData = new FormData(form);

    const object = {};
    formData.forEach((value, key) => object[key] = value);

    fetch('server.php', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(object),
    }).then((data) => {
      data.text();
    }).then((data) => {
      console.log(data);
      showThanksModal(message.success);
      statusMessage.remove();
    }).catch(() => {
      showThanksModal(message.failure);
    })
      .finally(() => {
        form.reset();
      });
  });
}

function showThanksModal(content) {
  const prevModalDialog = document.querySelector('.modal__dialog');
  prevModalDialog.classList.add('modal__dialog_hide');

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-modal-close>&times;</div>
      <div class="modal__title">${content}</div>
    </div>
  `;

  modal.append(thanksModal);
  showModal(modal, 'modal_visible');

  setTimeout(() => {
    thanksModal.remove();
    hideModal(modal, 'modal_visible');
    prevModalDialog.classList.remove('modal__dialog_hide');
  }, TWO_SEC);
}
