import express from 'express'
import { addOrder, getAllOrder, getOrderById } from '../controllers/order.controller.js'


const router = express.Router()

router.post('/', addOrder)
router.get('/', getAllOrder)
router.get('/:id', getOrderById)

export default router 