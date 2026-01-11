// helper methods
// imported bt testing files (.test.js)
const _ = require('lodash')

// purely for testing
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
    ]

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>{
  if (!blogs || blogs.length == 0) return 0

  let total = 0

  blogs.forEach(blog => {
    total += blog.likes
  });

  return total
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length == 0) return 0

  let best = blogs[0]
  
  blogs.forEach(blog => {
    if (blog.likes > best.likes){
      best = blog
    }
  })

  return best
}


const mostBlogs = (blogs) => {
  if (!blogs || blogs.length == 0) return 0

  const counted = _.countBy(blogs, "author")
   
  // resut into an array
  // entries = convert object into array of key-value pair
  // map author & count key-value pair into object properties
  const arrayForm = Object.entries(counted).map(([author,count]) => ({
    author: author,
    blogs: count
  }))


  return _.maxBy(arrayForm, "blogs")
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length == 0) return 0

  const authors = _.groupBy(blogs, "author")

  // mapValues = obj, (key-value)
  // authors = {'Edsger W. Dijkstra': [{ likes: 5 }, { likes: 12 }], 'Robert Martin': [{ likes: 10 }, { likes: 2 }]}
  const likes = _.mapValues(authors, blog => _.sumBy(blog, "likes"))

  const arrayForm = Object.entries(likes).map(([author,count]) => ({
    author: author,
    likes: count
  }))

  return _.maxBy(arrayForm, "likes")
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}