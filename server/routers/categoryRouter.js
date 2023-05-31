import { Router } from 'express';
const router = Router();
const routerUrl = '/api/categories/:userId';
import categoryController from '../controllers/categoryController.js';

router.get(`${routerUrl}`, async (req, res) => {
  categoryController.fetchAllData(req, res);
});

router.get(`${routerUrl}/:id`, async (req, res) => {
  categoryController.fetchDataById(req, res);
});

router.post(`${routerUrl}`, async (req, res) => {
  categoryController.postData(req, res);
});

router.patch(`${routerUrl}/:id`, async (req, res) => {
  categoryController.patchData(req, res);
});

router.delete(`${routerUrl}/:id`, async (req, res) => {
  categoryController.deleteData(req, res);
});

export default router;
