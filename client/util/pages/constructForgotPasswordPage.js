import templateEngine from '../templateEngine.js';

export default function constructForgotPasswordPage(isUser, userId) {
  const html = templateEngine.readPage('./views/pages/forgotpassword.html');
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Forgot Password',
    isUser: isUser,
    userId: userId,
  });
  return page;
}
