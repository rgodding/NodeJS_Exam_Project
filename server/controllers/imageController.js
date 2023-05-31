import { collection } from 'firebase/firestore';
import firebaseManager from '../databases/firebase/firebaseManager.js';
import imageModel from '../models/imageModel.js';
const databaseName = 'images';

async function fetchAllData(req, res) {
  try {
    const userId = req.params.userId;
    const data = await firebaseManager.fetchAllUserData(databaseName, userId);
    if (!data) {
      res.send([]);
    } else {
      const collections = [];
      data.forEach((object) => {
        collections.push(imageModel(object.data, object.id));
      });
      res.send(collections);
    }
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}
async function fetchDataById(req, res) {
  try {
    const userId = req.params.userId;
    const id = req.params.id;
    const data = await firebaseManager.fetchUserDataById(databaseName, id, userId);
    if (!data) {
      res.send({});
    } else {
      const document = imageModel(data.data, data.id);
      res.send(document);
    }
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}
function postData(req, res) {
  try {
    const userId = req.params.userId;
    const collection = req.body.collection;
    const name = req.body.name;
    const description = req.body.description;
    const fileName = req.body.fileName;
    const data = {
      collection: collection,
      owner: userId,
      name: name,
      description: description,
      fileName: fileName,
    };
    const image = imageModel(data);
    firebaseManager.postData(databaseName, image);
    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}
async function patchData(req, res) {
  try {
    const id = req.params.id;
    const userId = req.params.userId;
    const name = req.body.name;
    const description = req.body.description;
    const data = {
      name: name,
      description: description,
    };
    const result = await firebaseManager.updateUserData(databaseName, id, data, userId);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}
async function deleteData(req, res) {
  try {
    const id = req.params.id;
    const userId = req.params.userId;
    const result = await firebaseManager.deleteUserData(databaseName, id, userId);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}

export default {
  fetchAllData,
  fetchDataById,
  postData,
  deleteData,
};
