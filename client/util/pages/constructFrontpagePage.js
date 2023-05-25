import templateEngine from '../templateEngine.js';

export default function constructFrontpagePage(isUser, userId) {
  const html = templateEngine.readPage('./views/pages/frontpage.html');
  const page = templateEngine.renderPage(html, {
    tabTitle: 'Front Page',
    isUser: isUser,
    userId: userId,
  });
  return page;
}
