import { Router } from 'express';
import { showLogin } from '../controllers/loginController.js';
import checkUser from '../middleware/checkUser.js';
const router = Router();

router.get('/login', checkUser, (req, res) => {
  showLogin(req, res);
});

export default router;
