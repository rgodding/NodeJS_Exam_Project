import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
const router = Router();
const routerUrl = '/api/documents'

router.get(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'documents : get all'})
})

router.get(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'documents : get by id'})
})

router.post(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'documents : post'})
})

router.put(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'documents : put'})
})

router.patch(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'documents : patch'})
})

router.delete(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'document : delete'})
}) 

export default router;