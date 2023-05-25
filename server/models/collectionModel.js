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
    name: data.name,
    type: data.type,
    category: data.category,
  };
  return collection;
}

function constructNewCollectionModel(data) {
  const collection = {
    name: data.name,
    type: data.type,
    category: data.category,
  };
  return collection;
}
