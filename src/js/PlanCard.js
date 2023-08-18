export default class PlanCard {
  constructor(coverPath, altForCover, title, descr, price) {
    this.coverPath = coverPath;
    this.altForCover = altForCover;
    this.title = title;
    this.descr = descr;
    this.price = price;
  }

  createCardElement() {
    const fragment = document.createDocumentFragment();

    const cardElement = document.createElement('div');
    cardElement.classList.add('menu__item');

    const cardElemCover = document.createElement('img');
    cardElemCover.setAttribute('src', `img/tabs/${this.coverPath}`);
    cardElemCover.setAttribute('alt', this.altForCover);
    cardElement.append(cardElemCover);

    const cardElementTitle = document.createElement('h3');
    cardElementTitle.classList.add('menu__item-subtitle');
    cardElementTitle.innerText = this.title;
    cardElement.append(cardElementTitle);

    const cardElementDescr = document.createElement('div');
    cardElementDescr.classList.add('menu__item-descr');
    cardElementDescr.innerText = this.descr;
    cardElement.append(cardElementDescr);

    const cardElementDivider = document.createElement('div');
    cardElementDivider.classList.add('menu__item-divider');
    cardElement.append(cardElementDivider);

    const cardElementPrice = document.createElement('div');
    cardElementPrice.classList.add('menu__item-price');
    cardElement.append(cardElementPrice);

    const cardElementCost = document.createElement('div');
    cardElementCost.classList.add('menu__item-cost');
    cardElementCost.innerText = 'Цена:';
    cardElementPrice.append(cardElementCost);

    const cardElementTotal = document.createElement('div');
    cardElementTotal.classList.add('menu__item-total');
    cardElementTotal.innerHTML = `<span>${this.price}</span> руб/день`;
    cardElementPrice.append(cardElementTotal);

    return fragment;
  }

  insertCardElementToPage(parentContainer) {
    parentContainer.append(this.createCardElement());
  }
}
