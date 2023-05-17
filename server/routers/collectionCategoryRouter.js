import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
const router = Router();
const routerUrl = '/api/collection-categories'

router.get(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'collection-categories : get all'})
})
router.get(`${routerUrl}/:id`, authenticate, async (req, res) => {
    res.send({data: 'collection-categories : get by id'})
})
router.post(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'collection-categories : post'})
})
router.put(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'collection-categories : put'})
})
router.patch(`${routerUrl}/:id`, authenticate, async (req, res) => {
    res.send({data: 'collection-categories : patch'})
})
router.delete(`${routerUrl}/:id`, authenticate, async (req, res) => {
    res.send({data: 'document : delete'})
}) 

export default router;