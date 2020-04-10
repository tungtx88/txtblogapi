const {check} = require('express-validator')

exports.userSignUpValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid Email address'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password is must be longer than 6')
]

exports.userSignInValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid Email address'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password is must be longer than 6')
]