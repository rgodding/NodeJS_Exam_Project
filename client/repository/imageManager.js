const url = 'http://localhost:8081/api/images';
import fs from 'fs';

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

async function postObject(collection, name, description, fileName, userId) {
  let response = await fetch(`${url}/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      collection: collection,
      name: name,
      description: description,
      fileName: fileName,
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

async function deleteImageFile(fileName) {
  try {
    fs.unlink(`./public/images/uploads/${fileName}`, function (err) {
      if (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

export default {
  fetchAllObjects,
  postObject,
  deleteObject,
  deleteImageFile,
};
