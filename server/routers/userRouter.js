import { Router } from "express";
import userController from "../controllers/userController.js";
const router = Router();
const routerUrl = '/api/users/:userId'

router.get(`${routerUrl}`, async (req, res) => {
    userController.fetchAllData(req, res)
})

router.get(`${routerUrl}`, async (req, res) => {
    res.send({data: 'users : get by id'})
})

router.post(`${routerUrl}`, async (req, res) => {
    res.send({data: 'users : post'})
})

router.put(`${routerUrl}`, async (req, res) => {
    res.send({data: 'users : put'})
})

router.patch(`${routerUrl}`, async (req, res) => {
    res.send({data: 'users : patch'})
})

router.delete(`${routerUrl}`, async (req, res) => {
    res.send({data: 'users : delete'})
}) 

export default router;