import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
const router = Router();
const routerUrl = '/api/images'

router.get(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'images : get all'})
})

router.get(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'images : get by id'})
})

router.post(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'images : post'})
})

router.put(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'images : put'})
})

router.patch(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'images : patch'})
})


router.delete(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'images : delete'})
}) 

export default router;