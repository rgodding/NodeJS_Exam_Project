import { Router } from "express";
const router = Router();
const routerUrl = '/api/collections'

router.get(`${routerUrl}`, async (req, res) => {
    res.send({data: 'collections : get all'})
})
router.get(`${routerUrl}`, async (req, res) => {
    res.send({data: 'collections : get by id'})
})
router.post(`${routerUrl}`, async (req, res) => {
    res.send({data: 'collections : post'})
})
router.put(`${routerUrl}`, async (req, res) => {
    res.send({data: 'collections : put'})
})
router.patch(`${routerUrl}`, async (req, res) => {
    res.send({data: 'collections : patch'})
})
router.delete(`${routerUrl}`, async (req, res) => {
    res.send({data: 'document : delete'})
}) 

export default router;