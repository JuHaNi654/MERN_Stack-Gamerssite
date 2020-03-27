"use strict"
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const db = require('./config/dbConfig')

const app = express()

// Import routes
const users = require('./routes/users')
const posts = require('./routes/posts')
const comments = require('./routes/comments')

// Setup middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())

// Connect to MongoDB
mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
const mongo = mongoose.connection;
mongo.on('error', console.error.bind(console, 'connection error'))
mongo.once('open', function () {
    console.log('Mongodb connected')
})


require('./config/passport')(passport)


// Initialize server routes
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/comments', comments)

// Error handler for unvalid api endpoints
app.use((req, res, next) => {
    res.status(404).json({ error: "Unvalid /api endpoint" })
})


// Initialize listening port

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`App listening on port ${port}`))