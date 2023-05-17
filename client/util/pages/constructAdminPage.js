import templateEngine from "../templateEngine.js";

export default function constructAdminPage(isUser) {
  const html = templateEngine.readPage('./views/pages/admin.html');
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Admin Page',
    isUser: isUser,
  });
  return page;
}
