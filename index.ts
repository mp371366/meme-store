import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import session from 'express-session';
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
app.use(session({
  secret: 'meme',
  resave: false,
  saveUninitialized: true
}));

app.use((request, response, next) => {
  if (request.session && !request.url.endsWith('.js.map') && request.method === 'GET') {
    if (!request.session.pages) {
      request.session.pages = [];
    }

    if (!request.session.pages.includes(request.url)) {
      request.session.pages.push(request.url);
    }
  }

  next();
});

app.get('/', async (request, response) => {
  const memes = await getMostExpensive();
  response.render('index', {
    title: 'Meme store',
    message: 'Hello there!',
    memes,
    visitedPages: request.session?.pages?.length ?? 0,
  });
});

app.get('/meme/:memeId', async (request, response) => {
  const meme = await getMeme(request.params.memeId);
  response.render('meme', {
    title: `Meme ${meme.name}`,
    meme,
    csrfToken: request.csrfToken(),
    visitedPages: request.session?.pages?.length ?? 0,
  });
});

app.post('/meme/:memeId', async (request, response) => {
  await updateMemePrice(request.params.memeId, request.body.price);
  const meme = await getMeme(request.params.memeId);
  response.render('meme', {
    title: `Meme ${meme.name}`,
    meme,
    csrfToken: request.csrfToken(),
    visitedPages: request.session?.pages?.length ?? 0,
  });
});

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));