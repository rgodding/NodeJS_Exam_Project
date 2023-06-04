import templateEngine from '../templateEngine.js';

import { documentsPageCSS } from '../../constants/cssReferences.js';
import { documentsPagePath } from '../../constants/pagePaths.js';
import { documentsPageTabTitle } from '../../constants/pageTitles.js';
import { menuPath, menuoptionPath, nomenuPath } from '../../constants/partials/documentsPagePartialPaths.js';

export default function constructDocumentsPage(isUser, categories, collections) {
  const page = templateEngine.readPage(documentsPagePath)
  .replace('$DOCUMENT_MENU', constructMenu(categories, collections));
  const renderedPage = templateEngine.renderPageWithSocket(page, {
    tabTitle: documentsPageTabTitle,
    cssLink: documentsPageCSS,
    isUser: isUser,
    privateImages: true,
  });
  return renderedPage;
}

function constructMenu(categories, collections) {
  if (categories.length === 0) {
    return templateEngine.readPage(nomenuPath);
  }
  let html = '';
  categories.forEach((category) => {
    const id = 'document-menu-offcanvas-' + category.id;
    const collection = collections.filter((object) => object.category === category.id);
    html += templateEngine.readPage(menuPath)
    .replace('$DOCUMENT_MENU_BUTTON_NAME', category.name)
    .replace('$DOCUMENT_MENU_OFFCANVAS_ID_REF1', id)
    .replace('$DOCUMENT_MENU_OFFCANVAS_ID_REF2', id)
    .replace('$DOCUMENT_MENU_OFFCANVAS_ID_REF3', id)
    .replace('$DOCUMENT_MENU_OFFCANVAS_NAME', category.name)
    .replace('$DOCUMENT_MENU_OFFCANVAS_OPTIONS', constructDocumentsPageMenuOptions(collection));
  });
  return html;
}

function constructDocumentsPageMenuOptions(collection) {
  let html = '';
  collection.forEach((object) => {
    html += templateEngine.readPage(menuoptionPath)
    .replace('$MENU_OPTION_CATEGORY', object.id)
    .replace('$MENU_OPTION_NAME', object.name);
  });
  return html;
}
