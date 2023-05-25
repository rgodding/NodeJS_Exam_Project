import templateEngine from '../templateEngine.js';

export default function constructRegisterPage(isUser) {
  const html = templateEngine.readPage('./views/pages/register.html');
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Register Page',
    cssLink: `<link rel="stylesheet" href="/css/login.css">`,
    isUser: isUser,
  });
  return page;
}