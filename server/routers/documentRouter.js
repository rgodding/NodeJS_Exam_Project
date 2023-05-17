import { Router } from "express";
const router = Router();
const routerUrl = '/api/documents'

router.get(`${routerUrl}`, async (req, res) => {
    res.send({data: 'documents : get all'})
})
router.get(`${routerUrl}`, async (req, res) => {
    res.send({data: 'documents : get by id'})
})
router.post(`${routerUrl}`, async (req, res) => {
    res.send({data: 'documents : post'})
})
router.put(`${routerUrl}`, async (req, res) => {
    res.send({data: 'documents : put'})
})
router.patch(`${routerUrl}`, async (req, res) => {
    res.send({data: 'documents : patch'})
})
router.delete(`${routerUrl}`, async (req, res) => {
    res.send({data: 'document : delete'})
}) 

export default router;