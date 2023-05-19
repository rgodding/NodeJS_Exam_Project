import { Router } from "express";
const router = Router();
const routerUrl = '/api/images/:userId'
import imageController from "../controllers/imageController.js";

router.get(`${routerUrl}`, async (req, res) => {
    imageController.fetchAllData(req, res);
})

router.get(`${routerUrl}`, async (req, res) => {
    res.send({data: 'images : get by id'})
})

router.post(`${routerUrl}`, async (req, res) => {
    imageController.postData(req, res)
})

router.put(`${routerUrl}`, async (req, res) => {
    res.send({data: 'images : put'})
})

router.patch(`${routerUrl}`, async (req, res) => {
    res.send({data: 'images : patch'})
})


router.delete(`${routerUrl}`, async (req, res) => {
    res.send({data: 'images : delete'})
}) 

export default router;