import * as express from 'express';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { getMostExpensive, getMeme } from './memes';

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.locals.basedir = __dirname;
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get('/', (request, response) => {
  const mostExpensive = getMostExpensive();
  response.render('index', { title: 'Meme store', message: 'Hello there!', memes: mostExpensive });
});

app.get('/meme/:memeId', (request, response) => {
  const meme = getMeme(request.params.memeId);
  response.render('meme', { title: `Meme ${meme.name}`, meme, csrfToken: request.csrfToken() });
});

app.post('/meme/:memeId', (request, response) => {
  const meme = getMeme(request.params.memeId);
  const price = request.body.price;
  meme.price = price;
  response.render('meme', { title: `Meme ${meme.name}`, meme, csrfToken: request.csrfToken() });
});

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));