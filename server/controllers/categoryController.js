import firebaseManager from '../databases/firebase/firebaseManager.js';
import categoryModel from '../models/categoryModel.js';

const databaseName = 'categories';

async function fetchAllData(req, res) {
  try {
    const userId = req.params.userId;
    const data = await firebaseManager.fetchAllUserData(databaseName, userId);
    if (!data) {
      res.send([]);
    } else {
      const categories = [];
      data.forEach((object) => {
        categories.push(categoryModel(object.data, object.id));
      });
      res.send(categories);
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
      const category = categoryModel(data.data, id);
      res.send(category);
    }
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}
async function postData(req, res) {
  try {
    const userId = req.params.userId;
    const name = req.body.name;
    const data = {
      owner: userId,
      name: name,
    };
    const category = categoryModel(data);
    const result = await firebaseManager.postData(`${databaseName}`, category);
    res.status(200).send(result);
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
    const data = {
      name: name,
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
  patchData,
  deleteData,
};
