import templateEngine from '../templateEngine.js';

import { loginPageCSS } from '../../constants/cssReferences.js';
import { registerPagePath } from '../../constants/pagePaths.js';
import { registerPageTabTitle } from '../../constants/pageTitles.js';

export default function constructRegisterPage(isUser) {
  const html = templateEngine.readPage(registerPagePath);
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: registerPageTabTitle,
    cssLink: loginPageCSS,
    isUser: isUser,
  });
  return page;
}