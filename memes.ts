import Meme from './meme';
import * as sqlite3 from 'sqlite3';
import MemeWithHistory from './memeWithHistory';

export async function getMostExpensive(size: number = 3): Promise<Meme[]> {
  sqlite3.verbose();
  const db = new sqlite3.Database('base.db');
  return await new Promise((resolve, reject) => {
    db.all(`
      SELECT id, url, name, price
      FROM meme
      LEFT JOIN (
        SELECT h.meme AS meme, h.date AS date, h.value AS price
        FROM history AS h
        INNER JOIN (
          SELECT meme, MAX(date) AS date
          FROM history
          GROUP BY meme
        ) AS tmp
        ON h.meme = tmp.meme AND h.date = tmp.date
      ) AS history
      ON meme.id = history.meme
      ORDER BY price DESC
      LIMIT ?
    `, [size], (error, memes) => {
      db.close();

      if (error) reject(error);

      resolve(memes);
    });
  });
}

export async function getMeme(id: string): Promise<MemeWithHistory> {
  sqlite3.verbose();
  const db = new sqlite3.Database('base.db');
  return await new Promise((resolve, reject) => {
    db.get(`
      SELECT id, url, name, value AS price
      FROM meme
      LEFT JOIN history
      ON meme.id = history.meme
      WHERE id = ?
      ORDER BY date DESC
    `, [id], (error, meme) => {
      if (error) reject(error);

      db.all(`
        SELECT value, date
        FROM history
        WHERE meme = ?
        ORDER BY date DESC
      `, [id], (err, prices) => {
        db.close();

        if (err) reject(err);

        prices.forEach((price => price.date = new Date(price.date)));

        resolve({
          ...meme,
          prices,
        });
      });
    });
  });
}

export async function updateMemePrice(id: string, price: number, username: string) {
  sqlite3.verbose();
  const db = new sqlite3.Database('base.db');
  return await new Promise((resolve, reject) => {
    db.run(`
      INSERT INTO history(meme, value, date, username)
      VALUES (?, ? ,?, ?)
    `, [id, price, new Date().getTime(), username], (error) => {
      db.close();

      if (error) reject(error);

      resolve();
    });
  });
}