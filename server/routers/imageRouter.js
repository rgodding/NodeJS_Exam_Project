import { Router } from 'express';
const router = Router();
const routerUrl = '/api/images/:userId';
import imageController from '../controllers/imageController.js';

router.get(`${routerUrl}`, async (req, res) => {
  imageController.fetchAllData(req, res);
});

router.get(`${routerUrl}`, async (req, res) => {
  imageController.fetchDataById(req, res);
});

router.post(`${routerUrl}`, async (req, res) => {
  imageController.postData(req, res);
});

router.patch(`${routerUrl}/:id`, async (req, res) => {
  imageController.patchData(req, res);
});

router.delete(`${routerUrl}/:id`, async (req, res) => {
  imageController.deleteData(req, res);
});

export default router;
