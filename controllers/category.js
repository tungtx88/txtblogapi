const Category = require('../models/category')
const Blog = require('../models/blog')
const slugify = require('slugify')
const {getErrorMessage} = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
   const {name} = req.body
   let slug = slugify(name).toLowerCase()

   let category = new Category({name, slug})

   category.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: getErrorMessage(err)
           })
       }
       res.json(data)
   })
}

exports.list = (req, res) => {
    Category.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
        res.json(data)
    })
}

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Category.findOne({ slug }).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
        Blog.find({categories: category})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name')
        .sort({createAt: -1})
        .select('_id title slug excerpt body categories postedBy tags createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: getErrorMessage(err)
                })
            }
            res.json({category: category, blogs: data})
        })
    })
}

exports.listBlogsInCategory = (req, res) => {
    const slug = req.body.slug.toLowerCase()
    let limit = req.body.limit ? parseInt(req.body.limit) : 10
    let skip = parseInt(req.body.skip)
    Category.findOne({ slug }).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
        Blog.find({categories: category})
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
            res.json({category: category, blogs: data, size: data.length})
        })
    })
}

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase()

    Category.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
        res.json({
            message: 'Category deleted successfully'
        })
    })
}