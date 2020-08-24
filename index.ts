import * as express from 'express';
import { getMostExpensive, getMeme } from './memes';

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.locals.basedir = __dirname;

app.get('/', (request, response) => {
  const mostExpensive = getMostExpensive();
  response.render('index', { title: 'Meme store', message: 'Hello there!', memes: mostExpensive });
});

app.get('/meme/:memeId', (request, response) => {
  const meme = getMeme(parseInt(request.params.memeId, 10));
  response.render('meme', { meme })
});

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));