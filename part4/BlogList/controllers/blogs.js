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

// update # likes of a post
blogRouter.put("/:id", async (request,response) => {
  const {likes} = request.body
  const id = request.params.id

  const updated = await Blog.findByIdAndUpdate(id, {likes: likes}, {new: true})
  console.log('Data updated');
  response.json(updated)
})


//TODO: update

module.exports = blogRouter