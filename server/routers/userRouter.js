import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
const router = Router();
const routerUrl = '/api/users'

router.get(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'users : get all'})
})

router.get(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'users : get by id'})
})

router.post(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'users : post'})
})

router.put(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'users : put'})
})

router.patch(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'users : patch'})
})

router.delete(`${routerUrl}`, authenticate, async (req, res) => {
    res.send({data: 'users : delete'})
}) 

export default router;