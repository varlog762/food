import '../scss/style.scss';
import {
  hideTabContenet,
  showTabContent,
  removeTabActive,
  addTabActive,
  setClock,
} from './utils';

document.addEventListener('DOMContentLoaded', () => {
  // Tabs elements:
  const tabContainer = document.querySelector('.tabcontainer');
  const tabHeadersCollection = Array.from(tabContainer.querySelectorAll('.tabheader__item'));
  const tabsContent = tabContainer.querySelectorAll('.tabcontent');
  // Modal elements:
  const showModalBtns = Array.from(document.querySelectorAll('[data-modal]'));
  const modal = document.querySelector('.modal');

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
    } else if (target && showModalBtns.includes(target)) {
      modal.classList.add('modal_visible');
    } else if (target && (target === modal || target.closest('.modal__close'))) {
      modal.classList.remove('modal_visible');
    }
  });

  // Timer
  // const now = new Date();
  // const deadLineMS = now.getTime() + 864000000;
  // const deadLine = new Date(deadLineMS);
  const deadLine = new Date('2023-08-31T06:00:00.000Z');

  setClock('.timer', deadLine);
});
