const express = require('express')
const router = express.Router()
const {signup, signin, signout, requireSignin} = require('../controllers/auth')

// Validations
const {runValidation} = require('../validators')
const {userSignUpValidator, userSignInValidator} = require('../validators/auth')

router.post('/signup', userSignUpValidator, runValidation, signup)
router.post('/signin', userSignInValidator, runValidation, signin)
router.get('/signout', signout)

//test
router.get('/secret', requireSignin, (req, res) => {
    res.json({
        message: 'You access to secret page'
    })
})

module.exports = router