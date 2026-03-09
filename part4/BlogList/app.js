// application
// all uses & DB connection
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const testRouter = require("./controllers/test")

const app = express()
app.use(express.json())

// connection url
mongoose.connect(config.mongoUrl, { family: 4 })
    .then(() => {
        if (config.mongoUrl.includes("TestBlog")){
            logger.info("Connected to TestBlog MongoDB")
        }else{
            logger.info("Connected to Blog MongoDB")
        }
    })
    .catch(error => {
        logger.error("Error connecting to Blog MongoDB:", error.message)
    })

app.use(express.static('dist'))
// use the middleware functions in all routes
// technically, token not needed @all routes (only @routes where login needed)
// since skipped to the next middleware if Bearer not found
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// only apply userExtractor to routes where needed
// this is for global. thus keep it inside the parameter of controller file where needed
// app.use(middleware.userExtractor)

if(process.env.NODE_ENV === "test"){
    app.use("/api/testing", testRouter)
}

app.use('/api/blogs', blogsRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app