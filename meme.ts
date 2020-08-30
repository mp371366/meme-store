import Price from './price';

export default class Meme {
  id: number;
  name: string;
  private prices: Price[] = [];
  url: string;

  constructor(id: number, name: string, price: number, url: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.url = url;
  }

  get price() {
    return this.prices[0].value;
  }

  set price(newPrice: number) {
    this.prices.unshift(new Price(newPrice));
  }

  getPrices(): Readonly<Readonly<Price>[]> {
    return this.prices;
  }
}