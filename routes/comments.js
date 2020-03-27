const express = require('express')
const passport = require('passport')

const router = express.Router()

// Import Comment model
const Comment = require("../models/Comment")
const Post = require("../models/Post")

//
const validateCommentInput = require("../validation/comment")


/**
 * @route       Get api/comments/test
 * @description Test api link
 * @access      Private     
 */
router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => { res.json({ msg: "Comments route works" }) })

/**
 * @route       Get api/comments/new-comment
 * @description Create new comment to the post and saves new comment id to the post array
 * @access      Private     
 */
router.post('/new-comment', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body)

    if (!isValid) return res.status(400).json(errors)

    Post.findOne({ _id: req.body.postId })
        .then((post) => {
            const newComment = new Comment({
                post: req.body.postId,
                user: req.user.id,
                comment: req.body.comment,
            })

            newComment.save()
                .then(comment => {
                    post.comments.push(comment._id)
                    post.save()
                    res.status(200).json(comment)
                })
                .catch(err => {
                    console.error(err)
                    return res.status(500).json({ error: "Something went wrong" })
                })
        })
        .catch(() => res.status(404).json({ error: "Post not found" }))
})


/**
 * @route       Delete api/comments/:commentId/delete
 * @description Delete user comment from the post
 * @access      Private     
 */
router.delete('/:commentId/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
    Comment.findOne({ _id: req.params.commentId })
        .then(comment => {
            if (comment.user.toString() === req.user.id) {
                comment.remove()
                    .then(() => {
                        return res.status(200).json({ msg: "Comment has been deleted succesfully" })
                    })
            } else {
                return res.status(401).json({ error: "Unauthorized user to the post" })
            }
        })
        .catch(() => res.status(404).json({ error: "Comment not found" }))
})


module.exports = router