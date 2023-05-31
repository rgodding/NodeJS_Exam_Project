import templateEngine from '../templateEngine.js';

import { frontpagePageTabTitle } from '../../constants/pageTitles.js';
import { frontpagePagePath } from '../../constants/pagePaths.js';

export default function constructFrontpagePage(isUser) {
  const html = templateEngine.readPage(frontpagePagePath);
  const page = templateEngine.renderPage(html, {
    tabTitle: frontpagePageTabTitle,
    isUser: isUser,
  });
  return page;
}
