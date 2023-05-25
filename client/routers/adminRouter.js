import { Router } from 'express';
import { showAdmin } from '../controllers/adminController.js';
import checkUser from '../middleware/checkUser.js';
import checkAdmin from '../middleware/checkAdmin.js';
const router = Router();

router.get('/admin', checkAdmin, checkUser,  async (req, res) => {
  showAdmin(req, res);
});

export default router;
