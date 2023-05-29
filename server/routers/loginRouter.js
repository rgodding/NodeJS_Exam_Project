import { Router } from 'express';
import firebaseManager from '../databases/firebase/firebaseManager.js';
import loginController from '../controllers/loginController.js';
const router = Router();

router.post('/login', async (req, res) => {
  loginController.login(req, res)
});

router.post('/register', async (req, res) => {
  loginController.register(req, res);
});

router.post('/forgot-password', async (req, res) => {
  loginController.forgotPassword(req, res);
});

router.post('/logout', async (req, res) => {
  req.session.destroy();
  res.status(200).send('OK');
});

export default router;
