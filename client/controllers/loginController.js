import loginManager from '../repository/loginManager.js';
import constructLoginPage from '../util/pages/constructLoginPage.js';
import constructRegisterPage from '../util/pages/constructRegisterPage.js';
import constructForgotPasswordPage from '../util/pages/constructForgotPasswordPage.js';


export function showLogin(req, res) {
  try {
    const page = constructLoginPage(req.isUser);
    res.send(page);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}
export async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userId = await loginManager.login(email, password);
    if (userId) {
      req.session.userId = userId;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}
export function showRegister(req, res) {
    try {
        const page = constructRegisterPage(req.isUser);
        res.send(page);
      } catch (err) {
        console.error(err);
        res.status(505).send('Internal Client Error');
      }
}
export async function register(req, res) {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const userId = await loginManager.register(firstName, lastName, email, password);
    if (userId) {
      req.session.userId = userId;
      res.redirect('/');
    } else {
      res.redirect('/register');
    }
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}
export function showForgotPassword(req, res) {
  try {
    const page = constructForgotPasswordPage(req.isUser);
    res.send(page);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}
export async function forgotPassword(req, res) {
  try {
    const email = req.body.email;
    const result = await loginManager.forgotPassword(email);
    if(result){
      res.redirect('/')
    } else {
      res.redirect('/forgot-password')
    }
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}