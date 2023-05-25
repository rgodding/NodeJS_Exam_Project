import templateEngine from '../templateEngine.js';

export default function constructLoginPage(isUser, userId) {
  const html = templateEngine.readPage('./views/pages/login.html');
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Login Page',
    cssLink: `<link rel="stylesheet" href="/css/login.css">`,
    isUser: isUser,
    userId: userId,
  });
  return page;
}