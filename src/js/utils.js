/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
export function hideTabContenet(collection) {
  collection.forEach((item) => item.style.display = 'none');
}

export function showTabContent(collection, idx = 0) {
  collection[idx].style.display = 'block';
}

export function removeTabActive(collection) {
  collection.forEach((item) => item.classList.remove('tabheader__item_active'));
}

export function addTabActive(collection, idx = 0) {
  collection[idx].classList.add('tabheader__item_active');
}
