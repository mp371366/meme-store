import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { getMostExpensive, getMeme, updateMemePrice } from './memes';
import { login } from './login';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import connectSqlite3 from 'connect-sqlite3';

config();

const app = express();
const port = process.env.PORT ?? 3000;
const secret = process.env.SECRET ?? 'meme';
const salt = process.env.SALT ?? '$2b$10$JFDmxYUkJh3AwALlyTTefe';
const hash = async (password: string) => bcrypt.hash(password, salt);

app.set('view engine', 'pug');
app.locals.basedir = __dirname;
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser(secret));
app.use(csrf({ cookie: true }));
app.use(session({
  store: new connectSqlite3(session)({
    table: 'session',
    db: 'base.db',
  }),
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 15 * 60 * 1000,
  },
}));

app.use(async (request, response, next) => {
  if (request.session !== undefined) {
    if (request.session.pages === undefined) {
      request.session.pages = 0;
    }
    if (!request.url.endsWith('.js.map') && request.method === 'GET') {
      request.session.pages += 1;
    }
  }

  next();
});

app.get('/', async (request, response) => {
  const memes = await getMostExpensive();
  const username = request.session?.username;
  const logged = username !== undefined;

  response.render('index', {
    title: 'Meme store',
    message: 'Hello there!',
    memes,
    csrfToken: request.csrfToken(),
    visitedPages: request.session?.pages ?? 0,
    username,
    logged,
  });
});

app.get('/meme/:memeId', async (request, response) => {
  const meme = await getMeme(request.params.memeId);
  const username = request.session?.username;
  const logged = username !== undefined;

  response.render('meme', {
    title: `Meme ${meme.name}`,
    meme,
    csrfToken: request.csrfToken(),
    visitedPages: request.session?.pages ?? 0,
    username,
    logged,
  });
});

app.post('/meme/:memeId', async (request, response) => {
  const username = request.session?.username;
  const logged = username !== undefined;

  if (logged) {
    await updateMemePrice(request.params.memeId, request.body.price, username);
  }

  const meme = await getMeme(request.params.memeId);

  response.render('meme', {
    title: `Meme ${meme.name}`,
    meme,
    csrfToken: request.csrfToken(),
    visitedPages: request.session?.pages ?? 0,
    username,
    logged,
    info: !logged ? 'Login required to set new meme price.' : undefined,
  });
});

app.get('/login', (request, response) => {
  response.render('login', {
    title: 'Login',
    visitedPages: request.session?.pages ?? 0,
    csrfToken: request.csrfToken(),
  });
});

app.post('/login', async (request, response) => {
  const username = request.body.username;
  const password = await hash(request.body.password);
  const result = await login(username, password);

  if (result && request.session) {
    request.session.username = username;
    response.redirect('/');
  } else {
    response.render('login', {
      title: 'Login',
      visitedPages: request.session?.pages ?? 0,
      error: 'Bad login.',
      csrfToken: request.csrfToken(),
    })
  }
});

app.post('/logout', (request, response) => {
  if (request.session) {
    request.session.username = undefined;
  }

  response.redirect('/');
})

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));