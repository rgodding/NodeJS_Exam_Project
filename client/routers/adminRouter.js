import { Router } from 'express';
import { showAdmin } from '../controllers/adminController.js';
import checkUser from '../middleware/checkUser.js';
const router = Router();

router.get('/admin', checkUser, (req, res) => {
  showAdmin(req, res);
});

export default router;
