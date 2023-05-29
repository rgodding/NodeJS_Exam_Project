import categoryManager from '../../repository/categoryManager.js';
import collectionManager from '../../repository/collectionManager.js';
import templateEngine from '../templateEngine.js';

export default async function constructUserPage(isUser, userId) {
  const categories = await categoryManager.fetchAllObjects(userId);
  const collections = await collectionManager.fetchAllObjects(userId);
  const html = templateEngine.readPage('./views/pages/user.html')
  .replace('$USER_ID', userId)
  .replace('$CREATE_COLLECTION_TYPES_OPTIONS', generateCategoryOptions(categories))
  .replace('$COLLECTIONS_LIST', constructCollectionList(categories, collections));
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Front Page',
    isUser: isUser,
    userId: userId,
  });
  return page;
}
function generateCategoryOptions(categories) {
  if(categories.length === 0){
    return `<option disabled>No categories found...</option>`
  }
  let html = '';
  categories.forEach((category) => {
    html += `<option value="${category.type}">${category.name}</option>`;
  });
  return html;
}
function constructCollectionList(categories, collections) {
  let html = '';
  if (categories.length === 0) {
    return 'No categories';
  } else {
    categories.forEach((category) => {
      const collection = collections.filter((object) => object.category === category.type);
      html += templateEngine.readPage('./views/partials/collections/types.html')
      .replace('$COLLECTION_TYPE_NAME', category.name).replace('$COLLECTION_TYPE_ID', category.id)
      .replace('$COLLECTION_TYPE_COLLECTIONS', generateCollectionTypesCollections(collection));
    });
    return html;
  }
}
function generateCollectionTypesCollections(collection) {
  let html = '';
  collection.forEach((collection) => {
    html += templateEngine.readPage('./views/partials/collections/collections.html')
    .replace('$COLLECTION_NAME', collection.name)
    .replace('$COLLECTION_ID', collection.id);
  });
  return html;
}
