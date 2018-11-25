import MenuItem from './menu-item';

export default class Menu {
  constructor(obj) {
    this.menu = document.querySelector(obj.sel);
    this.activeItem = MenuItem.getByName(obj.activeItemName);
  }

  static getLineHTML(target, type, text) {
    return `<div class="line"><span class="command" data-target="${target}" data-type="${type}">${text}</span></div>`;
  }

  static getCliHTML(links) {
    let res = '';
    links.forEach((name) => {
      const item = MenuItem.getByName(name);
      res += Menu.getLineHTML(item.name, item.type, item.text);
    });
    return res;
  }

  setActiveItem(e) {
    this.activeItem = MenuItem.getByName(e.target.getAttribute('data-target'));
    this.setMenu();
  }

  setListeners() {
    [...this.menu.children].forEach((item) => {
      item.addEventListener('click', this.setActiveItem.bind(this), false);
    });
  }

  setMenu() {
    this.menu.innerHTML = Menu.getCliHTML(this.activeItem.links);
    this.setListeners();
  }
}
