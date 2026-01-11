// all routing

const blogRouter = require('express').Router()
const Blog = require("../model/blog")


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  console.log('Data saved to Blog DB')
  response.status(201).json(result)
})

module.exports = blogRouter