import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser]= useState(null)
  
  const [username, setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")


  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({username, password})
      setUser(user)
      blogService.setToken(user.token)

      window.localStorage.setItem("LoggedInUser", JSON.stringify(user))

      setUsername("")
      setPassword("")
    }catch{
      console.log("Invalid credentials")
    }
  }

  // .clear() if want all local storage gone
  const handleLogout = async () => {
    window.localStorage.removeItem("LoggedInUser")
    setUser(null)
  }

  const addPost = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    const posted = await blogService.postBlog(newBlog)
    setBlogs(blogs.concat(posted))
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const blogForm = () => (

    <form onSubmit={addPost}>
      <label>
        Title:
        <input type="text" value = {title} onChange={({target})=>{setTitle(target.value)}} required/><br/>
      </label>
      <label>
        Author:
        <input type="text" value = {author} onChange={({target})=>{setAuthor(target.value)}} required/><br/>
      </label>
      <label>
        URL:
        <input type="text" value = {url} onChange={({target})=>{setUrl(target.value)}} required/><br/>
      </label>
      <button type="submit">Create</button>
    </form>

  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  // when rendering the page for 1st time, check if user details are saved in browser local storage
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("LoggedInUser")
    if (loggedUser){
      const userDetails = JSON.parse(loggedUser)
      setUser(userDetails)
      blogService.setToken(userDetails.token)
      console.log("Welcome Back! Local Storage")
    }
  }, [])


  //noteForm
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
      <h4>Welcome, {user.name}
        <button type = "submit" onClick ={handleLogout}>Logout</button>
      </h4>
      <h3>Create New Blog</h3>
      {blogForm()}
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App