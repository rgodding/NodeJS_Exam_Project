import { Router } from 'express';
import { showDocuments } from '../controllers/documentsController.js';
import requireUser from '../middleware/requireUser.js';
const router = Router();

router.get('/documents', requireUser, (req, res) => {
  showDocuments(req, res);
});

export default router;
