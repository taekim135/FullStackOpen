// all routing

const blogRouter = require('express').Router()
const Blog = require("../model/blog")
const { userExtractor } = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "username name id")
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  // not really needed as .verify() throws error
  // if (!decodedToken){
  //   response.status(401).json({error: "Invalid Token Error from .post()"})
  // }

  if (!request.user){
    return response.status(401).json({error: "User not found in DB"})
  }

  const newData = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.user._id
  })

  const result = await newData.save()
  console.log('Data saved to Blog DB')

  request.user.blogs = request.user.blogs.concat(result._id)
  await request.user.save()

  response.status(201).json(result)
})


blogRouter.delete("/:id", userExtractor, async (request,response) => {

  // verify the delete requester
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user?.toString() !== request.user.id.toString()){
    return response.status(401).send({error: "User not authorised to delete this blog"})
  }

  await Blog.findByIdAndDelete(request.params.id)

  // prevents any ghost blogs under user's blog field
  request.user.blogs = request.user.blogs.filter(
    blogId => blogId.toString() !== request.params.id
  )
  await request.user.save()

  response.status(204).end()
  console.log('Data deleted!')
})

// update # likes of a post
blogRouter.put("/:id", async (request,response) => {
  const {likes} = request.body
  const id = request.params.id

  const updated = await Blog.findByIdAndUpdate(id, {likes: likes}, {new: true})
  console.log('Data Updated');
  response.json(updated)
})


module.exports = blogRouter