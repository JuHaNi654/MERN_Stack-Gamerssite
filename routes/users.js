const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require("../config/dbConfig")
const passport = require('passport')

const router = express.Router()

// Setup data validation
const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

// Import User model
const User = require("../models/User")

/**
 * @route       Post api/users/signup
 * @description Create new user
 * @access      Public
 */
router.post('/signup', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    if (!isValid) return res.status(400).json(errors)

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(403).json({ email: "Email already in use" })
            } else {
                const newUser = new User({
                    userName: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash
                        newUser.save()
                            .then(user => {
                                res.status(201).json({
                                    msg: "Success! New user has been created"
                                })
                            })
                            .catch(err => {
                                console.err(err)
                                return res.status(500).json({
                                    error: "Something went wrong!"
                                })
                            })
                    })
                })
            }
        })

})

/**
 * @route       Post api/users/login
 * @description User login to the service
 * @access      Public
 */
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    if (!isValid) return res.status(400).json(errors)


    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "Email not found" })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const payload = {
                                id: user.id,
                                username: user.username
                            }

                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: token
                                    })
                                }
                            )
                        } else {
                            return res.status(401).json({ error: "Incorrect password" })
                        }
                    })
            }
        })
})

/**
 * @route       Get api/users/profile
 * @description Get current logged user profile data
 * @access      Private
 */
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.userName,
        date: req.user.joinedDate
    })
})

/**
 * @route       Get api/users/:userId
 * @description Get other user profile information
 * @access      Private
 */
router.get('/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" })
            }

            return res.status(200).json({
                id: user.id,
                name: user.userName,
                date: user.joinedDate
            })
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({ error: "Something went wrong!" })
        })
})

module.exports = router