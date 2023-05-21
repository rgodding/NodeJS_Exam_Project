import templateEngine from "../templateEngine.js";

export default function constructLoginPage(isUser) {
  const html = templateEngine.readPage('./views/pages/login.html')
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Login Page',
    isUser: isUser,
  });
  return page;
}

function constructLoginForm(){
  let html = templateEngine.readPage('./views/partials/login/login.html')
  return html;
}
