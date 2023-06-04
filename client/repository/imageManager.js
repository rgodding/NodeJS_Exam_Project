import dotenv from 'dotenv/config';
const url = `${process.env.SERVER_URL}/api/images`;
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

async function deleteImageFile(fileName) {
  try {
    fs.unlink(`./uploads/${fileName}`, function (err) {
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
