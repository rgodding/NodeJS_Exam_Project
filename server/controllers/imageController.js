import firebaseManager from '../databases/firebase/firebaseManager.js';
import imageModel from '../models/imageModel.js';
const databaseName = 'images';

async function fetchAllData(req, res) {
  try {
    const userId = req.params.userId;
    const data = await firebaseManager.fetchAllData(databaseName);
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
function fetchDataById(req, res) {
  try {
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
function putData(req, res) {
  try {
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}
function patchData(req, res) {
  try {
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}
function deleteData(req, res) {
  try {
    const id = req.params.id;
    const userId = req.params.userId;
    firebaseManager.deleteData(databaseName, id);
    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}

export default {
  fetchAllData,
  fetchDataById,
  postData,
  putData,
  patchData,
  deleteData,
};
