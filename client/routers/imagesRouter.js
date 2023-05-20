import { Router } from 'express';
import { showImages, createImage } from '../controllers/imagesController.js';
import requireUser from '../middleware/requireUser.js';
import multer from "multer";

const router = Router();

router.get('/images', requireUser, (req, res) => {
  showImages(req, res);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "public/images/uploads/");
  },
  filename: (req, file, cb) => {
      const filenameParts = file.originalname.split(".");
      if (filenameParts.length <= 1) {
          cb(new Error("File has no extension: "  + file.originalname));
      }

      const extension = filenameParts.pop();
      const originalFilename = filenameParts.join(".");
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);

      const newFileName = uniqueSuffix + "___" + originalFilename + "." + extension;

      cb(null, newFileName);
  }
});
const upload = multer({ storage });

router.post('/images', upload.single("file"), (req, res) => {
  createImage(req, res)
})

export default router;
