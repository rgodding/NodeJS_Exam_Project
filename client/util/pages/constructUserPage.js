import templateEngine from '../templateEngine.js';

import { userPagePath } from '../../constants/pagePaths.js';
import { userPageTabTitle } from '../../constants/pageTitles.js';
import { categoryPath, categoryoptionPath, collectionPath, nocategoriesPath, nocategoryoptionsPath } from '../../constants/partials/userPagePartialPaths.js';
import { usersPageCSS } from '../../constants/cssReferences.js';

export default async function constructUserPage(isUser, userId, categories, collections, documents) {
  const html = templateEngine.readPage(userPagePath)
  .replace('$USER_ID', userId)
  .replace('$CREATE_CATEGORY_OPTIONS', generateCategoryOptions(categories))
  .replace('$COLLECTIONS_LIST', constructCollectionList(categories, collections, documents));
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: userPageTabTitle,
    isUser: isUser,
    cssLink: usersPageCSS,
  });
  return page;
}
function generateCategoryOptions(categories) {
  let html = '';
  if (categories.length === 0) {
    let html = templateEngine.readPage(nocategoryoptionsPath);
    return html;
  } else {
    categories.forEach((category) => {
      html += templateEngine.readPage(categoryoptionPath)
      .replace('$CATEGORY_NAME', category.name)
      .replace('$CATEGORY_ID', category.id);
    });
    return html;
  }
}
function constructCollectionList(categories, collections, documents) {
  let html = '';
  if (categories.length === 0) {
    html += templateEngine.readPage(nocategoriesPath);
    return html;
  } else {
    categories.forEach((category) => {
      const collection = collections.filter((object) => object.category === category.id);
      html += templateEngine.readPage(categoryPath)
      .replace('$CATEGORY_NAME', category.name)
      .replace('$CATEGORY_ID', category.id)
      .replace('$CATEGORY_COLLECTIONS', generateCategoryCollections(collection, documents));
    });
    return html;
  }
}
function generateCategoryCollections(collection, documents) {
  let html = '';
  collection.forEach((collection) => {
    const foundDocuments = documents.filter((object) => object.collection === collection.id);
    html += templateEngine.readPage(collectionPath)
    .replace('$COLLECTION_NAME', collection.name)
    .replace('$COLLECTION_ID', collection.id)
    .replace('$COLLECTION_DOCUMENTS', foundDocuments.length);
  });
  return html;
}
