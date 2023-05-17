import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
const router = Router();
const routerUrl = '/api/collections'

router.get(`${routerUrl}`, authenticate, authenticate, authenticate, async (req, res) => {
    res.send({data: 'collections : get all'})
})
router.get(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'collections : get by id'})
})
router.post(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'collections : post'})
})
router.put(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'collections : put'})
})
router.patch(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'collections : patch'})
})
router.delete(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'document : delete'})
}) 

export default router;