import templateEngine from '../templateEngine.js';

import { userPagePath } from '../../constants/pagePaths.js';
import { categoryPath, categoryoptionPath, collectionPath, nocategoriesPath, nocategoryoptionsPath } from '../../constants/partials/userPagePartialPaths.js';
import { userPageTabTitle } from '../../constants/pageTitles.js';

export default async function constructUserPage(isUser, userId, categories, collections) {
  const html = templateEngine.readPage(userPagePath)
  .replace('$USER_ID', userId)
  .replace('$CREATE_CATEGORY_OPTIONS', generateCategoryOptions(categories))
  .replace('$COLLECTIONS_LIST', constructCollectionList(categories, collections));
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: userPageTabTitle,
    isUser: isUser,
  });
  return page;
}
function generateCategoryOptions(categories) {
  let html = '';
  if (categories.length === 0) {
    let html = templateEngine.readPage(nocategoryoptionsPath)
    return html;
  } else {
    categories.forEach((category) => {
      html += templateEngine.readPage(categoryoptionPath)
      .replace('$CATEGORY_NAME', category.name)
      .replace('$CATEGORY_TYPE', category.type);
    });
    return html;
  }
}
function constructCollectionList(categories, collections) {
  let html = '';
  if (categories.length === 0) {
    html += templateEngine.readPage(nocategoriesPath);
    return html;
  } else {
    categories.forEach((category) => {
      const collection = collections.filter((object) => object.category === category.type);
      html += templateEngine.readPage(categoryPath)
      .replace('$CATEGORY_NAME', category.name)
      .replace('$CATEGORY_ID', category.id)
      .replace('$CATEGORY_COLLECTIONS', generateCategoryCollections(collection));
    });
    return html;
  }
}
function generateCategoryCollections(collection) {
  let html = '';
  collection.forEach((collection) => {
    html += templateEngine.readPage(collectionPath)
    .replace('$COLLECTION_NAME', collection.name)
    .replace('$COLLECTION_ID', collection.id);
  });
  return html;
}
