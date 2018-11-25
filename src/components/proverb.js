export default class Proverb {
  constructor(proverbs) {
    this.proverbs = proverbs;
  }

  set proverb(how) {
    if (how === 'random') {
      this.text = this.proverbs.data[0].text;
    } else {
      this.text = this.proverbs.data[0].text;
    }
  }
}
