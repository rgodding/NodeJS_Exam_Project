import { Router } from 'express';
import { showDocuments } from '../controllers/documentsController.js';
import checkUser from '../middleware/checkUser.js';
const router = Router();

router.get('/documents', checkUser, (req, res) => {
  showDocuments(req, res);
});

export default router;
