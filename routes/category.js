const express = require('express')
const router = express.Router()
const { create, list, read, remove, listBlogsInCategory } = require('../controllers/category')

// Validations
const {runValidation} = require('../validators')
const { categoryCreateValidator } = require('../validators/category')
const {requireSignin, adminMiddleware} = require('../controllers/auth')

router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create)
router.get('/categories', list)
router.get('/category/:slug', read)
router.post('/category/blogs', listBlogsInCategory)
router.delete('/category/:slug', requireSignin, adminMiddleware, remove)

module.exports = router