import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser]= useState(null)
  const [username, setUsername] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({username, password})
      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
    }catch{
      console.log("Invalid credentials")
    }
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (user === null){
    return (
      <div>
        <h2>Part 5 - Blogs Login Page</h2>
          <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input type = "text" value = {username} onChange = {({ target }) => setUsername(target.value)}/>
            </label>
          </div>
          <div>
            <label>
              password
              <input type = "password" value = {password} onChange = {({ target }) => setPassword(target.value)}/>
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Part 5 - Blogs Frontend</h2>
      <h4>Welcome, {user.name}</h4>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App