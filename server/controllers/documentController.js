import firebaseManager from '../databases/firebase/firebaseManager.js';
import documentModel from '../models/documentModel.js';
const databaseName = 'documents';

async function fetchAllData(req, res) {
  try {
    const userId = req.params.userId;
    const data = await firebaseManager.fetchAllUserData(databaseName, userId);
    if (!data) {
      res.send([]);
    } else {
      const documents = [];
      data.forEach((object) => {
        documents.push(documentModel(object.data, object.id));
      });
      res.send(documents);
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
      const document = documentModel(data.data, data.id);
      res.send(document);
    }
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}

async function postData(req, res) {
  try {
    const userId = req.params.userId;
    const collection = req.body.collection;
    const content = req.body.content;
    const data = {
      collection: collection,
      owner: userId,
      content: content,
    };
    const dataToPost = documentModel(data);
    const result = await firebaseManager.postData(databaseName, dataToPost);
    const document = documentModel(result.data, result.id);
    res.status(202).send(document);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}

async function patchData(req, res) {
  try {
    const id = req.params.id;
    const userId = req.params.userId;
    const content = req.body.content;
    const data = {
      content: content,
    };
    const result = await firebaseManager.updateUserData(databaseName, id, data, userId);
    const document = documentModel(result.data, result.id);
    res.status(200).send(document);
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
    const document = documentModel(result.data, result.id);
    res.status(200).send(document);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}

export default {
  fetchAllData,
  fetchDataById,
  postData,
  patchData,
  deleteData,
};
