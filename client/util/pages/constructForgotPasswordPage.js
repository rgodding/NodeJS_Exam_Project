import templateEngine from '../templateEngine.js';

export default function constructForgotPasswordPage(isUser) {
  const html = templateEngine.readPage('./views/pages/forgotpassword.html');
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Forgot Password',
    isUser: isUser,
  });
  return page;
}
