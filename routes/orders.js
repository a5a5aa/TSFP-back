import { Router } from 'express'
import { jwt } from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { createOrder, getAllOrders, getMyOrders, getEventOrders } from '../controllers/orders.js'

const router = Router()

// 建立訂單
router.post('/:id', jwt, createOrder)
// 取自己的訂單
router.get('/', jwt, getMyOrders)
// 取所有人的訂單
router.get('/allorders', jwt, admin, getAllOrders)
// 管理員取每個活動的報名訂單
router.get('/eventorders/:id', jwt, admin, getEventOrders)

export default router
