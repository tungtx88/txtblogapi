const express = require('express')
const router = express.Router()
const { create, list, listAllBlogsCategoriesTags, remove, update, read, photo, listRelated, prevBlog, nextBlog, listSearch } = require('../controllers/blog')
const { requireSignin, adminMiddleware } = require('../controllers/auth')

router.post('/blog', requireSignin, adminMiddleware, create)
router.get('/blogs', list)
router.post('/blogs-categories-tags', listAllBlogsCategoriesTags)
router.get('/blog/:slug', read)
router.delete('/blog/:slug', requireSignin, adminMiddleware, remove)
router.put('/blog/:slug', requireSignin, adminMiddleware, update)
router.get('/blog/photo/:slug', photo)
router.post('/blogs/related', listRelated)
router.post('/blogs/prev', prevBlog)
router.post('/blogs/next', nextBlog)
router.get('/blogs/search', listSearch)

module.exports = router