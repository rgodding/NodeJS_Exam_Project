import templateEngine from "../templateEngine.js";

export default function constructImagesPage(isUser) {
  const html = templateEngine.readPage('./views/pages/images.html');
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Images Page',
    isUser: isUser,
  });
  return page;
}
