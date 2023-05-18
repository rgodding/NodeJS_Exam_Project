import templateEngine from '../templateEngine.js';
const tempTypes = [
  {name: 'TYPE1', type: 'type1'},
  {name: 'TYPE2', type: 'type2'},
  {name: 'TYPE3', type: 'type3'},
  {name: 'TYPE4', type: 'type4'},
  {name: 'TYPE5', type: 'type5'},
]
const tempCollections = [
  {name: 'COLLECTION1', type: 'collection1', category: 'type1'},
  {name: 'COLLECTION2', type: 'collection2', category: 'type1'},
  {name: 'COLLECTION3', type: 'collection3', category: 'type2'},
  {name: 'COLLECTION4', type: 'collection4', category: 'type3'},
  {name: 'COLLECTION5', type: 'collection5', category: 'type3'},
]
export default function constructUserPage(isUser, userId) {
  const types = tempTypes;
  const collections = tempCollections;
  const html = templateEngine.readPage('./views/pages/user.html')
  .replace('$USER_ID', userId)
  .replace('$COLLECTIONS_LIST', constructCollectionList(types, collections))
  const page = templateEngine.renderPageWithSocket(html, {
    tabTitle: 'Front Page',
    isUser: isUser,
  });
  return page;
}

function constructCollectionList(types, collections){
  let html = '';
  types.forEach(type => {
    const collection = collections.filter(object => object.category === type.type);
    html += templateEngine.readPage('./views/partials/collections/types.html')
    .replace('$COLLECTION_TYPE_NAME', type.name)
    .replace('$COLLECTION_TYPE_ID', type.id)
    .replace('$COLLECTION_TYPE_COLLECTIONS', generateCollectionTypesCollections(collection))
  })
  return html;
}

function generateCollectionTypesCollections(collection){
  let html = '';
  collection.forEach(collection => {
    html += templateEngine.readPage('./views/partials/collections/collections.html')
    .replace('$COLLECTION_NAME', collection.name)
    .replace('$COLLECTION_ID', collection.id)
  })
  return html;
}