const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const blogSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        index: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    body: {
        type: String,
        required: true
    },
    blogId: {
        type: ObjectId,
        ref: 'Blog'
    }
}, {timestamps: true})

module.exports = mongoose.model('Comment', blogSchema)