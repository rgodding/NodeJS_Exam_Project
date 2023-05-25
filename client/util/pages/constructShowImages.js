import templateEngine from '../templateEngine.js';
import collectionManager from '../../repository/collectionManager.js';
import imageManager from '../../repository/imageManager.js';

export default async function constructShowImages(isUser, userId) {
  const collections = await collectionManager.fetchAllObjects(userId);
  const images = await imageManager.fetchAllObjects(userId);
  const page = templateEngine.readPage('./views/pages/showimages.html')
  .replace('$SHOW_IMAGES_LIST', await constructImageList(collections, images));
  const renderedPage = templateEngine.renderPageWithSocket(page, {
    tabTitle: 'Image List',
    isUser: isUser,
  });
  return renderedPage;
}
async function constructImageList(collections, images) {
  let html = '';
  collections.forEach((collection) => {
    const tempImages = images.filter((object) => object.collection === collection.type);
    if (images.length != 0) {
      html += templateEngine.readPage('./views/partials/images/imagelist.html')
      .replace('$IMAGE_COLLECTION_NAME', collection.name)
      .replace('$IMAGE_LIST', constructImageItems(tempImages));
    }
  });

  return html;
}

function constructImageItems(images) {
  let html = '';
  if (images.length == 1) {
    html += templateEngine
      .readPage('./views/partials/images/imageitem.html')
      .replace('$IMAGE_NAME1', images[0].name || 'Error?')
      .replace('$FILENAME', images[0].fileName)
      .replace('$FILEID_DELETE', images[0].fileName)
      .replace('$FILENAME_DELETE', images[0].fileName)
      .replace('$FILENAME_COPY', images[0].fileName);
  } else {
    images.forEach((image) => {
      html += templateEngine
        .readPage('./views/partials/images/imageitem.html')
        .replace('$IMAGE_NAME1', image.name || 'Error?')
        .replace('$FILENAME', image.fileName)
        .replace('$FILEID_DELETE', image.fileName)
        .replace('$FILENAME_DELETE', image.fileName)
        .replace('$FILENAME_COPY', image.fileName);
    });
  }
  return html;
}
