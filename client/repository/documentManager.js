import dotenv from 'dotenv/config';
const url = `${process.env.SERVER_URL}/api/documents`;

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

async function fetchAllObjectsByCollection(userId, collection) {
  return new Promise((resolve, reject) => {
    fetch(`${url}/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const result = data.filter((object) => object.collection === collection);
        resolve(result);
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
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return response.status;
  }
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

async function updateObject(id, content, userId) {
  let response = await fetch(`${url}/${userId}/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: content,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return response.status;
  }
}

async function deleteObject(id, userId) {
  let response = await fetch(`${url}/${userId}/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return response.status;
  }
}

export default {
  fetchAllObjects,
  fetchAllObjectsByCollection,
  fetchObjectById,
  postObject,
  updateObject,
  deleteObject,
};
