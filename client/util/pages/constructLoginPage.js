import templateEngine from '../templateEngine.js';

export default function constructLoginPage(isUser) {
  const html = templateEngine.readPage('./views/pages/login.html');
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Login Page',
    cssLink: `<link rel="stylesheet" href="/css/login.css">`,
    isUser: isUser,
  });
  return page;
}