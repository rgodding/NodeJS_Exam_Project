import { Router } from 'express';
import firebaseManager from '../databases/firebase/firebaseManager.js';
import userController from '../controllers/userController.js';
const router = Router();

router.post('/login', async (req, res) => {
  let userId = await firebaseManager.login(req.body.email, req.body.password);
  if (userId === false) {
    res.status(401).send({ error: 'Unauthorized' });
  } else {
    req.session.userId = userId;
    res.send({ userId: userId });
  }
});
router.post('/register', async (req, res) => {
  userController.postData(req, res);
});

router.post('/logout', async (req, res) => {
  req.session.destroy();
  res.status(200).send('OK');
});

export default router;
