// grabbing data from db
// const response = await api.get('/api/notes')
// to avoid above line repeating
// keeps the test file clean
const Blog = require('../model/blog')
const User = require("../model/user")


// sample data for testing
const initialBlogs = [
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

const initialUsers = [
  {
    _id: "6967021af48550d27d84c679",
    username: "Tester1",
    name: "Me",
    passwordHash: "$2b$10$4aLMy6JTtam257HIkB4rsOVUcddsQARBUVNpTBUreMZgOSoIHFk02",
    __v: 0
  },
  {
    _id: "6967025ff48550d27d84c67b",
    username: "Tester2",
    name: "You",
    passwordHash: "$2b$10$x4Pved4j.ndHZGklmPhbOePRJ9TYpFUa0Xh6kYxRbdCzVkFQAmJNm",
    __v: 0
  },
  {
    _id: "696770609d1936a3b5837f33",
    username: "Tester3",
    name: "Him",
    passwordHash: "$2b$10$PqwRQu1rsedQiaNV7xRvSeL/gwJJqT.sqipGOQDc8F37My3f26/Cy",
    __v: 0
  },
  {
    _id: "6967706e9d1936a3b5837f35",
    username: "Tester5",
    name: "Her",
    passwordHash: "$2b$10$/vg2Sl.86hNapTBgw334J.KN/5wLqYBbevXj8ROWb/DN6y6aYsoRe",
    __v: 0
  }
]




const getDataFromDB = async () => {
    const data = await Blog.find({})
    
    return data.map(blog=>blog.toJSON())
}

const getOneData = async (id) => {
    const data = await Blog.findById(id)
    return data
}


const getUsersFromDB = async() => {
  const data = await User.find({})

  return data.map(user => user.toJSON())
}

const getOneUser = async (id) => {
    const data = await User.findById(id)
    return data
}


module.exports = {
  initialBlogs,
  getDataFromDB,
  getOneData,
  initialUsers,
  getUsersFromDB,
  getOneUser
}