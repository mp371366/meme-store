import * as sqlite3 from 'sqlite3';

export async function addVisit(id: string, url: string): Promise<void> {
  sqlite3.verbose();
  const db = new sqlite3.Database('base.db');
  return await new Promise((resolve, reject) => {
    db.run(`
      INSERT INTO visit(session_id, url)
      VALUES(?, ?)
    `, [id, url], (error) => {
      db.close();

      if (error) reject(error);

      resolve();
    });
  });
}

export async function getVisits(id: string): Promise<string[]> {
  sqlite3.verbose();
  const db = new sqlite3.Database('base.db');
  return await new Promise((resolve, reject) => {
    db.all(`
      SELECT url
      FROM visit
      where session_id = ?
    `, [id], (error, rows) => {
      db.close();

      if (error) reject(error);

      resolve(rows);
    });
  });
}