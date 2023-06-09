import { Router } from 'express';
import { showImages, createImage } from '../controllers/imagesController.js';
import requireUser from '../middleware/requireUser.js';
import multer from 'multer';

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filenameParts = file.originalname.split('.');
    if (filenameParts.length <= 1) {
      cb(new Error('File has no extension: ' + file.originalname));
    }

    const extension = filenameParts.pop();
    const originalFilename = filenameParts.join('.');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    const newFileName = uniqueSuffix + '___' + originalFilename + '.' + extension;

    cb(null, newFileName);
  },
});
const upload = multer({ storage });

router.get('/images', requireUser, (req, res) => {
  showImages(req, res);
});

router.post('/images', requireUser, upload.single('file'), (req, res) => {
  createImage(req, res);
});

export default router;
