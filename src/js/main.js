import '../scss/style.scss';
import {
  hideTabContenet,
  removeTabActive,
  showTabContent,
} from './utils';

document.addEventListener('DOMContentLoaded', () => {
  const tabContainer = document.querySelector('.tabcontainer');
  const tabHeadersCollection = tabContainer.querySelectorAll('.tabheader__item');
  const tabsContent = tabContainer.querySelectorAll('.tabcontent');

  document.addEventListener('click', (event) => {
    if (event.target.closest('.tabheader__item')) {
      removeTabActive(tabHeadersCollection);
      event.target.classList.add('tabheader__item_active');
      // hideTabContenet(tabsContent);
    }
  });
});
