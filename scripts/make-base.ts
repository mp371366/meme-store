import * as sqlite3 from 'sqlite3';

sqlite3.verbose();

const db = new sqlite3.Database('base.db');

db.run(`
  CREATE TABLE meme(
    id   VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    url  VARCHAR(255)
  );
`);

db.run(`
  CREATE TABLE history(
    meme  VARCHAR(255),
    value INT,
    date  INTEGER
  )
`);

db.run(`
  CREATE TABLE visit(
    session_id VARCHAR(255),
    url        VARCHAR(255)
  )
`);

db.close();