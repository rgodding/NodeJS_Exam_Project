import { Router } from 'express';
import { showUser } from '../controllers/userController.js';
import checkUser from '../middleware/checkUser.js';
const router = Router();

router.get('/user', checkUser, (req, res) => {
  showUser(req, res);
});

export default router;
