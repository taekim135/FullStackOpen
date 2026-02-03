const testRouter = require("express").Router()
const Blog = require("../model/blog")
const User = require("../model/user")

// /api/testing/reset
testRouter.post("/reset", async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = testRouter