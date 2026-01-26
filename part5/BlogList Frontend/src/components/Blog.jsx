import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDetail = () => {
    setShowDetail(!showDetail)
  }

  const handleLike= () => {
    
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} By {blog.author} <button onClick={handleDetail}>{showDetail ? "Cancel" : "Show"}</button>
      </div>
      {(showDetail && (
        <div>
          {blog.url} <br/> {blog.likes} <button onClick={handleLike}>like</button> <br/> {blog.author}
        </div>
      ))}
    </div>

  )  
}

export default Blog