import Price from './price';

export default class Meme {
  id: number;
  name: string;
  prices: Price[] = [];
  url: string;

  constructor(id: number, name: string, price: number, url: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.url = url;
  }

  get price() {
    return this.getPrices()[0].value;
  }

  set price(newPrice: number) {
    this.prices.push(new Price(newPrice));
  }

  getPrices() {
    return this.prices.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}