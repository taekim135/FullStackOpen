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


blogRouter.delete("/:id", async (request,response) => {
  const data = await Blog.findByIdAndDelete(request.params.id)
  console.log('Data deleted')
  response.status(204).end()
})


//TODO: add delete & update

module.exports = blogRouter