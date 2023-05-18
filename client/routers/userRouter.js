import { Router } from 'express';
import { showUser } from '../controllers/userController.js';
import requireUser from '../middleware/requireUser.js';
const router = Router();

router.get('/user', requireUser, async (req, res) => {
  showUser(req, res);
});
export default router;
