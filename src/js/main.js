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
  postData,
} from './utils';
import PlanCard from './PlanCard';

const TIMER_50_SEC = 50000;

document.addEventListener('DOMContentLoaded', () => {
  // Tabs elements:
  const tabContainer = document.querySelector('.tabcontainer');
  const tabHeadersCollection = Array.from(tabContainer.querySelectorAll('.tabheader__item'));
  const tabsContent = tabContainer.querySelectorAll('.tabcontent');
  // Modal elements:
  const modal = document.querySelector('.modal');
  const showModalTimerInt = setTimeout(showModal, TIMER_50_SEC, modal, 'modal_visible');
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
  const now = new Date();
  const deadLineMS = now.getTime() + 864000000;
  const deadLine = new Date(deadLineMS);

  setClock('.timer', deadLine);

  // Modal:

  document.addEventListener('keyup', (event) => {
    if (modal.classList.contains('modal_visible') && event.code === 'Escape') {
      hideModal(modal, 'modal_visible');
    }
  });

  window.addEventListener('scroll', showModalOnScroll);

  // Plan cards:

  const planCardsContainer = document.querySelector('.menu__field').firstElementChild;

  const vegyPlan = new PlanCard('vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 7, 'menu__item');
  vegyPlan.insertCardElementToPage(planCardsContainer);

  const elitePlan = new PlanCard('elite.jpg', 'elite', 'Меню "Премиум"', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!<br><br>', 17, 'menu__item');
  elitePlan.insertCardElementToPage(planCardsContainer);

  const postPlan = new PlanCard('post.jpg', 'post', 'Меню "Постное"', 'Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 15, 'menu__item');
  postPlan.insertCardElementToPage(planCardsContainer);

  // Forms:

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро мы с Вами свяжемся.',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach((form) => postData(form, message));

  fetch('db.json')
    .then((data) => data.json())
    .then((res) => console.log(res));
});
