const express = require('express')
const passport = require('passport')

const router = express.Router()

// Import Post model
const Post = require("../models/Post")

// Setup data validation
const validatePostInput = require("../validation/post")

/**
 * @route       Get api/posts/test
 * @description Test api link
 * @access      Private     
 */
router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => { res.json({ msg: "Post route works" }) })

/**
 * @route       Post api/posts/new-post
 * @description Create new post
 * @access      Private     
 */
router.post('/new-post', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    if (!isValid) return res.status(400).json(errors)

    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id
    })

    newPost.save()
        .then(post => {
            return res.status(201).json(post)
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({ error: "Something went wrong" })
        })
})

/**
 * @route       Get api/posts/all
 * @description Get all posts
 * @access      Private     
 */
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.find({})
        .populate("user", "userName")
        .then(posts => {
            return res.status(200).json(posts)
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({ error: "something went wrong" })
        })
})

/**
 * @route       Get api/posts/:postId
 * @description Find one post with comments
 * @access      Private     
 */
router.get('/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("user", "userName")
        .populate({
            path: "comments",
            select: ["_id", "user", "comment", "date"],
            populate: {
                path: "user",
                select: "userName"
            }
        })
        .then(post => {
            return res.status(200).json({ post })
        })
        .catch(() => {
            return res.status(404).json({ error: "Post not found" })
        })
})

/**
 * @route       Delete api/posts/:postId/delete
 * @description Delete post by given id
 * @access      Private     
 */
router.delete('/:postId/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById({ _id: req.params.postId })
        .then(post => {
            if (post.user.toString() === req.user.id) {
                post.remove()
                    .then(() => {
                        return res.status(200).json({ msg: "Post has been deleted succesfully" })
                    })
            } else {
                return res.status(401).json({ error: "Unauthorized user to the post" })
            }
        })
        .catch(() => {
            res.status(404).json({ error: "Post not found" })
        })
})


module.exports = router