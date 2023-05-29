import firebaseManager from '../databases/firebase/firebaseManager.js';
import collectionModel from '../models/collectionModel.js';
const databaseName = 'collections';

async function fetchAllData(req, res) {
  try {
    const userId = req.params.userId;
    const data = await firebaseManager.fetchAllData(databaseName);
    if (!data) {
      res.send([]);
    } else {
      const collections = [];
      data.forEach((object) => {
        collections.push(collectionModel(object.data, object.id));
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
    const id = req.params.id;
    const userId = req.session.userId;
    const data = await firebaseManager.fetchDataById(databaseName, id);
    if (!data) {
      res.send({});
    } else {
      const data = collectionModel(data.data, data.id);
    }
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}
function postData(req, res) {
  try {
    const category = req.body.category;
    const name = req.body.name;
    const type = req.body.type;
    const userId = req.params.userId;
    const data = {
      category: category,
      name: name,
      type: type,
    };
    const collection = collectionModel(data);
    firebaseManager.postData(databaseName, collection);
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
