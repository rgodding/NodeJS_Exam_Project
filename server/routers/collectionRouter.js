import { Router } from "express";
const router = Router();
const routerUrl = '/api/collections/:userId'
import collectionController from "../controllers/collectionController.js";

router.get(`${routerUrl}`, async (req, res) => {
    collectionController.fetchAllData(req, res);
})
router.get(`${routerUrl}/:id`, async (req, res) => {
    collectionController.fetchDataById(req, res);
})
router.post(`${routerUrl}`, async (req, res) => {
    collectionController.postData(req, res);
})
router.put(`${routerUrl}/:id`, async (req, res) => {
    collectionController.putData(req, res);
})
router.patch(`${routerUrl}/:id`, async (req, res) => {
    collectionController.patchData(req, res);
})
router.delete(`${routerUrl}/:id`, async (req, res) => {
    collectionController.deleteData(req, res);
}) 

export default router;