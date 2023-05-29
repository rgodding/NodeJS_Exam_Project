import categoryManager from '../../repository/categoryManager.js';
import collectionManager from '../../repository/collectionManager.js';
import templateEngine from '../templateEngine.js';

export default async function constructDocumentsPage(isUser, userId) {
  const categories = await categoryManager.fetchAllObjects(userId);
  const collections = await collectionManager.fetchAllObjects(userId);
  const page = templateEngine.readPage('./views/pages/documents.html')
  .replace('$USER_ID', userId)
  .replace('$DOCUMENT_MENU', constructMenu(categories, collections));
  const renderedPage = templateEngine.renderPageWithSocket(page, {
    tabTitle: 'Front Page',
    cssLink: `<link rel="stylesheet" href="/css/documents.css">`,
    isUser: isUser,
    userId: userId,
  });
  return renderedPage;
}
function constructMenu(categories, collections) {
  if(categories.length === 0){
    return 'No categories found...'
  }
  let html = '';
  categories.forEach((category) => {
    const id = 'document-menu-offcanvas-' + category.type;
    const collection = collections.filter((object) => object.category === category.type);
    html += templateEngine.readPage('./views/partials/documents/menu.html')
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
    html += templateEngine.readPage('./views/partials/documents/menuoption.html')
    .replace('$MENU_OPTION_CATEGORY', object.category)
    .replace('$MENU_OPTION_NAME', object.name)
  });
  return html;
}
