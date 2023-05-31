import dotenv from 'dotenv/config';
const url = `${process.env.SERVER_URL}/api/collections`;

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

async function postObject(category, name, userId) {
  let response = await fetch(`${url}/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      category: category,
      name: name,
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
  postObject,
  deleteObject,
};
