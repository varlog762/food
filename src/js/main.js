/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import '../scss/style.scss';
import {
  hideTabContenet,
  showTabContent,
  removeTabActive,
  addTabActive,
  setClock,
  showModal,
  hideModal,
} from './utils';

document.addEventListener('DOMContentLoaded', () => {
  // Tabs elements:
  const tabContainer = document.querySelector('.tabcontainer');
  const tabHeadersCollection = Array.from(tabContainer.querySelectorAll('.tabheader__item'));
  const tabsContent = tabContainer.querySelectorAll('.tabcontent');
  // Modal elements:
  const modal = document.querySelector('.modal');
  const showModalTimerInt = setTimeout(showModal, 15000, modal, 'modal_visible');
  const showModalOnScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal(modal, 'modal_visible');
      window.removeEventListener('scroll', showModalOnScroll);
      clearTimeout(showModalTimerInt);
    }
  };

  hideTabContenet(tabsContent);
  showTabContent(tabsContent);
  addTabActive(tabHeadersCollection);

  document.addEventListener('click', (event) => {
    const { target } = event;

    if (target && target.classList.contains('tabheader__item')) {
      removeTabActive(tabHeadersCollection);
      event.target.classList.add('tabheader__item_active');
      hideTabContenet(tabsContent);
      showTabContent(tabsContent, tabHeadersCollection.indexOf(target));
    } else if (target && target.closest('[data-modal]')) {
      showModal(modal, 'modal_visible');
      clearTimeout(showModalTimerInt);
      window.removeEventListener('scroll', showModalOnScroll);
    } else if (target && (target === modal || target.closest('[data-modal-close]'))) {
      hideModal(modal, 'modal_visible');
    }
  });

  // Timer:
  // const now = new Date();
  // const deadLineMS = now.getTime() + 864000000;
  // const deadLine = new Date(deadLineMS);
  const deadLine = new Date('2023-08-31T06:00:00.000Z');

  setClock('.timer', deadLine);

  // Modal:

  document.addEventListener('keyup', (event) => {
    if (modal.classList.contains('modal_visible') && event.code === 'Escape') {
      hideModal(modal, 'modal_visible');
    }
  });

  window.addEventListener('scroll', showModalOnScroll);
});
