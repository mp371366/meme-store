import * as express from 'express';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { getMostExpensive, getMeme, updateMemePrice } from './memes';

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.locals.basedir = __dirname;
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get('/', async (request, response) => {
  const memes = await getMostExpensive();
  response.render('index', { title: 'Meme store', message: 'Hello there!', memes });
});

app.get('/meme/:memeId', async (request, response) => {
  const meme = await getMeme(request.params.memeId);
  response.render('meme', { title: `Meme ${meme.name}`, meme, csrfToken: request.csrfToken() });
});

app.post('/meme/:memeId', async (request, response) => {
  await updateMemePrice(request.params.memeId, request.body.price);
  const meme = await getMeme(request.params.memeId);
  response.render('meme', { title: `Meme ${meme.name}`, meme, csrfToken: request.csrfToken() });
});

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));