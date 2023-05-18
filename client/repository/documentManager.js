const url = 'http://localhost:8081/api/documents';

async function fetchAllObjects(userId) {
  return new Promise((resolve, reject) => {
    fetch(`${url}/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
async function postObject(collection, content, userId) {
  let response = await fetch(`${url}/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      collection: collection,
      content: content,
    }),
  });
  return response.status;
}
async function fetchObjectById(id, userId) {
  return new Promise((resolve, reject) => {
    fetch(`${url}/${userId}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
async function deleteObject(id, userId) {
  fetch(`${url}/${userId}/${id}`, {
    method: 'DELETE',
  })
  .then((res) => {
  })
  .catch((error) => {
  });
}
export default {
  fetchAllObjects,
  fetchObjectById,
  postObject,
  deleteObject,
};
