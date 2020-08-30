
import { getMostExpensive, getMeme } from '../memes';
import { expect } from 'chai';
import 'mocha';

describe('Meme', () => {
  it('should get aproprate number of memes', () => {
    expect(getMostExpensive(0).length).to.equal(0);
    expect(getMostExpensive(1).length).to.equal(1);
    expect(getMostExpensive(5).length).to.equal(5);
    expect(getMostExpensive(6).length).to.equal(5);

    expect(getMostExpensive().length).to.equal(3);
    expect(getMostExpensive(3).length).to.equal(3);
  });

  it('should get meme by id', () => {
    const meme = getMeme(1);
    expect(meme.id).to.equal(1);
  });

  it('should not find meme', () => {
    const meme = getMeme(-1);
    expect(meme).to.equal(undefined);
  })
});