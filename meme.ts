export class Meme {
  id: number;
  name: string;
  prices: number[];
  url: string;

  constructor(id: number, name: string, price: number, url: string) {
    this.id = id;
    this.name = name;
    this.prices = [price];
    this.url = url;
  }

  get price() {
    return this.prices[0];
  }

  set price(newPrice: number) {
    this.prices.unshift(newPrice);
  }
}