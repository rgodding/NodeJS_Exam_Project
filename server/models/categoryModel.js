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
    name: data.name,
    owner: data.owner,
  };
  return category;
}

function constructNewCategoryModel(data) {
  const category = {
    name: data.name,
    owner: data.owner,
  };
  return category;
}
