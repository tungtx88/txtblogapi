const express = require('express')
const router = express.Router()
const { create, list } = require('../controllers/comment')

router.post('/comment', create)
router.post('/comments', list)

module.exports = router