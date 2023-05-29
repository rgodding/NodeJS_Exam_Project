import firebaseManager from '../databases/firebase/firebaseManager.js';
import categoryModel from '../models/categoryModel.js';

const databaseName = 'categories';

async function fetchAllData(req, res) {
  try {
    const userId = req.params.userId;
    const data = await firebaseManager.fetchAllData(`${databaseName}::${userId}`);
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
    const id = req.params.id;
    const data = await firebaseManager.fetchDataById(`${databaseName}::${userId}`, id);
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
function postData(req, res) {
  try {
    const userId = req.params.userId;
    const name = req.body.name;
    const type = req.body.type;
    const category = categoryModel({
      name: name,
      type: type,
    });
    firebaseManager.postData(`${databaseName}::${userId}`, category);
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
    firebaseManager.deleteData(`${databaseName}::${userId}`, id);
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
  deleteData,
};
