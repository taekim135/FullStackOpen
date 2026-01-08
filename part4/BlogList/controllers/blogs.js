// all routing

const blogRouter = require('express').Router()
const Blog = require("../model/blog")


blogRouter.get('/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.post('/blogs', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    console.log('Data saved to Blog DB')
    response.status(201).json(result)
  })
  .catch(next => error(next))
})

module.exports = blogRouter