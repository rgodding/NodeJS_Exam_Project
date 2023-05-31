export default function categoryModel(data, id) {
  if (id) {
    return constructCategoryModel(data, id);
  } else {
    return constructNewCategoryModel(data);
  }
}

function constructCategoryModel(data, id) {
  const category = {
    id: id,
    owner: data.owner,
    name: data.name
  };
  return category;
}

function constructNewCategoryModel(data) {
  const category = {
    owner: data.owner,
    name: data.name
  };
  return category;
}