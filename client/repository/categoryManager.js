const url = 'http://localhost:8081/api/categories';

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

async function postObject(name, type, userId) {
  let response = await fetch(`${url}/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      type: type,
    }),
  });
  return response.status;
}

async function deleteObject(id, userId) {
  fetch(`${url}/${userId}/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {})
    .catch((error) => {});
}

export default {
  fetchAllObjects,
  postObject,
  deleteObject,
};
