export default function collectionModel(data, id) {
  if (id) {
    return constructCollectionModel(data, id);
  } else {
    return constructNewCollectionModel(data);
  }
}

function constructCollectionModel(data, id) {
  const collection = {
    id: id,
    category: data.category,
    owner: data.owner,
    name: data.name,
  };
  return collection;
}

function constructNewCollectionModel(data) {
  const collection = {
    category: data.category,
    owner: data.owner,
    name: data.name,
  };
  return collection;
}
