const Comment = require('../models/comment')
const formidable = require('formidable')
const { getErrorMessage } = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'has error'
            })
        }

        const { username, body, email, blogId } = fields

        if (!username || !username.length) {
            return res.status(400).json({
                error: 'Name is required'
            })
        }

        if (!email || !email.length) {
            return res.status(400).json({
                error: 'Email is required'
            })
        }

        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            return res.status(400).json({
                error: 'Invalid Email address'
            })
        }

        if (!body || body.length < 5) {
            return res.status(400).json({
                error: 'Content is too short'
            })
        }

        let comment = new Comment()
        comment.username = username
        comment.body = body
        comment.email = email
        comment.blogId = blogId

        comment.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: getErrorMessage(err)
                })
            }
            res.json(result)
        })
    })
}

exports.list = (req, res) => {
    let blogId = req.body.blogId

    Comment.find({ blogId })
        .sort({ _id: -1 })
        .select('_id username email body createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json(
                    {
                        error: getErrorMessage(err)
                    }
                )
            }
            res.json(data)
        })
}