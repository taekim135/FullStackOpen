// helper methods
// imported bt testing files (.test.js)

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


}




module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}