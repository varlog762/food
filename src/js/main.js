import '../scss/style.scss';
import {
  hideTabContenet,
  showTabContent,
  removeTabActive,
  addTabActive,
} from './utils';

document.addEventListener('DOMContentLoaded', () => {
  const tabContainer = document.querySelector('.tabcontainer');
  const tabHeadersCollection = Array.from(tabContainer.querySelectorAll('.tabheader__item'));
  const tabsContent = tabContainer.querySelectorAll('.tabcontent');

  hideTabContenet(tabsContent);
  showTabContent(tabsContent, 0);
  addTabActive(tabHeadersCollection, 0);

  document.addEventListener('click', (event) => {
    if (event.target.closest('.tabheader__item')) {
      removeTabActive(tabHeadersCollection);
      event.target.classList.add('tabheader__item_active');
      hideTabContenet(tabsContent);
      showTabContent(tabsContent, tabHeadersCollection.indexOf(event.target));
    }
  });
});
