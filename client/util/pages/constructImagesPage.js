import collectionCategoryManager from "../../repository/collectionCategoryManager.js";
import collectionManager from "../../repository/collectionManager.js";
import imageManager from "../../repository/imageManager.js";
import templateEngine from "../templateEngine.js";

export default async function constructImagesPage(isUser, userId) {
  const categories = await collectionCategoryManager.fetchAllObjects(userId);
  const collections = await collectionManager.fetchAllObjects(userId);
  const images = await imageManager.fetchAllObjects(userId);
  const html = templateEngine.readPage('./views/pages/images.html')
  .replace('$CREATE_IMAGES_TYPES_OPTIONS', generateCategoryOptions(categories, collections))
  .replace('$SHOW_IMAGES_LIST', await constructImageList(collections, images))
  .replace('$USER_ID', userId)
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Images',
    isUser: isUser,
  });
  return page;
}

function generateCategoryOptions(categories, collections) {
  let html = '';
  categories.forEach((category) => {
    const collection = collections.filter(object => object.category === category.type);
    html += `<optgroup label="${category.name}"></optgroup>`
    if(collection.length != 0) {
      collection.forEach(object => {
        html += `<option value="${object.type}">${object.name}</option>`
      })
    }
  });
  return html;
}
async function constructImageList(collections, images) {
  let html = '';
  collections.forEach(collection => {
    const tempImages = images.filter(object => object.collection === collection.type);
    if(images.length != 0){
        html += templateEngine.readPage('./views/partials/images/imagelist.html')
        .replace('$IMAGE_COLLECTION_NAME', collection.name)
        .replace('$IMAGE_LIST', constructImageItems(tempImages))
    }
  })  
  return html;
}
function constructImageItems(images) {
  let html = '';
  if (images.length == 1) {
    html += templateEngine.readPage('./views/partials/images/imageitem.html')
    .replace('$IMAGE_NAME', images[0].name)
    .replace('$FILENAME', images[0].fileName)
    .replace('$FILEID_DELETE', images[0].id)
    .replace('$FILENAME_DELETE', images[0].fileName)
    .replace('$FILENAME_COPY', images[0].fileName)
  } else {
    images.forEach((image) => {
    html += templateEngine.readPage('./views/partials/images/imageitem.html')
    .replace('$IMAGE_NAME', image.name)
    .replace('$FILENAME', image.fileName)
    .replace('$FILEID_DELETE', image.id)
    .replace('$FILENAME_DELETE', image.fileName)
    .replace('$FILENAME_COPY', image.fileName)
    });
  }
  return html;
}
