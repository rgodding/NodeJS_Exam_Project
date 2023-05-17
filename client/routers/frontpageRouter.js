import { Router } from 'express';
import { showFrontpage } from '../controllers/frontpageController.js';
import checkUser from '../middleware/checkUser.js';
const router = Router();

router.get('/', checkUser, (req, res) => {
  showFrontpage(req, res);
});

export default router;
