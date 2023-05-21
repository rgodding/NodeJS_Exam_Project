import templateEngine from "../templateEngine.js";

export default function constructRegisterPage(isUser) {
  const html = templateEngine.readPage('./views/pages/register.html')
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'LRegister Page',
    isUser: isUser,
  });
  return page;
}