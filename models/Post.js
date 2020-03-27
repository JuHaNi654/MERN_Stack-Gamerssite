const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comments'
        }
    ]
})

module.exports = Post = mongoose.model('posts', PostSchema) 