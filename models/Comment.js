const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('comments', CommentSchema)