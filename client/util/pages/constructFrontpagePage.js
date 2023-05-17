import templateEngine from '../templateEngine.js';

export default function constructFrontpagePage(isUser) {
  const html = templateEngine.readPage('./views/pages/frontpage.html');
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Front Page',
    isUser: isUser,
  });
  return page;
}
