interface Page {
  url: string;
  date: Date;
}

const TICK = 25;
const PAGES_KEY = 'visited-pages';

function getPages(): Page[] {
  return (JSON.parse(localStorage.getItem(PAGES_KEY) ?? '[]') as Page[])
    .map(({ date, ...rest }) => ({ date: new Date(date), ...rest }))
    ;
}

function setPages(pages: Page[]) {
  localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
}

function addPages(...pages: Page[]) {
  setPages(getPages().concat(pages));
}

addPages({ date: new Date(), url: window.location.href });

setInterval(() => {
  const visitedPagesNumberElement = document.querySelector('#visited-pages-number') as HTMLElement;
  const now = new Date().getTime();
  const TIME = 15 * 60 * 1000;
  const visitedPages = getPages();
  const newVisitedPages = visitedPages.filter(({ date }) => now - date.getTime() <= TIME);
  setPages(newVisitedPages);
  const message = `Visited pages in last ${TIME / 60 / 1000}min: ${newVisitedPages.length}`
  visitedPagesNumberElement.innerText = message;
}, TICK);