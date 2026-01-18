// all routing

const blogRouter = require('express').Router()
const Blog = require("../model/blog")
const User = require("../model/user")
const jwt = require("jsonwebtoken")



blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "username name id")
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken){
    response.status(401).json({error: "Invalid Token"})
  }

  const postWriter = await User.findById(decodedToken.id)

  if (!postWriter){
    response.status(400).json({error: "User not found in DB"})
  }


  console.log("Person: ", postWriter);

  const newData = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: postWriter._id
  })

  const result = await newData.save()
  console.log('Data saved to Blog DB')

  postWriter.blogs = postWriter.blogs.concat(result._id)
  await postWriter.save()

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
  console.log('Data Updated');
  response.json(updated)
})


//TODO: update

module.exports = blogRouter