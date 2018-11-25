import './index.scss';
import Menu from './components/navigation/menu';

const menu = new Menu({
  sel: '.cli',
  activeItemName: 'index',
});

menu.setMenu();

// import data from './data/proverbs.json';
// import Proverb from './components/proverb';

// console.log('object');

// const proverbContainer = document.querySelector('.proverb');
// const proverb = new Proverb(data);
// proverb.set('random');
// proverbContainer.innerHTML = proverb.text;
