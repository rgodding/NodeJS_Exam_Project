import { Router } from "express";
const router = Router();
const routerUrl = '/api/collection-categories/:userId'
import collectionCategoryController from "../controllers/collectionCategoryController.js";

router.get(`${routerUrl}`, async (req, res) => {
    collectionCategoryController.fetchAllData(req, res);
})
router.get(`${routerUrl}/:id`, async (req, res) => {
    collectionCategoryController.fetchDataById(req, res);
})
router.post(`${routerUrl}`, async (req, res) => {
    collectionCategoryController.postData(req, res);
})
router.put(`${routerUrl}`, async (req, res) => {
    collectionCategoryController.putData(req, res);
})
router.patch(`${routerUrl}/:id`, async (req, res) => {
    collectionCategoryController.patchData(req, res);
})
router.delete(`${routerUrl}/:id`, async (req, res) => {
    collectionCategoryController.deleteData(req, res);
}) 

export default router;