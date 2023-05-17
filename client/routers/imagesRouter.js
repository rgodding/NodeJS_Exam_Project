import { Router } from 'express';
import { showImages } from '../controllers/imagesController.js';
import checkUser from '../middleware/checkUser.js';
const router = Router();

router.get('/images', checkUser, (req, res) => {
  showImages(req, res);
});

export default router;
