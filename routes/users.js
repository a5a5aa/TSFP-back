import { Router } from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { register, login, logout, extend, getUser, getAllUsers, editInfo } from '../controllers/users.js'

const router = Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.patch('/extend', auth.jwt, extend)
router.get('/me', auth.jwt, getUser)
router.get('/allusers', auth.jwt, admin, getAllUsers)
router.patch('/persional-info', auth.jwt, editInfo)

export default router
