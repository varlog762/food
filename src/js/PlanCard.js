export default class PlanCard {
  constructor(coverPath, altForCover, title, descr, price, ...classes) {
    this.coverPath = coverPath;
    this.altForCover = altForCover;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.transfer = 3.1;
    this.classes = classes;
    this.changeToBYN();
  }

  changeToBYN() {
    this.price = Math.floor(this.price * this.transfer);
  }
  createCardElement() {
    const cardElement = document.createElement('div');

    if (this.classes.length){
      this.classes.forEach((item) => cardElement.classList.add(item));
    } else {
      cardElement.classList.add('menu__item');
    }

    cardElement.innerHTML = `
    <img src="img/tabs/${this.coverPath}" alt="${this.altForCover}">
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">${this.descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
      <div class="menu__item-cost">Цена:</div>
      <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
    </div>`;
    
    return cardElement;
  }

  insertCardElementToPage(parentContainer) {
    const elem = this.createCardElement();
    parentContainer.append(elem);
  }
}
