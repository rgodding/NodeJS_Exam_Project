import templateEngine from '../templateEngine.js';

import { forgotpasswordPagePath } from '../../constants/pagePaths.js';
import { forgotpasswordPageTabTitle } from '../../constants/pageTitles.js';


export default function constructForgotPasswordPage(isUser) {
  const html = templateEngine.readPage(forgotpasswordPagePath);
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: forgotpasswordPageTabTitle,
    isUser: isUser,
  });
  return page;
}
