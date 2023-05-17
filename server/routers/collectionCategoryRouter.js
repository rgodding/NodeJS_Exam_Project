import { Router } from "express";
const router = Router();
const routerUrl = '/api/collection-categories'

router.get(`${routerUrl}`, async (req, res) => {
    res.send({data: 'collection-categories : get all'})
})
router.get(`${routerUrl}/:id`, async (req, res) => {
    res.send({data: 'collection-categories : get by id'})
})
router.post(`${routerUrl}`, async (req, res) => {
    res.send({data: 'collection-categories : post'})
})
router.put(`${routerUrl}`, async (req, res) => {
    res.send({data: 'collection-categories : put'})
})
router.patch(`${routerUrl}/:id`, async (req, res) => {
    res.send({data: 'collection-categories : patch'})
})
router.delete(`${routerUrl}/:id`, async (req, res) => {
    res.send({data: 'document : delete'})
}) 

export default router;