import '../scss/style.scss';
import {
  hideTabContenet,
  showTabContent,
  removeTabActive,
  addTabActive,
  getTimeRemaning,
} from './utils';

document.addEventListener('DOMContentLoaded', () => {
  const tabContainer = document.querySelector('.tabcontainer');
  const tabHeadersCollection = Array.from(tabContainer.querySelectorAll('.tabheader__item'));
  const tabsContent = tabContainer.querySelectorAll('.tabcontent');

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
    }
  });

  // Timer

  const deadLine = '2023-08-31';

  console.log(getTimeRemaning(deadLine));
});
