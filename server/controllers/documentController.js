import firebaseManager from '../databases/firebase/firebaseManager.js';
import documentModel from '../models/documentModel.js';
const databaseName = 'documents';

async function fetchAllData(req, res) {
  try {
    const userId = req.params.userId;
    const data = await firebaseManager.fetchAllData(databaseName);
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
    const data = await firebaseManager.fetchDataById(databaseName, id);
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

function postData(req, res) {
  try {
    const userId = req.params.userId;
    const collection = req.body.collection;
    const content = req.body.content;
    const data = {
      collection: collection,
      content: content,
    };
    const document = documentModel(data);
    firebaseManager.postData(databaseName, document);
    res.status(202).send('OK');
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
    const id = req.params.id;
    const userId = req.params.userId;
    const content = req.body.content;
    const data = {
      content: content,
    };
    firebaseManager.updateData(databaseName, id, data);
    res.status(200).send('OK');
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
