import { Router } from 'express';
const router = Router();
const routerUrl = '/api/documents/:userId';
import documentController from '../controllers/documentController.js';

router.get(`${routerUrl}`, async (req, res) => {
  documentController.fetchAllData(req, res);
});

router.get(`${routerUrl}/:id`, async (req, res) => {
  documentController.fetchDataById(req, res);
});

router.post(`${routerUrl}`, async (req, res) => {
  documentController.postData(req, res);
});

router.patch(`${routerUrl}/:id`, async (req, res) => {
  documentController.patchData(req, res);
});

router.delete(`${routerUrl}/:id`, async (req, res) => {
  documentController.deleteData(req, res);
});

export default router;
