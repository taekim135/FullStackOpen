// all routing

const blogRouter = require('express').Router()
const Blog = require("../model/blog")


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    console.log('Data saved to Blog DB')
    response.status(201).json(result)
  })
  .catch(next => error(next))
})

module.exports = blogRouter