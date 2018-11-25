import menuData from './menu-data';

export default class MenuItem {
  constructor(name, text, links) {
    this.name = name;
    this.text = text || '';
    this.links = links || [];
  }

  static getByName(name) {
    const res = menuData.find(el => el.name === name);
    return res;
  }
}
