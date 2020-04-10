const Tag = require('../models/tag')
const Blog = require('../models/blog')
const slugify = require('slugify')
const {getErrorMessage} = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
   const {name} = req.body
   let slug = slugify(name).toLowerCase()

   let tag = new Tag({name, slug})

   tag.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: getErrorMessage(err)
           })
       }
       res.json(data)
   })
}

exports.list = (req, res) => {
    Tag.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
        res.json(data)
    })
}

exports.listBlogsInTag = (req, res) => {
    const slug = req.body.slug.toLowerCase()
    let limit = req.body.limit ? parseInt(req.body.limit) : 10
    let skip = parseInt(req.body.skip)
    Tag.findOne({ slug }).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
        Blog.find({tags: tag})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name')
        .sort({createAt: -1})
        .skip(skip)
        .limit(limit)
        .select('_id title slug excerpt body categories postedBy tags createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: getErrorMessage(err)
                })
            }
            res.json({tag: tag, blogs: data, size: data.length})
        })
    })
}

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase()

    Tag.findOne({ slug }).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
        res.json(tag)
    })
}

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase()

    Tag.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
        res.json({
            message: 'tag deleted successfully'
        })
    })
}