import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createArticle, getAllArticles, getArticles, editArticle, getUploadArticles } from '../controllers/articles.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createArticle)
router.get('/', getUploadArticles)
router.get('/all', jwt, admin, getAllArticles)
router.get('/:id', getArticles)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, editArticle)

export default router
