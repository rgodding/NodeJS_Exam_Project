import { Router } from "express";
const router = Router();
const routerUrl = '/api/images'

router.get(`${routerUrl}`, async (req, res) => {
    res.send({data: 'images : get all'})
})
router.get(`${routerUrl}`, async (req, res) => {
    res.send({data: 'images : get by id'})
})
router.post(`${routerUrl}`, async (req, res) => {
    res.send({data: 'images : post'})
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