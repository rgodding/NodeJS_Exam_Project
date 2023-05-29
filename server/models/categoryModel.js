export default function categoryModel(data, id) {
  if (id) {
    return constructCategoryModel(data, id);
  } else {
    return constructNewCategoryModel(data);
  }
}

function constructCategoryModel(data, id) {
  const collection = {
    id: id,
    name: data.name,
    type: data.type,
  };
  return collection;
}

function constructNewCategoryModel(data) {
  const collection = {
    name: data.name,
    type: data.type,
  };
  return collection;
}
