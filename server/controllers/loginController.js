import firebaseManager from '../databases/firebase/firebaseManager.js';
import loginModel from '../models/loginModel.js';
const type = 'users';

async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userId = await firebaseManager.login(email, password);
    if (!userId) {
      res.send({});
    } else {
      req.session.userId = userId;
      res.send({ userId: userId });
    }
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Server Error');
  }
}
async function register(req, res) {
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
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      const user = loginModel(data);
      firebaseManager.postData(`${type}`, user);
      res.send({ userId: userId });
    }
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
  login,
  register,
  deleteData,
  forgotPassword,
};
