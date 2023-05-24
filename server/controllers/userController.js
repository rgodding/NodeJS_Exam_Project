import firebaseManager from '../databases/firebase/firebaseManager.js';
import userModel from '../models/userModel.js';
const type = 'users';

async function fetchAllData(req, res) {
  try {
    const userId = req.params.userId;
    const data = await firebaseManager.fetchAllData(`${type}::${userId}`);
    if (!data) {
      res.send([]);
    } else {
      const users = [];
      data.forEach((object) => {
        users.push(userModel(object.data, object.id));
      });
      res.send(users);
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
    const data = await firebaseManager.fetchDataById(`${type}::${userId}`, id);
    if (!data) {
      res.send({});
    } else {
      const user = userModel(data.data, data.id);
      res.send(user);
    }
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}

async function postData(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userId = await firebaseManager.register(email, password);
    if (userId === false) {
        res.send(false);
    } else {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const data = {
        userId : userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      const user = userModel(data);
      firebaseManager.postData(`${type}`, user);
      res.send({ userId: userId });
    }
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
    const id = req.session.userid;
    firebaseManager.deleteData(type, id);
    res.send({ status: 'account deleted' });
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}
async function forgotPassword(req, res) {
  try {
    const email = req.body.email;
    const result = await firebaseManager.forgotPassword(email);
    res.send(result);
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
  forgotPassword,
};
