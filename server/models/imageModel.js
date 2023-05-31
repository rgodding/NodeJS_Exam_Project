export default function imageModel(data, id) {
  if (id) {
    return constructImageModel(data, id);
  } else {
    return constructNewImageModel(data);
  }
}

function constructImageModel(data, id) {
  const image = {
    id: id,
    collection: data.collection,
    owner: data.owner,
    name: data.name,
    description: data.description,
    fileName: data.fileName,
  };
  return image;
}

function constructNewImageModel(data) {
  const image = {
    collection: data.collection,
    owner: data.owner,
    name: data.name,
    description: data.description,
    fileName: data.fileName,
  };
  return image;
}
