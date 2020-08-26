import * as sqlite3 from 'sqlite3';

sqlite3.verbose();

const db = new sqlite3.Database('base.db');

db.run(`
    INSERT INTO meme(id, name, url)
    VALUES
      ("1", "Gold", "https://i.redd.it/h7rplf9jt8y21.png"),
      ("2", "Platinum", "http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg"),
      ("3", "Elite", "https://i.imgflip.com/30zz5g.jpg"),
      ("4", "Silver", "https://i.insider.com/5ea9887b0fc63978b759c857?width=1100&format=jpeg&auto=webp"),
      ("5", "Bronze", "https://i.imgflip.com/2cjk3l.jpg")
    ;
  `);

for (const [value, date] of [[200, '2020-06-01'], [100, '2020-08-01'], [300, '2020-07-01']]) {
  for (const id of [1, 2, 3, 4, 5]) {
    db.run(`
        INSERT INTO history(meme, value, date)
        VALUES (?, ?, ?);
      `, [id, value, new Date(date).getTime()]);
  }
}

db.close();