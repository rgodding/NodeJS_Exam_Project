import collectionCategoryManager from "../../repository/collectionCategoryManager.js";
import collectionManager from "../../repository/collectionManager.js";
import templateEngine from "../templateEngine.js";

export default async function constructImagesPage(isUser, userId) {
  const categories = await collectionCategoryManager.fetchAllObjects(userId);
  const collections = await collectionManager.fetchAllObjects(userId);
  const html = templateEngine.readPage('./views/pages/images.html')
  .replace('$CREATE_IMAGES_TYPES_OPTIONS', generateCategoryOptions(categories, collections))
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Images Page',
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