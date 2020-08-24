import Meme from './meme';
import Pirce from './price';

const memes = [
  new Meme(1, 'Gold', 1000, 'https://i.redd.it/h7rplf9jt8y21.png'),
  new Meme(2, 'Platinum', 1200, 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'),
  new Meme(3, 'Elite', 1400, 'https://i.imgflip.com/30zz5g.jpg'),
  new Meme(4, 'Silver', 1100, 'https://i.insider.com/5ea9887b0fc63978b759c857?width=1100&format=jpeg&auto=webp'),
  new Meme(5, 'Bronze', 1600, 'https://i.imgflip.com/2cjk3l.jpg'),
];

memes.forEach((meme) =>
  meme.prices.push(
    new Pirce(300, new Date(2020, 7, 1)),
    new Pirce(2200, new Date(2020, 5, 1)),
    new Pirce(700, new Date(2020, 6, 1))
  )
);

export function getMostExpensive(size: number = 3): Meme[] {
  return (
    memes
      .sort((a, b) => b.price - a.price)
      .slice(0, size)
  );
}

export function getMeme(id: string) {
  return memes.find((meme) => meme.id === parseInt(id, 10));
}