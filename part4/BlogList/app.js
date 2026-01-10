// application
// all uses & DB connection
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()
app.use(express.json())

// connection url
mongoose.connect(config.mongoUrl, { family: 4 })
    .then(() => {
        logger.info("Connected to Blog MongoDB")
    })
    .catch(error => {
        logger.error("Error connecting to Blog MongoDB:", error.message)
    })

app.use(express.static('dist'))
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app