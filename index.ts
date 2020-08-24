import * as express from 'express';
import { getMostExpensive } from './memes';

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.locals.basedir = __dirname;

app.get('/', (request, response) => {
  const mostExpensive = getMostExpensive();
  response.render('index', { title: 'Meme store', message: 'Hello there!', memes: mostExpensive });
});

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));