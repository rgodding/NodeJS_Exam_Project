import templateEngine from '../templateEngine.js';

import { imagesPagePath } from '../../constants/pagePaths.js';
import { imagesPageTabTitle } from '../../constants/pageTitles.js';
import { imagesPageCSS } from '../../constants/cssReferences.js'
import { categoryoptionlabelPath, collectionoptionPath, imageitemPath, imagelistPath, nocategoriesPath, noimagelistPath } from '../../constants/partials/imagesPagePartialPaths.js';

export default function constructImagesPage(isUser, userId, categories, collections, images) {
  const html = templateEngine.readPage(imagesPagePath)
    .replace('$CREATE_IMAGES_TYPES_OPTIONS', generateCategoryOptions(categories, collections))
    .replace('$SHOW_IMAGES_LIST', constructImageList(collections, images))
    .replace('$USER_ID', userId);
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: imagesPageTabTitle,
    cssLink: imagesPageCSS,
    isUser: isUser,
  });
  return page;
}

function generateCategoryOptions(categories, collections) {
  if(categories.length == 0){
    return templateEngine.readPage(nocategoriesPath)
  }
  let html = '';
  categories.forEach((category) => {
    const collection = collections.filter((object) => object.category === category.type);
    html += templateEngine.readPage(categoryoptionlabelPath)
    .replace('$CATEGORY_NAME', category.name)
    if (collection.length != 0) {
      collection.forEach((object) => {
        html += templateEngine.readPage(collectionoptionPath)
        .replace('$COLLECTION_NAME', object.name)
        .replace('$COLLECTION_TYPE', object.type)
      });
    }
  });
  return html;
}
function constructImageList(collections, images) {
  let html = '';
  collections.forEach((collection) => {
    const tempImages = images.filter((object) => object.collection === collection.type);
    if (images.length != 0) {
      html += templateEngine.readPage(imagelistPath)
      .replace('$IMAGE_COLLECTION_NAME', collection.name)
      .replace('$IMAGE_LIST', constructImageItems(tempImages));
    }
  });
  return html;
}
function constructImageItems(images) {
  let html = '';
  if (images.length == 0) {
    html += templateEngine.readPage(noimagelistPath);
    return html;
  }
  if (images.length == 1) {
    html += templateEngine.readPage(imageitemPath)
      .replace('$IMAGE_NAME', images[0].name)
      .replace('$FILENAME', images[0].fileName)
      .replace('$FILEID_DELETE', images[0].id)
      .replace('$FILENAME_DELETE', images[0].fileName)
      .replace('$FILENAME_COPY', images[0].fileName)

      .replace('$IMAGE_MODAL_ID_1', images[0].id)
      .replace('$IMAGE_MODAL_ID_2', images[0].id)
      .replace('$IMAGE_MODAL_ID_3', images[0].id)
      .replace('$IMAGE_MODAL_ID_4', images[0].id)
      .replace('$FILENAME_MODAL', images[0].fileName);
  } else {
    images.forEach((image) => {
      html += templateEngine
        .readPage(imageitemPath)
        .replace('$IMAGE_NAME', image.name)
        .replace('$FILENAME', image.fileName)
        .replace('$FILEID_DELETE', image.id)
        .replace('$FILENAME_DELETE', image.fileName)
        .replace('$FILENAME_COPY', image.fileName)

        .replace('$IMAGE_MODAL_ID_1', image.id)
        .replace('$IMAGE_MODAL_ID_2', image.id)
        .replace('$IMAGE_MODAL_ID_3', image.id)
        .replace('$IMAGE_MODAL_ID_4', image.id)
        .replace('$FILENAME_MODAL', image.fileName);
    });
  }
  return html;
}
