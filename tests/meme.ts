import Meme from '../meme';
import { expect } from 'chai';
import 'mocha';

describe('Meme', () => {
  const meme = new Meme(2, 'meme', 123, 'http://localhost:3000');

  it('should contains contructor params', () => {
    expect(meme.id).to.equal(2);
    expect(meme.name).to.equal('meme');
    expect(meme.price).to.equal(123);
    expect(meme.url).to.equal('http://localhost:3000');
  });

  it('should update price when setting price', () => {
    expect(meme.getPrices().length).to.equal(1);
    meme.price = 321;
    expect(meme.getPrices().length).to.equal(2);
    expect(meme.price).to.equal(321);
  });
});