// helper methods
// imported bt testing files (.test.js)
const _ = require('lodash/core')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>{
  let total = 0

  blogs.forEach(blog => {
    total += blog.likes
  });

  return total
}

const favoriteBlog = (blogs) => {
  let best = blogs[0]
  
  blogs.forEach(blog => {
    if (blog.likes > best.likes){
      best = blog
    }
  })

  return best
}




module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}