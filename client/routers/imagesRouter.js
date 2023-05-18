import { Router } from 'express';
import { showImages } from '../controllers/imagesController.js';
import requireUser from '../middleware/requireUser.js';
const router = Router();

router.get('/images', requireUser, (req, res) => {
  showImages(req, res);
});

export default router;
