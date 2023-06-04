import templateEngine from '../templateEngine.js';

import { loginPageCSS } from '../../constants/cssReferences.js';
import { loginPagePath } from '../../constants/pagePaths.js';
import { loginPageTabTitle } from '../../constants/pageTitles.js';

export default function constructLoginPage(isUser) {
  const html = templateEngine.readPage(loginPagePath);
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: loginPageTabTitle,
    cssLink: loginPageCSS,
    isUser: isUser,
  });
  return page;
}
