import documentManager from '../../repository/documentManager.js';
import templateEngine from '../templateEngine.js';

export default async function constructDocumentsPage(isUser, userId) {
    const documents = documentManager.fetchAllObjects(userId)
    console.log('documents : ' + JSON.stringify(documents));
    const page = templateEngine.readPage('./views/pages/documents.html')
    const renderedPage = templateEngine.renderPageWithSocket(page, {
      tabTitle: 'Front Page',
      isUser: isUser,
    });
  return renderedPage;
}

// Old Functions
function constructDocumentsPageMenu(types, collections){
    let html = ``
    types.forEach(type => {
        const id = 'document-menu-offcanvas-' + type.type
        const typesCollection = collections.filter(object => object.category === type.type);
        html += templateEngine.readPage('./views/partials/documents/menu.html')
        .replace('$DOCUMENT_MENU_BUTTON_NAME', type.name)
        .replace('$DOCUMENT_MENU_OFFCANVAS_ID_REF1', id)
        .replace('$DOCUMENT_MENU_OFFCANVAS_ID_REF2', id)
        .replace('$DOCUMENT_MENU_OFFCANVAS_ID_REF3', id)
        .replace('$DOCUMENT_MENU_OFFCANVAS_NAME', type.name)
        .replace('$DOCUMENT_MENU_OFFCANVAS_OPTIONS', constructDocumentsPageMenuOptions(typesCollection))
    })
    return html;
}
function constructDocumentsPageMenuOptions(collection) {
  let html = '';
  collection.forEach((object) => {
    html += `
          <button class="list-group-item list-group-item-action" onclick="pickCollection('${object.type}')">
              ${object.name}
          </button>
          `;
  });
  return html;
}
